import Image from "next/image";
import Link from "next/link";
import bunbu from "../../public/bunbu.png";
import { defaultPagination } from "@/constants";
import { routes } from "@/utils/menuRouters";

export default function Home() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <Image
                    className="dark:invert"
                    src={bunbu}
                    alt="Next.js logo"
                    width={180}
                    height={38}
                    priority
                />

                <div className="flex items-center justify-center sm:flex-row w-full">
                    <Link href={`${routes.home.url}/${defaultPagination.type}`}>
                        <button className="bg-[blue] px-[28px] py-[8px] text-[#fff] rounded-[10px] shadow">
                            Home
                        </button>
                    </Link>
                </div>
            </main>
        </div>
    );
}
