"use client";

import { TInput } from "@/utils/interface";
import styled from "styled-components";

// InputStyled

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

// InputGradient

export const InputGradient = styled(InputStyled).attrs<{
    start?: string;
    end?: string;
    color?: string;
}>((props) => ({
    start: props.start || "#74ebd5",
    end: props.end || "#9face6",
    color: props.color || "#fff",
}))`
    background-image: linear-gradient(
        to right,
        ${(props) => props.start},
        ${[(props) => props.end]}
    );
    color: ${(props) => props.color};
    margin-top: 20px;
    cursor: pointer;
`;
