// "use client";

// import { useEffect, useState } from "react";
// import { useProfileStore } from "../../../store/useProfileStore";
// import { useAuthStore } from "../../../store/useAuthStore";

// export default function ProfilePage() {
//   const { profile, fetchProfile, updateProfile, setLoginPin, verifyPin, loading } =
//     useProfileStore();
//   const { logout } = useAuthStore();

//   const [editMode, setEditMode] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     gender: "",
//     date_of_birth: "",
//   });
//   const [pin, setPin] = useState("");
//   const [message, setMessage] = useState("");

//   // ✅ Load profile on mount
//   useEffect(() => {
//     fetchProfile();
//   }, [fetchProfile]);

//   // ✅ Fill form with profile data
//   useEffect(() => {
//     if (profile) {
//       setFormData({
//         name: profile.name || "",
//         gender: (profile as any).gender || "",
//         date_of_birth: (profile as any).date_of_birth || "",
//       });
//     }
//   }, [profile]);

//   if (loading) return <p className="text-center p-6">Loading profile...</p>;
//   if (!profile) return <p className="text-center p-6">No profile found</p>;

//   // ✅ Handle profile update
//   const handleUpdateProfile = async () => {
//     try {
//       await updateProfile(formData);
//       setMessage("Profile updated successfully!");
//       setEditMode(false);
//     } catch (err: any) {
//       setMessage(err.message);
//     }
//   };

//   // ✅ Handle setting/changing PIN
//   const handlePinAction = async () => {
//     try {
//       if (!pin || pin.length < 4) {
//         setMessage("PIN must be at least 4 digits.");
//         return;
//       }

//       if (!profile.login_pin_exist) {
//         await setLoginPin(pin);
//         setMessage("PIN set successfully!");
//       } else {
//         await verifyPin(pin); // You can create a changePin API in backend for real update
//         setMessage("PIN verified successfully!");
//       }

//       setPin("");
//       fetchProfile();
//     } catch (err: any) {
//       setMessage(err.message);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto mt-10 bg-white shadow-xl rounded-2xl p-6 space-y-6">
//       <h1 className="text-3xl font-semibold mb-6 text-center">Profile Dashboard</h1>

//       {/* Profile Info */}
//       <div className="space-y-3">
//         <p>
//           <span className="font-medium">Email:</span> {profile.email}
//         </p>
//         <p>
//           <span className="font-medium">Name:</span> {profile.name || "Not set"}
//         </p>
//         <p>
//           <span className="font-medium">Balance:</span> ₹{profile.balance}
//         </p>
//         <p>
//           <span className="font-medium">Phone Linked:</span>{" "}
//           {profile.phone_exists ? "Yes" : "No"}
//         </p>
//         <p>
//           <span className="font-medium">Login PIN:</span>{" "}
//           {profile.login_pin_exist ? "Set" : "Not Set"}
//         </p>
//       </div>

//       {/* Update Profile */}
//       <div className="border-t pt-4">
//         <h2 className="text-xl font-semibold mb-3">Update Profile</h2>
//         {editMode ? (
//           <div className="space-y-3">
//             <input
//               type="text"
//               value={formData.name}
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//               placeholder="Full Name"
//               className="w-full border px-3 py-2 rounded-lg"
//             />
//             <select
//               value={formData.gender}
//               onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
//               className="w-full border px-3 py-2 rounded-lg"
//             >
//               <option value="">Select Gender</option>
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//             </select>
//             <input
//               type="date"
//               value={formData.date_of_birth}
//               onChange={(e) =>
//                 setFormData({ ...formData, date_of_birth: e.target.value })
//               }
//               className="w-full border px-3 py-2 rounded-lg"
//             />

//             <div className="flex space-x-3">
//               <button
//                 onClick={handleUpdateProfile}
//                 className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//               >
//                 Save
//               </button>
//               <button
//                 onClick={() => setEditMode(false)}
//                 className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         ) : (
//           <button
//             onClick={() => setEditMode(true)}
//             className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//           >
//             Edit Profile
//           </button>
//         )}
//       </div>

//       {/* Set/Change PIN */}
//       <div className="border-t pt-4">
//         <h2 className="text-xl font-semibold mb-3">
//           {profile.login_pin_exist ? "Verify / Change PIN" : "Set Login PIN"}
//         </h2>
//         <div className="flex space-x-3">
//           <input
//             type="password"
//             value={pin}
//             onChange={(e) => setPin(e.target.value)}
//             placeholder="Enter 4-6 digit PIN"
//             className="flex-1 border px-3 py-2 rounded-lg"
//             maxLength={6}
//           />
//           <button
//             onClick={handlePinAction}
//             className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
//           >
//             {profile.login_pin_exist ? "Verify PIN" : "Set PIN"}
//           </button>
//         </div>
//       </div>

//       {/* Logout */}
//       <div className="border-t pt-4 text-center">
//         <button
//           onClick={logout}
//           className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
//         >
//           Logout
//         </button>
//       </div>

//       {message && <p className="text-center text-sm text-red-500">{message}</p>}
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useProfileStore } from "../../../store/useProfileStore";
import { useAuthStore } from "../../../store/useAuthStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  TrendingUp,
  User,
  Mail,
  Wallet,
  Phone,
  Lock,
  Edit3,
  Save,
  X,
  LogOut,
  Shield,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Users,
  ChevronRight,
  Settings,
  CreditCard,
  Activity,
} from "lucide-react";

export default function ProfilePage() {
  const {
    profile,
    fetchProfile,
    updateProfile,
    setLoginPin,
    verifyPin,
    loading,
  } = useProfileStore();
  const { logout } = useAuthStore();

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    date_of_birth: "",
  });
  const [pin, setPin] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"error" | "success">("error");

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        gender: (profile as any).gender || "",
        date_of_birth: (profile as any).date_of_birth || "",
      });
    }
  }, [profile]);
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await logout(); // wait for complete cleanup
      router.push("/"); // redirect after cleanup
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loading your portfolio...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
        <Alert className="bg-red-500/10 border-red-500/20 max-w-md">
          <AlertCircle className="w-5 h-5 text-red-400" />
          <AlertDescription className="text-red-300">
            No profile found
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const handleUpdateProfile = async () => {
    try {
      await updateProfile(formData);
      setMessage("Profile updated successfully!");
      setMessageType("success");
      setEditMode(false);
      setTimeout(() => setMessage(""), 3000);
    } catch (err: any) {
      setMessage(err.message);
      setMessageType("error");
    }
  };

  const handlePinAction = async () => {
    try {
      if (!pin || pin.length < 4) {
        setMessage("PIN must be at least 4 digits.");
        setMessageType("error");
        return;
      }

      if (!profile.login_pin_exist) {
        await setLoginPin(pin);
        setMessage("PIN set successfully!");
        setMessageType("success");
      } else {
        await verifyPin(pin);
        setMessage("PIN verified successfully!");
        setMessageType("success");
      }

      setPin("");
      fetchProfile();
      setTimeout(() => setMessage(""), 3000);
    } catch (err: any) {
      setMessage(err.message);
      setMessageType("error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Stock ticker */}
      <div className="sticky top-0 left-0 right-0 bg-slate-950/80 backdrop-blur-sm border-b border-slate-800 py-2 overflow-hidden z-50">
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

      <div className="relative z-10 max-w-6xl mx-auto p-4 md:p-8 py-8">
        {/* Header */}
        <div className="mb-8 animate-in fade-in slide-in-from-top duration-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                Profile Dashboard
              </h1>
              <p className="text-slate-400">
                Manage your account and trading preferences
              </p>
            </div>
            <Button
              onClick={handleLogout}
              className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 hover:border-red-500/40"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 animate-in fade-in slide-in-from-bottom duration-700">
          <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400 mb-1">
                    Portfolio Balance
                  </p>
                  <p className="text-3xl font-bold text-white">
                    ₹{profile.balance.toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-emerald-400" />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2 text-xs text-emerald-400">
                <Activity className="w-3 h-3" />
                <span>Active trading account</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400 mb-1">Account Status</p>
                  <p className="text-xl font-bold text-white">Verified</p>
                </div>
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-blue-400" />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2 text-xs text-blue-400">
                <Shield className="w-3 h-3" />
                <span>Full access enabled</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400 mb-1">Security Level</p>
                  <p className="text-xl font-bold text-white">
                    {profile.login_pin_exist ? "High" : "Medium"}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <Lock className="w-6 h-6 text-purple-400" />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2 text-xs text-purple-400">
                <Settings className="w-3 h-3" />
                <span>
                  {profile.login_pin_exist ? "PIN enabled" : "Setup PIN"}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile Information */}
          <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-800 shadow-2xl animate-in fade-in slide-in-from-left duration-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <User className="w-5 h-5 text-emerald-400" />
                  Personal Information
                </span>
                {!editMode && (
                  <Button
                    onClick={() => setEditMode(true)}
                    className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 hover:border-emerald-500/40"
                    size="sm"
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                )}
              </CardTitle>
              <CardDescription className="text-slate-400">
                Your account details and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {editMode ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Full Name
                    </label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Enter your full name"
                      className="bg-slate-950/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:ring-emerald-500/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Gender
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) =>
                        setFormData({ ...formData, gender: e.target.value })
                      }
                      className="w-full bg-slate-950/50 border border-slate-700 text-white rounded-lg px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Date of Birth
                    </label>
                    <Input
                      type="date"
                      value={formData.date_of_birth}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          date_of_birth: e.target.value,
                        })
                      }
                      className="bg-slate-950/50 border-slate-700 text-white focus:border-emerald-500 focus:ring-emerald-500/20"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button
                      onClick={handleUpdateProfile}
                      className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button
                      onClick={() => setEditMode(false)}
                      className="bg-slate-800 hover:bg-slate-700 text-white"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-950/30 rounded-xl border border-slate-800">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-slate-500" />
                      <div>
                        <p className="text-xs text-slate-500">Email Address</p>
                        <p className="text-white font-medium">
                          {profile.email}
                        </p>
                      </div>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-950/30 rounded-xl border border-slate-800">
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-slate-500" />
                      <div>
                        <p className="text-xs text-slate-500">Full Name</p>
                        <p className="text-white font-medium">
                          {profile.name || "Not set"}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-600" />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-950/30 rounded-xl border border-slate-800">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-slate-500" />
                      <div>
                        <p className="text-xs text-slate-500">Phone Number</p>
                        <p className="text-white font-medium">
                          {profile.phone_exists ? "Linked" : "Not linked"}
                        </p>
                      </div>
                    </div>
                    {profile.phone_exists ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-yellow-400" />
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-800 shadow-2xl animate-in fade-in slide-in-from-right duration-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="w-5 h-5 text-emerald-400" />
                Security Settings
              </CardTitle>
              <CardDescription className="text-slate-400">
                Manage your account security and PIN
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* PIN Status */}
              <div className="p-4 bg-slate-950/30 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        profile.login_pin_exist
                          ? "bg-emerald-500/20"
                          : "bg-yellow-500/20"
                      }`}
                    >
                      <Lock
                        className={`w-5 h-5 ${
                          profile.login_pin_exist
                            ? "text-emerald-400"
                            : "text-yellow-400"
                        }`}
                      />
                    </div>
                    <div>
                      <p className="text-white font-medium">Login PIN</p>
                      <p className="text-xs text-slate-500">
                        {profile.login_pin_exist
                          ? "PIN is active"
                          : "PIN not set"}
                      </p>
                    </div>
                  </div>
                  {profile.login_pin_exist ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-yellow-400" />
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex gap-3">
                    <Input
                      type="password"
                      inputMode="numeric"
                      value={pin}
                      onChange={(e) =>
                        setPin(e.target.value.replace(/\D/g, ""))
                      }
                      placeholder="Enter 4-6 digit PIN"
                      className="flex-1 bg-slate-950/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:ring-emerald-500/20"
                      maxLength={6}
                    />
                    <Button
                      onClick={handlePinAction}
                      className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white"
                    >
                      {profile.login_pin_exist ? "Verify" : "Set PIN"}
                    </Button>
                  </div>
                  <p className="text-xs text-slate-500">
                    {profile.login_pin_exist
                      ? "Enter your PIN to verify or change it"
                      : "Create a 4-6 digit PIN for quick login"}
                  </p>
                </div>
              </div>

              {/* Security Features */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-slate-300">
                  Security Features
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-slate-950/30 rounded-lg border border-slate-800">
                    <div className="flex items-center gap-3">
                      <Shield className="w-4 h-4 text-emerald-400" />
                      <span className="text-sm text-slate-300">
                        Two-Factor Auth
                      </span>
                    </div>
                    <span className="text-xs text-emerald-400 font-medium">
                      Active
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-950/30 rounded-lg border border-slate-800">
                    <div className="flex items-center gap-3">
                      <Lock className="w-4 h-4 text-blue-400" />
                      <span className="text-sm text-slate-300">Password</span>
                    </div>
                    <span className="text-xs text-blue-400 font-medium">
                      Strong
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-950/30 rounded-lg border border-slate-800">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-4 h-4 text-purple-400" />
                      <span className="text-sm text-slate-300">
                        Payment Methods
                      </span>
                    </div>
                    <span className="text-xs text-purple-400 font-medium">
                      Verified
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Message Alert */}
        {message && (
          <div className="mt-6 animate-in fade-in slide-in-from-bottom duration-500">
            <Alert
              className={`${
                messageType === "success"
                  ? "bg-emerald-500/10 border-emerald-500/30"
                  : "bg-red-500/10 border-red-500/30"
              }`}
            >
              {messageType === "success" ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-400" />
              )}
              <AlertDescription
                className={
                  messageType === "success"
                    ? "text-emerald-300"
                    : "text-red-300"
                }
              >
                {message}
              </AlertDescription>
            </Alert>
          </div>
        )}
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
