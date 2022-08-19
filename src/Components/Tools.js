import React, {useState, useEffect} from 'react';
import { useOutletContext } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPeopleGroup, faPowerOff, faCheck, faX, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

import '../Styles/Tools.css';


function Tools(props) {

    const [raidStateKF,handleRaidStateUpdate,handleEncounterCompletion,handleToggleBlindMode, blindMode, fireteam, fireteamFunctionContainer] = useOutletContext();

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
                  {showBlindModeSlider && <div className='blindModeSlider'>
                  <div style={{textAlign: 'center'}}>
                    Are you sure?
                    </div>
                  <input type='range' 
                    min={0} max={50} 
                    value={blindModeSliderValue}
                    onChange={e=> handleBlindModeSliderChange(e)}></input> 
                    Yes

                </div>}
                  </div>}
            </div>

            <div className='toolsFireteamContainer'>
              <div className='toolsHeader'>
              Set Fireteam&nbsp;&nbsp;
                <FontAwesomeIcon icon={faPeopleGroup} style={{color:''}}/>
              </div>
                
                {/* <div className='toolsFireteamTable'>

                </div> */}
                {fireteam[0].edit ? 
                <div className='tooslFireteamGuardianInput'>
                  1. <input type='text' 
                    value={fireteam[0].name}
                    onChange={e=> fireteamFunctionContainer.handleUpdateGuardianName(e, 0)}></input>
                    &nbsp; <FontAwesomeIcon onClick={e=> fireteamFunctionContainer.handleToggleGuardianEdit(e, 0)} icon={faCheck} style={{color:''}}/> 
                    <div></div>
                    Has Dinivity: {
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
                
                
              </div>



          <div className='fireteamMenuContainer'>
            Set Fireteam 
            <FontAwesomeIcon icon={faPeopleGroup} style={{color:''}}/>
          </div>
          <div>
            Show Welcome tooltips
          </div>
          <div>
            Demo Mode
          </div> 
          <div>
            About
              <div>
                Link to my Github
              </div>
          </div>
          <div>
            Point of Failure Checklist
          </div>
          <div>
            How to Prepare & How to Prepare IRL
          </div>
          <div>
            Recommended Weapons, Armor, and Builds
          </div>
          <div>
            Don't Store localStorage on my machine
          </div>
          <div>
            Reset All Data to default
          </div>
          <div>
            Dark Mode Toggle
          </div>
          <div>
            Site Map
          </div>


        </div>
    )
}

export default Tools;