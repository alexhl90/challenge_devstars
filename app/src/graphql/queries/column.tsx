import { gql } from '@apollo/client';

const GET_COLUMNS = gql`
    query Columns ($boardId: String!) {
        columns(boardId: $boardId) {
            id
            title
            order
            boardId
            createdAt
        }
    }
`;


export { GET_COLUMNS };