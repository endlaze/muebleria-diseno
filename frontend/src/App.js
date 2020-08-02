import React from 'react';
import './App.css';
import {StoreProvider} from './Store'
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
