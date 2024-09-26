import Auth from "@/components/Auth/Auth";

const PageRegister = ({ params: { slug } }: { params: { slug: string } }) => {
    return <Auth slug={slug} />;
};

export default PageRegister;
