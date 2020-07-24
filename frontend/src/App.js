import React from 'react';
import logo from './logo.svg';
import './App.css';
import ClientHome from './containers/ClientHome'
import Navbar from './components/Navbar'
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
