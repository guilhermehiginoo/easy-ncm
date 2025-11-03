const ChatBubble = ({ message, isUser, userAvatar }) => {
    const avatarUser =
        userAvatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=user";
    const avatarAI = "https://api.dicebear.com/7.x/bottts/svg?seed=ai";

    if (isUser) {
        return (
            <div className="flex items-end gap-3 p-4 justify-end">
                <div className="flex flex-1 flex-col gap-1 items-end">
                    <p className="text-[#92adc9] text-[13px] font-normal leading-normal max-w-[360px] text-right">
                        Você
                    </p>
                    <div className="text-base font-normal leading-normal flex max-w-[360px] rounded-lg px-4 py-3 bg-[#1172d4] text-white">
                        {message}
                    </div>
                </div>
                <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 shrink-0"
                    style={{ backgroundImage: `url("${avatarUser}")` }}
                />
            </div>
        );
    }

    return (
        <div className="flex items-end gap-3 p-4">
            <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 shrink-0"
                style={{ backgroundImage: `url("${avatarAI}")` }}
            />
            <div className="flex flex-1 flex-col gap-1 items-start">
                <p className="text-[#92adc9] text-[13px] font-normal leading-normal max-w-[360px]">
                    IA
                </p>
                <div className="text-base font-normal leading-normal flex max-w-[360px] rounded-lg px-4 py-3 bg-[#233648] text-white">
                    {message}
                </div>
            </div>
        </div>
    );
};

export default ChatBubble;
