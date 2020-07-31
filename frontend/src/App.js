import React from 'react';
import './App.css';
import ClientHome from './pages/ClientHome/ClientHome'
import Navbar from './components/Navbar/Navbar'
import AddWorkplace from './components/AddWorkplace'
import AddEmployee from './components/AddEmployee'
import AddFurniture from './components/AddFurniture'
import AddPromotion from './components/AddPromotion'
import {StoreProvider} from './Store'

const App = () => {
  return (
    //<StoreProvider>
    //<Navbar/>
    //<div className="App">
      //<ClientHome></ClientHome>
    //</div>
      /*{*/ /*<AddFurniture/>*/ /*}*/
    //</StoreProvider>
    <AddPromotion/>
  );
}

export default App;
