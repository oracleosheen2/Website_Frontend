"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { FaAppleAlt, FaArrowLeft } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast, Toaster } from "react-hot-toast";



const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [authStep, setAuthStep] = useState("login"); // 'login', 'otp', 'forgot', 'reset', 'newPassword'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [resetToken, setResetToken] = useState("");

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.nextSibling && element.value !== "") {
      element.nextSibling.focus();
    }
  };

  const handleBack = () => {
    if (authStep === "otp") {
      setAuthStep("login");
      setOtpVerified(false);
    } else if (authStep === "forgot") {
      setAuthStep("login");
    } else if (authStep === "reset") {
      setAuthStep("forgot");
      setOtpVerified(false);
    } else if (authStep === "newPassword") {
      setAuthStep("reset");
    }
  };

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      const response = await postData("/api/auth/login", { email, password });

      // Store token in localStorage
      localStorage.setItem("token", response.token);

      toast.success("Login successful!");

      // Redirect to dashboard or home page after successful login
      setTimeout(() => {
        window.location.href = "/dashboard"; // Change to your desired redirect path
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Registration
  const handleRegister = async (e) => {
    e.preventDefault();

    // Combine first and last name
    const fullName = `${firstName} ${lastName}`.trim();

    if (!fullName || !email || !password) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    setIsLoading(true);

    try {
      const response = await postData("/api/auth/register", {
        name: fullName,
        email,
        password,
      });

      toast.success("Registration successful! Please login.");

      // Switch back to login form
      setIsLogin(true);

      // Clear form
      setFirstName("");
      setLastName("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Forgot Password
  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setIsLoading(true);

    try {
      const response = await postData("/api/auth/forgot-password", { email });

      toast.success("Password reset link sent to your email!");
      setAuthStep("reset");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to send reset email"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handle OTP Verification
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate OTP verification (replace with actual API call if you have OTP endpoint)
    setTimeout(() => {
      setIsLoading(false);
      const enteredOtp = otp.join("");

      // Check if OTP is correct (for demo, any 6-digit OTP works)
      if (enteredOtp.length === 6 && !isNaN(enteredOtp)) {
        setOtpVerified(true);
        if (authStep === "otp") {
          // Login OTP verified
          toast.success("OTP verified successfully!");
          // In real app, you would verify OTP with backend
          setAuthStep("login");
          setOtp(["", "", "", "", "", ""]);
          setOtpVerified(false);
        } else if (authStep === "reset") {
          // Forgot password OTP verified - show new password fields
          setAuthStep("newPassword");
          toast.success("OTP verified! Now set your new password.");
        }
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    }, 1500);
  };

  // Handle Password Reset
  const handlePasswordReset = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);

    try {
      // Note: You need to get the reset token from your backend
      // For demo, using a mock token
      const token = resetToken || "demo-token";

      const response = await postData(`/api/auth/reset-password/${token}`, {
        password: newPassword,
      });

      toast.success("Password reset successful!");
      setAuthStep("login");
      setNewPassword("");
      setConfirmPassword("");
      setOtpVerified(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Google Login
  const handleGoogleLogin = () => {
    toast.loading("Redirecting to Google...");
    // Implement Google OAuth here
    // window.location.href = "YOUR_GOOGLE_OAUTH_URL";
  };

  // Handle Apple Login
  const handleAppleLogin = () => {
    toast.loading("Redirecting to Apple...");
    // Implement Apple OAuth here
    // window.location.href = "YOUR_APPLE_OAUTH_URL";
  };

  const renderLoginForm = () => (
    <form onSubmit={handleLogin} className="space-y-4 md:space-y-6">
      <h1 className="text-2xl md:text-3xl font-semibold pb-2 text-center text-gray-700">
        Sign in
      </h1>

      <div className="flex flex-col gap-4 md:gap-6">
        <input
          placeholder="Email address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 text-sm md:text-base"
          required
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 text-sm md:text-base"
          required
        />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <button
            type="button"
            onClick={() => setAuthStep("forgot")}
            className="text-sm text-gray-600 hover:underline transition-all duration-300 text-left"
          >
            Forgot password?
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-gray-800 text-white px-6 py-2 rounded-md font-semibold hover:bg-gray-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </div>

        <div className="text-center mt-2 md:mt-4">
          <p className="text-gray-600 text-sm">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className="text-gray-800 font-semibold hover:underline focus:outline-none cursor-pointer transition-all duration-300"
            >
              Sign up
            </button>
          </p>
        </div>

        <div className="relative my-2 md:my-4 text-center">
          <span className="absolute left-0 top-1/2 w-full h-px bg-gray-300"></span>
          <span className="relative bg-white/40 px-3 text-gray-600 text-sm">
            or
          </span>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-3">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-2 w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition-all duration-300 text-sm md:text-base"
          >
            <FcGoogle size={18} className="md:size-[20px]" />
            <span>Google</span>
          </button>
          <button
            type="button"
            onClick={handleAppleLogin}
            className="flex items-center justify-center gap-2 w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition-all duration-300 text-sm md:text-base"
          >
            <FaAppleAlt size={16} className="text-[#0078D4] md:size-[18px]" />
            <span>Apple</span>
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center mt-4 md:mt-6 leading-5">
          Protected by reCAPTCHA and subject to the{" "}
          <a
            href="#"
            className="underline text-black hover:text-gray-700 transition-colors"
          >
            Privacy Policy
          </a>{" "}
          and{" "}
          <a
            href="#"
            className="underline text-black hover:text-gray-700 transition-colors"
          >
            Terms of Service
          </a>
          .
        </p>
      </div>
    </form>
  );

  const renderOtpForm = () => (
    <form onSubmit={handleOtpSubmit} className="space-y-4 md:space-y-6">
      <div className="flex items-center justify-between mb-2 md:mb-4">
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-all duration-300 text-sm md:text-base"
        >
          <FaArrowLeft size={14} className="md:size-[16px]" />
          <span className="hidden sm:inline">Back</span>
        </button>
        <h1 className="text-xl md:text-3xl font-semibold text-center text-gray-700 flex-1">
          Enter OTP
        </h1>
        <div className="w-6 md:w-8"></div>
      </div>

      <div className="text-center mb-4 md:mb-6">
        <p className="text-gray-600 text-sm md:text-base">
          We sent a verification code to
        </p>
        <p className="font-semibold text-gray-800 text-sm md:text-base">
          {email}
        </p>
      </div>

      <div className="flex justify-center gap-2 md:gap-3 mb-4 md:mb-6">
        {otp.map((data, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={data}
            onChange={(e) => handleOtpChange(e.target, index)}
            onFocus={(e) => e.target.select()}
            className="w-10 h-10 md:w-12 md:h-12 text-center text-lg md:text-xl font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
          />
        ))}
      </div>

      <button
        type="submit"
        disabled={isLoading || otp.some((digit) => digit === "")}
        className="w-full bg-gray-800 text-white py-3 rounded-xl font-semibold hover:bg-gray-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm md:text-base"
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Verifying...
          </>
        ) : (
          "Verify OTP"
        )}
      </button>

      <div className="text-center">
        <p className="text-gray-600 text-xs md:text-sm">
          Didn't receive the code?{" "}
          <button
            type="button"
            className="text-gray-800 font-semibold hover:underline cursor-pointer transition-all duration-300"
          >
            Resend
          </button>
        </p>
      </div>
    </form>
  );

  const renderForgotPasswordForm = () => (
    <form onSubmit={handleForgotPassword} className="space-y-4 md:space-y-6">
      <div className="flex items-center justify-between mb-2 md:mb-4">
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-all duration-300 text-sm md:text-base"
        >
          <FaArrowLeft size={14} className="md:size-[16px]" />
          <span className="hidden sm:inline">Back</span>
        </button>
        <h1 className="text-xl md:text-3xl font-semibold text-center text-gray-700 flex-1">
          Reset Password
        </h1>
        <div className="w-6 md:w-8"></div>
      </div>

      <div className="text-center mb-4 md:mb-6">
        <p className="text-gray-600 text-sm md:text-base">
          Enter your email address and we'll send you an OTP to reset your
          password.
        </p>
      </div>

      <input
        placeholder="Email address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 text-sm md:text-base"
        required
      />

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gray-800 text-white py-3 rounded-xl font-semibold hover:bg-gray-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm md:text-base"
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Sending OTP...
          </>
        ) : (
          "Send OTP"
        )}
      </button>
    </form>
  );

  const renderResetPasswordForm = () => (
    <form onSubmit={handleOtpSubmit} className="space-y-4 md:space-y-6">
      <div className="flex items-center justify-between mb-2 md:mb-4">
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-all duration-300 text-sm md:text-base"
        >
          <FaArrowLeft size={14} className="md:size-[16px]" />
          <span className="hidden sm:inline">Back</span>
        </button>
        <h1 className="text-xl md:text-3xl font-semibold text-center text-gray-700 flex-1">
          Verify OTP
        </h1>
        <div className="w-6 md:w-8"></div>
      </div>

      <div className="text-center mb-4 md:mb-6">
        <p className="text-gray-600 text-sm md:text-base">
          Enter the OTP sent to your email
        </p>
        <p className="font-semibold text-gray-800 text-sm md:text-base">
          {email}
        </p>
      </div>

      <div className="flex justify-center gap-2 md:gap-3 mb-4 md:mb-6">
        {otp.map((data, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={data}
            onChange={(e) => handleOtpChange(e.target, index)}
            onFocus={(e) => e.target.select()}
            className="w-10 h-10 md:w-12 md:h-12 text-center text-lg md:text-xl font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
          />
        ))}
      </div>

      <button
        type="submit"
        disabled={isLoading || otp.some((digit) => digit === "")}
        className="w-full bg-gray-800 text-white py-3 rounded-xl font-semibold hover:bg-gray-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm md:text-base"
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Verifying...
          </>
        ) : (
          "Verify OTP"
        )}
      </button>

      <div className="text-center">
        <p className="text-gray-600 text-xs md:text-sm">
          Didn't receive the code?{" "}
          <button
            type="button"
            className="text-gray-800 font-semibold hover:underline cursor-pointer transition-all duration-300"
          >
            Resend
          </button>
        </p>
      </div>
    </form>
  );

  const renderNewPasswordForm = () => (
    <form onSubmit={handlePasswordReset} className="space-y-4 md:space-y-6">
      <div className="flex items-center justify-between mb-2 md:mb-4">
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-all duration-300 text-sm md:text-base"
        >
          <FaArrowLeft size={14} className="md:size-[16px]" />
          <span className="hidden sm:inline">Back</span>
        </button>
        <h1 className="text-xl md:text-3xl font-semibold text-center text-gray-700 flex-1">
          New Password
        </h1>
        <div className="w-6 md:w-8"></div>
      </div>

      <div className="text-center mb-4 md:mb-6">
        <p className="text-gray-600 text-sm md:text-base">
          Create your new password
        </p>
      </div>

      {/* Show the email that was entered */}
      <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
        <p className="text-xs md:text-sm text-gray-600">Email</p>
        <p className="font-semibold text-gray-800 text-sm md:text-base">
          {email}
        </p>
      </div>

      <input
        placeholder="New Password"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 text-sm md:text-base"
        required
      />

      <input
        placeholder="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 text-sm md:text-base"
        required
      />

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gray-800 text-white py-3 rounded-xl font-semibold hover:bg-gray-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm md:text-base"
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Resetting...
          </>
        ) : (
          "Reset Password"
        )}
      </button>
    </form>
  );

  const renderSignupForm = () => (
    <form onSubmit={handleRegister} className="space-y-4 md:space-y-6">
      <h1 className="text-2xl md:text-3xl font-semibold pb-2 md:pb-6 text-center text-gray-700">
        Create account
      </h1>

      <div className="flex flex-col gap-4 md:gap-6">
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
          <input
            placeholder="First Name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 flex-1 transition-all duration-300 text-sm md:text-base"
            required
          />
          <input
            placeholder="Last Name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 flex-1 transition-all duration-300 text-sm md:text-base"
            required
          />
        </div>
        <input
          placeholder="Email address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 text-sm md:text-base"
          required
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 text-sm md:text-base"
          required
        />
        <input
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 text-sm md:text-base"
          required
        />

        <div className="flex items-start">
          <input
            type="checkbox"
            id="terms"
            className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-all duration-300 mt-1"
            required
          />
          <label htmlFor="terms" className="text-xs md:text-sm text-gray-600">
            I agree to the{" "}
            <a
              href="#"
              className="underline text-black hover:text-gray-700 transition-colors"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="underline text-black hover:text-gray-700 transition-colors"
            >
              Privacy Policy
            </a>
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
              Creating Account...
            </>
          ) : (
            "Create Account"
          )}
        </button>

        <div className="text-center mt-1 md:mt-2">
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className="text-gray-800 font-semibold hover:underline focus:outline-none cursor-pointer transition-all duration-300"
            >
              Sign in
            </button>
          </p>
        </div>

        <div className="relative my-2 md:my-4 text-center">
          <span className="absolute left-0 top-1/2 w-full h-px bg-gray-300"></span>
          <span className="relative bg-white/40 px-3 text-gray-600 text-sm">
            or
          </span>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-3">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-2 w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition-all duration-300 text-sm md:text-base"
          >
            <FcGoogle size={18} className="md:size-[20px]" />
            <span>Google</span>
          </button>
          <button
            type="button"
            onClick={handleAppleLogin}
            className="flex items-center justify-center gap-2 w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition-all duration-300 text-sm md:text-base"
          >
            <FaAppleAlt size={16} className="text-[#0078D4] md:size-[18px]" />
            <span>Apple</span>
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center mt-4 md:mt-6 leading-5">
          Protected by reCAPTCHA and subject to the{" "}
          <a
            href="#"
            className="underline text-black hover:text-gray-700 transition-colors"
          >
            Privacy Policy
          </a>{" "}
          and{" "}
          <a
            href="#"
            className="underline text-black hover:text-gray-700 transition-colors"
          >
            Terms of Service
          </a>
          .
        </p>
      </div>
    </form>
  );

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-[#FBB5E7] to-[#C4F9FF] relative overflow-hidden">
      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            style: {
              background: "#10B981",
            },
          },
          error: {
            duration: 4000,
            style: {
              background: "#EF4444",
            },
          },
          loading: {
            duration: Infinity,
          },
        }}
      />

      {/* Logo */}
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-20">
        <Image
          src="/logo.png"
          alt="logo"
          width={80}
          height={80}
          className="md:w-[130px] md:h-[120px]"
        />
      </div>

      {/* Main Section */}
      <div className="w-full flex flex-col lg:flex-row justify-between items-center px-4 sm:px-8 md:px-16 py-6 md:py-10 gap-8 md:gap-0 md:pt-0 pt-30">
        {/* Background circular image */}
        <Image
          src="/images/roundimage.png"
          alt="background illustration"
          width={650}
          height={650}
          className="absolute opacity-80 md:opacity-70 md:pt-10 pt-0 rotate-slow rounded-full"
        />

        {/* Text content - Hidden on small screens, visible on medium and above */}
        <div className="relative z-10 px-4 lg:px-6 text-center md:text-left w-full lg:w-auto md:h-auto h-[60vh]">
          <div className="lg:block pt-20">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#636363] mb-3 lg:mb-4">
              One tool for your
            </h1>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#636363] mb-4 lg:mb-6">
              whole team needs
            </h1>

            <p className="text-gray-600 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 mb-4 lg:mb-6">
              We are lorem ipsum team dolor sit amet, consectetur adipiscing
              elit, sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua.
            </p>

            {/* Avatars + text */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center space-y-3 sm:space-y-0 sm:space-x-3 mt-4">
              <div className="flex -space-x-3">
                <Image
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjSoKn8IQb33N82TB_LkwVNhgHmlqTuZTcWA&s"
                  alt="user1"
                  width={32}
                  height={32}
                  className="rounded-full border-2 border-white transition-all duration-300 hover:scale-110 w-8 h-8 sm:w-10 sm:h-10"
                />
                <Image
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjSoKn8IQb33N82TB_LkwVNhgHmlqTuZTcWA&s"
                  alt="user2"
                  width={32}
                  height={32}
                  className="rounded-full border-2 border-white transition-all duration-300 hover:scale-110 w-8 h-8 sm:w-10 sm:h-10"
                />
                <Image
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjSoKn8IQb33N82TB_LkwVNhgHmlqTuZTcWA&s"
                  alt="user3"
                  width={32}
                  height={32}
                  className="rounded-full border-2 border-white transition-all duration-300 hover:scale-110 w-8 h-8 sm:w-10 sm:h-10"
                />
              </div>
              <span className="text-gray-700 text-xs sm:text-sm font-medium">
                3k+ people joined us, now it's your turn
              </span>
            </div>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="w-full max-w-md lg:max-w-none lg:w-auto">
          <div className="bg-white/40 backdrop-blur-md p-6 sm:p-8 md:p-10 md:px-14 rounded-2xl md:rounded-3xl shadow-2xl w-full lg:w-[550px] h-auto max-h-[90vh] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {isLogin ? (
              <>
                {authStep === "login" && renderLoginForm()}
                {authStep === "otp" && renderOtpForm()}
                {authStep === "forgot" && renderForgotPasswordForm()}
                {authStep === "reset" && renderResetPasswordForm()}
                {authStep === "newPassword" && renderNewPasswordForm()}
              </>
            ) : (
              renderSignupForm()
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
