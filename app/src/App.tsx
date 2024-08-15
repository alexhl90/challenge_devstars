import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import BoardsView from './views/ListBoards/layout';
import Board from './views/ShowBoard/layout';

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <BoardsView />,
    },
    {
      path: "board/:boardId",
      element: <Board />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
