import React, {useState, useEffect} from 'react';
import { useOutletContext } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPeopleGroup, faPowerOff, faCheck, faX, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

import '../Styles/Tools.css';


function Tools(props) {

    const [raidStateKF,
      handleRaidStateUpdate,
      handleEncounterCompletion,
      handleToggleBlindMode, 
      blindMode, 
      fireteam, 
      fireteamFunctionContainer] = useOutletContext();

    const [showBlindModeSlider, toggleShowBlindModeSlider] = useState(false);
    const [blindModeSliderValue, setBlindModeSliderValue] = useState(0);
    const [blindModeSliderLock, toggleBlindModeSliderLock] = useState(!blindMode);

    function handleBlindModeSliderChange(e) {
      e.preventDefault();
      let newValue = Number(e.target.value);
      setBlindModeSliderValue(()=> newValue);
    }

    useEffect( () => {
      if(blindModeSliderLock){
        setBlindModeSliderValue(() => 50)
        return;
      }
      let timeOut;
      // console.log('sliderVal', blindModeSliderValue)
      if( blindModeSliderValue > 48){
        // Success, you've done the thing, now do the thing here
        handleToggleBlindMode();
        toggleBlindModeSliderLock(true);
        setBlindModeSliderValue(() => 50);
      } else {
        timeOut = setTimeout(() => {
          setBlindModeSliderValue(() => 0);
        }, 
        1500)
      }
      return ( ()=> {
          if(blindModeSliderValue < 48 && blindModeSliderLock){
            clearTimeout(timeOut)
            console.log('locked ************************')
          }
        }
      )
    }, [blindModeSliderValue]);
    // Test function for getting the slider to slowly iterate down instead of jumping straight to zero. Unable to get it to work with async state updates
    // function iterateBlindModeSliderDown() {
    //   let timerID;
    //   console.log('here');

    //   timerID = setInterval( ()=> {
    //     if(blindModeSliderValue > 0){
    //       setBlindModeSliderValue(() => blindModeSliderValue - 1);
    //     }
    //   }, 50)
    //   clearInterval(timerID);
    // }

    useEffect( ()=> {
      if(!blindMode) {
        setBlindModeSliderValue(()=> 50)
      }
      // console.log(blindModeSliderValue, blindModeSliderLock)
    }, [blindMode])

    return(
        <div className='toolsContainer'>
            {/* I am tools */}

            <div className='blindModeContainer'>
              {blindModeSliderLock ? 
    
              <div className='toolsHeader'>
                Blind-Run mode is disabled <FontAwesomeIcon icon={faPowerOff} style={{color: 'red'}} />

                </div> :
                <div className='blindModeContainer'>
                  <div className='toolsHeader'>
                    Disable Blind-Run mode?
                  </div>
                  <div className='blindModeButtonContainer'>
                        
                    <button onClick={e=> {
                    e.preventDefault();
                    toggleShowBlindModeSlider(true);
                    }}>Disable</button>&nbsp;     
                    <FontAwesomeIcon icon={faPowerOff} style={blindModeSliderValue > 48 ? 
                    {color: 'red'} :
                    {color: 'green'} } />
                  </div>
                  {showBlindModeSlider && <div className='blindModeSliderContainer'>
                  <div>
                    Are you sure?
                  </div>
                  <div className='blindModeSlider'> 
                  <input type='range'
                    id='blindModeSlider' 
                    min={0} max={50} 
                    value={blindModeSliderValue}
                    onChange={e=> handleBlindModeSliderChange(e)}></input> 
                    <label htmlFor='blindModeSlider'>Yes</label>
                    </div>
                </div>}
                  </div>}
            </div>


            <div className='toolsFireteamContainer'>

            <div className='toolsHeader'>
              Set Fireteam&nbsp;&nbsp;
                <FontAwesomeIcon icon={faPeopleGroup} style={{color:''}}/>
              </div>
                
                {fireteam[0].edit ? 
                <div className='tooslFireteamGuardianInput'>
                  1. <input type='text' 
                    value={fireteam[0].name}
                    onChange={e=> fireteamFunctionContainer.handleUpdateGuardianName(e, 0)}></input>
                    &nbsp; <FontAwesomeIcon onClick={e=> fireteamFunctionContainer.handleToggleGuardianEdit(e, 0)} icon={faCheck} style={{color:''}}/> 
                    <div></div>
                    Has Divinity: {
                      fireteam[0].hasDiv ? 
                        <FontAwesomeIcon icon={faCheck} style={{color: 'green'}} onClick={e=> fireteamFunctionContainer.handleToggleGuardianDiv(e, 0)}/> :
                        <FontAwesomeIcon icon={faX} style={{color: 'red'}} onClick={e=> fireteamFunctionContainer.handleToggleGuardianDiv(e, 0)}/>
                      }
                </div> :
                <div className='toolsFireteamGuardianPane' onClick={e=> fireteamFunctionContainer.handleToggleGuardianEdit(e, 0)}> 
                  1. {fireteam[0].name} &nbsp; <FontAwesomeIcon icon={faPenToSquare} style={{color:''}}/>&nbsp;&nbsp;&nbsp;
                      <div></div>
                  Has Divinity: {
                      fireteam[0].hasDiv ? 
                        <FontAwesomeIcon icon={faCheck} style={{color: 'green'}} onClick={e=> fireteamFunctionContainer.handleToggleGuardianDiv(e, 0)}/> :
                        <FontAwesomeIcon icon={faX} style={{color: 'red'}} onClick={e=> fireteamFunctionContainer.handleToggleGuardianDiv(e, 0)}/>
                      }
                </div>}

                {fireteam[1].edit ? 
                <div className='tooslFireteamGuardianInput'>
                  2. <input type='text' 
                    value={fireteam[1].name}
                    onChange={e=> fireteamFunctionContainer.handleUpdateGuardianName(e, 1)}></input>
                    &nbsp; <FontAwesomeIcon onClick={e=> fireteamFunctionContainer.handleToggleGuardianEdit(e, 1)} icon={faCheck} style={{color:''}}/> 
                    <div></div>
                    Has Divinity: {
                      fireteam[1].hasDiv ? 
                        <FontAwesomeIcon icon={faCheck} style={{color: 'green'}} onClick={e=> fireteamFunctionContainer.handleToggleGuardianDiv(e, 1)}/> :
                        <FontAwesomeIcon icon={faX} style={{color: 'red'}} onClick={e=> fireteamFunctionContainer.handleToggleGuardianDiv(e, 1)}/>
                      }
                </div> :
                <div className='toolsFireteamGuardianPane' onClick={e=> fireteamFunctionContainer.handleToggleGuardianEdit(e, 1)}> 
                  2. {fireteam[1].name} &nbsp; <FontAwesomeIcon icon={faPenToSquare} style={{color:''}}/>&nbsp;&nbsp;&nbsp;
                      <div></div>
                  Has Divinity: {
                      fireteam[1].hasDiv ? 
                        <FontAwesomeIcon icon={faCheck} style={{color: 'green'}} onClick={e=> fireteamFunctionContainer.handleToggleGuardianDiv(e, 1)}/> :
                        <FontAwesomeIcon icon={faX} style={{color: 'red'}} onClick={e=> fireteamFunctionContainer.handleToggleGuardianDiv(e, 1)}/>
                      }
                </div>}

                {fireteam[2].edit ? 
                <div className='tooslFireteamGuardianInput'>
                  3. <input type='text' 
                    value={fireteam[2].name}
                    onChange={e=> fireteamFunctionContainer.handleUpdateGuardianName(e, 2)}></input>
                    &nbsp; <FontAwesomeIcon onClick={e=> fireteamFunctionContainer.handleToggleGuardianEdit(e, 2)} icon={faCheck} style={{color:''}}/> 
                    <div></div>
                    Has Divinity: {
                      fireteam[2].hasDiv ? 
                        <FontAwesomeIcon icon={faCheck} style={{color: 'green'}} onClick={e=> fireteamFunctionContainer.handleToggleGuardianDiv(e, 2)}/> :
                        <FontAwesomeIcon icon={faX} style={{color: 'red'}} onClick={e=> fireteamFunctionContainer.handleToggleGuardianDiv(e, 2)}/>
                      }
                </div> :
                <div className='toolsFireteamGuardianPane' onClick={e=> fireteamFunctionContainer.handleToggleGuardianEdit(e, 2)}> 
                  3. {fireteam[2].name} &nbsp; <FontAwesomeIcon icon={faPenToSquare} style={{color:''}}/>&nbsp;&nbsp;&nbsp;
                      <div></div>
                  Has Divinity: {
                      fireteam[2].hasDiv ? 
                        <FontAwesomeIcon icon={faCheck} style={{color: 'green'}} onClick={e=> fireteamFunctionContainer.handleToggleGuardianDiv(e, 2)}/> :
                        <FontAwesomeIcon icon={faX} style={{color: 'red'}} onClick={e=> fireteamFunctionContainer.handleToggleGuardianDiv(e, 2)}/>
                      }
                </div>}

                {fireteam[3].edit ? 
                <div className='tooslFireteamGuardianInput'>
                  4. <input type='text' 
                    value={fireteam[3].name}
                    onChange={e=> fireteamFunctionContainer.handleUpdateGuardianName(e, 3)}></input>
                    &nbsp; <FontAwesomeIcon onClick={e=> fireteamFunctionContainer.handleToggleGuardianEdit(e, 3)} icon={faCheck} style={{color:''}}/> 
                    <div></div>
                    Has Divinity: {
                      fireteam[3].hasDiv ? 
                        <FontAwesomeIcon icon={faCheck} style={{color: 'green'}} onClick={e=> fireteamFunctionContainer.handleToggleGuardianDiv(e, 3)}/> :
                        <FontAwesomeIcon icon={faX} style={{color: 'red'}} onClick={e=> fireteamFunctionContainer.handleToggleGuardianDiv(e, 3)}/>
                      }
                </div> :
                <div className='toolsFireteamGuardianPane' onClick={e=> fireteamFunctionContainer.handleToggleGuardianEdit(e, 3)}> 
                  4. {fireteam[3].name} &nbsp; <FontAwesomeIcon icon={faPenToSquare} style={{color:''}}/>&nbsp;&nbsp;&nbsp;
                      <div></div>
                  Has Divinity: {
                      fireteam[3].hasDiv ? 
                        <FontAwesomeIcon icon={faCheck} style={{color: 'green'}} onClick={e=> fireteamFunctionContainer.handleToggleGuardianDiv(e, 3)}/> :
                        <FontAwesomeIcon icon={faX} style={{color: 'red'}} onClick={e=> fireteamFunctionContainer.handleToggleGuardianDiv(e, 3)}/>
                      }
                </div>}

                {fireteam[4].edit ? 
                <div className='tooslFireteamGuardianInput'>
                  5. <input type='text' 
                    value={fireteam[4].name}
                    onChange={e=> fireteamFunctionContainer.handleUpdateGuardianName(e, 4)}></input>
                    &nbsp; <FontAwesomeIcon onClick={e=> fireteamFunctionContainer.handleToggleGuardianEdit(e, 4)} icon={faCheck} style={{color:''}}/> 
                    <div></div>
                    Has Divinity: {
                      fireteam[4].hasDiv ? 
                        <FontAwesomeIcon icon={faCheck} style={{color: 'green'}} onClick={e=> fireteamFunctionContainer.handleToggleGuardianDiv(e, 4)}/> :
                        <FontAwesomeIcon icon={faX} style={{color: 'red'}} onClick={e=> fireteamFunctionContainer.handleToggleGuardianDiv(e, 4)}/>
                      }
                </div> :
                <div className='toolsFireteamGuardianPane' onClick={e=> fireteamFunctionContainer.handleToggleGuardianEdit(e, 4)}> 
                  5. {fireteam[4].name} &nbsp; <FontAwesomeIcon icon={faPenToSquare} style={{color:''}}/>&nbsp;&nbsp;&nbsp;
                      <div></div>
                  Has Divinity: {
                      fireteam[4].hasDiv ? 
                        <FontAwesomeIcon icon={faCheck} style={{color: 'green'}} onClick={e=> fireteamFunctionContainer.handleToggleGuardianDiv(e, 4)}/> :
                        <FontAwesomeIcon icon={faX} style={{color: 'red'}} onClick={e=> fireteamFunctionContainer.handleToggleGuardianDiv(e, 4)}/>
                      }
                </div>}

                {fireteam[5].edit ? 
                <div className='tooslFireteamGuardianInput'>
                  6. <input type='text' 
                    value={fireteam[5].name}
                    onChange={e=> fireteamFunctionContainer.handleUpdateGuardianName(e, 5)}></input>
                    &nbsp; <FontAwesomeIcon onClick={e=> fireteamFunctionContainer.handleToggleGuardianEdit(e, 5)} icon={faCheck} style={{color:''}}/> 
                    <div></div>
                    Has Divinity: {
                      fireteam[5].hasDiv ? 
                        <FontAwesomeIcon icon={faCheck} style={{color: 'green'}} onClick={e=> fireteamFunctionContainer.handleToggleGuardianDiv(e, 5)}/> :
                        <FontAwesomeIcon icon={faX} style={{color: 'red'}} onClick={e=> fireteamFunctionContainer.handleToggleGuardianDiv(e, 5)}/>
                      }
                </div> :
                <div className='toolsFireteamGuardianPane' onClick={e=> fireteamFunctionContainer.handleToggleGuardianEdit(e, 5)}> 
                  6. {fireteam[5].name} &nbsp; <FontAwesomeIcon icon={faPenToSquare} style={{color:''}}/>&nbsp;&nbsp;&nbsp;
                      <div></div>
                  Has Divinity: {
                      fireteam[5].hasDiv ? 
                        <FontAwesomeIcon icon={faCheck} style={{color: 'green'}} onClick={e=> fireteamFunctionContainer.handleToggleGuardianDiv(e, 5)}/> :
                        <FontAwesomeIcon icon={faX} style={{color: 'red'}} onClick={e=> fireteamFunctionContainer.handleToggleGuardianDiv(e, 5)}/>
                      }
                </div>}
                
                
              </div>

                      <div className='toolsHeader'>
                         Manage local Storage

                      </div>
                      <p style={{maxWidth: '600px', textAlign: 'center'}}>Be sure to purge localStorage before the Raid Race begins if you're playing around with the functionality of the website. Hit "Delete Local Storage", and then immediately refresh the webpage.</p>
                      
                      <button onClick={e => {
                        e.preventDefault();
                        localStorage.clear();
                        }}>
                          Delete Local Storage
                        </button>
                        This wipes any progress you've made from the webpage!
                        <p></p>


            <div className='toolsHeader'>
              Not Yet Implemented
            </div>


          <div>
            Show Welcome Tooltips Again
          </div>
          <div>
            Demo Mode
          </div> 
          <div>
            {/* Hooking up links to actual links */}
          </div>
          <div>
            About
          </div>
          <div>
            Link to my Github
            {/* Confetti from - 
                https://www.npmjs.com/package/canvas-confetti
                 */}
              </div>
          <div>
            {/* Point of Failure Checklist */}
          </div>
          <div>
            {/* How to Prepare & How to Prepare IRL */}
          </div>
          <div>
            {/* Recommended Weapons, Armor, and Builds */}
          </div>
          <div>
            Google Analytics
          </div>
          <div>
            Local Storage. If you close the app or your phone locks and stops the webpage, you lose all local data
          </div>
          <div>
            Don't Store localStorage on my machine Option
          </div>
          <div>
            Reset localStorage data to default
          </div>
          <div>
            {/* Dark Mode Toggle  */}
          </div>
          <div>
            Site Map
          </div>
          <div className='toolsHeader'>
            Exteral Resources:
            </div>
          <div>
            <ul >
              <li>

                <a className='dimLink' href='https://docs.google.com/spreadsheets/d/1i1KUwgVkd8qhwYj481gkV9sZNJQCE-C3Q-dpQutPCi4/edit#gid=242217075' target='_blank' rel='noreferrer'>
                        <div className=''>
                        Court's Comprehensive Data & Information Spreadsheets (Buff and Debuff Stacking)
                        </div>
                    </a>
              </li>
              <li>
                <a className='dimLink' href='https://docs.google.com/spreadsheets/d/12vF7ckMzN4hex-Tse4HPiVs_d9huFOKlvUoq5V41nxU/edit#gid=2085890105' target='_blank' rel='noreferrer'>
                        <div className=''>
                        Damage Chart Madness (PvE, Raid)
                        </div>
                    </a>
              </li>
              <li>
                <a className='dimLink' href='https://docs.google.com/spreadsheets/d/1b57Hb8m1L3daFfUckQQqvvN6VOpD03KEssvQLMFpC5I/edit#gid=1386975095' target='_blank' rel='noreferrer'>
                        <div className=''>
                        Destiny 2 Outgoing Damage Scaling Spreadsheet
                        </div>
                    </a>
           
              </li>
              <li>
              <a className='dimLink' href='https://destinyitemmanager.com/en/' target='_blank' rel='noreferrer'>
                        <div className='dimIcon'>
                        Destiny Item Manager
                        </div>
                    </a>
              </li>
              <li>
              <a className='dimLink' href='https://www.d2clarity.com/' target='_blank' rel='noreferrer'>
                        <div className=''>
                        Clarity - A DIM Companion App
                        </div>
                    </a>
                 
              </li>
              <li>
              <a className='dimLink' href='https://docs.google.com/spreadsheets/d/1mItOsJnE9n3Duu5xs6nRontkcookxJ2uQyPb-rwoFDk/edit#gid=0' target='_blank' rel='noreferrer'>
                        <div className=''>
                        Destiny 2 Y5 Activity Rotation Schedules (Lost Sectors, Nightfalls, Raid Challenges, etc.)
                        </div>
                    </a>
              </li>
              <li>

              <a className='dimLink' href='https://www.todayindestiny.com/' target='_blank' rel='noreferrer'>
                        <div className=''>
                        Today in Destiny (Eververse Calendar)
                        </div>
                    </a>
              </li>
              <li>
              <a className='dimLink' href='https://www.light.gg' target='_blank' rel='noreferrer'>
                        <div className=''>
                        Light.gg - a Destiny 2 Database
                        </div>
                    </a>
              </li>
              <li>
              <a className='dimLink' href='https://www.blueberries.gg' target='_blank' rel='noreferrer'>
                        <div className=''>
                        Blueberries.gg - a Beginner's Guide to Destiny 2
                        </div>
                    </a>
              </li>
              <li>
              <a className='dimLink' href='Discord.gg/D2LFG' target='_blank' rel='noreferrer'>
                        <div className=''>
                        D2 PC LFG - a(the) Destiny 2 Discord LFG Server
                        </div>
                    </a>
              </li>
              <li>
              <a className='dimLink' href='https://d2sanctuary.com/' target='_blank' rel='noreferrer'>
                        <div className=''>
                        D2 Sanctuary -a Destiny 2 Discord LFG Server prioritizing a safe environment
                        </div>
                    </a>
              </li>
              <li>
              <a className='dimLink' href='bungie.net' target='_blank' rel='noreferrer'>
                        <div className=''>
                        Bungie.net - Developer website for Destiny 2 (but you knew that already)
                        </div>
                    </a>
              </li>
              <li>
              <a className='dimLink' href='https://raid.report/' target='_blank' rel='noreferrer'>
                        <div className=''>
                        Raid Report - a Raid Statistics website. May be bugged for Day 1
                        </div>
                    </a>
              </li>
              <li>
              <a className='dimLink' href='https://raid.report/pc/4611686018470817123' target='_blank' rel='noreferrer'>
                        <div className=''>
                        My personal Raid Report, aka my street cred
                        </div>
                    </a>
              </li>
              <li>
              <a className='dimLink' href='https://bray.tech/' target='_blank' rel='noreferrer'>
                        <div className=''>
                        Bray.tech - a Destiny 2 Checklist (& more) App
                        </div>
                    </a>
              </li>
              <li>
              <a className='dimLink' href='https://www.reddit.com/r/destinythegame/' target='_blank' rel='noreferrer'>
                        <div className=''>
                        Reddit/r/DestinyTheGame - a Large Destiny 2 Community
                        </div>
                    </a>
              </li>
              <li>
              <a className='dimLink' href='https://www.reddit.com/r/raidsecrets/' target='_blank' rel='noreferrer'>
                        <div className=''>
                        Reddit/r/RaidSecrets - A Destiny 2 Reddit Community dedicated to finding and sharing secrets! SPOILERS OFTEN PRESENT
                        </div>
                    </a>

                
                {/*  */}
              </li>


            </ul>
          </div>


        </div>
    )
}

export default Tools;