import { TInput } from "@/utils/interface";
import InputComponent from "../InputComponent/InputComponent";
import LabelComponent from "../LabelComponent/LabelComponent";
import {
    FieldErrors,
    FieldValues,
    UseFormGetValues,
    UseFormRegister,
} from "react-hook-form";

const FormGroup = ({
    label,
    name,
    type,
    register,
    isRequired,
    min,
    isRePassword,
    getValues,
    rules = {},
    errors,
}: {
    label: string;
    name: string;
    type: TInput;
    register: UseFormRegister<FieldValues>;
    isRequired: boolean;
    min?: number;
    isRePassword?: boolean;
    getValues?: UseFormGetValues<FieldValues>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rules?: any;
    errors?: FieldErrors<FieldValues>;
}) => {
    if (isRequired) {
        rules.required = label + " Không được để trống !";
    }

    if (min) {
        rules.minLength = 8;
    }

    if (isRePassword && getValues) {
        rules.validate = (value: string) => {
            return value === getValues("password")
                ? true
                : "re-password phải giống password!";
        };
    }
    return (
        <div className="w-full mt-[15px]">
            <LabelComponent value={label} />
            <InputComponent
                name={name}
                type={type}
                register={register}
                rules={rules}
                errors={errors}
            />
        </div>
    );
};

export default FormGroup;
