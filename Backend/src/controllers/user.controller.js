import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { user } from "../models/user.model.js";

export const registerUser = asyncHandler(async (req, res) => {
  // get the details from frontend
  // Validate
  // check the user is already exists or not
  // check for images and avatar
  // upload them into cloudinary
  // create a user object --create entry a db
  // remove password and refresh token field from response
  // check for user creation
  // return response

  //   distructuring the req data
  const { FirstName, LastName, Email, Password } = req.body;

  //   validate empty or not
  if (
    [FirstName, LastName, Email, Password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required!!");
  }
  //   check the user already exist or not
  const userExistance = await user

  
});
