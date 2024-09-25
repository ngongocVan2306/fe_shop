"use client";

import { TStyoeFlex } from "@/utils/interface";
import thumbnail from "../../public/hero-bg.jpg";
import styled, { css } from "styled-components";

type TOverflow = "auto" | "hidden";
type TDirection = "column" | "row";

//  DivStyled

export const DivStyled = styled.div.attrs<{
    width?: string;
    height?: string;
    margin?: string;
    marginTop?: string;
    padding?: string;
    rounded?: string;
    background?: string;
    isThumbnail?: boolean;
    overflow?: TOverflow;
    colorBorder?: string;
    isShadow?: boolean;
    maxHeight?: string;
}>((props) => ({
    height: props.height || "100%",
    width: props.width || "100%",
    margin: props.margin || "0px",
    marginTop: props.marginTop || "0px",
    padding: props.padding || "0px",
    rounded: props.rounded || "0px",
    background: props.background || "#fff",
    img: props.isThumbnail || false,
    isShadow: props.isShadow || false,
    overflow: props.overflow || "auto",
}))`
    width: ${(props) => props.width};
    min-height: ${(props) => props.height};
    max-height: ${(props) => props.maxHeight};
    margin: ${(props) => props.margin};
    margin-top: ${(props) => props.marginTop};
    padding: ${(props) => props.padding};
    border-radius: ${(props) => props.rounded};
    background: ${(props) => props.background};
    overflow: ${(props) => props.overflow};
    ${(props) =>
        props.isThumbnail &&
        css`
            background-image: url(${thumbnail.src});
        `}
    ${(props) =>
        props.colorBorder &&
        css`
            border: 1px solid ${props.colorBorder};
        `}

        ${(props) =>
        props.isShadow &&
        css`
            box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
        `}

    &::-webkit-scrollbar {
        display: none;
    }
`;

//  DivFlex

export const DivFlex = styled(DivStyled).attrs<{
    flexDirection?: TDirection;
    justyfy?: TStyoeFlex;
    align?: TStyoeFlex;
}>((props) => ({
    isCol: props.flexDirection || "row",
    justyfy: props.justyfy || "center",
    align: props.align || "center",
}))`
    display: flex;
    flex-direction: ${(props) => props.flexDirection};
    justify-content: ${(props) => props.justyfy};
    align-items: ${(props) => props.align};
    overflow: auto;
`;

//  DivGrid

export const DivGrid = styled(DivStyled).attrs<{
    columns?: number;
    gap?: string;
}>((props) => ({
    columns: props.columns || 2,
    gap: props.gap || "10px",
}))`
    display: grid;
    grid-template-columns: ${(props) => `repeat(${props.columns}, 1fr)`};
    gap: ${(props) => props.gap};
`;

// DivGradient

export const DivGradient = styled(DivFlex).attrs<{
    start?: string;
    end?: string;
}>((props) => ({
    start: props.start || "#74ebd5",
    end: props.end || "#9face6",
}))`
    background-image: linear-gradient(
        to right,
        ${(props) => props.start},
        ${(props) => props.end}
    );
    cursor: pointer;
    position: fixed;
    &:hover {
        opacity: 0.7;
    }
`;
