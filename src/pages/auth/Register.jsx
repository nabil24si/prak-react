import { useState } from "react";
import { BsFillExclamationDiamondFill, BsCheckCircleFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function Register() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [dataForm, setDataForm] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        fullName: "",
    });

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setDataForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        // Validasi password match
        if (dataForm.password !== dataForm.confirmPassword) {
            setError("Password dan konfirmasi password tidak cocok.");
            setLoading(false);
            return;
        }

        // Validasi minimal 6 karakter (default Supabase)
        if (dataForm.password.length < 6) {
            setError("Password minimal 6 karakter.");
            setLoading(false);
            return;
        }

        try {
            const { data, error: signUpError } = await supabase.auth.signUp({
                email: dataForm.email,
                password: dataForm.password,
                options: {
                    data: {
                        full_name: dataForm.fullName,
                        role: "member",
                    },
                },
            });

            if (signUpError) {
                setError(signUpError.message || "Registrasi gagal.");
                return;
            }

            if (data?.user) {
                setSuccess("Registrasi berhasil! Silakan cek email untuk verifikasi, lalu login.");
                // Kosongkan form
                setDataForm({ email: "", password: "", confirmPassword: "", fullName: "" });

                // Redirect ke login setelah 3 detik
                setTimeout(() => {
                    navigate("/login");
                }, 3000);
            }
        } catch (err) {
            setError(err.message || "Terjadi kesalahan saat registrasi.");
        } finally {
            setLoading(false);
        }
    };

    const errorInfo = error ? (
        <div className="bg-red-200 mb-5 p-5 text-sm font-light text-gray-600 rounded flex items-center">
            <BsFillExclamationDiamondFill className="text-red-600 me-2 text-lg" />
            {error}
        </div>
    ) : null;

    const successInfo = success ? (
        <div className="bg-green-200 mb-5 p-5 text-sm font-light text-gray-600 rounded flex items-center">
            <BsCheckCircleFill className="text-green-600 me-2 text-lg" />
            {success}
        </div>
    ) : null;

    const loadingInfo = loading ? (
        <div className="bg-gray-200 mb-5 p-5 text-sm rounded flex items-center">
            <ImSpinner2 className="me-2 animate-spin" />
            Mohon Tunggu...
        </div>
    ) : null;

    return (
        <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
                Create Your Account ✨
            </h2>
            {errorInfo}
            {successInfo}
            {loadingInfo}

            <form onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                        Nama Lengkap
                    </label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={dataForm.fullName}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400"
                        placeholder="Nama Lengkap"
                        onChange={handleChange}
                        required
                        disabled={loading}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={dataForm.email}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400"
                        placeholder="you@example.com"
                        onChange={handleChange}
                        required
                        disabled={loading}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={dataForm.password}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400"
                        placeholder="Min. 6 karakter"
                        onChange={handleChange}
                        required
                        disabled={loading}
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={dataForm.confirmPassword}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400"
                        placeholder="********"
                        onChange={handleChange}
                        required
                        disabled={loading}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Memproses..." : "Register"}
                </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-4">
                Sudah punya akun?{" "}
                <Link to="/login" className="text-green-600 hover:underline font-semibold">
                    Login di sini
                </Link>
            </p>
        </div>
    );
}