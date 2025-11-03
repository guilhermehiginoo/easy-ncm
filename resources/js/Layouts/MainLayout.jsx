import Header from "@/Components/Header";

const MainLayout = ({ children }) => {
    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#111a22]">
            <div className="layout-container flex h-full grow flex-col">
                <Header />
                {children}
            </div>
        </div>
    );
};

export default MainLayout;
