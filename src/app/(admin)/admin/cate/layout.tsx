import TabsComponenet from "@/components/TabsComponenet/TabsComponenet";
import { tabsCate } from "@/utils/menuTabsCate";

export default function LayoutCate({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="w-full h-full p-[20px]">
            <div className="w-full h-12 fixed top-0 overflow-hidden bg-[#fff]">
                <TabsComponenet data={tabsCate} />
            </div>
            <div className="w-full">{children}</div>
        </div>
    );
}
