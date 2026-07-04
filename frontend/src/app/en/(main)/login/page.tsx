"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "login") {
        await auth.login(email, password);
      } else {
        await auth.register(username, email, password);
      }
      router.push("/en");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-white text-center mb-8">
          {mode === "login" ? "Welcome Back" : "Create Account"}
        </h1>

        {/* Tab toggle */}
        <div className="flex bg-[#1e1e3a] rounded-lg p-0.5 mb-6">
          <button
            onClick={() => { setMode("login"); setError(""); }}
            className={`flex-1 py-2 text-sm rounded-md transition-colors ${
              mode === "login" ? "bg-violet-600 text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => { setMode("register"); setError(""); }}
            className={`flex-1 py-2 text-sm rounded-md transition-colors ${
              mode === "register" ? "bg-violet-600 text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#12122a] border border-[#1e1e3a] rounded-xl p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-red-900/30 border border-red-800/30 text-sm text-red-400">
              {error}
            </div>
          )}

          {mode === "register" && (
            <div>
              <label className="block text-sm text-gray-400 mb-1">Username</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength={3}
                placeholder="Your username"
                className="w-full bg-[#1e1e3a] border border-[#2a2a4a] rounded-lg px-4 py-2.5 text-sm text-gray-200 outline-none focus:border-violet-600 transition-colors"
              />
            </div>
          )}

          <div>
            <label className="block text-sm text-gray-400 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
              className="w-full bg-[#1e1e3a] border border-[#2a2a4a] rounded-lg px-4 py-2.5 text-sm text-gray-200 outline-none focus:border-violet-600 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              placeholder="••••••••"
              className="w-full bg-[#1e1e3a] border border-[#2a2a4a] rounded-lg px-4 py-2.5 text-sm text-gray-200 outline-none focus:border-violet-600 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors"
          >
            {loading ? "Please wait..." : mode === "login" ? "Login" : "Create Account"}
          </button>
        </form>

        <p className="text-center text-xs text-gray-600 mt-4">
          {mode === "login"
            ? "Don't have an account? Switch to Register above."
            : "Already have an account? Switch to Login above."}
        </p>
      </div>
    </div>
  );
}
