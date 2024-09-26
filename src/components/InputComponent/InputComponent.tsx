import { TInput } from "@/utils/interface";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { InputStyled, TextStyled } from "./InputComponent.styled";

const InputComponent = ({
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
}) => {
    return (
        <div className="w-full">
            <InputStyled type={type} {...register(name, rules)} />
            {errors && errors[name] && (
                <TextStyled color="red" weight={400}>
                    {(errors?.[name]?.message as string) || "Error"}
                </TextStyled>
            )}
        </div>
    );
};

export default InputComponent;
