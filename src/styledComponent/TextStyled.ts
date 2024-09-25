import { TStyoeFlex } from "@/utils/interface";
import styled from "styled-components";

// TextStyled

export const TextStyled = styled.p.attrs<{
    size?: string;
    weight?: number;
    color?: string;
    textAlign?: TStyoeFlex;
}>((props) => ({
    size: props.size || "16px",
    weight: props.weight || 400,
    color: props.color || "#000",
    textAlign: props.textAlign || "start",
}))`
    font-size: ${(props) => props.size};
    font-weight: ${(props) => props.weight};
    color: ${(props) => props.color};
    text-align: ${(props) => props.textAlign};
`;

// LabelStyled

export const LabelStyled = styled(TextStyled)`
    margin-bottom: 5px;
    margin-top: 15px;
`;

// TextTruncate

export const TextTruncate = styled(TextStyled)`
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;
