import arcjet, { shield, detectBot, tokenBucket, slidingWindow } from "@arcjet/node";
import { ARCJET_KEY } from "./env.js";

// GET requests 
 const ajRead = arcjet({
  key: ARCJET_KEY,
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),
    tokenBucket({
      mode: "LIVE",
      refillRate: 10,     
      interval: 1,
      capacity: 100,     
      attributes: ["userId"],
    }),
    slidingWindow({
      mode: "LIVE",
      interval: 60 * 1000, 
      max: 100,          
      attributes: ["userId"],
    }),
  ],
});

// for POST/PUT/PATCH
const ajWrite = arcjet({
  key: ARCJET_KEY,
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),
    tokenBucket({
      mode: "LIVE",
      refillRate: 2,     
      interval: 1,
      capacity: 20,      
      attributes: ["userId"],
    }),
    slidingWindow({
      mode: "LIVE",
      interval: 10 * 1000, 
      max: 5,            
      attributes: ["userId"],
    }),
  ],
});

// for image uploads and heavy operations
 const ajExpensive = arcjet({
  key: ARCJET_KEY,
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      allow: [],  
    }),
    tokenBucket({
      mode: "LIVE",
      refillRate: 1,      
      interval: 2,
      capacity: 10,       
      attributes: ["userId"],
    }),
    slidingWindow({
      mode: "LIVE",
      interval: 60 * 1000, 
      max: 20,            
      attributes: ["userId"],
    }),
  ],
});

// for auth routes
 const ajAuth = arcjet({
  key: ARCJET_KEY,
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      allow: [],        
    }),
    tokenBucket({
      mode: "LIVE",
      refillRate: 1,      
      interval: 10,
      capacity: 5,        
      attributes: ["ip"],  
    }),
    slidingWindow({
      mode: "LIVE",
      interval: 60 * 1000, 
      max: 5,             
      attributes: ["ip"], 
    }),
  ],
});

export{ajAuth,ajExpensive,ajRead,ajWrite}