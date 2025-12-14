import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Username is required"],
    minlength: 2,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, "Invalid email format"],
  },
  password: {
    type: String,
    minlength: 8,
    select: false,
    default: null,
    validate: {
      validator: function (value) {
        if (!value) return true;
        return validator.isStrongPassword(value);
      },
      message:
        "Password must contain uppercase, lowercase, number & symbol",
    },
  },
  googleId: { type: String, default: null },
  provider: {
    type: String,
    enum: ["local", "google", "both"],
    default: "local",
  },
  profilePic: {
    type: String,
    default: null,
  },
  tokenVersion: { type: Number, default: 0 },
}, { timestamps: true });

userSchema.set("toJSON", {
  transform(doc, ret) {
    delete ret.password;
    delete ret.__v;
    return ret;
  },
});

userSchema.set("toObject", {
  transform(doc, ret) {
    delete ret.password;
    delete ret.__v;
    return ret;
  },
});

// Hash password
userSchema.pre("save", async function () {
  if (!this.isModified("password") || !this.password) return;

  try {
    this.password = await bcrypt.hash(this.password, 10);
  } catch (error) {
    throw new Error(`Password hashing failed: ${error.message}`);
  }
});

// Compare password
userSchema.methods.matchPassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
