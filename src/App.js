import logo from './logo.svg';
import React, {useState} from 'react';
import {link} from "react-router-dom";
import './App.css';

import ClockNav from './Components/ClockNav';


function App() {

  const [coffeesImbibed, setCoffeesImbibed] = useState(1);

  const [darkMode, toggleDarkMode] = useState(true);
  // const [darkStyle, setDarkStyle] = useState({
    // backgroundColor: '',
    // color: '',
  // })

  function handleDarkModeToggle(e){
    e.preventDefault();
    toggleDarkMode(!darkMode);
    
    // if(darkMode) {
    //   setDarkStyle({
    //     backgroundColor: '',
    //     color: '',
    //   })
    //   toggleDarkMode(!darkMode);
    // } else {
    //   setDarkStyle({
    //     backgroundColor: '#333',
    //     color: '#fff',
    //   })
    //   toggleDarkMode(!darkMode);
    // }
  }




  return (
    <div className="App"
      style={darkMode ? {background: '#33373a', color: '#fff'} : {}}>

      <nav className='sideBarNav'>
        <ClockNav darkMode={darkMode}/>
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
