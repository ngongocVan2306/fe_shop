import styled, { css } from "styled-components";

export const Div = styled.div.attrs<{
    width?: string;
    height?: string;
    isShadow?: boolean;
}>((props) => ({
    height: props.height || "100%",
    width: props.width || "100%",
    isShadow: props.isShadow || false,
}))`
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    ${(props) =>
        props.isShadow &&
        css`
            box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
        `}

    &::-webkit-scrollbar {
        display: none;
    }
`;
