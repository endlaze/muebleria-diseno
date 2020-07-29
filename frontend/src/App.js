import React from 'react';
import './App.css';
import ClientHome from './pages/ClientHome/ClientHome'
import Navbar from './components/Navbar/Navbar'
import AddWorkplace from './components/AddWorkplace'
import AddEmployee from './components/AddEmployee'
import AddFurniture from './components/AddFurniture'
import {StoreProvider} from './Store'
import Routes from './Routes';

const App = () => (
    // <StoreProvider>
    // <Navbar/>
    // <div className="App">
    //   <ClientHome></ClientHome>
    // </div>
    <Routes/> 
    // </StoreProvider>
  );


export default App;
