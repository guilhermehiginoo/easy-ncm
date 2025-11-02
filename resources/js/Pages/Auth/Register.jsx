import { Head, Link, useForm } from "@inertiajs/react";
import AuthLayout from "@/Layouts/AuthLayout";

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("register"));
    };

    return (
        <AuthLayout>
            <Head title="Cadastro" />

            <h2 className="text-white text-2xl font-bold mb-6 text-center">
                Cadastro
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Campo Nome */}
                <div>
                    <label
                        htmlFor="name"
                        className="block text-white text-sm font-medium mb-2"
                    >
                        Nome
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        placeholder="Seu nome completo"
                        required
                        className="w-full px-4 py-3 rounded-lg bg-[#111a22] border-none text-white placeholder:text-[#92adc9] focus:outline-none focus:ring-2 focus:ring-[#1172d4]"
                    />
                    {errors.name && (
                        <p className="mt-2 text-sm text-red-400">
                            {errors.name}
                        </p>
                    )}
                </div>

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

                {/* Campo Confirmar Senha */}
                <div>
                    <label
                        htmlFor="password_confirmation"
                        className="block text-white text-sm font-medium mb-2"
                    >
                        Confirmar Senha
                    </label>
                    <input
                        type="password"
                        id="password_confirmation"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        placeholder="••••••••"
                        required
                        className="w-full px-4 py-3 rounded-lg bg-[#111a22] border-none text-white placeholder:text-[#92adc9] focus:outline-none focus:ring-2 focus:ring-[#1172d4]"
                    />
                    {errors.password_confirmation && (
                        <p className="mt-2 text-sm text-red-400">
                            {errors.password_confirmation}
                        </p>
                    )}
                </div>

                {/* Botão Cadastrar */}
                <button
                    type="submit"
                    disabled={processing}
                    className="w-full mt-6 py-3 px-4 bg-[#1172d4] text-white font-bold rounded-lg hover:bg-[#0d5cb5] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {processing ? "Cadastrando..." : "Cadastrar"}
                </button>
            </form>

            {/* Link para Login */}
            <div className="mt-6 text-center">
                <p className="text-[#92adc9] text-sm">
                    Já tem uma conta?{" "}
                    <Link
                        href={route("login")}
                        className="text-[#1172d4] hover:text-white transition-colors font-medium"
                    >
                        Faça login
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
}
