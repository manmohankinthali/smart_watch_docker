const ErrorHandler = require("../Utils/ErrorHandler");
const User = require("../Models/UserSchema");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../Utils/JWTtoken");
const sendEmail = require("../Utils/sendEmail");
const crypto = require("crypto");

console.log("this is userROuter");
exports.Userregister = catchAsyncErrors(async (req, res, next) => {
  console.log("this is user register");
  console.log(req.body);

  const { name, phone, Email, password } = req.body;

  const user = await User.create({
    name,
    Email,
    password,
    phone,
  });

  sendToken(user, 200, res);
});

//login

exports.userLogin = catchAsyncErrors(async (req, res, next) => {
  const { Email, password } = req.body;

  if (!Email || !password) {
    return next(new ErrorHandler("please enter email & password", 400));
  }
  const user = await User.findOne({ Email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("please enter valid email & password", 401));
  }
  const isPasswordMatched = await user.comparePassWord(password);
  console.log(isPasswordMatched);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("please enter valid email & password", 401));
  }

  // const token= await user.getJwtToken();
  // res.status(200).json({
  //     success:true,
  //     token
  //    })            //instead of doing like this the codebase makes so much large so i have made an function to get the token and store the cookie with expire time of 5 days
  sendToken(user, 200, res);
});

//User  Logout;

exports.logout = catchAsyncErrors((req, res) => {
  res.clearCookie("token");
  // res.cookie("token", null, {//can also bve done by making a cookie null and then expiring it
  //     expires: new Date(Date.now()),
  //     httpOnly: true,
  //   });
  res.status(200).json({
    success: true,
    message: "user logged out successfully",
  });
});

//Forgot passsword
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ Email: req.body.Email });
  console.log(req.body.Email);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  const resetToken = await user.getresetPaswordToken();
  console.log("this is user");
  console.log(resetToken);

  await user.save({ validateBeforeSave: false });

  const resetPassURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;
  console.log(resetPassURL);
  const message = `your password reset token is sent successfully \n\n ${resetPassURL}  \n\n please ignore if not requested`;

  try {
    console.log("this is from try block");
    await sendEmail({
      email: user.Email,
      subject: `Online shopping password recovery`,
      message: message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.Email} successfully`,
    });
  } catch (error) {
    console.log("this is from catch block");

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 401));
  }
});

exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(new ErrorHandler("reset token is not valid", 401));
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("please check the password", 401));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  sendToken(user, 200, res);
});

//get user Details

exports.getUserDetails = catchAsyncErrors(async (req, res) => {
  const userId = req.user.id;

  console.log("this is from get user details", userId);
  const data = await User.findById({ _id: userId });
  console.log(data, "this is data");
  res
    .status(200)
    .json({ success: true, data, msg: "successfully fetched userDetails" });
});
//Updating existing password for the user

exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassWord(req.body.oldPassword);
  console.log(isPasswordMatched);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect", 401));
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(
      new ErrorHandler("new and Confirm password doesn not match", 401)
    );
  }

  user.password = req.body.newPassword;
  await user.save();

  // res.status(200).json({success:true,msg:"user password successfully updated"});
  sendToken(user, 200, res);
});

exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const updatedProfile = {
    name: req.body.name,
    Email: req.body.Email,
    phone: req.body.phone,
  };

  const user = await User.findByIdAndUpdate(req.user.id, updatedProfile, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({ msg: "profile Updated", user });
});
