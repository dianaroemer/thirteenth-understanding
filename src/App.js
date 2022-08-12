import logo from './logo.svg';
import React, {useEffect, useState} from 'react';
import {link} from "react-router-dom";
import './App.css';

import ClockNav from './Components/ClockNav';
import Menu from './Components/Menu';


function App() {

  const [coffeesImbibed, setCoffeesImbibed] = useState(2);

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

  // Functionality for toggling animated navMenu in mobile and desktop
  const [menuCheck, toggleMenuCheck] = useState(false);
  function handleToggleMenuCheck(e){
      toggleMenuCheck(!menuCheck);
  }
  const [navClassesString, setNavClassesString] = useState('navMenu')
  useEffect( () => {
    if(menuCheck) {
      setNavClassesString('navMenu open')
    } else {
      setNavClassesString('navMenu')
    }
  }, [menuCheck])

  // Functionality for managing blind mode - hiding information from users until it's appropriately clicked on or enabled by disabling blind mode
  const [blindMode, toggleBlindMode] = useState(true);
  const [seenEncounters, setSeenEncounters] = useState({
    e1: false,
    e2: false,
    e3: false,
    e4: false,
    e5: false,
    e6: false,
    e7: false,
    e8: false,
    e9: false,
    e10: false,
  })
  function handleToggleBlindMode(e) {
    e.preventDefault();
    toggleBlindMode(!blindMode)
    console.log(seenEncounters)
    setSeenEncounters({
      e1: true,
      e2: true,
      e3: true,
      e4: true,
      e5: true,
      e6: true,
      e7: true,
      e8: true,
      e9: true,
      e10: true,
  })
  }
  function handleClickNavEncounter(e, targetEncounter){
    e.preventDefault();
    setSeenEncounters({
      ...seenEncounters,
      [targetEncounter]: true,
    })
    console.log('here');
    console.log(seenEncounters)
    console.log(blindMode)
  }
  

  return (
    <div className="App"
      style={darkMode ? {background: '#33373a', color: '#fff'} : {}}>

      {/* <div className='backgroundTitle'>
          XIII
      </div> */}

      <nav className='sideBarNav'>
        <ClockNav darkMode={darkMode} 
          isMobileViewport={isMobileViewport}
          menuCheck={menuCheck}
          handleToggleMenuCheck={handleToggleMenuCheck}
          />
        {/* If you aren't on mobile and menuCheck isn't true, show menu at all times  */}
        { (!isMobileViewport) && 
          <div className='navMenu open'>
            <Menu blindMode={blindMode}
              seenEncounters={seenEncounters}
              handleClickNavEncounter={handleClickNavEncounter}
              darkMode={darkMode}/>
          </div>}
        {/* If you are on mobile, this menu shows */}
        {isMobileViewport && 
        <div className={navClassesString}>
          <Menu blindMode={blindMode}
            seenEncounters={seenEncounters}
            handleClickNavEncounter={handleClickNavEncounter}
            darkMode={darkMode}/>
        </div>}

      </nav>



      <div className='appContent'>
       <button onClick={e => handleDarkModeToggle(e)}>
            Darkmode Toggle</button>

        <div className='shitGoesHere'>
          <p>
            something here
          </p>
        </div>
        <div className='toolBox'>
          Expand Toolbox
        </div>
        <div className='blindModeContainer'>
          <button onClick={e=> handleToggleBlindMode(e)}>
            Toggle Blind Run Mode
          </button>
        </div>
        
        <div className='backgroundTitle'>
          XIII
        </div>



      </div>

    </div>
  );
}

export default App;
