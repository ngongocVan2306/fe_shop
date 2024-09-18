import ManageProduct from "@/components/Product/ManageProduct";

export default async function PageHome() {
    return (
        <div className="pt-[10px] w-full flex justify-center">
            <div className="sm:w-[70%] w-full">
                <ManageProduct type={0} isAdmin={false} />
            </div>
        </div>
    );
}
