import Modal from "@/Components/Modal";
import Button from "@/Components/Button";
import { useForm } from "@inertiajs/react";
import { useRef, useState } from "react";

export default function DeleteUserForm({ className = "" }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: "",
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route("profile.destroy"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <p className="text-[#92adc9] text-sm">
                Uma vez que sua conta for excluída, todos os seus recursos e
                dados serão permanentemente deletados. Antes de excluir sua
                conta, faça o download de qualquer dado ou informação que você
                deseja manter.
            </p>

            <button
                onClick={confirmUserDeletion}
                className="min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 text-sm font-bold leading-normal tracking-[0.015em] transition-colors bg-red-600 text-white hover:bg-red-700"
            >
                Excluir Conta
            </button>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6 bg-[#233648]">
                    <h2 className="text-lg font-medium text-white">
                        Tem certeza que deseja excluir sua conta?
                    </h2>

                    <p className="mt-1 text-sm text-[#92adc9]">
                        Uma vez que sua conta for excluída, todos os seus
                        recursos e dados serão permanentemente deletados. Por
                        favor, insira sua senha para confirmar que você deseja
                        excluir permanentemente sua conta.
                    </p>

                    <div className="mt-6">
                        <label htmlFor="password" className="sr-only">
                            Senha
                        </label>

                        <input
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            placeholder="Senha"
                            className="w-3/4 px-4 py-3 rounded-lg bg-[#111a22] border-none text-white placeholder:text-[#92adc9] focus:outline-none focus:ring-2 focus:ring-[#1172d4]"
                        />

                        {errors.password && (
                            <p className="mt-2 text-sm text-red-400">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <Button
                            variant="secondary"
                            onClick={closeModal}
                            type="button"
                        >
                            Cancelar
                        </Button>

                        <button
                            type="submit"
                            disabled={processing}
                            className="min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 text-sm font-bold leading-normal tracking-[0.015em] transition-colors bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing ? "Excluindo..." : "Excluir Conta"}
                        </button>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
