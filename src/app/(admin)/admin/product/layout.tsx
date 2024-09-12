import TabsComponenet from "@/components/TabsComponenet/TabsComponenet";
import { tabsProduct } from "@/utils/menuTabsProduct";

const LayoutProduct = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full h-full p-[20px]">
            <div className="w-full h-12">
                <TabsComponenet data={tabsProduct} />
            </div>
            <div className="w-full mt-[var(--height-header)]">{children}</div>
        </div>
    );
};

export default LayoutProduct;
