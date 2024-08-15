import { gql } from '@apollo/client';

const CREATE_COLUMN = gql`
    mutation CreateColumn($boardId: String!, $order: Int!, $title: String!) {
        createColumn(boardId: $boardId, order: $order, title: $title) {
        id
        title
        order
        boardId
        createdAt
        }
    }
`;

const UPDATE_COLUMN = gql`
    mutation UpdateColumn($id: String!,$boardId: String!, $order: Int!, $title: String!) {
        updateColumn(id: $id, boardId: $boardId, order: $order, title: $title) {
        id
        title
        order
        boardId
        createdAt
        }
    }
`;


const DELETE_COLUMN = gql`
    mutation DeleteColumn($id: String!,$boardId: String!) {
        deleteColumn(id: $id, boardId: $boardId) {
        id
        boardId
        }
    }
`;

export { CREATE_COLUMN, UPDATE_COLUMN, DELETE_COLUMN};