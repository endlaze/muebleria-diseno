import React from 'react';
import './App.css';
import ClientHome from './pages/ClientHome/ClientHome'
import Navbar from './components/Navbar/Navbar'
import AddWorkplace from './components/AddWorkplace'
import AddEmployee from './components/AddEmployee'
import AddFurniture from './components/AddFurniture'
import {StoreProvider} from './Store'
import Checkout from './pages/Checkout'
import Routes from './Routes';


const App = () => {
  return (
    <div className="App">
      
      <StoreProvider>
        <Routes/>
      </StoreProvider>
    
    </div>
  );
}

export default App;
