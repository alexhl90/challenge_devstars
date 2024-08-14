import { gql } from '@apollo/client';

const GET_BOARDS = gql`
    query Boards {
        boards {
            id
            name
            createdAt
        }
    }
`;

const GET_BOARD = gql`
    query Board ($boardId: String!) {
        board(boardId: $boardId) {
            id
            name
            createdAt
        }
    }
`;

export { GET_BOARDS, GET_BOARD };