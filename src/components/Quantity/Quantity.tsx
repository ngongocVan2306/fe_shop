import Image from "next/image";
import iconMinus from "../../../assets/icons/iconMinus.svg";
import iconPlus from "../../../assets/icons/iconPlus.svg";
import { resStatus } from "@/constants";
import { handleChangeCountCart } from "@/action/cartAction";
import { HandleApi } from "@/action/handleApi";

const Quantity = ({
    inventory,
    count,
    setCount,
    isDetail = true,
    id = 0,
    handleReload,
}: {
    inventory: number;
    count: number;
    setCount?: React.Dispatch<React.SetStateAction<number>>;
    isDetail?: boolean;
    id?: number;
    handleReload?: () => void;
}) => {
    const handleAction = async (count: number) => {
        const res = await HandleApi(handleChangeCountCart, {
            id: id,
            count: count,
        });

        if (res.code === resStatus.SUCCESS) {
            handleReload?.();
        }
    };
    return (
        <div className="">
            <div className="h-[38px] flex justify-start items-center ">
                <button
                    className="p-[8px] shadow border-solid border-[1px] border-[#ddd] w-[20%] h-[100%] rounded-l"
                    onClick={() => {
                        count <= 0
                            ? null
                            : isDetail
                            ? setCount?.(count - 1)
                            : handleAction(count - 1);
                    }}
                >
                    <Image
                        width={100}
                        height={100}
                        src={iconMinus}
                        alt="minus"
                        className="w-[100%] h-[100%] object-contain"
                    />
                </button>
                <input
                    type="number"
                    className="w-[80px] h-[100%] p-[8px] shadow border-solid border-[1px] border-[#ddd]"
                    value={count}
                    onChange={(e) => setCount?.(+e.target.value)}
                />

                <button
                    className="p-[8px] shadow border-solid border-[1px] border-[#ddd] w-[20%] h-[100%] rounded-r"
                    onClick={() => {
                        count >= inventory
                            ? null
                            : isDetail
                            ? setCount?.(count + 1)
                            : handleAction(count + 1);
                    }}
                >
                    <Image
                        width={100}
                        height={100}
                        src={iconPlus}
                        alt="plus"
                        className="w-[100%] h-[100%] object-contain"
                    />
                </button>
            </div>
        </div>
    );
};

export default Quantity;
