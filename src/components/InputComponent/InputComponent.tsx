import { TInput } from "@/utils/interface";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

export default function InputComponent({
    name,
    type,
    register,
    rules,
    errors,
}: {
    name: string;
    type: TInput;
    register: UseFormRegister<FieldValues>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rules?: any;
    errors?: FieldErrors<FieldValues>;
}) {
    return (
        <div className="w-full">
            <input
                type={type}
                {...register(name, rules)}
                className="w-[100%] border-[1px] border-solid border-[#fff] border-b-[#ccc] p-[10px] focus:rounded-[10px] outline-none"
            />
            {errors && errors[name] && (
                <p className="text-red-500">
                    {(errors?.[name]?.message as string) || "Error"}
                </p>
            )}
        </div>
    );
}
