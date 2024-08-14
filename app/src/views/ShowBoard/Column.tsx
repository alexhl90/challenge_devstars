import { useMemo, useContext } from "react"
import Card from "./Card"
import { GET_COLUMN_CARDS } from "../../graphql/queries/card"
import { useQuery } from '@apollo/client';
import { DnDContext } from "../../contexts/dndContexts";

const ColumnComponent = ({
    columnInfo,
    isLoadingRefetch,
}) => {
    const { loading, error, data,  } = useQuery(GET_COLUMN_CARDS, { variables: { columnId: columnInfo?.id }, fetchPolicy: 'no-cache' });
    const { setContainer } = useContext(DnDContext);
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
        </div>
    );
};

export default ColumnComponent;
