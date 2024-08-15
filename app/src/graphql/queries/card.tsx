import { gql } from '@apollo/client';

const GET_COLUMN_CARDS = gql`
query CardsByBoard ($columnId: String!) {
    cardsByColumn(columnId: $columnId) {
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

export { GET_COLUMN_CARDS };