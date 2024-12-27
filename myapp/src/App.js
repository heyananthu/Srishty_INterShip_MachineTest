import logo from './logo.svg';
import './App.css';
import { BrowerRouter, Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './Components/Home';
import Data from './Components/Data'
import Resume from './Components/Resume'
import ViewResume from './Components/ViewResume'
function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/data' element={<Data />} />
          <Route path='/resume' element={<Resume />} />
          <Route path='/viewresume' element={<ViewResume />} />
        </Routes>
      </div>
    </BrowserRouter >
  );
}

export default App;
