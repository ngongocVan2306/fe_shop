import CheckLogin from "@/components/CheckLogin/CheckLogin";

const LayoutAuth = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-[100%] h-[100%]">
            <CheckLogin>{children}</CheckLogin>
        </div>
    );
};

export default LayoutAuth;
