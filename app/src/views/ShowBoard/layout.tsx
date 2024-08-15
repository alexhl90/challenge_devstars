import { useState } from 'react';
import { useParams } from 'react-router-dom';
import BoardNavBar from "../../components/navbar";
import { GET_BOARD } from "../../graphql/queries/board"
import { useQuery } from '@apollo/client';
import KanbanBoard from "./Board";



const BoardLayaout = () => {
  const { boardId } = useParams();
  const { loading, error, data } = useQuery(GET_BOARD, { variables: { boardId: boardId } });

  const createCardState = useState(false);
  const createColumnState = useState(false);

  return (
    <>

      <BoardNavBar buttonAction={() => createCardState[1](true)} buttonText={"New Card"} />
      <section className="flex-col justify-center items-center">
        <div className="flex justify-center items-center h-16 text-3xl font-bold">
          {loading && (<p>Loading board info...</p>)}
          {error && <p>Error fetching board info...</p>}
          {data && data?.board.name}
        </div>
        {!loading && data && <KanbanBoard createModalState={createCardState} createColumnState={createColumnState} />}
        <footer className="bg-gray-800 text-white p-4 flex justify-end">
          <button className="bg-slate-300 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded" onClick={() => createColumnState[1](true)}>
            Create column
          </button>
        </footer>
      </section>
    </>
  )
}

export default BoardLayaout
