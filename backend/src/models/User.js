import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Full name is required"],
    minlength: 2,
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
    required: [true, "Password is required"],
    minlength: 8,
    validate: [
        validator.isStrongPassword,
        "Password must be at least 8 characters long and include 1 uppercase, 1 lowercase, 1 number, and 1 special character."
    ],
    select: false, 
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
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
});

// Compare password
userSchema.methods.matchPassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
