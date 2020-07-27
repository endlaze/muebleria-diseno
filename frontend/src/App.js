import React from 'react';
import './App.css';
import ClientHome from './containers/ClientHome'
import Navbar from './components/Navbar/Navbar'
const App = () => {
  return (
    <>
    <Navbar/>
    <div className="App">
      <ClientHome></ClientHome>
    </div>
    </>
  );
}

export default App;
