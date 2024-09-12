import { TInput } from "@/utils/interface";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

const InputComponent = ({
    name,
    type,
    register,
    rules,
    errors,
    isAuth,
}: {
    name: string;
    type: TInput;
    register: UseFormRegister<FieldValues>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rules?: any;
    errors?: FieldErrors<FieldValues>;
    isAuth?: boolean;
}) => {
    return (
        <div className="w-full">
            <input
                type={type}
                {...register(name, rules)}
                className={`w-[100%]  border-solid ${
                    isAuth
                        ? "border-b-[1px]"
                        : "border-[1px] rounded-[10px] shadow"
                }   border-b-[#ccc] p-[10px] focus:rounded-[10px] outline-none`}
            />
            {errors && errors[name] && (
                <p className="text-red-500 font-normal text-[16px]">
                    {(errors?.[name]?.message as string) || "Error"}
                </p>
            )}
        </div>
    );
};

export default InputComponent;
