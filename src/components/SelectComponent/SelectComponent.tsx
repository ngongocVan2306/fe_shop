import { ICate } from "@/utils/interface";
import { isEmpty } from "@/utils/isEmpty";
import { FieldValues, UseFormRegister } from "react-hook-form";

const SelectComponent = ({
    data,
    name,
    rules,
    register,
}: {
    data: ICate[];
    name: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rules: any;
    register: UseFormRegister<FieldValues>;
}) => {
    return (
        <select
            {...register(name, rules)}
            className="border-solid border-[1px] border-[#ccc] rounded-[10px] outline-none p-[8px] w-[100%] h-[40px] text-[16px]"
        >
            {!isEmpty(data) &&
                data.map((item) => {
                    return (
                        <option value={item.id} key={item.id}>
                            {item.name}
                        </option>
                    );
                })}
        </select>
    );
};

export default SelectComponent;
