"use client";

import { useTranslation } from "react-i18next";
import { FormSetting } from "./SettingLang.styled";

const SettingLang = () => {
    const { i18n } = useTranslation();

    const handleChangeLang = (e: React.ChangeEvent<HTMLInputElement>) => {
        const lang = e.target.checked ? "en" : "vi";
        i18n.changeLanguage(lang);
    };

    return (
        <FormSetting width="150px" height="50px">
            <p>Vie</p>
            <label className="switch">
                <input type="checkbox" onChange={(e) => handleChangeLang(e)} />
                <span className="slider round"></span>
            </label>
            <p>Eng</p>
        </FormSetting>
    );
};

export default SettingLang;
