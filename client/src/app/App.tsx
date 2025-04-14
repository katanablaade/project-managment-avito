import { Routes, Route, Navigate } from 'react-router-dom';
import Boards from '../pages/Boards';
import Issues from '../pages/Issues';
import Board from '../pages/Board';
import Modal from '../containers/Modal';

function App() {
  return (
    <>
      <Routes>
        <Route path={'/'} element={<Navigate to="/boards" />} />
        <Route path={'/boards'} element={<Boards />} />
        <Route path={'/board/:id'} element={<Board />} />
        <Route path={'/issues'} element={<Issues />} />
      </Routes>
      <Modal />
    </>
  );
}

export default App;
