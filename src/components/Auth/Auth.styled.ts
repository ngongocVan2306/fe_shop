import styled from "styled-components";
import { Div } from "../StyledComponents/Div";
import thumbnail from "../../../public/hero-bg.jpg";
import { Button } from "../StyledComponents/Button";

export const DivMain = styled(Div)`
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(${thumbnail.src});
    overflow: auto;
    min-height: 100vh;
    overflow: auto;

    .button-home {
        width: 120px;
        height: 50px;
        position: fixed;
        top: 20px;
        left: 20px;
        border-radius: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        background-color: #fff;
        background-image: linear-gradient(to right, #74ebd5, #9face6);

        &:hover {
            opacity: 0.6;
        }
    }

    .form-auth {
        width: 40%;
        height: auto;
        padding: 20px;
        background-color: #fff;
        border-radius: 10px;

        .heading {
            font-size: 28px;
            font-weight: 600;
            text-align: center;
        }

        form {
        }
    }

    .label-swap {
        text-align: start;
        color: #9face6;
    }
`;

export const ButtonHome = styled(Div)`
    position: fixed;
    top: 20px;
    left: 20px;
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    background-color: #fff;
    background-image: linear-gradient(to right, #74ebd5, #9face6);

    &:hover {
        opacity: 0.6;
    }
`;

export const ButtonSubmit = styled(Button)`
    padding: 8px 16px;
    margin: 30px 0 20px 50%;
    transform: translateX(-50%);
    color: #fff;
    background-image: linear-gradient(to right, #74ebd5, #9face6);
    border-radius: 10px;
`;
