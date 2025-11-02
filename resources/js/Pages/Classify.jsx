import { useState, useEffect, useRef } from "react";
import { Head, router, usePage } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import SearchInput from "@/Components/SearchInput";
import Button from "@/Components/Button";
import ChatBubble from "@/Components/ChatBubble";

export default function Classify({ recentHistory = [] }) {
    const { auth } = usePage().props;
    const [searchHistory, setSearchHistory] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [messages, setMessages] = useState([]);
    const [isClassifying, setIsClassifying] = useState(false);
    const messagesEndRef = useRef(null);

    // Auto scroll para última mensagem
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Avatar do usuário
    const userAvatar =
        auth?.user?.avatar ||
        `https://api.dicebear.com/7.x/avataaars/svg?seed=${
            auth?.user?.email || "user"
        }`;

    // Filtrar histórico com base na busca
    const filteredHistory = recentHistory.filter(
        (item) =>
            item.title?.toLowerCase().includes(searchHistory.toLowerCase()) ||
            item.product?.toLowerCase().includes(searchHistory.toLowerCase())
    );

    const handleClassify = (e) => {
        e.preventDefault();
        if (productDescription.trim() && !isClassifying) {
            setIsClassifying(true);

            const newUserMessage = {
                id: Date.now(),
                text: `Descrição do Produto: ${productDescription}`,
                isUser: true,
            };

            setMessages([...messages, newUserMessage]);
            const description = productDescription;
            setProductDescription("");

            // Envia para o backend
            router.post(
                "/classificar",
                { description },
                {
                    preserveState: true,
                    preserveScroll: true,
                    onSuccess: (page) => {
                        // Resposta da IA vem do backend
                        const response = page.props.classification;
                        if (response) {
                            const aiResponse = {
                                id: Date.now() + 1,
                                text: `NCM Classificado: ${response.ncm}\nTIPI Relacionada: ${response.tipi}\nJustificativa: ${response.justification}`,
                                isUser: false,
                            };
                            setMessages((prev) => [...prev, aiResponse]);
                        }
                        setIsClassifying(false);
                    },
                    onError: (errors) => {
                        const errorMessage = {
                            id: Date.now() + 1,
                            text: "Desculpe, ocorreu um erro ao classificar o produto. Tente novamente.",
                            isUser: false,
                        };
                        setMessages((prev) => [...prev, errorMessage]);
                        setIsClassifying(false);
                    },
                }
            );
        }
    };

    const handleCopyNCM = () => {
        // Pega o último NCM classificado
        const lastAIMessage = [...messages].reverse().find((m) => !m.isUser);
        if (lastAIMessage) {
            const ncmMatch = lastAIMessage.text.match(
                /NCM Classificado:\s*(\S+)/
            );
            if (ncmMatch) {
                navigator.clipboard.writeText(ncmMatch[1]);
                // Aqui você pode adicionar um toast/notification
                alert("NCM copiado para a área de transferência!");
            }
        }
    };

    const handleViewHistory = (item) => {
        router.visit(`/historico/${item.id}`);
    };

    return (
        <MainLayout>
            <Head title="Classificar NCM" />

            <div className="gap-1 px-6 flex flex-1 justify-center py-5">
                {/* Sidebar - Histórico Recente */}
                <div className="layout-content-container flex flex-col w-80">
                    <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
                        Histórico Recente
                    </h2>

                    <div className="px-4 py-3">
                        <SearchInput
                            placeholder="Pesquisar no histórico"
                            value={searchHistory}
                            onChange={(e) => setSearchHistory(e.target.value)}
                        />
                    </div>

                    {/* Lista de Histórico */}
                    <div className="overflow-y-auto scrollbar-custom max-h-[calc(100vh-250px)]">
                        {filteredHistory.length > 0 ? (
                            filteredHistory.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => handleViewHistory(item)}
                                    className="flex items-center gap-4 bg-[#111a22] px-4 min-h-[72px] py-2 justify-between cursor-pointer hover:bg-[#192633] transition-colors"
                                >
                                    <div className="flex flex-col justify-center flex-1 min-w-0">
                                        <p className="text-white text-base font-medium leading-normal line-clamp-1">
                                            {item.title || item.product}
                                        </p>
                                        <p className="text-[#92adc9] text-sm font-normal leading-normal line-clamp-2">
                                            {item.date ||
                                                new Date(
                                                    item.created_at
                                                ).toLocaleString("pt-BR")}
                                        </p>
                                    </div>
                                    <div className="shrink-0">
                                        <div className="text-white flex size-7 items-center justify-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24px"
                                                height="24px"
                                                fill="currentColor"
                                                viewBox="0 0 256 256"
                                            >
                                                <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-[#92adc9] text-sm text-center px-4 py-8">
                                {searchHistory
                                    ? "Nenhum resultado encontrado"
                                    : "Nenhum histórico ainda"}
                            </p>
                        )}
                    </div>
                </div>

                {/* Área Principal - Chat */}
                <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
                    <h2 className="text-white tracking-light text-[28px] font-bold leading-tight px-4 text-left pb-3 pt-5">
                        Classificar NCM
                    </h2>

                    {/* Input de Classificação */}
                    <form onSubmit={handleClassify}>
                        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                            <label className="flex flex-col min-w-40 flex-1">
                                <input
                                    placeholder="Descreva o produto para classificar o NCM"
                                    value={productDescription}
                                    onChange={(e) =>
                                        setProductDescription(e.target.value)
                                    }
                                    disabled={isClassifying}
                                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border-none bg-[#233648] focus:border-none h-14 placeholder:text-[#92adc9] p-4 text-base font-normal leading-normal disabled:opacity-50"
                                />
                            </label>
                        </div>
                        <div className="flex px-4 py-3 justify-start">
                            <Button
                                type="submit"
                                variant="primary"
                                disabled={isClassifying}
                            >
                                {isClassifying
                                    ? "Classificando..."
                                    : "Classificar NCM"}
                            </Button>
                        </div>
                    </form>

                    {/* Mensagens do Chat */}
                    <div className="flex-1 overflow-y-auto scrollbar-custom max-h-[calc(100vh-400px)]">
                        {messages.length === 0 ? (
                            <div className="flex items-center justify-center h-full">
                                <p className="text-[#92adc9] text-center">
                                    Digite a descrição de um produto acima para
                                    começar a classificação NCM
                                </p>
                            </div>
                        ) : (
                            <>
                                {messages.map((message) => (
                                    <ChatBubble
                                        key={message.id}
                                        message={message.text}
                                        isUser={message.isUser}
                                        userAvatar={userAvatar}
                                    />
                                ))}
                                <div ref={messagesEndRef} />
                            </>
                        )}
                    </div>

                    {/* Ações */}
                    {messages.length > 0 && (
                        <>
                            <div className="flex justify-stretch">
                                <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 justify-start">
                                    <Button
                                        variant="secondary"
                                        onClick={handleCopyNCM}
                                    >
                                        Copiar NCM
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        onClick={() => setMessages([])}
                                    >
                                        Nova Classificação
                                    </Button>
                                </div>
                            </div>
                            <div className="flex px-4 py-3 justify-start">
                                <Button variant="secondary">
                                    Dar Feedback
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
