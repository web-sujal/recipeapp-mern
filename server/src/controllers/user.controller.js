import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/User.model.js";

const register = async (req, res) => {
  const { username, password } = req.body;

  if (!(username && password))
    throw new ApiError(400, "username and password fields are required");

  const existedUser = await User.findOne({ username });

  if (existedUser)
    throw new ApiError(400, "user with this username already exists.");

  const user = await User.create({
    username: username.toLowerCase(),
    password,
  });

  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser)
    throw new ApiError(500, "Something went wrong while creating the user.");

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered successfully"));
};

export { register };
