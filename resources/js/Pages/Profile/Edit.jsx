import { Head } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";

export default function Edit({ mustVerifyEmail, status, auth }) {
    const userAvatar =
        auth?.user?.avatar ||
        `https://api.dicebear.com/7.x/avataaars/svg?seed=${
            auth?.user?.email || "user"
        }`;

    return (
        <MainLayout>
            <Head title="Perfil" />

            <div className="px-40 flex flex-1 justify-center py-5">
                <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
                    {/* Cabeçalho do Perfil */}
                    <div className="flex flex-wrap justify-between gap-3 p-4">
                        <div className="flex min-w-72 flex-col gap-3">
                            <p className="text-white tracking-light text-[32px] font-bold leading-tight">
                                Meu Perfil
                            </p>
                            <p className="text-[#92adc9] text-sm font-normal leading-normal">
                                Gerencie suas informações pessoais e
                                configurações de conta
                            </p>
                        </div>
                    </div>

                    {/* Avatar e Nome */}
                    <div className="px-4 py-3">
                        <div className="flex items-center gap-4 bg-[#233648] rounded-lg p-6 mb-6">
                            <div
                                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-20"
                                style={{
                                    backgroundImage: `url("${userAvatar}")`,
                                }}
                            />
                            <div className="flex-1">
                                <h3 className="text-white text-xl font-bold leading-tight">
                                    {auth.user.name}
                                </h3>
                                <p className="text-[#92adc9] text-sm">
                                    {auth.user.email}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Seção de Informações do Perfil */}
                    <div className="px-4 py-3">
                        <div className="bg-[#233648] rounded-lg p-6 mb-6">
                            <h3 className="text-white text-lg font-bold mb-4">
                                Informações do Perfil
                            </h3>
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-full"
                            />
                        </div>
                    </div>

                    {/* Seção de Atualizar Senha */}
                    <div className="px-4 py-3">
                        <div className="bg-[#233648] rounded-lg p-6 mb-6">
                            <h3 className="text-white text-lg font-bold mb-4">
                                Atualizar Senha
                            </h3>
                            <UpdatePasswordForm className="max-w-full" />
                        </div>
                    </div>

                    {/* Seção de Excluir Conta */}
                    <div className="px-4 py-3">
                        <div className="bg-[#233648] rounded-lg p-6 border border-red-900/20">
                            <h3 className="text-white text-lg font-bold mb-4">
                                Zona de Perigo
                            </h3>
                            <DeleteUserForm className="max-w-full" />
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
