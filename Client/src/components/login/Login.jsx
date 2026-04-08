import { GoogleLogin } from "@react-oauth/google";
import { useState, useEffect } from "react";
import axiosInstance from "../middleware/AxiosInstance";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUserWithEmail, verifyOtpThunk } from "./login.slice";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState("email"); // email | otp
  const [email, setEmail] = useState("");
  const [UserName, setUserName] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [timer, setTimer] = useState(60);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Countdown timer
  useEffect(() => {
    if (step === "otp" && timer > 0) {
      const interval = setInterval(() => {
        setTimer((t) => t - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [step, timer]);

  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleChangeEmail = () => {
    setStep("email");
    setOtp(Array(6).fill(""));
    setTimer(60);
  };

  const handleResendOtp = () => {
    setTimer(60);
    setOtp(Array(6).fill(""));
    setStep("otp");
    dispatch(loginUserWithEmail({ email, name: isLogin ? "" : UserName }));
  };

  const sendOtp = () => {
    if (!email) return;
    console.log(email, "email");
    dispatch(loginUserWithEmail({ email, name: isLogin ? "" : UserName }));
    setStep("otp");
  };

  const handleVerifyOtp = async () => {
    const enteredOtp = otp.join("");
    console.log(enteredOtp, "entered otp");

    if (enteredOtp.length !== 6) {
      alert("Enter complete OTP");
      return;
    }
    const resultAction = await dispatch(
      verifyOtpThunk({ email, otp: enteredOtp })
    );

    if (verifyOtpThunk.fulfilled.match(resultAction)) {
      navigate("/dashboard");
    } else {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="mx-auto mb-3 w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center text-white text-xl font-bold">
            {"</>"}
          </div>
          <h1 className="text-2xl font-semibold">Welcome to CodeMaster</h1>
          <p className="text-gray-500 text-sm mt-1">
            {isLogin ? "Sign in to continue your coding journey" : "Create an account to start coding"}
          </p>
        </div>

        <div className="flex justify-center w-full mb-4">
          <GoogleLogin
            onSuccess={async (response) => {
              // console.log(response.credential, "google credential");
              try {
                const res = await axiosInstance.post(
                  "/auth/google-login",
                  {
                    credential: response.credential,
                  },
                  {
                    withCredentials: true, // 🔥 REQUIRED
                  }
                );

                console.log(res.data, "google login response");

                // redirect after login
                navigate("/dashboard");
              } catch (error) {
                if (error.response?.status === 409) {
                  alert("This email is already registered. Please login.");
                } else {
                  alert("Google login failed. Try again.");
                }
              }
            }}
            onError={() => {
              console.log("Google Login Failed");
            }}
          />
        </div>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="px-3 text-gray-400 text-sm">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* EMAIL STEP */}
        {step === "email" && (
          <>
            {/* Toggle Sign In / Sign Up */}
            <div className="flex bg-gray-100 p-1 rounded-lg mb-6">
              <button
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                  isLogin ? "bg-white shadow-sm text-blue-600" : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setIsLogin(true)}
              >
                Sign In
              </button>
              <button
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                  !isLogin ? "bg-white shadow-sm text-blue-600" : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setIsLogin(false)}
              >
                Sign Up
              </button>
            </div>

            {!isLogin && (
              <>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="mt-2 w-full border-gray-300 border-1 rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-blue-500 outline-none text-md text-gray-600"
                  value={UserName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </>
            )}

            <label className="block text-sm font-medium mb-1">
              Email address
            </label>
            <input
              type="email"
              placeholder="Enter your email address"
              className="mt-2 w-full border-gray-300 border-1 rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-blue-500 outline-none text-md text-gray-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              onClick={sendOtp}
              className="cursor-pointer w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Continue
            </button>

            <p className="text-xs text-gray-500 text-center mt-3">
              We'll send a one-time password to your email
            </p>
          </>
        )}

        {/* OTP STEP */}
        {step === "otp" && (
          <>
            <h2 className="text-lg font-semibold text-center mb-1">
              Verify your email
            </h2>
            <p className="text-sm text-gray-600 text-center mb-5">
              Code sent to {email}
              <span
                className="ml-2 text-blue-600 cursor-pointer hover:underline"
                onClick={handleChangeEmail}
              >
                Change
              </span>
            </p>

            {/* OTP boxes */}
            <div className="flex justify-between mb-5">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  className="w-12 h-12 text-center text-lg border-gray-300 border-1 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              ))}
            </div>

            <button
              className="w-full bg-blue-400 text-white py-2 rounded-lg cursor-pointer hover:bg-blue-500 transition "
              onClick={handleVerifyOtp}
            >
              Verify OTP
            </button>

            {timer > 0 ? (
              <p className="text-sm text-gray-400 text-center mt-4">
                Resend OTP in {timer}s
              </p>
            ) : (
              <button
                onClick={handleResendOtp}
                className="block mx-auto mt-4 text-sm text-blue-600 hover:underline cursor-pointer"
              >
                Resend Code
              </button>
            )}
          </>
        )}

        {/* Footer */}
        <p className="text-xs text-center text-gray-400 mt-6">
          By continuing, you agree to our{" "}
          <span className="text-blue-500 cursor-pointer">Terms of Service</span>{" "}
          and{" "}
          <span className="text-blue-500 cursor-pointer">Privacy Policy</span>
        </p>
      </div>
    </div>
  );
}
