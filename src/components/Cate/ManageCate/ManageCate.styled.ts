import { Div } from "@/components/StyledComponents/Div";
import styled from "styled-components";

export const FormManageCate = styled(Div)`
    padding: 20px;

    h2 {
        font-size: 24px;
        font-weight: 500;
        margin-bottom: 20px;
    }

    .list-cate {
        display: grid;
        grid-template-columns: auto auto auto auto;
        gap: 20px;

        .item-cate {
            padding: 20px;
            display: flex;
            justify-content: space-between;
            border: 1px solid #ccc;
            box-shadow: var(--shadow);
            border-radius: 10px;

            button {
                background-color: red;
                padding: 8px;
                border-radius: 10px;
            }
        }
    }
`;
