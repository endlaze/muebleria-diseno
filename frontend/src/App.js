import React from 'react';
import './App.css';
import ClientHome from './pages/ClientHome/ClientHome'
import Navbar from './components/Navbar/Navbar'
import AddWorkplace from './components/AddWorkplace'
import AddEmployee from './components/AddEmployee'
import AddFurniture from './components/AddFurniture'

const App = () => {
  return (
    <>
    {/* <Navbar/>
    <div className="App">
      <ClientHome></ClientHome>
    </div> */}
    <AddFurniture/>
    </>
  );
}

export default App;
