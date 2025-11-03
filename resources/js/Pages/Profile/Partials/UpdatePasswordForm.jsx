import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import { useRef } from "react";
import Button from "@/Components/Button";

export default function UpdatePasswordForm({ className = "" }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route("password.update"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset("password", "password_confirmation");
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset("current_password");
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <p className="text-[#92adc9] text-sm mb-4">
                Certifique-se de que sua conta está usando uma senha longa e
                aleatória para permanecer segura.
            </p>

            <form onSubmit={updatePassword} className="space-y-4">
                <div>
                    <label
                        htmlFor="current_password"
                        className="block text-white text-sm font-medium mb-2"
                    >
                        Senha Atual
                    </label>
                    <input
                        id="current_password"
                        ref={currentPasswordInput}
                        type="password"
                        value={data.current_password}
                        onChange={(e) =>
                            setData("current_password", e.target.value)
                        }
                        className="w-full px-4 py-3 rounded-lg bg-[#111a22] border-none text-white placeholder:text-[#92adc9] focus:outline-none focus:ring-2 focus:ring-[#1172d4]"
                    />
                    {errors.current_password && (
                        <p className="mt-2 text-sm text-red-400">
                            {errors.current_password}
                        </p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="password"
                        className="block text-white text-sm font-medium mb-2"
                    >
                        Nova Senha
                    </label>
                    <input
                        id="password"
                        ref={passwordInput}
                        type="password"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-[#111a22] border-none text-white placeholder:text-[#92adc9] focus:outline-none focus:ring-2 focus:ring-[#1172d4]"
                    />
                    {errors.password && (
                        <p className="mt-2 text-sm text-red-400">
                            {errors.password}
                        </p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="password_confirmation"
                        className="block text-white text-sm font-medium mb-2"
                    >
                        Confirmar Nova Senha
                    </label>
                    <input
                        id="password_confirmation"
                        type="password"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        className="w-full px-4 py-3 rounded-lg bg-[#111a22] border-none text-white placeholder:text-[#92adc9] focus:outline-none focus:ring-2 focus:ring-[#1172d4]"
                    />
                    {errors.password_confirmation && (
                        <p className="mt-2 text-sm text-red-400">
                            {errors.password_confirmation}
                        </p>
                    )}
                </div>

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
