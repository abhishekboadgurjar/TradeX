// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useProfileStore } from "../../../store/useProfileStore"; // your zustand store
// import Cookies from "js-cookie";

// export default function PinPage() {
//   const router = useRouter();
//   const { setLoginPin, verifyPin } = useProfileStore();

//   const [step, setStep] = useState<"set" | "login">("login");
//   const [pin, setPin] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   // ✅ Decide whether to show Set PIN or Login PIN
//   useEffect(() => {
//     const isPinSet = Cookies.get("is_pin_set"); // backend should set this flag on first login
//     if (isPinSet === "true") {
//       setStep("login");
//     } else {
//       setStep("set");
//     }
//   }, []);

//   // ✅ Handle Set PIN
//   const handleSetPin = async () => {
//     if (pin.length < 4) {
//       setMessage("PIN must be at least 4 digits.");
//       return;
//     }
//     try {
//       setLoading(true);
//       await setLoginPin(pin);
//       Cookies.set("is_pin_set", "true"); // save flag
//       setMessage("PIN set successfully. Please login.");
//       setStep("login");
//       setPin("");
//     } catch (err: any) {
//       setMessage(err.message || "Failed to set PIN");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Handle Verify PIN
//   const handleVerifyPin = async () => {
//     if (pin.length < 4) {
//       setMessage("Enter your valid PIN.");
//       return;
//     }
//     try {
//       setLoading(true);
//       await verifyPin(pin);
//       setMessage("Login successful!");
//       router.push("/dashboard");
//     } catch (err: any) {
//       setMessage(err.message || "Failed to verify PIN");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
//       <div className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-md">
//         <h1 className="text-2xl font-semibold text-center mb-6">
//           {step === "set" ? "Set Your PIN" : "Enter PIN"}
//         </h1>

//         <input
//           type="password"
//           maxLength={6}
//           value={pin}
//           onChange={(e) => setPin(e.target.value)}
//           className="w-full px-4 py-2 mb-4 border rounded-lg text-center text-lg tracking-widest"
//           placeholder="••••"
//         />

//         {step === "set" ? (
//           <button
//             onClick={handleSetPin}
//             disabled={loading}
//             className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
//           >
//             {loading ? "Setting..." : "Set PIN"}
//           </button>
//         ) : (
//           <button
//             onClick={handleVerifyPin}
//             disabled={loading}
//             className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
//           >
//             {loading ? "Verifying..." : "Login"}
//           </button>
//         )}

//         {message && (
//           <p className="mt-4 text-center text-sm text-red-500">{message}</p>
//         )}
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useProfileStore } from "../../../store/useProfileStore";
// import Cookies from "js-cookie";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import {
//   TrendingUp,
//   Lock,
//   Shield,
//   CheckCircle2,
//   KeyRound,
//   Fingerprint,
//   ArrowLeft,
//   AlertCircle,
// } from "lucide-react";

// export default function PinPage() {
//   const router = useRouter();
//   const { setLoginPin, verifyPin } = useProfileStore();

//   const [step, setStep] = useState<"set" | "login">("login");
//   const [pin, setPin] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [messageType, setMessageType] = useState<"error" | "success">("error");
//   const [shake, setShake] = useState(false);

//   useEffect(() => {
//     const isPinSet = Cookies.get("is_pin_set");
//     if (isPinSet === "true") {
//       setStep("login");
//     } else {
//       setStep("set");
//     }
//   }, []);

//   const handleSetPin = async () => {
//     if (pin.length < 4) {
//       setMessage("PIN must be at least 4 digits.");
//       setMessageType("error");
//       setShake(true);
//       setTimeout(() => setShake(false), 500);
//       return;
//     }
//     try {
//       setLoading(true);
//       await setLoginPin(pin);
//       Cookies.set("is_pin_set", "true");
//       setMessage("PIN set successfully. Please login.");
//       setMessageType("success");
//       setTimeout(() => {
//         setStep("login");
//         setPin("");
//         setMessage("");
//       }, 1500);
//     } catch (err: any) {
//       setMessage(err.message || "Failed to set PIN");
//       setMessageType("error");
//       setShake(true);
//       setTimeout(() => setShake(false), 500);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerifyPin = async () => {
//     if (pin.length < 4) {
//       setMessage("Enter your valid PIN.");
//       setMessageType("error");
//       setShake(true);
//       setTimeout(() => setShake(false), 500);
//       return;
//     }
//     try {
//       setLoading(true);
//       await verifyPin(pin);
//       setMessage("Login successful!");
//       setMessageType("success");
//       setTimeout(() => {
//         router.push("/dashboard");
//       }, 1000);
//     } catch (err: any) {
//       setMessage(err.message || "Failed to verify PIN");
//       setMessageType("error");
//       setShake(true);
//       setPin("");
//       setTimeout(() => setShake(false), 500);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePinInput = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value.replace(/\D/g, "");
//     setPin(value);
//     setMessage("");
//   };

//   const handleNumberClick = (num: string) => {
//     if (pin.length < 6) {
//       setPin(pin + num);
//       setMessage("");
//     }
//   };

//   const handleDelete = () => {
//     setPin(pin.slice(0, -1));
//     setMessage("");
//   };

//   const handleClear = () => {
//     setPin("");
//     setMessage("");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 relative overflow-hidden">
//       {/* Animated background elements */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
//         <div
//           className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
//           style={{ animationDelay: "1s" }}
//         ></div>
//         <div
//           className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
//           style={{ animationDelay: "2s" }}
//         ></div>
//       </div>

//       {/* Stock ticker animation */}
//       <div className="absolute top-0 left-0 right-0 bg-slate-950/80 backdrop-blur-sm border-b border-slate-800 py-2 overflow-hidden z-10">
//         <div className="flex gap-8 animate-marquee whitespace-nowrap text-xs text-slate-400">
//           <span className="text-emerald-400">AAPL +2.45%</span>
//           <span className="text-emerald-400">MSFT +1.82%</span>
//           <span className="text-red-400">GOOGL -0.67%</span>
//           <span className="text-emerald-400">TSLA +3.21%</span>
//           <span className="text-emerald-400">AMZN +1.56%</span>
//           <span className="text-red-400">META -0.34%</span>
//           <span className="text-emerald-400">NVDA +4.12%</span>
//           <span className="text-emerald-400">AAPL +2.45%</span>
//           <span className="text-emerald-400">MSFT +1.82%</span>
//           <span className="text-red-400">GOOGL -0.67%</span>
//         </div>
//       </div>

//       <div className="relative z-10 w-full max-w-md">
//         {/* Logo/Brand */}
//         <div className="text-center mb-8 animate-in fade-in slide-in-from-top duration-700">
//           <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 via-emerald-600 to-blue-600 rounded-3xl mb-4 shadow-2xl shadow-emerald-500/30 hover:scale-110 transition-transform duration-300">
//             <TrendingUp className="w-10 h-10 text-white" />
//           </div>
//           <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
//             TradeX
//           </h1>
//           <p className="text-slate-400 text-sm">
//             {step === "set"
//               ? "🔒 Secure your account with a PIN"
//               : "⚡ Quick access to your portfolio"}
//           </p>
//         </div>

//         <Card
//           className={`bg-slate-900/60 backdrop-blur-2xl border-slate-800 shadow-2xl shadow-emerald-500/5 hover:shadow-emerald-500/10 transition-all duration-300 ${
//             shake ? "animate-shake" : ""
//           }`}
//         >
//           <CardHeader className="space-y-1 pb-6">
//             <CardTitle className="text-2xl text-white flex items-center justify-between">
//               <span className="flex items-center gap-2">
//                 {step === "set" ? (
//                   <>
//                     <Shield className="w-6 h-6 text-emerald-400" />
//                     Set Your PIN
//                   </>
//                 ) : (
//                   <>
//                     <KeyRound className="w-6 h-6 text-emerald-400" />
//                     Enter PIN
//                   </>
//                 )}
//               </span>
//               {step === "login" && (
//                 <button
//                   onClick={() => router.back()}
//                   className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-800 rounded-lg"
//                 >
//                   <ArrowLeft className="w-5 h-5" />
//                 </button>
//               )}
//             </CardTitle>
//             <CardDescription className="text-slate-400 text-sm">
//               {step === "set"
//                 ? "Create a 4-6 digit PIN for quick and secure access"
//                 : "Enter your PIN to unlock your trading dashboard"}
//             </CardDescription>
//           </CardHeader>

//           <CardContent className="space-y-6">
//             <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
//               {/* PIN Display with animated dots */}
//               <div className="flex justify-center gap-3 mb-8">
//                 {[0, 1, 2, 3].map((i) => (
//                   <div
//                     key={i}
//                     className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center transition-all duration-300 ${
//                       i < pin.length
//                         ? "border-emerald-500 bg-gradient-to-br from-emerald-500/30 to-emerald-600/20 scale-110 shadow-lg shadow-emerald-500/30"
//                         : "border-slate-700 bg-slate-950/50 hover:border-slate-600"
//                     }`}
//                   >
//                     {i < pin.length && (
//                       <div className="w-4 h-4 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full animate-in zoom-in duration-200 shadow-lg shadow-emerald-500/50"></div>
//                     )}
//                   </div>
//                 ))}
//               </div>

//               {/* Hidden Input for keyboard */}
//               <input
//                 type="password"
//                 inputMode="numeric"
//                 maxLength={4}
//                 value={pin}
//                 onChange={handlePinInput}
//                 onKeyPress={(e) => {
//                   if (e.key === "Enter") {
//                     step === "set" ? handleSetPin() : handleVerifyPin();
//                   }
//                 }}
//                 className="sr-only"
//                 autoFocus
//                 id="pin-input"
//               />

//               {/* Number Pad */}
//               <div className="grid grid-cols-3 gap-3 mb-6">
//                 {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
//                   <button
//                     key={num}
//                     onClick={() => handleNumberClick(num.toString())}
//                     disabled={loading}
//                     className="h-16 bg-slate-800/50 hover:bg-slate-700/70 border border-slate-700 hover:border-emerald-500/50 rounded-xl text-white text-xl font-semibold transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-emerald-500/10"
//                   >
//                     {num}
//                   </button>
//                 ))}
//                 <button
//                   onClick={handleClear}
//                   disabled={loading || pin.length === 0}
//                   className="h-16 bg-slate-800/50 hover:bg-red-500/20 border border-slate-700 hover:border-red-500/50 rounded-xl text-slate-400 hover:text-red-400 text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
//                 >
//                   Clear
//                 </button>
//                 <button
//                   onClick={() => handleNumberClick("0")}
//                   disabled={loading}
//                   className="h-16 bg-slate-800/50 hover:bg-slate-700/70 border border-slate-700 hover:border-emerald-500/50 rounded-xl text-white text-xl font-semibold transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-emerald-500/10"
//                 >
//                   0
//                 </button>
//                 <button
//                   onClick={handleDelete}
//                   disabled={loading || pin.length === 0}
//                   className="h-16 bg-slate-800/50 hover:bg-slate-700/70 border border-slate-700 hover:border-slate-600 rounded-xl text-slate-400 hover:text-white text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
//                 >
//                   ← Delete
//                 </button>
//               </div>

//               <div className="text-center text-xs text-slate-500 flex items-center justify-center gap-2">
//                 <Fingerprint className="w-4 h-4" />
//                 {step === "set"
//                   ? "Choose a memorable 4-6 digit PIN"
//                   : "Your PIN is end-to-end encrypted"}
//               </div>

//               {/* Action Button */}
//               {step === "set" ? (
//                 <Button
//                   onClick={handleSetPin}
//                   disabled={loading || pin.length < 4}
//                   className="w-full h-14 bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-500 hover:from-emerald-600 hover:via-emerald-700 hover:to-emerald-600 text-white text-lg font-semibold shadow-xl shadow-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-[1.02] active:scale-95"
//                 >
//                   {loading ? (
//                     <span className="flex items-center gap-3">
//                       <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
//                       Setting PIN...
//                     </span>
//                   ) : (
//                     <span className="flex items-center gap-2">
//                       <Shield className="w-5 h-5" />
//                       Set Secure PIN
//                     </span>
//                   )}
//                 </Button>
//               ) : (
//                 <Button
//                   onClick={handleVerifyPin}
//                   disabled={loading || pin.length < 4}
//                   className="w-full h-14 bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-500 hover:from-emerald-600 hover:via-emerald-700 hover:to-emerald-600 text-white text-lg font-semibold shadow-xl shadow-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-[1.02] active:scale-95"
//                 >
//                   {loading ? (
//                     <span className="flex items-center gap-3">
//                       <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
//                       Verifying...
//                     </span>
//                   ) : (
//                     <span className="flex items-center gap-2">
//                       <Lock className="w-5 h-5" />
//                       Unlock Dashboard
//                     </span>
//                   )}
//                 </Button>
//               )}
//             </div>

//             {/* Message Alert */}
//             {message && (
//               <Alert
//                 className={`animate-in fade-in slide-in-from-top-2 ${
//                   messageType === "success"
//                     ? "bg-emerald-500/10 border-emerald-500/30 shadow-lg shadow-emerald-500/20"
//                     : "bg-red-500/10 border-red-500/30 shadow-lg shadow-red-500/20"
//                 }`}
//               >
//                 {messageType === "success" ? (
//                   <CheckCircle2 className="w-4 h-4 text-emerald-400" />
//                 ) : (
//                   <AlertCircle className="w-4 h-4 text-red-400" />
//                 )}
//                 <AlertDescription
//                   className={`${
//                     messageType === "success"
//                       ? "text-emerald-300"
//                       : "text-red-300"
//                   } font-medium`}
//                 >
//                   {message}
//                 </AlertDescription>
//               </Alert>
//             )}

//             {/* Security Features */}
//             <div className="pt-6 border-t border-slate-800/50">
//               <div className="grid grid-cols-3 gap-3">
//                 <div className="p-3 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl border border-slate-700/50 text-center hover:border-emerald-500/30 transition-all duration-300 hover:scale-105">
//                   <Shield className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
//                   <p className="text-xs text-slate-400 font-medium">AES-256</p>
//                 </div>
//                 <div className="p-3 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl border border-slate-700/50 text-center hover:border-blue-500/30 transition-all duration-300 hover:scale-105">
//                   <Lock className="w-6 h-6 text-blue-400 mx-auto mb-2" />
//                   <p className="text-xs text-slate-400 font-medium">
//                     Encrypted
//                   </p>
//                 </div>
//                 <div className="p-3 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl border border-slate-700/50 text-center hover:border-purple-500/30 transition-all duration-300 hover:scale-105">
//                   <Fingerprint className="w-6 h-6 text-purple-400 mx-auto mb-2" />
//                   <p className="text-xs text-slate-400 font-medium">
//                     Biometric
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Footer */}
//         <div
//           className="text-center mt-6 space-y-3 animate-in fade-in duration-1000"
//           style={{ animationDelay: "300ms" }}
//         >
//           {step === "login" && (
//             <p className="text-slate-500 text-sm">
//               Forgot your PIN?{" "}
//               <a
//                 href="/login"
//                 className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
//               >
//                 Sign in with password
//               </a>
//             </p>
//           )}
//           <p className="text-xs text-slate-600 flex items-center justify-center gap-2">
//             <Lock className="w-3 h-3" />
//             Protected by military-grade AES-256 encryption
//           </p>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes marquee {
//           0% {
//             transform: translateX(0);
//           }
//           100% {
//             transform: translateX(-50%);
//           }
//         }
//         .animate-marquee {
//           animation: marquee 20s linear infinite;
//           display: inline-block;
//         }
//         @keyframes shake {
//           0%,
//           100% {
//             transform: translateX(0);
//           }
//           10%,
//           30%,
//           50%,
//           70%,
//           90% {
//             transform: translateX(-8px);
//           }
//           20%,
//           40%,
//           60%,
//           80% {
//             transform: translateX(8px);
//           }
//         }
//         .animate-shake {
//           animation: shake 0.5s ease-in-out;
//         }
//       `}</style>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProfileStore } from "../../../store/useProfileStore";
import Cookies from "js-cookie";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  TrendingUp,
  Lock,
  Shield,
  CheckCircle2,
  KeyRound,
  Fingerprint,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";

export default function PinPage() {
  const router = useRouter();
  const { setLoginPin, verifyPin } = useProfileStore();

  const [step, setStep] = useState<"set" | "login">("login");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"error" | "success">("error");
  const [shake, setShake] = useState(false);

  useEffect(() => {
    const isPinSet = Cookies.get("is_pin_set");
    if (isPinSet === "true") {
      setStep("login");
    } else {
      setStep("set");
    }
  }, []);

  const handleSetPin = async () => {
    if (pin.length < 4) {
      setMessage("PIN must be at least 4 digits.");
      setMessageType("error");
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    try {
      setLoading(true);
      await setLoginPin(pin);
      Cookies.set("is_pin_set", "true");
      setMessage("PIN set successfully. Please login.");
      setMessageType("success");
      setTimeout(() => {
        setStep("login");
        setPin("");
        setMessage("");
      }, 1500);
    } catch (err: any) {
      setMessage(err.message || "Failed to set PIN");
      setMessageType("error");
      setShake(true);
      setTimeout(() => setShake(false), 500);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyPin = async () => {
    if (pin.length < 4) {
      setMessage("Enter your valid PIN.");
      setMessageType("error");
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    try {
      setLoading(true);
      await verifyPin(pin);
      setMessage("Login successful!");
      setMessageType("success");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (err: any) {
      setMessage(err.message || "Failed to verify PIN");
      setMessageType("error");
      setShake(true);
      setPin("");
      setTimeout(() => setShake(false), 500);
    } finally {
      setLoading(false);
    }
  };

  const handlePinInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setPin(value);
    setMessage("");
  };

  const handleNumberClick = (num: string) => {
    if (pin.length < 6) {
      setPin(pin + num);
      setMessage("");
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
    setMessage("");
  };

  const handleClear = () => {
    setPin("");
    setMessage("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Stock ticker animation */}
      <div className="absolute top-0 left-0 right-0 bg-slate-950/80 backdrop-blur-sm border-b border-slate-800 py-2 overflow-hidden z-10">
        <div className="flex gap-8 animate-marquee whitespace-nowrap text-xs text-slate-400">
          <span className="text-emerald-400">AAPL +2.45%</span>
          <span className="text-emerald-400">MSFT +1.82%</span>
          <span className="text-red-400">GOOGL -0.67%</span>
          <span className="text-emerald-400">TSLA +3.21%</span>
          <span className="text-emerald-400">AMZN +1.56%</span>
          <span className="text-red-400">META -0.34%</span>
          <span className="text-emerald-400">NVDA +4.12%</span>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8 animate-in fade-in slide-in-from-top duration-700">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 via-emerald-600 to-blue-600 rounded-3xl mb-4 shadow-2xl shadow-emerald-500/30 hover:scale-110 transition-transform duration-300">
            <TrendingUp className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            TradeX
          </h1>
          <p className="text-slate-400 text-sm">
            {step === "set"
              ? "🔒 Secure your account with a PIN"
              : "⚡ Quick access to your portfolio"}
          </p>
        </div>

        <Card
          className={`bg-slate-900/60 backdrop-blur-2xl border-slate-800 shadow-2xl shadow-emerald-500/5 hover:shadow-emerald-500/10 transition-all duration-300 ${
            shake ? "animate-shake" : ""
          }`}
        >
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl text-white flex items-center justify-between">
              <span className="flex items-center gap-2">
                {step === "set" ? (
                  <>
                    <Shield className="w-6 h-6 text-emerald-400" />
                    Set Your PIN
                  </>
                ) : (
                  <>
                    <KeyRound className="w-6 h-6 text-emerald-400" />
                    Enter PIN
                  </>
                )}
              </span>
              {step === "login" && (
                <button
                  onClick={() => router.back()}
                  className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-800 rounded-lg"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}
            </CardTitle>
            <CardDescription className="text-slate-400 text-sm">
              {step === "set"
                ? "Create a 4-6 digit PIN for quick and secure access"
                : "Enter your PIN to unlock your trading dashboard"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* PIN Display */}
              <div className="flex justify-center gap-3 mb-8">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center transition-all duration-300 ${
                      i < pin.length
                        ? "border-emerald-500 bg-gradient-to-br from-emerald-500/30 to-emerald-600/20 scale-110 shadow-lg shadow-emerald-500/30"
                        : "border-slate-700 bg-slate-950/50 hover:border-slate-600"
                    }`}
                  >
                    {i < pin.length && (
                      <div className="w-4 h-4 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full animate-in zoom-in duration-200 shadow-lg shadow-emerald-500/50"></div>
                    )}
                  </div>
                ))}
              </div>

              {/* Hidden Input */}
              <input
                type="password"
                inputMode="numeric"
                maxLength={4}
                value={pin}
                onChange={handlePinInput}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    step === "set" ? handleSetPin() : handleVerifyPin();
                  }
                }}
                className="sr-only"
                autoFocus
                id="pin-input"
              />

              {/* Number Pad */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleNumberClick(num.toString())}
                    disabled={loading}
                    className="h-16 bg-slate-800/50 hover:bg-slate-700/70 border border-slate-700 hover:border-emerald-500/50 rounded-xl text-white text-xl font-semibold transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-emerald-500/10"
                  >
                    {num}
                  </button>
                ))}
                <button
                  onClick={handleClear}
                  disabled={loading || pin.length === 0}
                  className="h-16 bg-slate-800/50 hover:bg-red-500/20 border border-slate-700 hover:border-red-500/50 rounded-xl text-slate-400 hover:text-red-400 text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Clear
                </button>
                <button
                  onClick={() => handleNumberClick("0")}
                  disabled={loading}
                  className="h-16 bg-slate-800/50 hover:bg-slate-700/70 border border-slate-700 hover:border-emerald-500/50 rounded-xl text-white text-xl font-semibold transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-emerald-500/10"
                >
                  0
                </button>
                <button
                  onClick={handleDelete}
                  disabled={loading || pin.length === 0}
                  className="h-16 bg-slate-800/50 hover:bg-slate-700/70 border border-slate-700 hover:border-slate-600 rounded-xl text-slate-400 hover:text-white text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  ← Delete
                </button>
              </div>

              <div className="text-center text-xs text-slate-500 flex items-center justify-center gap-2">
                <Fingerprint className="w-4 h-4" />
                {step === "set"
                  ? "Choose a memorable 4-6 digit PIN"
                  : "Your PIN is end-to-end encrypted"}
              </div>

              {/* Action Button */}
              {step === "set" ? (
                <Button
                  onClick={handleSetPin}
                  disabled={loading || pin.length < 4}
                  className="w-full h-14 bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-500 hover:from-emerald-600 hover:via-emerald-700 hover:to-emerald-600 text-white text-lg font-semibold shadow-xl shadow-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-[1.02] active:scale-95"
                >
                  {loading ? (
                    <span className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Setting PIN...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Set Secure PIN
                    </span>
                  )}
                </Button>
              ) : (
                <Button
                  onClick={handleVerifyPin}
                  disabled={loading || pin.length < 4}
                  className="w-full h-14 bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-500 hover:from-emerald-600 hover:via-emerald-700 hover:to-emerald-600 text-white text-lg font-semibold shadow-xl shadow-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-[1.02] active:scale-95"
                >
                  {loading ? (
                    <span className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Verifying...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Lock className="w-5 h-5" />
                      Unlock Dashboard
                    </span>
                  )}
                </Button>
              )}

              {/* Toggle between Set PIN / Enter PIN */}
              <div className="text-center mt-4">
                {step === "login" ? (
                  <p className="text-slate-500 text-sm">
                    Don’t have a PIN?{" "}
                    <button
                      onClick={() => {
                        setStep("set");
                        setPin("");
                        setMessage("");
                      }}
                      className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                    >
                      Set new PIN
                    </button>
                  </p>
                ) : (
                  <p className="text-slate-500 text-sm">
                    Already set a PIN?{" "}
                    <button
                      onClick={() => {
                        setStep("login");
                        setPin("");
                        setMessage("");
                      }}
                      className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                    >
                      Enter PIN
                    </button>
                  </p>
                )}
              </div>
            </div>

            {/* Message Alert */}
            {message && (
              <Alert
                className={`animate-in fade-in slide-in-from-top-2 ${
                  messageType === "success"
                    ? "bg-emerald-500/10 border-emerald-500/30 shadow-lg shadow-emerald-500/20"
                    : "bg-red-500/10 border-red-500/30 shadow-lg shadow-red-500/20"
                }`}
              >
                {messageType === "success" ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-400" />
                )}
                <AlertDescription
                  className={`${
                    messageType === "success"
                      ? "text-emerald-300"
                      : "text-red-300"
                  } font-medium`}
                >
                  {message}
                </AlertDescription>
              </Alert>
            )}

            {/* Security Features */}
            <div className="pt-6 border-t border-slate-800/50">
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl border border-slate-700/50 text-center hover:border-emerald-500/30 transition-all duration-300 hover:scale-105">
                  <Shield className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                  <p className="text-xs text-slate-400 font-medium">AES-256</p>
                </div>
                <div className="p-3 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl border border-slate-700/50 text-center hover:border-blue-500/30 transition-all duration-300 hover:scale-105">
                  <Lock className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                  <p className="text-xs text-slate-400 font-medium">
                    Encrypted
                  </p>
                </div>
                <div className="p-3 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl border border-slate-700/50 text-center hover:border-purple-500/30 transition-all duration-300 hover:scale-105">
                  <Fingerprint className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                  <p className="text-xs text-slate-400 font-medium">
                    Biometric
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div
          className="text-center mt-6 space-y-3 animate-in fade-in duration-1000"
          style={{ animationDelay: "300ms" }}
        >
          {step === "login" && (
            <p className="text-slate-500 text-sm">
              Forgot your PIN?{" "}
              <a
                href="/dashboard/login"
                className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
              >
                Sign in with password
              </a>
            </p>
          )}
          <p className="text-xs text-slate-600 flex items-center justify-center gap-2">
            <Lock className="w-3 h-3" />
            Protected by military-grade AES-256 encryption
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
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          10%,
          30%,
          50%,
          70%,
          90% {
            transform: translateX(-8px);
          }
          20%,
          40%,
          60%,
          80% {
            transform: translateX(8px);
          }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}
