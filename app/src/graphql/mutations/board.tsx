import { gql } from '@apollo/client';

const CREATE_BOARD = gql`
    mutation CreateColumn($name: String!) {
        createBoard(name: $name) {
            id
            name
            createdAt
        }
    }
`;

const UPDATE_BOARD = gql`
    mutation UpdateBoard($name: String!, $id: String!) {
        updateBoard(name: $name, id: $id) {
            id
            name
            createdAt
        }
    }
`;


const DELETE_BOARD = gql`
    mutation DeleteBoard($id: String!) {
        deleteBoard(id: $id) {
            id
        }
    }
`;

export { CREATE_BOARD, UPDATE_BOARD, DELETE_BOARD};