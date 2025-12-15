import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAdminAuthenticated, loginAsAdmin } from "@/lib/adminAuth";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAdminAuthenticated()) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      const ok = loginAsAdmin(password);
      if (!ok) {
        setErrorMsg("Parolă incorectă");
        return;
      }
      navigate("/admin/dashboard", { replace: true });
    } catch (err: any) {
      setErrorMsg(err?.message || "Eroare la autentificare");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white border rounded-lg shadow-md p-6 w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Admin – Login</h1>

        {errorMsg && (
          <p className="text-red-600 text-sm mb-3 text-center">{errorMsg}</p>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Parolă admin</label>
          <input
            type="password"
            className="w-full border rounded px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Se autentifică..." : "Intră în panou"}
        </button>
      </form>
    </main>
  );
}

