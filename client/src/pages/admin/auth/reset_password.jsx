import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import API_URL from "../../../services/authApi";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `${API_URL}/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to reset password.");
      }

      setSuccess("Password reset successfully. You can now log in.");
      setPassword("");
      setConfirmPassword("");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full bg-slate-100 flex items-center justify-center px-4 py-8">
      <section className="w-full max-w-[520px] rounded-2xl bg-white px-6 py-10 shadow-[0_15px_45px_rgba(15,35,65,0.12)] sm:px-10">
        <h1 className="text-center text-3xl font-bold text-[#10284b]">Reset Password</h1>
        <p className="mt-2 text-center text-sm text-[#71809a]">Choose a new password for your account.</p>
        <form className="mt-8" onSubmit={handleSubmit}>
          <label className="mb-2 block text-sm font-semibold text-[#142945]" htmlFor="password">New Password</label>
          <input className="mb-5 h-[52px] w-full rounded-lg border border-[#d8dfe8] px-4 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100" id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="new-password" required />
          <label className="mb-2 block text-sm font-semibold text-[#142945]" htmlFor="confirm-password">Confirm Password</label>
          <input className="h-[52px] w-full rounded-lg border border-[#d8dfe8] px-4 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100" id="confirm-password" type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} autoComplete="new-password" required />
          {error && <p className="mt-5 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}
          {success && <p className="mt-5 rounded-lg border border-green-100 bg-green-50 px-4 py-3 text-sm text-green-600">{success}</p>}
          <button className="mt-6 h-[52px] w-full rounded-lg bg-blue-600 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60" disabled={loading} type="submit">{loading ? "Resetting..." : "Reset Password"}</button>
        </form>
        <p className="mt-6 text-center text-sm"><Link className="font-semibold text-blue-600 hover:underline" to="/admin/login">Back to Login</Link></p>
      </section>
    </main>
  );
};

export default ResetPassword;
