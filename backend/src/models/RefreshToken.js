import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
    unique: true,
  },
  deviceInfo: {
    type: String,
    default: "Unknown Device",
  },
  ipAddress: {
    type: String,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  lastUsedAt: {
    type: Date,
    default: Date.now,
  },
  isRevoked: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

// Indexes
refreshTokenSchema.index({ userId: 1 });
refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);
export default RefreshToken;