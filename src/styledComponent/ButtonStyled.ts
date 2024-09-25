import styled, { css } from "styled-components";

// ButtonStyled

export const ButtonStyled = styled.button.attrs<{
    width?: string;
    height?: string;
    background?: string;
    color?: string;
    padding?: string;
    colorBorder?: string;
}>((props) => ({
    width: props.width || "auto",
    height: props.height || "auto",
    background: props.background || "#fff",
    color: props.color || "#000",
}))`
    width: ${(props) => props.width || "auto"};
    height: ${(props) => props.height || "auto"};
    padding: ${(props) => props.padding || "0px"};
    color: ${(props) => props.color || "#000"};
    background: ${(props) => props.background || "#fff"};
    outline: none;
    cursor: pointer;
    border-radius: 10px;
    ${(props) =>
        props.background &&
        css`
            border: 1px solid ${props.colorBorder};
        `}

    &:hover {
        opacity: 0.6;
    }
`;

// ButtonGradient

export const ButtonGradient = styled(ButtonStyled).attrs<{
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
`;

//  ButtonFlex

export const ButtonFlex = styled(ButtonStyled)`
    display: flex;
    justify-content: center;
    align-items: center;
`;
