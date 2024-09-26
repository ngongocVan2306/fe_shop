import { Div } from "@/components/StyledComponents/Div";
import styled from "styled-components";

export const FormFlex = styled(Div)`
    display: flex;
    justify-content: center;
    align-items: center;

    &.form-main {
        background-color: #f4f4f4;
    }

    &.form-detail {
        background-color: #fff;
        border-radius: 10px;
        padding: 30px;

        .content-detail {
            width: 60%;
            padding-left: 40px;
            flex-direction: column;
            justify-content: center;
            align-items: start;

            p {
                font-size: 20px;
            }

            .form-price {
                margin-top: 20px;
                background-color: #f4f4f4;
                border-radius: 5px;
                padding: 10px;

                .price {
                    color: var(--color-price);
                }
            }
        }
    }

    &.inventory,
    .button-group {
        margin: 20px 0;
        justify-content: space-between;
    }

    &.quantity {
        margin: 20px 0;
        justify-content: start;
    }

    .label-quantity {
        margin-right: 20px;
    }
`;

export const Button = styled(FormFlex)`
    width: 45%;
    padding: 8px;
    border-radius: 5px;

    &.button-add {
        margin-right: 10px;
        background-color: var(--color-button-cart);
        color: var(--color-cart);
        border: 1px solid var(--color-cart);
    }

    &.button-buy {
        background-color: var(--color-cart);
        color: #fff;
        border: 1px solid var(--color-cart);
    }

    &:hover {
        opacity: 0.6;
    }
`;
