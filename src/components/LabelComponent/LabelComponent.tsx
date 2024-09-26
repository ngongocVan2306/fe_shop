"use client";

import { LabelStyled } from "./LabelComponent.styled";

const LabelComponent = ({ value }: { value: string }) => {
    return (
        <LabelStyled weight={500} size="20px">
            {value}
        </LabelStyled>
    );
};

export default LabelComponent;
