import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import BoardNavBar from "../../components/navbar";
import { GET_BOARD } from "../../graphql/queries/board"
import { useQuery } from '@apollo/client';
import KanbanBoard from "./Board";



const BoardLayaout = () => {
  const { boardId } = useParams();
  const { loading, error, data } = useQuery(GET_BOARD, { variables: { boardId: boardId } });

  const createModalState = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  return (
    <>

      <BoardNavBar buttonAction={() => createModalState[1](true)} buttonText={"New Card"} />
      <section className="flex-col justify-center items-center">
        <div className="flex justify-center items-center h-16 text-3xl font-bold">
          {loading && (<p>Loading board info...</p>)}
          {error && <p>Error fetching board info...</p>}
          {data && data?.board.name}
        </div>
        {!loading && data && <KanbanBoard createModalState={createModalState} />}


      </section>
    </>
  )
}

export default BoardLayaout
