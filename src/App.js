import React, {useEffect, useState} from 'react';
import {Outlet} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPeopleGroup  } from '@fortawesome/free-solid-svg-icons';

import './App.css';
import './Styles/EncounterStyling.css';


import ClockNav from './Components/ClockNav';
import Menu from './Components/Menu';
import BreakMenu from './Components/BreakMenu';




function App() {

  const [coffeesImbibed, setCoffeesImbibed] = useState(5);

  const [darkMode, toggleDarkMode] = useState(true);
  function handleDarkModeToggle(e){
    e.preventDefault();
    toggleDarkMode(!darkMode);
    // console.log(window.innerWidth);
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
    toggleBlindMode(false)
    // console.log(seenEncounters)
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
  }
  
  const [expandClocks, toggleExpandClocks] = useState(false);
  function handleExpandClocks(e) {
      e.preventDefault();
      toggleExpandClocks(!expandClocks);
  }
  const [appContentClassString, setAppContentClassString] = useState('appContent');
  useEffect(()=>{
    if(expandClocks){
      setAppContentClassString('appContent expand')
    } else {
      setAppContentClassString('appContent')
    }
  }, [expandClocks])

  const [raidStateKF, setRaidStateKF] = useState({
    e1: {
        startTime: new Date(1661533200000),
        attempts: 0,
        completed: false,
    },
    e2: {
        startTime: new Date(),
        attempts: 0,
        completed: false,
    },
    e3: {
        startTime: new Date(),
        attempts: 0,
        completed: false,
    },
    e4: {
        startTime: new Date(),
        attempts: 0,
        completed: false,
    },
    e5: {
        startTime: new Date(),
        attempts: 0,
        completed: false,
    },
    e6: {
        startTime: new Date(),
        attempts: 0,
        completed: false,
    },
    e7: {
        startTime: new Date(),
        attempts: 0,
        completed: false,
    },
    e8: {
        startTime: new Date(),
        attempts: 0,
        completed: false,
    },
    e9: {
        startTime: new Date(),
        attempts: 0,
        completed: false,
    },
    e1c: {
        startTime: new Date(),
        attempts: 0,
        completed: false,
    },
    e2c: {
        startTime: new Date(),
        attempts: 0,
        completed: false,
    },
    e3c: {
        startTime: new Date(),
        attempts: 0,
        completed: false,
    },
    e4c: {
        startTime: new Date(),
        attempts: 0,
        completed: false,
    },
    e5c: {
        startTime: new Date(),
        attempts: 0,
        completed: false,
    },
    e6c: {
        startTime: new Date(),
        attempts: 0,
        completed: false,
    },
    e7c: {
        startTime: new Date(),
        attempts: 0,
        completed: false,
    },
    e8c: {
        startTime: new Date(),
        attempts: 0,
        completed: false,
    },
    e9c: {
        startTime: new Date(),
        attempts: 0,
        completed: false,
        completionTime: null,
    }
  });
  const [mostRecentEncounterCompletion, setMostRecentEncounter] = useState(new Date())
  function handleRaidStateUpdate(e, raid, encounter, targetField, newValue) {
      e.preventDefault();

      if( raid === "kf"){
          setRaidStateKF({
              ...raidStateKF,
              [encounter]: {
                  ...raidStateKF[encounter],
                  [targetField]: newValue,
              }
          })
      }

      // console.log(raidStateKF)
  }
  function handleEncounterCompletion(e, raid, encounter) {
    e.preventDefault()
    // console.log(raidStateKF.e2, raidStateKF.e3)

    if(raid === 'kf'){
      if(raidStateKF[encounter].completed) {
        return; // If this encounter is already completed, do nothing.
      }
      if(encounter === 'e9') {
        setRaidStateKF({
          ...raidStateKF,
          [encounter]: {
            ...raidStateKF[encounter],
            completed: true,
          },
          e1c: {
            ...raidStateKF[`e1c`],
            startTime: new Date(),
          }
        })
      } else if(encounter === 'e9c'){ 
        setRaidStateKF({
          ...raidStateKF,
          e9c: {
            completed: true,
            completionTime: new Date(),
          }
        })
      } else if(encounter.length === 3 ) {
        setRaidStateKF({
          ...raidStateKF,
          [encounter]: {
            ...raidStateKF[encounter],
            completed: true,
          },
          [`e`+(Number(encounter[1])+1)+`c`]: {
            ...raidStateKF[`e`+(Number(encounter[1])+1)+`c`],
            startTime: new Date(),
          }
        })
      } else {
        setRaidStateKF({
          ...raidStateKF,
          [encounter]: {
            ...raidStateKF[encounter],
            completed: true,
          },
          [`e`+(Number(encounter[1])+1)]: {
            ...raidStateKF[`e`+(Number(encounter[1])+1)],
            startTime: new Date(),
          }
        })
      }
      
      // Set most recent raid encounter completion 
      setMostRecentEncounter(new Date())

      // Flush new changes to localStorage  here XXXUPDATEXXX
    }
  }

  const [challengeMode, toggleChallengeMode] = useState(false)
  function handleChallengeModeToggle(e){
    e.preventDefault();
    if( !blindMode || raidStateKF.e9.completed)
    toggleChallengeMode(!challengeMode)
  }

  // XXXUPDATEXXX ENABLE THIS WHENEVER DEPLOYING XXXUPDATEXXX
  const [welcomePane, toggleWelcomePane] = useState(false);

  const [breaks, setBreaks] = useState([
    { breakStart: new Date(1660769861000), 
    duration: 0, }
  ])
  const [remainingBreakDuration, setRemainingBreakDuration] = useState(0);
  function addBreak(e, duration){
    e.preventDefault();
    if(remainingBreakDuration === 0){
      setBreaks(() => [...breaks, {breakStart: new Date(), duration: duration}]);
      setRemainingBreakDuration((remainingBreakDuration)=>remainingBreakDuration + duration)
    } else {
      setBreaks( (()=> {
        let old = [...breaks];
        old[breaks.length-1] = {
          breakStart: old[breaks.length-1].breakStart,
          duration: breaks[breaks.length-1].duration + duration,}
        return old;
        }))
        setRemainingBreakDuration( () => remainingBreakDuration + duration);
    }

    (() => console.log(breaks, remainingBreakDuration))();
    
  }
  // Countdown remainingBreakDuration, once every second, until remainingbreakDuration == 0
  useEffect(() => {
    let breakTimer;
    if(remainingBreakDuration > 0){
      breakTimer = setInterval(
        ()=>{setRemainingBreakDuration(()=>remainingBreakDuration - 1)}, 
        1000) 
    }
    return (()=> clearInterval(breakTimer));
  }, [remainingBreakDuration])

  


  return (
    <div className="App"
      style={darkMode ? {backgroundColor: '#33373a', color: '#fff'} : {}}>

      {/* <div className='backgroundTitle'>
          XIII
      </div> */}



      <div className='sideBarNav' style={darkMode ? {background: '#24282a'} : {background: 'grey'}}>
        <ClockNav darkMode={darkMode} 
          isMobileViewport={isMobileViewport}
          menuCheck={menuCheck}
          handleToggleMenuCheck={handleToggleMenuCheck}
          expandClocks={expandClocks}
          handleExpandClocks={handleExpandClocks}
          mostRecentEncounterCompletion={mostRecentEncounterCompletion}
          />
        {/* If you aren't on mobile and menuCheck isn't true, show menu at all times  */}
        { (!isMobileViewport) && 
          <div className='navMenu open'>
            <Menu blindMode={blindMode}
              seenEncounters={seenEncounters}
              handleClickNavEncounter={handleClickNavEncounter}
              darkMode={darkMode}
              raidStateKF={raidStateKF}
              inChallengeMode={challengeMode}
              handleChallengeModeToggle={handleChallengeModeToggle}/>
          </div>}
        {/* If you are on mobile, this menu shows */}
        {isMobileViewport && 
        <div className={navClassesString}>
          <Menu blindMode={blindMode}
            seenEncounters={seenEncounters}
            handleClickNavEncounter={handleClickNavEncounter}
            darkMode={darkMode}
            raidStateKF={raidStateKF}
            inChallengeMode={challengeMode}
            handleChallengeModeToggle={handleChallengeModeToggle}/>
        </div>}

      </div>



      <div className={appContentClassString}>
        {/* If this is the user's first time coming to this website, show them welcome pane with tips. */}
        {welcomePane && <div className='welcomePaneContainer' onClick={e=> toggleWelcomePane(false)}>
            <div className='welcomePane'>
              <div className='welcomePaneHeader'> 
                Welcome to 13th Understanding, a Destiny 2 raid race assistant.
              </div>
              <div className='welcomePaneContent'>
                <ul>
                  <li>
                    Click the top timer to cycle through visibile timers
                  </li>
                  <li>
                    Disable Blind-Run mode from Tools. This cannot be undone
                  </li>
                  <li>
                    Access Challenge Mode by disabling Blind-Run mode or completing the final normal encounter
                  </li>
                  <li>
                    Add your fireteam members in Tools for easy role assignment in encounters
                  </li>
                </ul>
                <div style={{textAlign: 'center', fontSize: 'small'}}>
                  Click anywhere to close this tooltip  
                </div>
                
              </div>
            </div>
          </div>}

          <Outlet context={[raidStateKF,handleRaidStateUpdate, handleEncounterCompletion]}/>


        {/* <div className='shitGoesHere'>

        </div> */}
        <div className='toolBox'>
          Expand Toolbox (not implemented yet)

          <button onClick={e => handleDarkModeToggle(e)}>
            Darkmode Toggle
          </button>
          <div className='blindModeContainer'>
            <button onClick={e=> handleToggleBlindMode(e)}>
              Disable Blind Run Mode
            </button>
          </div>
          <button onClick={e => handleRaidStateUpdate(e, 'kf', 'e2', 'completed', true)}>Test handleRaidStateUpdate completion</button>
          <button onClick={e => handleRaidStateUpdate(e, 'kf', 'e2', 'attempts', (raidStateKF.e2.attempts+1))}>Test handleRaidStateUpdate attemps</button>
          <button onClick={e => handleEncounterCompletion(e, 'kf', 'e2')}>Test handleEncounterCompletion</button>
          <button onClick={e => handleEncounterCompletion(e, 'kf', 'e9')}>Test handleEncounterCompletion e9</button>
          <button onClick={e => handleEncounterCompletion(e, 'kf', 'e2c')}>Test handleEncounterCompletion e2c</button>
          <button onClick={e => addBreak(e, 5)}>
            Test add break, 5 seconds
          </button>
          <button onClick={e => addBreak(e, 20)}>
            Test add break, 20 seconds
          </button>
          <button onClick={e => addBreak(e, 60)}>
            Test add break, 60 seconds
          </button>
          <button onClick={e => addBreak(e, 3540)}>
            Test add break, 59 minutes
          </button>
          <button onClick={e => console.log( breaks,' & ', remainingBreakDuration)}>state check</button>
          {remainingBreakDuration !== 0 && remainingBreakDuration}

          <div className='fireteamMenuContainer'>
            Set Fireteam 
          <FontAwesomeIcon icon={faPeopleGroup} style={{color:''}}/>
          </div>
          

        </div>

        {/* <div className='backgroundTitle'>
          XIII
        </div> */}

        <BreakMenu 
          breaks={breaks}
          remainingBreakDuration={remainingBreakDuration}
          addBreak={addBreak}/>


      </div>

    </div>
  );
}

export default App;