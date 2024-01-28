import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/User.model.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) throw new ApiError(400, "invalid user id");

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access and refresh token."
    );
  }
};

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

  if (!createdUser) throw new ApiError(500, "Failed to create user.");

  return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
};

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!(username && password))
    throw new ApiError(400, "username and password fields cannot be empty.");

  const user = await User.findOne({ username });
  if (!user) throw new ApiError(400, "User doesn't exist!");

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) throw new ApiError(400, "Invalid user credentials");

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select("-password");

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, loggedInUser, "User logged in successfully."));
};

const logout = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        $set: { refreshToken: undefined },
      },
      { new: true }
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(new ApiResponse(200, {}, "User logged Out"));
  } catch (error) {
    throw new ApiError(500, "something went wrong while logging out.");
  }
};

export { register, login, logout };
