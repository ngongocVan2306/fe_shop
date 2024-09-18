import { ICate, TInput } from "@/utils/interface";
import InputComponent from "../InputComponent/InputComponent";
import LabelComponent from "../LabelComponent/LabelComponent";
import {
    FieldErrors,
    FieldValues,
    UseFormGetValues,
    UseFormRegister,
} from "react-hook-form";
import SelectComponent from "../SelectComponent/SelectComponent";

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
    isSelect = false,
    dataSelect = [],
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
    isSelect?: boolean;
    errors?: FieldErrors<FieldValues>;
    dataSelect?: ICate[];
}) => {
    if (isRequired) {
        rules.required = {
            value: true,
            message: label + " Không được để trống !",
        };
    }

    if (min) {
        rules.minLength = {
            value: min,
            message: "Trường này không được ít hơn " + min + " kí tự !",
        };
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
            {isSelect ? (
                <SelectComponent
                    name={name}
                    data={dataSelect}
                    register={register}
                    rules={rules}
                />
            ) : (
                <InputComponent
                    name={name}
                    type={type}
                    register={register}
                    rules={rules}
                    errors={errors}
                />
            )}
        </div>
    );
};

export default FormGroup;
