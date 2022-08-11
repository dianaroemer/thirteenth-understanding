import logo from './logo.svg';
import React, {useState} from 'react';
import {link} from "react-router-dom";
import './App.css';


function App() {

  const [darkMode, toggleDarkMode] = useState(false);
  const [darkStyle, setDarkStyle] = useState({
    backgroundColor: '',
    color: '',
  })

  function handleDarkModeToggle(e){
    e.preventDefault();
    if(darkMode) {
      setDarkStyle({
        backgroundColor: '',
        color: '',
      })
      toggleDarkMode(!darkMode);
    } else {
      setDarkStyle({
        backgroundColor: '#333',
        color: '#fff',
      })
      toggleDarkMode(!darkMode);
    }
  }




  return (
    <div className="App"
      // style={darkStyle}
      style={darkMode ? {background: '#333', color: '#fff'} : {}}
      >

      <nav className='appNav'
      style={darkMode ? {background: '#1c1c1c'} : {}}
      //   style={{
      //   borderBottom: "solid 1px",
      //   paddingBottom: "1rem",
      // }}
      >
        <div className='titleContainer navContainer'>
          <h1 className='navTitle'>
            13th Understanding
          </h1>
          <div className='titleQuote'>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;—&nbsp;"To rend one's enemies is to see them not as equals, but objects—hollow of spirit and meaning."
          </div>
        </div>
        <div className='navClockContainer navContainer'>
          <h2>
            CLOCK
          </h2>
        </div>
        <div className='navOtherThings navContainer'>
          <h5>
          This webpage is designed to help with the King's Fall Day 1 Raid race
          </h5>
          <button onClick={e => handleDarkModeToggle(e)}>
            Darkmode Toggle
          </button>

        </div>

      </nav>
      <div className='appContent'>
        <p>
          something here
        </p>
        <p> and here</p>
      </div>

      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
