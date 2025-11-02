import { Head, Link, useForm } from "@inertiajs/react";
import AuthLayout from "@/Layouts/AuthLayout";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("login"));
    };

    return (
        <AuthLayout>
            <Head title="Login" />

            <h2 className="text-white text-2xl font-bold mb-6 text-center">
                Login
            </h2>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600 text-center">
                    {status}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Campo Email */}
                <div>
                    <label
                        htmlFor="email"
                        className="block text-white text-sm font-medium mb-2"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        placeholder="seu@email.com"
                        required
                        className="w-full px-4 py-3 rounded-lg bg-[#111a22] border-none text-white placeholder:text-[#92adc9] focus:outline-none focus:ring-2 focus:ring-[#1172d4]"
                    />
                    {errors.email && (
                        <p className="mt-2 text-sm text-red-400">
                            {errors.email}
                        </p>
                    )}
                </div>

                {/* Campo Senha */}
                <div>
                    <label
                        htmlFor="password"
                        className="block text-white text-sm font-medium mb-2"
                    >
                        Senha
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        placeholder="••••••••"
                        required
                        className="w-full px-4 py-3 rounded-lg bg-[#111a22] border-none text-white placeholder:text-[#92adc9] focus:outline-none focus:ring-2 focus:ring-[#1172d4]"
                    />
                    {errors.password && (
                        <p className="mt-2 text-sm text-red-400">
                            {errors.password}
                        </p>
                    )}
                </div>

                {/* Botão Entrar */}
                <button
                    type="submit"
                    disabled={processing}
                    className="w-full mt-6 py-3 px-4 bg-[#1172d4] text-white font-bold rounded-lg hover:bg-[#0d5cb5] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {processing ? "Entrando..." : "Entrar"}
                </button>
            </form>

            {/* Links */}
            <div className="mt-6 space-y-3 text-center">
                {canResetPassword && (
                    <Link
                        href={route("password.request")}
                        className="block text-[#92adc9] text-sm hover:text-white transition-colors"
                    >
                        Esqueceu a senha?
                    </Link>
                )}
                <p className="text-[#92adc9] text-sm">
                    Não tem uma conta?{" "}
                    <Link
                        href={route("register")}
                        className="text-[#1172d4] hover:text-white transition-colors font-medium"
                    >
                        Cadastre-se
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
}
