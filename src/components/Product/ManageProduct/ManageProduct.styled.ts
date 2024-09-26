import { Div } from "@/components/StyledComponents/Div";
import styled from "styled-components";

export const FormManage = styled(Div)`
    padding: 20px;
`;

export const ContentManage = styled(Div)`
    display: flex;
    justify-content: center;
`;

export const FormGrid = styled(Div)`
    display: grid;
    grid-template-columns: auto auto auto auto auto;
    gap: 10px;
`;

export const FormPagination = styled(ContentManage)`
    margin-top: 20px;
    align-items: center;
`;
