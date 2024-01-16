import { Route, Routes } from 'react-router-dom';

import Works from '../Works/Works';
import Home from '../Home/Home';
import Header from '../Header/Header';
import Results from '../Results/Results';

import './App.css';

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/works" element={<Works/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/results' element={<Results/>}/>
        <Route path="/*" element={<Home />} />
      </Routes>
    </>
  )
}

export default App
