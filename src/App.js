import React, {useCallback, useEffect, useState} from 'react';
import {Outlet, useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPeopleGroup, faScrewdriverWrench, faPenToSquare, faCheck, faX  } from '@fortawesome/free-solid-svg-icons';

import './App.css';
import './Styles/EncounterStyling.css';


import ClockNav from './Components/ClockNav';
import Menu from './Components/Menu';
import BreakMenu from './Components/BreakMenu';





// localStorage functionality goes here
let useLocalStorage = false;

function storageAvailable(type) {
  var storage;
  try {
      storage = window[type];
      var x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
  }
  catch(e) {
      return e instanceof DOMException && (
          // everything except Firefox
          e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === 'QuotaExceededError' ||
          // Firefox
          e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
          // acknowledge QuotaExceededError only if there's something already stored
          (storage && storage.length !== 0);
  }
}

if(storageAvailable('localStorage')) {
  useLocalStorage = true;
  console.log("localStorage is available and will be used")
}


let fromStorageRaidStateKF;
let fromStorageSeenEncounters;
let fromStorageBreaks = [];
let fromStorageFireteam;
if(useLocalStorage && localStorage.getItem(`localStorageActive`)) {

  // Rebuilding raidStateKF from localStorage
  fromStorageRaidStateKF = {};
  for (let i = 1; i < 10; i++){
    let fromStorageEncounterObject = {
      startTime: new Date(parseInt(localStorage.getItem(`e${i}startTime`))),
      attempts: parseInt(localStorage.getItem(`e${i}attempts`)),
      completed: (localStorage.getItem(`e${i}completed`)) === 'true'
    }
    fromStorageRaidStateKF[`e${i}`] = fromStorageEncounterObject;
  }
  for (let i = 1; i < 9; i++){
    let fromStorageEncounterObject = {
      startTime: new Date(parseInt(localStorage.getItem(`e${i}cstartTime`))),
      attempts: parseInt(localStorage.getItem(`e${i}cattempts`)),
      completed: (localStorage.getItem(`e${i}ccompleted`)) === 'true'
    }
    fromStorageRaidStateKF[`e${i}c`] = fromStorageEncounterObject;
  }
  let e9cObject = {
    startTime: new Date(parseInt(localStorage.getItem(`e9cstartTime`))),
    attempts: parseInt(localStorage.getItem(`e9cattempts`)),
    completed: (localStorage.getItem(`e9ccompleted`)) === 'true',
    completionTime: new Date(parseInt(localStorage.getItem(`e9ccompletionTime`)))
  }
  fromStorageRaidStateKF[`e9c`] = e9cObject;



  // Rebuilding seenEncounters from localStorage
  fromStorageSeenEncounters = {
    e1: localStorage.getItem(`seenEncounterse1`) === 'true',
    e2: localStorage.getItem(`seenEncounterse2`) === 'true',
    e3: localStorage.getItem(`seenEncounterse3`) === 'true',
    e4: localStorage.getItem(`seenEncounterse4`) === 'true',
    e5: localStorage.getItem(`seenEncounterse5`) === 'true',
    e6: localStorage.getItem(`seenEncounterse6`) === 'true',
    e7: localStorage.getItem(`seenEncounterse7`) === 'true',
    e8: localStorage.getItem(`seenEncounterse8`) === 'true',
    e9: localStorage.getItem(`seenEncounterse9`) === 'true',
    e10: false,
  }

  // using breaksNumber to rebuild Breaks Object
  let numberOfBreaksInStorage = parseInt(localStorage.getItem(`breaksNumber`));
  for(let i = 0; i < numberOfBreaksInStorage; i++){
    fromStorageBreaks.push({
      breakStart: new Date(parseInt(localStorage.getItem(`breaks${i}breakStart`))),
      duration: parseInt(localStorage.getItem(`breaks${i}duration`))
    })
  }

  // Rebuilding fireteam object from localStorage
  let newGuardian0 = {
    name: localStorage.getItem('fireteam0name'),
    edit: (localStorage.getItem('fireteam0edit')=== 'true'),
    hasDiv: (localStorage.getItem('fireteam0hasDiv')=== 'true'),
  }
  let newGuardian1 = {
    name: localStorage.getItem('fireteam1name'),
    edit: (localStorage.getItem('fireteam1edit')=== 'true'),
    hasDiv: (localStorage.getItem('fireteam1hasDiv')=== 'true'),
  }
  let newGuardian2 = {
    name: localStorage.getItem('fireteam2name'),
    edit: (localStorage.getItem('fireteam2edit')=== 'true'),
    hasDiv: (localStorage.getItem('fireteam2hasDiv')=== 'true'),
  }
  let newGuardian3 = {
    name: localStorage.getItem('fireteam3name'),
    edit: (localStorage.getItem('fireteam3edit')=== 'true'),
    hasDiv: (localStorage.getItem('fireteam3hasDiv')=== 'true'),
  }
  let newGuardian4 = {
    name: localStorage.getItem('fireteam4name'),
    edit: (localStorage.getItem('fireteam4edit')) === 'true',
    hasDiv: (localStorage.getItem('fireteam4hasDiv')=== 'true'),
  }
  let newGuardian5 = {
    name: localStorage.getItem('fireteam5name'),
    edit: (localStorage.getItem('fireteam5edit') === 'true'),
    hasDiv: (localStorage.getItem('fireteam5hasDiv') === 'true'),
  }
  
  fromStorageFireteam = [newGuardian0, newGuardian1, newGuardian2, newGuardian3, newGuardian4, newGuardian5]


}




function App() {

  const [coffeesImbibed, setCoffeesImbibed] = useState(9);

  const navigate = useNavigate();

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
  const [seenEncounters, setSeenEncounters] = useState(
    (useLocalStorage && localStorage.getItem(`localStorageActive`)) ?
    fromStorageFireteam :
    {
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
    // e.preventDefault();
    // console.log('here')
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
    // e.preventDefault();
    if(menuCheck){
      toggleMenuCheck(!menuCheck);
    }
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


  const [raidStateKF, setRaidStateKF] = useState(
    useLocalStorage && localStorage.getItem(`localStorageActive`) ?
    fromStorageRaidStateKF :
    {e1: {
        startTime: new Date(1661533200000),
        attempts: 1,
        completed: false,
    },
    e2: {
        startTime: new Date(),
        attempts: 1,
        completed: false,
    },
    e3: {
        startTime: new Date(),
        attempts: 1,
        completed: false,
    },
    e4: {
        startTime: new Date(),
        attempts: 1,
        completed: false,
    },
    e5: {
        startTime: new Date(),
        attempts: 1,
        completed: false,
    },
    e6: {
        startTime: new Date(),
        attempts: 1,
        completed: false,
    },
    e7: {
        startTime: new Date(),
        attempts: 1,
        completed: false,
    },
    e8: {
        startTime: new Date(),
        attempts: 1,
        completed: false,
    },
    e9: {
        startTime: new Date(),
        attempts: 1,
        completed: false,
    },
    e1c: {
        startTime: new Date(),
        attempts: 1,
        completed: false,
    },
    e2c: {
        startTime: new Date(),
        attempts: 1,
        completed: false,
    },
    e3c: {
        startTime: new Date(),
        attempts: 1,
        completed: false,
    },
    e4c: {
        startTime: new Date(),
        attempts: 1,
        completed: false,
    },
    e5c: {
        startTime: new Date(),
        attempts: 1,
        completed: false,
    },
    e6c: {
        startTime: new Date(),
        attempts: 1,
        completed: false,
    },
    e7c: {
        startTime: new Date(),
        attempts: 1,
        completed: false,
    },
    e8c: {
        startTime: new Date(),
        attempts: 1,
        completed: false,
    },
    e9c: {
        startTime: new Date(),
        attempts: 1,
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
  function handleEncounterCompletion(raid, encounter) {
    // e.preventDefault()
    // console.log(raidStateKF.e2, raidStateKF.e3)

    // If this raid is King's Fall, go here
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
            ...raidStateKF['e9c'],
            completed: true,
            completionTime: new Date(),
            // attempts: raidStateKF[`e9c`].attempts
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
    // console.log(challengeMode)
    if(e){
      e.preventDefault();
    }
    if( !blindMode || raidStateKF.e9.completed)
    toggleChallengeMode(!challengeMode)
  }

  // XXXUPDATEXXX ENABLE THIS WHENEVER DEPLOYING XXXUPDATEXXX
  const [welcomePane, toggleWelcomePane] = useState(true);

  const [breaks, setBreaks] = useState(
    (useLocalStorage && localStorage.getItem(`localStorageActive`)) ?
    fromStorageBreaks :
    [
      { breakStart: new Date(), 
    duration: 0, }
  ])
  const [remainingBreakDuration, setRemainingBreakDuration] = useState(0);
  function addBreak(e, duration){
    // console.log(e.target)
    e.preventDefault();
    e.stopPropagation(); // prevent clickthrough to parent, which closes breakMenu
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

  }
  // This useEffect updates remainingBreakDuration once per second by taking the difference between the expectedBreakDuration and the differential of now (each individual clock tick) and the breakStart, or remainingBreakDuration=(expectedBreakDuration - (now - breakStart)).
  useEffect(() => {
    let breakTimer;
    let breakStart = breaks[breaks.length-1].breakStart.getTime();
    if(remainingBreakDuration > 0 ){
      breakTimer = setInterval(
          ()=>{
            let now = new Date()
            setRemainingBreakDuration(() => 
              breaks[breaks.length-1].duration - Math.floor(((now.getTime() - breakStart)/1000)));
          }, 
          1000) 
    };
    return (()=> clearInterval(breakTimer));
  }, [remainingBreakDuration, breaks])


  const [fireteam, setFireteam] = useState( 
    (useLocalStorage && localStorage.getItem(`localStorageActive`)) ?
    fromStorageFireteam :
    [{
    name: 'Guardian 1',
    edit: true,
    hasDiv: true}, 
    {name: 'Guardian 2',
    edit: false,
      hasDiv: false} ,
    {name: 'Guardian 3',
    edit: false,
    hasDiv: false} ,
    {name: 'Guardian 4',
    edit: false,
    hasDiv: false} ,
    {name: 'Guardian 5',
    edit: false,
    hasDiv: false} ,
    {name: 'Guardian 6',
    edit: false,
    hasDiv: false} ,
  ])
  function handleUpdateGuardianName(e, guardian) {
    e.preventDefault();
    let newGuardian = {...fireteam[guardian], name: e.target.value};
    let newFireteam = [...fireteam];
    newFireteam[guardian] = newGuardian;
    setFireteam(() => newFireteam);
  }
  function handleToggleGuardianDiv(e, guardian) {
    e.stopPropagation();
    let newGuardian = {...fireteam[guardian], hasDiv: !fireteam[guardian].hasDiv}
    let newFireteam = [...fireteam]
    newFireteam[guardian] = newGuardian
    setFireteam(() => newFireteam);
  }
  function handleToggleGuardianEdit(e, guardian) {
    e.preventDefault();
    let newGuardian = {...fireteam[guardian], edit: !fireteam[guardian].edit}
    let newFireteam = [...fireteam];
    newFireteam[guardian] = newGuardian;
    setFireteam(() => newFireteam);
  }
  const [fireteamFunctionContainer, setFireteamFunctionContainer] = useState({
    handleUpdateGuardianName: handleUpdateGuardianName,
    handleToggleGuardianDiv: handleToggleGuardianDiv,
    handleToggleGuardianEdit: handleToggleGuardianEdit,
  });
  // This useEffect should prevent the function references from going stale, whenever fireteam updates
  useEffect(()=> {
    setFireteamFunctionContainer(()=> {return {
      handleUpdateGuardianName: handleUpdateGuardianName,
      handleToggleGuardianDiv: handleToggleGuardianDiv,
      handleToggleGuardianEdit: handleToggleGuardianEdit,
    }})

  }, [fireteam])

  // Beginning of my localStorage update hook
  useEffect(()=> {
    // console.log(blindMode);
    if(localStorage){
      localStorage.setItem('localStorageActive', 'true')
      // Build new localStorage array
      // let localStorageArray = [];

      // set localStorage for raidStateKF
      localStorage.setItem('blindMode', blindMode)
      // console.log(Object.entries(raidStateKF))

      // Write raidStateKF to localStorage on update
      for(const [key, value] of Object.entries(raidStateKF)) {
        // console.log(`key`, key, typeof(key))
        // console.log(`value`, value, typeof(value))
        for(const [encounterKey, encounterValue] of Object.entries(value)){
          // console.log(`encounterKey`, encounterKey, typeof(encounterKey))
          // console.log(`encounterValue`, encounterValue, typeof(encounterValue))
          if(encounterKey === 'startTime'){
            // console.log('here')
            localStorage.setItem(`${key}${encounterKey}`, `${encounterValue.getTime()}`)
          } else if(encounterKey === 'completionTime' && encounterValue !== null) {
            localStorage.setItem(`${key}${encounterKey}`, `${encounterValue.getTime()}`)
          } else {
            localStorage.setItem(`${key}${encounterKey}`, `${encounterValue}`)
          }
        }
      }

      // write seenEncounters to localStorage on udpate
      for(const [key, value] of Object.entries(seenEncounters)) {
        // console.log(`key`, key, typeof(key))
        // console.log(`value`, value, typeof(value))     
        localStorage.setItem(`seenEncounters${key}`, `${value}`)
      }

      // write Breaks to localStorage on update
      // console.log(breaks)
      for( let i = 0; i < breaks.length; i++){
        // console.log(breaks[i]);
        for(const [key, value] of Object.entries(breaks[i])){
          // console.log(`key`, key, typeof(key))
          // console.log(`value`, value, typeof(value))  
          if(key === 'breakStart'){
            // console.log(`breaks${i}key`, `${value.getTime()}`)
            localStorage.setItem(`breaks${i}${key}`, `${value.getTime()}`)  
          } else {
            // console.log(`breaks${i}key`, `${value}`)
            localStorage.setItem(`breaks${i}${key}`, `${value}`)
          }
        }
        localStorage.setItem(`breaksNumber`, `${i+1}`)
      }

      // write Fireteam to localStorage on update
      // console.log(fireteam);
      for( let i = 0; i < fireteam.length; i++) {
        // console.log(fireteam[i]);
        for(const [key, value] of Object.entries(fireteam[i])){
          // console.log(`key`, key, typeof(key))
          // console.log(`value`, value, typeof(value))
          localStorage.setItem(`fireteam${i}${key}`, `${value}`);
        }
      }

      // console.log(challengeMode);
      // localStorage.setItem(`challengeMode`, `${challengeMode}`);


    }
  }, [blindMode, raidStateKF, seenEncounters, breaks, fireteam, challengeMode])


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
          breaks={breaks}
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
        {/* {!isMobileViewport && <BreakMenu 
          breaks={breaks}
          remainingBreakDuration={remainingBreakDuration}
          addBreak={addBreak}/>} */}

        <BreakMenu 
          breaks={breaks}
          remainingBreakDuration={remainingBreakDuration}
          addBreak={addBreak}
          isMobileViewport={isMobileViewport}/>

        <div className='toolsLink' onClick={e => navigate('/tools')}>
          <FontAwesomeIcon icon={faScrewdriverWrench} style={{color:''}}/>&nbsp; 
          Tools
        </div>

      </div>


          {/* handleUpdateGuardianDiv(e, 0) */}


      <div className={appContentClassString}>
        {/* If this is the user's first time coming to this website, show them welcome pane with tips. */}

        {/* Test dashboard for local storage ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ */}
          {/* <div>
            <button onClick={e=> {
              e.preventDefault();
              console.log('Getting Local Storage')
              console.log(localStorage)
            }}>
              Read Local Storage
            </button>
            <button onClick={e=> {
              e.preventDefault();
              console.log('Adding to Local Storage')
              localStorage.setItem('myCat', 'Rio');
              console.log(localStorage);
            }}>
              Add cat to Local Storage
            </button>
            <button onClick={e=> {
              e.preventDefault();
              console.log('Adding 2nd Local Storage')
              localStorage.setItem('myOtherCat', 'Skip');
              console.log(localStorage);
            }}>
              Add 2nd cat to Local Storage
            </button>
            <button onClick={e=> {
              e.preventDefault();
              console.log('Removing Rio')
              localStorage.removeItem('myCat');
              console.log(localStorage);
            }}>
              Remove first cat
            </button>
            <button onClick={e=> {
              e.preventDefault();
              console.log('Clearing Local Storage')
              localStorage.clear()
            }}>
              Clear Local Storage
            </button>

            <button onClick={e=> {
              e.preventDefault();
              console.log(raidStateKF[`e9c`])
            }}>
              KF e9c attempts
            </button>
          </div> */}


        {/* <div className='toolsFireteamContainer'>
          Set Fireteam
          {fireteam[0].edit ? 
          <div className='tooslFireteamGuardianInput'>
            1. <input type='text' 
              value={fireteam[0].name}
              onChange={e=> handleUpdateGuardianName(e, 0)}></input>
              &nbsp; <FontAwesomeIcon onClick={e=> handleToggleGuardianEdit(e, 0)} icon={faCheck} style={{color:''}}/> Div: {
                fireteam[0].hasDiv ? 
                  <FontAwesomeIcon icon={faCheck} style={{color: 'green'}} onClick={e=> handleToggleGuardianDiv(e, 0)}/> :
                  <FontAwesomeIcon icon={faX} style={{color: 'red'}} onClick={e=> handleToggleGuardianDiv(e, 0)}/>
                }
          </div> :
          <div className='toolsFireteamGuardianPane' onClick={e=> handleToggleGuardianEdit(e, 0)}> 
            1. {fireteam[0].name} &nbsp; <FontAwesomeIcon icon={faPenToSquare} style={{color:''}}/>&nbsp;&nbsp;&nbsp;

            Div: {
                fireteam[0].hasDiv ? 
                  <FontAwesomeIcon icon={faCheck} style={{color: 'green'}} onClick={e=> handleToggleGuardianDiv(e, 0)}/> :
                  <FontAwesomeIcon icon={faX} style={{color: 'red'}} onClick={e=> handleToggleGuardianDiv(e, 0)}/>
                }
          </div>}
        </div> */}

        
        {welcomePane && <div className='welcomePaneContainer' onClick={e=> toggleWelcomePane(false)}>
            <div className='welcomePane'>
              <div className='welcomePaneHeader'> 
                Welcome to 13th Understanding, a Destiny 2 raid race assistant.
              </div>
              <div className='welcomePaneContent'>
                <ul style={{paddingLeft: '25px'}}>
                  <li>
                    This application is in DEMO MODE. The timers are present only demonstrate the functionality present during the previous Raid Race. Other functionality should persist as normal.
                  </li>
                  <li> A stats view is in development, to be viewable in Tools. (Do not clear localStorage in Tools if you wish to keep your data!).</li>
                  <li>
                    On mobile, Portrait is recommended for the best experience
                  </li>
                  <li>
                    Click the top timer to cycle through visibile timers
                  </li>
                  <li>
                    Disable Blind-Run mode from Tools (on the bottom left). This cannot be undone
                  </li>
                  <li>
                    Access Challenge Mode by disabling Blind-Run mode or completing the final normal encounter
                  </li>
                  <li>
                    Add your fireteam members in Tools for easy role assignment in encounters
                  </li>
                </ul>
                <div className='welcomeQuote' style={{paddingBottom: '4px', fontStyle: 'italic'}}>
                  "To rend one's enemies is to see them not as equals, but objects—hollow of spirit and meaning."—13th Understanding, 7th Book of Sorrow
                </div>
                <p> </p>
                <div style={{textAlign: 'center', fontSize: 'small'}}>
                  Click anywhere to close this tooltip  
                </div>
              </div>
            </div>
          </div>}

          <Outlet context={[raidStateKF,
            handleRaidStateUpdate, 
            handleEncounterCompletion, 
            handleToggleBlindMode, 
            blindMode, 
            fireteam, 
            fireteamFunctionContainer,
            handleClickNavEncounter,
            handleChallengeModeToggle]}/>




          <div className='blindModeContainer' style={{display: 'none'}}>
            <button onClick={e=> handleToggleBlindMode(e)}>
              Disable Blind Run Mode
            </button>
          </div>
          <div className='fireteamMenuContainer' style={{display: 'none'}}>
            Set Fireteam 
            <FontAwesomeIcon icon={faPeopleGroup} style={{color:''}}/>
          </div>


          {/* <button onClick={e => handleDarkModeToggle(e)}>
            Darkmode Toggle
          </button> */}
          {/*
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
          <button onClick={e => console.log( breaks,' & ', remainingBreakDuration)}>state check</button> */}




      </div>

    </div>
  );
}

export default App;