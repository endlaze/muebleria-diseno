import React from 'react';
import './App.css';
import ClientHome from './pages/ClientHome/ClientHome'
import Navbar from './components/Navbar/Navbar'
import AddWorkplace from './components/AddWorkplace'

const App = () => {
  return (
    <>
    {/* <Navbar/>
    <div className="App">
      <ClientHome></ClientHome>
    </div> */}
    <AddWorkplace/>
    </>
  );
}

export default App;
