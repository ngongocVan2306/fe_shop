"use client";

import { LabelStyled } from "@/styledComponent/TextStyled";

const LabelComponent = ({ value }: { value: string }) => {
    return (
        <LabelStyled weight={500} size="20px">
            {value}
        </LabelStyled>
    );
};

export default LabelComponent;
