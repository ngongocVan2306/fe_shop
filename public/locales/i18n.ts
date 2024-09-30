import i18n from "i18next";
import HttpBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

i18n.use(HttpBackend)
    .use(initReactI18next)
    .init({
        fallbackLng: "vi",
        supportedLngs: ["en", "vi"],
        backend: {
            loadPath: "/locales/{{lng}}/{{ns}}.json",
        },
        ns: [
            "common",
            "auth",
            "sidebarAdmin",
            "cate",
            "product",
            "detail",
            "cart",
        ],
        defaultNS: "common",
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
