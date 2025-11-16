import { Head, Link, useForm } from "@inertiajs/react";
import AuthLayout from "@/Layouts/AuthLayout";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("password.email"));
    };

    return (
        <AuthLayout>
            <Head title="Recuperar Senha" />

            <h2 className="text-white text-2xl font-bold mb-4 text-center">
                Recuperar Senha
            </h2>

            {!status ? (
                <>
                    <p className="text-[#92adc9] text-sm mb-6 text-center">
                        Digite seu e-mail para receber o link de recuperação.
                    </p>

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
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
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

                        {/* Botão Enviar */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full mt-6 py-3 px-4 bg-[#1172d4] text-white font-bold rounded-lg hover:bg-[#0d5cb5] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing ? "Enviando..." : "Enviar link"}
                        </button>
                    </form>
                </>
            ) : (
                <div className="text-center py-4">
                    <div className="mb-4">
                        <svg
                            className="w-16 h-16 mx-auto text-[#1172d4]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                    <p className="text-white text-lg font-medium mb-2">
                        Email enviado!
                    </p>
                    <p className="text-[#92adc9] text-sm">
                        Verifique sua caixa de entrada e siga as instruções para
                        redefinir sua senha.
                    </p>
                </div>
            )}

            {/* Link para Login */}
            <div className="mt-6 text-center">
                <Link
                    href={route("login")}
                    className="text-[#92adc9] text-sm hover:text-white transition-colors"
                >
                    ← Voltar para o Login
                </Link>
            </div>
        </AuthLayout>
    );
}
