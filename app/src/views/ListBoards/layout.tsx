import { useState, useMemo } from "react"
import { GET_BOARDS } from "../../graphql/queries/board";
import { DELETE_BOARD } from "../../graphql/mutations/board"
import { useQuery, useMutation } from '@apollo/client';
import BoardNavBar from "../../components/navbar"
import CreateBoardModal from "../../components/createBoardModal"
import BoardCard from "./BoardCard"

const BoardsView = () => {
  const { loading, error, data, refetch: reloadBoards } = useQuery(GET_BOARDS);
  const [deleteBoardM, _] = useMutation(DELETE_BOARD);
  const [showModal, setShowModal] = useState(false);
  const [editBoardInfo, setEditBoardInfo] = useState({});

  const handleReload = useMemo(() => () => {
    reloadBoards()
  }, []);

  const deleteBoard = useMemo(() => async (boardId: React.Key) => {
    await deleteBoardM({ variables: { id: boardId } })
    reloadBoards()
  }, []);

  return (
    <>
      <BoardNavBar buttonAction={() => {
        setEditBoardInfo({})
        setShowModal(true)
      }} buttonText={"New Board"} />
      <section className="flex-col justify-center items-center">
        <div className="flex justify-center items-center h-16">
          <h1 className="text-3xl font-bold">Select a board</h1>
        </div>
        {loading && (<p>Loading...</p>)}
        {error && <p>Error...</p>}
        <ol className="grid grid-cols-4 gap-4 mx-10">
          {data && data.boards.map((board: {
            id: React.Key,
            name: string,
          }) => (
            <BoardCard
              key={board.id}
              board={board}
              onEdit={() => {
                setEditBoardInfo(board)
                setShowModal(true)
              }}
              onDelete={() => {
                deleteBoard(board.id);
                handleReload();
              }}
            />
          ))}
          {data && data.boards.length === 0 && <p>No boards found.</p>}
        </ol>
      </section>
      {showModal && <CreateBoardModal isOpen={showModal} onClose={() => setShowModal(false)} initialData={editBoardInfo} reload={handleReload} />}
    </>
  )
}

export default BoardsView
