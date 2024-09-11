import Link from "next/link";

export default function LinkComponent({
    href,
    children,
}: {
    href: string;
    children: React.ReactNode;
}) {
    return <Link href={href}>{children}</Link>;
}
