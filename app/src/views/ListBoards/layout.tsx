import { GET_BOARDS } from "../../graphql/queries/board"
import { useQuery } from '@apollo/client';
import { Link } from "react-router-dom";
import BoardNavBar from "../../components/navbar"


const BoardsView = () => {
  const { loading, error, data, } = useQuery(GET_BOARDS);
  return (
    <>
      <BoardNavBar buttonAction={() => { }} buttonText={"New Board"} />
      <section className="flex-col justify-center items-center">
        <div className="flex justify-center items-center h-16">
          <h1 className="text-3xl font-bold">Select a board</h1>
        </div>
        {loading && (<p>Loading...</p>)}
        {error && <p>Error...</p>}
        <ol className="grid grid-cols-4 gap-4 mx-10">
          {data && data.boards.map((board) => (
            <Link to={`/board/${board.id}`}>
              <li className="bg-blue-500 text-white text-center font-bold py-4 rounded-lg" key={board.id}>
                {board.name}</li>
            </Link>
          ))}
          {data && data.boards.length === 0 && <p>No boards found.</p>}
        </ol>
      </section>
    </>
  )
}

export default BoardsView
