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
import { useTranslation } from "react-i18next";

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
    const { t } = useTranslation("auth");

    if (isRequired) {
        rules.required = {
            value: true,
            message: label + " " + t("notEmpty"),
        };
    }

    if (min) {
        rules.minLength = {
            value: min,
            message: t("minLength"),
        };
    }

    if (isRePassword && getValues) {
        rules.validate = (value: string) => {
            return value === getValues("password")
                ? true
                : t("errSamePassword");
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
