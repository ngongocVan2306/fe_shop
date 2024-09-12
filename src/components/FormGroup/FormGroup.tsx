import { TInput } from "@/utils/interface";
import InputComponent from "../InputComponent/InputComponent";
import LabelComponent from "../LabelComponent/LabelComponent";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

const FormGroup = ({
    label,
    name,
    type,
    register,
    isRequired,
    rules,
    errors,
}: {
    label: string;
    name: string;
    type: TInput;
    register: UseFormRegister<FieldValues>;
    isRequired: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rules?: any;
    errors?: FieldErrors<FieldValues>;
}) => {
    if (isRequired) {
        rules.required = label + " Không được để trống !";
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
