import { Transition } from "@headlessui/react";
import { Link, useForm, usePage } from "@inertiajs/react";
import Button from "@/Components/Button";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();
        patch(route("profile.update"));
    };

    return (
        <section className={className}>
            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label
                        htmlFor="name"
                        className="block text-white text-sm font-medium mb-2"
                    >
                        Nome
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-[#111a22] border-none text-white placeholder:text-[#92adc9] focus:outline-none focus:ring-2 focus:ring-[#1172d4]"
                    />
                    {errors.name && (
                        <p className="mt-2 text-sm text-red-400">
                            {errors.name}
                        </p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="email"
                        className="block text-white text-sm font-medium mb-2"
                    >
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-[#111a22] border-none text-white placeholder:text-[#92adc9] focus:outline-none focus:ring-2 focus:ring-[#1172d4]"
                    />
                    {errors.email && (
                        <p className="mt-2 text-sm text-red-400">
                            {errors.email}
                        </p>
                    )}
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="bg-[#111a22] rounded-lg p-4">
                        <p className="text-[#92adc9] text-sm">
                            Seu e-mail ainda não foi verificado.{" "}
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                                className="text-[#1172d4] hover:text-white transition-colors font-medium underline"
                            >
                                Clique aqui para reenviar o e-mail de
                                verificação.
                            </Link>
                        </p>

                        {status === "verification-link-sent" && (
                            <div className="mt-2 text-sm font-medium text-green-400">
                                Um novo link de verificação foi enviado para seu
                                e-mail.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4 pt-2">
                    <Button
                        type="submit"
                        variant="primary"
                        disabled={processing}
                    >
                        {processing ? "Salvando..." : "Salvar"}
                    </Button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-green-400">Salvo.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
