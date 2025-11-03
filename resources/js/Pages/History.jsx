import { useState } from "react";
import { Head, router, usePage } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import SearchInput from "@/Components/SearchInput";

export default function History({ history = [] }) {
    const [searchTerm, setSearchTerm] = useState("");

    // Filtrar histórico com base na busca
    const filteredHistory = history.filter(
        (item) =>
            item.product?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.ncm?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleViewDetails = (item) => {
        router.visit(`/historico/${item.id}`);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("pt-BR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <MainLayout>
            <Head title="Histórico de Classificações" />

            <div className="px-40 flex flex-1 justify-center py-5">
                <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
                    {/* Título */}
                    <div className="flex flex-wrap justify-between gap-3 p-4">
                        <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">
                            Histórico de Classificações
                        </p>
                    </div>

                    {/* Barra de Pesquisa */}
                    <div className="px-4 py-3">
                        <SearchInput
                            placeholder="Pesquisar no histórico"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Tabela */}
                    <div className="px-4 py-3">
                        {filteredHistory.length > 0 ? (
                            <div className="flex overflow-hidden rounded-lg border border-[#324d67] bg-[#111a22]">
                                <table className="flex-1">
                                    <thead>
                                        <tr className="bg-[#192633]">
                                            <th className="px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                                                Produto
                                            </th>
                                            <th className="px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                                                NCM Classificado
                                            </th>
                                            <th className="px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                                                Data
                                            </th>
                                            <th className="px-4 py-3 text-left text-[#92adc9] w-60 text-sm font-medium leading-normal">
                                                Ações
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredHistory.map((item) => (
                                            <tr
                                                key={item.id}
                                                className="border-t border-t-[#324d67]"
                                            >
                                                <td className="h-[72px] px-4 py-2 w-[400px] text-white text-sm font-normal leading-normal">
                                                    {item.product}
                                                </td>
                                                <td className="h-[72px] px-4 py-2 w-[400px] text-[#92adc9] text-sm font-normal leading-normal">
                                                    {item.ncm}
                                                </td>
                                                <td className="h-[72px] px-4 py-2 w-[400px] text-[#92adc9] text-sm font-normal leading-normal">
                                                    {formatDate(
                                                        item.created_at ||
                                                            item.date
                                                    )}
                                                </td>
                                                <td className="h-[72px] px-4 py-2 w-60">
                                                    <button
                                                        onClick={() =>
                                                            handleViewDetails(
                                                                item
                                                            )
                                                        }
                                                        className="text-[#92adc9] text-sm font-bold leading-normal tracking-[0.015em] hover:text-white transition-colors"
                                                    >
                                                        Ver Detalhes
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-16">
                                <svg
                                    className="w-24 h-24 text-[#324d67] mb-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                                <p className="text-[#92adc9] text-lg mb-2">
                                    {searchTerm
                                        ? "Nenhum resultado encontrado"
                                        : "Nenhum histórico ainda"}
                                </p>
                                <p className="text-[#92adc9] text-sm">
                                    {searchTerm
                                        ? "Tente buscar por outro termo"
                                        : "Comece classificando um produto"}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
