// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useAuthStore } from "../../../store/useAuthStore";

// export default function LoginPage() {
//   const { login } = useAuthStore();
//   const router = useRouter();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleLogin = async () => {
//     setError("");
//     if (!email || !password) return setError("All fields are required");

//     setLoading(true);
//     try {
//       await login(email, password);
//       // redirect after login
//       router.push("/");
//     } catch (err: any) {
//       setError(err.message || "Invalid email or password");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
//         <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

//         <input
//           type="email"
//           placeholder="Enter your email"
//           className="w-full p-3 border rounded mb-3"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="Enter your password"
//           className="w-full p-3 border rounded mb-3"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button
//           onClick={handleLogin}
//           className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600"
//           disabled={loading}
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>

//         {error && <p className="text-red-500 mt-3">{error}</p>}
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
  ArrowRight,
  BarChart3,
  Activity,
} from "lucide-react";

export default function LoginPage() {
  const { login } = useAuthStore();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    if (!email || !password) return setError("All fields are required");

    setLoading(true);
    try {
      await login(email, password);
      router.push("/auth/verifypin");
    } catch (err: any) {
      setError(err.message || "Invalid email or password");
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
          <p className="text-slate-400 text-sm">Welcome back, trader</p>
        </div>

        <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-800 shadow-2xl">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl text-white flex items-center gap-2">
              Sign In
              <Activity className="w-5 h-5 text-emerald-400" />
            </CardTitle>
            <CardDescription className="text-slate-400">
              Enter your credentials to access your portfolio
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Email Input */}
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
                    onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-slate-300">
                    Password
                  </label>
                  <a
                    href="/forgot-password"
                    className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    className="pl-10 bg-slate-950/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:ring-emerald-500/20"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                  />
                </div>
              </div>

              {/* Login Button */}
              <Button
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg shadow-emerald-500/20 mt-2"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Sign In <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </div>

            {/* Error message */}
            {error && (
              <Alert className="bg-red-500/10 border-red-500/20 animate-in fade-in slide-in-from-top-2">
                <AlertDescription className="text-red-300 text-sm">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-800"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-slate-900 px-2 text-slate-500">
                  Quick Stats
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-950/50 border border-slate-800 rounded-lg p-3 text-center">
                <BarChart3 className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                <p className="text-xs text-slate-400">Market Cap</p>
                <p className="text-sm font-semibold text-white">$2.4T</p>
              </div>
              <div className="bg-slate-950/50 border border-slate-800 rounded-lg p-3 text-center">
                <Activity className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                <p className="text-xs text-slate-400">Active Traders</p>
                <p className="text-sm font-semibold text-white">125K+</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-slate-500 text-sm mt-6">
          Don't have an account?{" "}
          <a
            href="/auth/register"
            className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
          >
            Create Account
          </a>
        </p>

        {/* Security Badge */}
        <div className="text-center mt-6">
          <p className="text-xs text-slate-600 flex items-center justify-center gap-2">
            <Lock className="w-3 h-3" />
            Secured with 256-bit SSL encryption
          </p>
        </div>
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
