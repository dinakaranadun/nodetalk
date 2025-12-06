import { ajRead, ajWrite, ajExpensive, ajAuth } from "../config/arcjet.js";
import { NODE_ENV } from "../config/env.js";
import AppError from "../utils/apperror.js";

// Helper to check for spoofed bots
const isSpoofedBot = (result) =>
 result.reason?.isBot?.() && result.reason?.isSpoofed?.();


const createArcjetMiddleware = (ajInstance, options = {}) => {
  const {
    requireAuth = true,
    getTokenCost = () => 1,
  } = options;

  return async (req, res, next) => {
    try {
      // Skip auth check if not required (for auth routes)
      if (requireAuth && (!req.user || !req.user._id)) {
        return next(new AppError("Authentication required", 401));
      }

      // userId for rate limiting if user exists
      if (req.user && req.user._id) {
        req.arcjet = {
          userId: req.user._id.toString(),
        };
      }

      const tokenCost = getTokenCost(req);

      // Protect the request
      const decision = await ajInstance.protect(req, { 
        requested: tokenCost 
      });

      NODE_ENV === 'development' && console.log("Arcjet decision:", {
        isDenied: decision.isDenied(),
        reason: decision.reason,
        tokenCost,
      });

      // Handle denied requests
      if (decision.isDenied()) {
         if (decision.reason.isRateLimit()) {
          const retryAfter =
            typeof decision.reason.reset === "number" && decision.reason.reset > Date.now()
              ? Math.ceil((decision.reason.reset - Date.now()) / 1000)
              : 60;

          res.set("Retry-After", retryAfter);
          return next(
            new AppError(
              "Rate limit exceeded. Please try again later.",
              429
            )
          );
        } else if (decision.reason.isBot()) {
          return next(new AppError("Bot detected", 403));
        } else {
          return next(new AppError("Forbidden", 403));
        }
      }

      // Check for hosting IPs
      if (decision.ip?.isHosting?.()) {
        return next(
          new AppError("Requests from hosting providers are not allowed", 403)
        );
      }

      // Check for spoofed bots
      if (decision.results?.some(isSpoofedBot)) {
        return next(new AppError("Spoofed bot detected", 403));
      }

      next();
    } catch (error) {
      console.error("Arcjet middleware error:", error);
      next(error);
    }
  };
};

export const arcjetRead = createArcjetMiddleware(ajRead, {
  requireAuth: true,
  getTokenCost: () => 1,
});

export const arcjetWrite = createArcjetMiddleware(ajWrite, {
  requireAuth: true,
  getTokenCost: () => 1,
});

export const arcjetExpensive = createArcjetMiddleware(ajExpensive, {
  requireAuth: true,
  getTokenCost: () => 3,
});

export const arcjetAuth = createArcjetMiddleware(ajAuth, {
  requireAuth: false,
  getTokenCost: () => 1,
});

export default arcjetWrite;

