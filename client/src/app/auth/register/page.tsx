// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useAuthStore } from "../../../store/useAuthStore";

// export default function RegisterPage() {
//   const { checkEmail, sendOtp, verifyOtp, register } = useAuthStore();
//   const router = useRouter();

//   const [step, setStep] = useState<"email" | "otp" | "password" | "done">(
//     "email"
//   );
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Step 1: Check email and send OTP
//   const handleCheckEmail = async () => {
//     setError("");
//     if (!email) return setError("Email is required");

//     setLoading(true);
//     try {
//       const exists = await checkEmail(email);
//       if (exists) {
//         setError("Email already registered");
//       } else {
//         await sendOtp(email, "email"); // backend expects "email" | "phone"
//         setStep("otp");
//       }
//     } catch (err: any) {
//       setError(err.message || "Failed to send OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Step 2: Verify OTP
//   const handleVerifyOtp = async () => {
//     setError("");
//     if (!otp) return setError("OTP is required");

//     setLoading(true);
//     try {
//       await verifyOtp(email, otp, "email");
//       setStep("password");
//     } catch (err: any) {
//       setError(err.message || "OTP verification failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Step 3: Register with password
//   const handleRegister = async () => {
//     setError("");
//     if (!password) return setError("Password is required");

//     setLoading(true);
//     try {
//       await register(email, password);
//       setStep("done");
//       setTimeout(() => router.push("/"), 1500);
//     } catch (err: any) {
//       setError(err.message || "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="bg-white p-8 rounded-lg shadow w-full max-w-md">
//         <h1 className="text-2xl font-semibold mb-6 text-center">Register</h1>

//         {step === "email" && (
//           <div>
//             <input
//               type="email"
//               placeholder="Enter email"
//               className="w-full p-3 border rounded mb-3"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <button
//               onClick={handleCheckEmail}
//               className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
//               disabled={loading}
//             >
//               {loading ? "Checking..." : "Send OTP"}
//             </button>
//           </div>
//         )}

//         {step === "otp" && (
//           <div>
//             <p className="mb-3">
//               OTP sent to <strong>{email}</strong>
//             </p>
//             <input
//               type="text"
//               placeholder="Enter OTP"
//               className="w-full p-3 border rounded mb-3"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//             />
//             <button
//               onClick={handleVerifyOtp}
//               className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700"
//               disabled={loading}
//             >
//               {loading ? "Verifying..." : "Verify OTP"}
//             </button>
//           </div>
//         )}

//         {step === "password" && (
//           <div>
//             <input
//               type="password"
//               placeholder="Create password"
//               className="w-full p-3 border rounded mb-3"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <button
//               onClick={handleRegister}
//               className="w-full bg-purple-600 text-white p-3 rounded hover:bg-purple-700"
//               disabled={loading}
//             >
//               {loading ? "Registering..." : "Register"}
//             </button>
//           </div>
//         )}

//         {step === "done" && (
//           <div className="text-center">
//             <h2 className="text-green-600 font-semibold text-xl mb-3">
//               Registration Successful
//             </h2>
//             <p>Redirecting to dashboard...</p>
//           </div>
//         )}

//         {error && <p className="text-red-600 mt-3">{error}</p>}
//       </div>
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../../store/useAuthStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  TrendingUp,
  Mail,
  Lock,
  CheckCircle2,
  ArrowRight,
  Shield,
} from "lucide-react";

export default function RegisterPage() {
  const { checkEmail, sendOtp, verifyOtp, register } = useAuthStore();
  const router = useRouter();

  const [step, setStep] = useState<"email" | "otp" | "password" | "done">(
    "email"
  );
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckEmail = async () => {
    setError("");
    if (!email) return setError("Email is required");

    setLoading(true);
    try {
      const exists = await checkEmail(email);
      if (exists) {
        setError("Email already registered");
      } else {
        await sendOtp(email, "email");
        setStep("otp");
      }
    } catch (err: any) {
      setError(err.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setError("");
    if (!otp) return setError("OTP is required");

    setLoading(true);
    try {
      await verifyOtp(email, otp, "email");
      setStep("password");
    } catch (err: any) {
      setError(err.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    setError("");
    if (!password) return setError("Password is required");

    setLoading(true);
    try {
      await register(email, password);
      setStep("done");
      router.push("/auth/setpin");
      // setTimeout(() => router.push("/"), 1500);
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* Stock ticker animation */}
      <div className="absolute top-0 left-0 right-0 bg-slate-950/80 backdrop-blur-sm border-b border-slate-800 py-2 overflow-hidden">
        <div className="flex gap-8 animate-marquee whitespace-nowrap text-xs text-slate-400">
          <span className="text-emerald-400">AAPL +2.45%</span>
          <span className="text-emerald-400">MSFT +1.82%</span>
          <span className="text-red-400">GOOGL -0.67%</span>
          <span className="text-emerald-400">TSLA +3.21%</span>
          <span className="text-emerald-400">AMZN +1.56%</span>
          <span className="text-red-400">META -0.34%</span>
          <span className="text-emerald-400">NVDA +4.12%</span>
          <span className="text-emerald-400">AAPL +2.45%</span>
          <span className="text-emerald-400">MSFT +1.82%</span>
          <span className="text-red-400">GOOGL -0.67%</span>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl mb-4 shadow-lg shadow-emerald-500/20">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">TradeX</h1>
          <p className="text-slate-400 text-sm">
            Join thousands of traders worldwide
          </p>
        </div>

        <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-800 shadow-2xl">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl text-white flex items-center gap-2">
              Create Account
              {step === "done" && (
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              )}
            </CardTitle>
            <CardDescription className="text-slate-400">
              {step === "email" && "Enter your email to get started"}
              {step === "otp" && "Verify your email address"}
              {step === "password" && "Secure your account"}
              {step === "done" && "Welcome to TradeX"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Progress indicators */}
            <div className="flex items-center justify-between mb-6">
              {["email", "otp", "password"].map((s, i) => (
                <div key={s} className="flex items-center flex-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                      step === s
                        ? "bg-emerald-500 text-white scale-110"
                        : ["otp", "password", "done"].includes(step) &&
                          i < ["email", "otp", "password"].indexOf(step)
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-slate-800 text-slate-500"
                    }`}
                  >
                    {["otp", "password", "done"].includes(step) &&
                    i < ["email", "otp", "password"].indexOf(step)
                      ? "✓"
                      : i + 1}
                  </div>
                  {i < 2 && (
                    <div
                      className={`h-0.5 flex-1 mx-2 transition-all ${
                        ["otp", "password", "done"].includes(step) &&
                        i < ["email", "otp", "password"].indexOf(step)
                          ? "bg-emerald-500"
                          : "bg-slate-800"
                      }`}
                    ></div>
                  )}
                </div>
              ))}
            </div>

            {/* Step: Email */}
            {step === "email" && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      className="pl-10 bg-slate-950/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:ring-emerald-500/20"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleCheckEmail()
                      }
                    />
                  </div>
                </div>
                <Button
                  onClick={handleCheckEmail}
                  className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg shadow-emerald-500/20"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Checking...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Continue <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </Button>
              </div>
            )}

            {/* Step: OTP */}
            {step === "otp" && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Alert className="bg-emerald-500/10 border-emerald-500/20">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <AlertDescription className="text-emerald-300 text-sm">
                    Verification code sent to <strong>{email}</strong>
                  </AlertDescription>
                </Alert>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">
                    Verification Code
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter 6-digit code"
                    className="bg-slate-950/50 border-slate-700 text-white text-center text-2xl tracking-widest placeholder:text-slate-500 focus:border-emerald-500 focus:ring-emerald-500/20"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleVerifyOtp()}
                    maxLength={6}
                  />
                </div>
                <Button
                  onClick={handleVerifyOtp}
                  className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg shadow-emerald-500/20"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Verifying...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Verify Code <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </Button>
              </div>
            )}

            {/* Step: Password */}
            {step === "password" && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">
                    Create Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                    <Input
                      type="password"
                      placeholder="Minimum 8 characters"
                      className="pl-10 bg-slate-950/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:ring-emerald-500/20"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleRegister()}
                    />
                  </div>
                  <p className="text-xs text-slate-500">
                    Use 8+ characters with a mix of letters and numbers
                  </p>
                </div>
                <Button
                  onClick={handleRegister}
                  className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg shadow-emerald-500/20"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Creating Account...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Complete Registration <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </Button>
              </div>
            )}

            {/* Step: Done */}
            {step === "done" && (
              <div className="text-center py-8 space-y-4 animate-in fade-in zoom-in duration-500">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-500/20 rounded-full mb-4">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Welcome Aboard!
                </h3>
                <p className="text-slate-400">
                  Your account has been created successfully
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  Redirecting to dashboard...
                </div>
              </div>
            )}

            {/* Error message */}
            {error && (
              <Alert className="bg-red-500/10 border-red-500/20 animate-in fade-in slide-in-from-top-2">
                <AlertDescription className="text-red-300 text-sm">
                  {error}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-slate-500 text-sm mt-6">
          Already have an account?{" "}
          <a
            href="/auth/login"
            className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
          >
            Sign In
          </a>
        </p>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
          display: inline-block;
        }
      `}</style>
    </div>
  );
}
