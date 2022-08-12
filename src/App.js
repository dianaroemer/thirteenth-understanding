import logo from './logo.svg';
import React, {useEffect, useState} from 'react';
import {link} from "react-router-dom";
import './App.css';

import ClockNav from './Components/ClockNav';
import Menu from './Components/Menu';


function App() {

  const [coffeesImbibed, setCoffeesImbibed] = useState(1);

  const [darkMode, toggleDarkMode] = useState(true);
  function handleDarkModeToggle(e){
    e.preventDefault();
    toggleDarkMode(!darkMode);
    console.log(window.innerWidth);
  }

  const [viewportWidth, setViewportWidth] = useState(window.innerWidth)
  window.onresize = handleWindowResize
  function handleWindowResize() {
    // console.log(window.innerHeight, window.innerWidth);
    setViewportWidth(window.innerWidth);
  }

  const [isMobileViewport, toggleMobileViewport] = useState((window.innerWidth > 768))
  useEffect(() => {
    if(viewportWidth > 768) {
      toggleMobileViewport(false)
    } else {
      toggleMobileViewport(true)
    }
  }, [viewportWidth])

  return (
    <div className="App"
      style={darkMode ? {background: '#33373a', color: '#fff'} : {}}>

      <nav className='sideBarNav'>
        <ClockNav darkMode={darkMode} isMobileViewport={isMobileViewport}/>
        <Menu />
        <div>
          and also this
        </div>
      </nav>
      {/* <nav className='appNav'
        style={darkMode ? {background: '#1c1c1c'} : {}}>

        <div className='navClockContainer navContainer'>
          <div className='navClock'>
            CLOCK
          </div>
        </div>
      </nav> */}

      <div className='appContent'>
       <button onClick={e => handleDarkModeToggle(e)}>
            Darkmode Toggle</button>

        <div className='shitGoesHere'>
          <p>
            something here
          </p>
          <p> 
            and here
          </p>
        </div>
      <div className='toolBox'>
        Expand Toolbox
      </div>

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
