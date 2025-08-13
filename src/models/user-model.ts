import mongoose from "mongoose";
import { SignJWT } from "jose";

const userSchema = new mongoose.Schema(
  {
    // Personal
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    father: {
      type: String,
    },
    nationalId: {
      type: String,
    },
    mobile: {
      type: String,
    },

    // Not personal
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["USER", "MEMBER", "ADMIN"],
      default: "MEMBER",
    },
    position: {
      type: String,
      required: true,
      default: "সদস্য",
    },
    entryDate: {
      type: Date,
      required: true,
    },
    shares: {
      type: Number,
      required: true,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.methods.isPasswordCorrect = async function (password: string) {
  return (await this.password) === password;
};

userSchema.methods.generateAccessToken = async function () {
  const secret = new TextEncoder().encode(
    process.env.NEXT_PRIVATE_ACCESS_TOKEN_SECRET as string
  );

  return await new SignJWT({
    _id: this._id,
    name: this.name,
    email: this.email,
    avatar: this.avatar,
    role: this.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10d")
    .sign(secret);
};

userSchema.methods.generateRefreshToken = async function () {
  const secret = new TextEncoder().encode(
    process.env.NEXT_PRIVATE_REFRESH_TOKEN_SECRET as string
  );

  return await new SignJWT({ _id: this._id })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10d")
    .sign(secret);
};

export const userModel =
  mongoose.models.User || mongoose.model("User", userSchema);
