import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import InsertData from "./Components/insertData";
import DeletingRecords from "./Components/deletingRecords";
import GettingRank from "./Components/gettingRank";
import UpdatingScore from "./Components/updatingScore";
import ViewData from "./Components/viewData";
import Navbar from './Components/navBar';


const routes = [
  {
    path: '/',
    element: <InsertData />,
  },
  {
    path: '/delete-data',
    element: <DeletingRecords />,
  },
  {
    path: '/get-rank',
    element: <GettingRank />,
  },
  {
    path: '/update-score',
    element: <UpdatingScore />,
  },
  {
    path: '/view-data',
    element: <ViewData />,
  },
];

const router = createBrowserRouter(routes);

function App() {
  return (
    <>
     <Navbar />
     <RouterProvider router={router} />
    </>
  );
}

export default App;
