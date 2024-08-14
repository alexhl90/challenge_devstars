import { gql } from '@apollo/client';

const CREATE_CARD = gql`
    mutation CreateCard($assignedTo: String!, $boardId: String!, $columnId: String!, $description: String!, $priority: Int!, $title: String!) {
        createCard(assignedTo: $assignedTo, boardId: $boardId, columnId: $columnId, description: $description, priority: $priority, title: $title
    )
        {
            id
            title
            description
            assignedTo
            priority
            boardId
            columnId
            createdAt
        }
    }
`;

const UPDATE_CARD = gql`
    mutation UpdateCard($id: String!,$assignedTo: String!, $columnId: String!, $description: String!, $priority: Int!, $title: String!) {
        updateCard(id: $id, assignedTo: $assignedTo, columnId: $columnId, description: $description, priority: $priority, title: $title
    )
        {
            id
            title
            description
            assignedTo
            priority
            boardId
            columnId
            createdAt
        }
    }
`;

const UPDATE_CARD_COLUMN = gql`
    mutation UpdateCardColumn($cardId: String!, $columnId: String!, $newColumnId: String!) {
        updateCardColumn(id: $cardId, columnId: $columnId, newColumnId: $newColumnId){
            columnId
            id
        }
    }
`;

const DELETE_CARD = gql`
    mutation DeleteCard($cardId: String!, $columnId: String!) {
        deleteCard(id: $cardId, columnId: $columnId){
            id
            columnId
        }
    }
`;



export { UPDATE_CARD_COLUMN, CREATE_CARD, DELETE_CARD, UPDATE_CARD};