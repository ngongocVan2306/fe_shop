import { Div } from "@/components/StyledComponents/Div";
import styled from "styled-components";

export const ManageCart = styled(Div)`
    padding: 20px;
    background-color: #f4f4f4;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .list-cart {
        padding: 20px;
        width: 90%;
        max-height: 80%;
        background-color: #fff;
        overflow: auto;
        border-radius: 10px;
        box-shadow: var(--shadow);
    }

    .form-pagination {
        margin-top: 20px;
    }
`;
