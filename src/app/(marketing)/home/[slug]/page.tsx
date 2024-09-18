import ManageProduct from "@/components/Product/ManageProduct";

export default async function PageProduct({
    params: { slug },
}: {
    params: { slug: string };
}) {
    return (
        <div className="w-full flex justify-center">
            <div className="w-[70%]">
                <ManageProduct isAdmin={false} type={+slug} />
            </div>
        </div>
    );
}
