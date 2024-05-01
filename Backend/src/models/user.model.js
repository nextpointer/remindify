import mongoos, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    FirstName: {
      type: String,
      required: true,
    },
    LastName: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
    },
    Password: {
      type: String,
      required: true,
    },
    RefreshToken: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

// hashed the password
userSchema.pre("save", async function (next) {
  if (!this.isModified("Password")) return next();
  this.Password = await bcrypt.hash(this.Password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  
  return await bcrypt.compare(password, this.Password);
};

// generating access token and refresh token
userSchema.methods.generateAccessToken = async function () {
  return jwt.sign(
    {
      FirstName: this.FirstName,
      LastName: this.LastName,
      Email: this.Email,
    },
    process.env.ACCESSTOKENSECRET,
    {
      expiresIn: process.env.ACCESSTOKENEXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = async function () {
  return jwt.sign(
    {
      _id: this.id,
    },
    process.env.REFRESHTOKENSECRET,
    {
      expiresIn: process.env.REFRESHTOKENEXPIRY,
    }
  );
};

export const user = mongoos.model("User", userSchema);

