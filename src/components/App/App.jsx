import { Route, Routes } from 'react-router-dom';

import Works from '../Works/Works';
import Home from '../Home/Home';
import Header from '../Header/Header';
import Results from '../Results/Results';
import Footer from '../Footer/Footer';

import './App.css';

function App() {
  return (
    <div className='App'>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/works" element={<Works/>}/>
        <Route path='/results' element={<Results/>}/>
        <Route path="/*" element={<Home/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App;
