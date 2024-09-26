import { Button } from "@/components/StyledComponents/Button";
import { Div } from "@/components/StyledComponents/Div";
import styled from "styled-components";

export const FormCard = styled(Div)`
    border-radius: 10px;

    .thumbnail {
        overflow: hidden;
    }

    .form-content {
        padding: 10px;
    }

    p {
        font-size: 16px;
    }

    .price {
        color: var(--color-price);
    }
`;

export const ButtonDelete = styled(Button)`
    margin-top: 10px;
    padding: 8px;
    color: #fff;
    background-color: red;
    border-radius: 10px;
`;
