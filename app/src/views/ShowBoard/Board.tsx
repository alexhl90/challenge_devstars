import { useParams } from 'react-router-dom';
import ColumnComponent from "./Column"
import { GET_COLUMNS } from "../../graphql/queries/column"
import { useQuery, useLazyQuery } from '@apollo/client';
import { useMemo, useRef, useState } from 'react';
import { DnDProvider } from "../../contexts/dndContexts";
import CreateCardModal from '../../components/createCardModal';

const KanbanBoard = (
  { createModalState }
) => {
  const { boardId } = useParams();
  const { loading, error, data, refetch } = useQuery(GET_COLUMNS, {
    variables: { boardId: boardId }
  });

  const [isOpenCreateCard, setIsOpenCreateCard] = createModalState;
  const [loadingRefetch, setLoadingRefetch] = useState(false);
  const dragItem = useRef();
  const onDropItem = useRef();

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
      </div >
      {isOpenCreateCard && <CreateCardModal isOpen={isOpenCreateCard} onClose={() => setIsOpenCreateCard(false)} columns={data.columns} />}
    </DnDProvider>
  );
};

export default KanbanBoard;
