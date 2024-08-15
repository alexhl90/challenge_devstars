import { useParams } from 'react-router-dom';
import ColumnComponent from "./Column"
import { GET_COLUMNS } from "../../graphql/queries/column"
import { useQuery } from '@apollo/client';
import { useMemo, useState } from 'react';
import { DnDProvider } from "../../contexts/dndContexts";
import CreateCardModal from '../../components/createCardModal';
import CreateColumnModal from '../../components/createColumnModal';

const KanbanBoard = (
  { createModalState, createColumnState }
) => {
  const { boardId } = useParams();
  const { loading, error, data, refetch } = useQuery(GET_COLUMNS, {
    variables: { boardId: boardId }
  });

  const [isOpenCreateCard, setIsOpenCreateCard] = createModalState;
  const [loadingRefetch, setLoadingRefetch] = useState(false);

  const reloadBoard = useMemo(() => async () => {
    setLoadingRefetch(true);
    await refetch();
    setLoadingRefetch(false);
  })
  return (
    <DnDProvider reloadBoard={reloadBoard}>
      <div className="flex space-x-4 p-4" >
        {(loading) && <p>Loading columns...</p>}
        {error && <p>Error Loading columns...</p>}
        {
          (data && !loadingRefetch) && data.columns.map((col) => (
            <ColumnComponent
              key={col.id}
              columnInfo={col}
              isLoadingRefetch={loadingRefetch}
            />
          ))
        }
        {!loading && data && data.columns.length === 0 && <p className="h-80 text-center">Create a column</p>}

      </div >
      {isOpenCreateCard && <CreateCardModal isOpen={isOpenCreateCard} onClose={() => setIsOpenCreateCard(false)} columns={data.columns} />}
      {createColumnState[0] && <CreateColumnModal isOpen={createColumnState[0]} onClose={() => createColumnState[1](false)} initialData={{}} />}
    </DnDProvider>
  );
};

export default KanbanBoard;
