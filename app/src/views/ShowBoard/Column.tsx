import { useMemo, useContext, useState } from "react"
import Card from "./Card"
import { GET_COLUMN_CARDS } from "../../graphql/queries/card"
import { DELETE_COLUMN } from "../../graphql/mutations/column"
import { useQuery, useMutation } from '@apollo/client';
import { DnDContext } from "../../contexts/dndContexts";
import CreateColumnModal from '../../components/createColumnModal';

const ColumnComponent = ({
    columnInfo,
    isLoadingRefetch,
}) => {
    const { loading, error, data, } = useQuery(GET_COLUMN_CARDS, { variables: { columnId: columnInfo?.id }, fetchPolicy: 'no-cache' });
    const { setContainer, reloadBoard } = useContext(DnDContext);
    const [editColumnModal, setEditColumnModal] = useState(false);

    const [deleteColMutation, { data: deleteResponse }] = useMutation(DELETE_COLUMN);

    const handleDeleteCol = useMemo(() => async (colInfo) => {
        await deleteColMutation({
            variables: { boardId: colInfo.boardId, id: colInfo.id },
        });
        reloadBoard();
    }, [])
    const onDragEnterHandler = useMemo(() => {
        return (id: string) => setContainer(id)
    }, []);
    return (
        <div key={columnInfo.key} className="w-1/3 bg-gray-100 p-4 rounded-lg shadow-lg" onDragEnter={() => onDragEnterHandler(columnInfo.id)}>
            <h2 className="text-lg font-bold mb-4">{columnInfo.title}</h2>
            <ul className="space-y-2 blue h-auto">
                {loading && <p>Loading cards...</p>}
                {error && <p>Error Loading cards...</p>}
                {!isLoadingRefetch && data && data?.cardsByColumn?.map((card: object) => (
                    <Card key={card.id} cardInfo={card} />
                ))}
                {!loading && data && data.cardsByColumn.length === 0 && <p className="h-80">No Cards found</p>}
            </ul>

            <div className="flex justify-between items-end">

                <button className="text-gray-500 hover:text-gray-700 hover:text-lg mt-6" onClick={() => setEditColumnModal(true)}>
                    Edit ✎
                </button>
                <button className="text-gray-500 hover:text-gray-700 hover:text-lg mt-6" onClick={() => handleDeleteCol(columnInfo)}>
                    Delete ✖
                </button>
            </div>
            {editColumnModal && <CreateColumnModal isOpen={editColumnModal} onClose={() => setEditColumnModal(false)} initialData={columnInfo} />}
        </div>
    );
};

export default ColumnComponent;
