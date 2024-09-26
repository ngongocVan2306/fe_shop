import { TInput, TStyoeFlex } from "@/utils/interface";
import styled from "styled-components";

export const InputStyled = styled.input.attrs<{
    padding?: string;
    size?: string;
    round?: string;
    type: TInput;
}>((props) => ({
    type: props.type,
    padding: props.padding || "8px",
    size: props.size || "100%",
    round: props.round || "10px",
}))`
    padding: ${(props) => props.padding};
    width: ${(props) => props.size};
    border-radius: ${(props) => props.round};
    outline: none;
    border: 1px solid #ccc;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

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
