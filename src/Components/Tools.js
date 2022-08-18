import React, {useState, useEffect} from 'react';
import { useOutletContext } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPeopleGroup, faPowerOff } from '@fortawesome/free-solid-svg-icons';

import '../Styles/Tools.css';


function Tools(props) {

    const [raidStateKF,handleRaidStateUpdate,handleEncounterCompletion,handleToggleBlindMode, blindMode] = useOutletContext();

    const [showBlindModeSlider, toggleShowBlindModeSlider] = useState(false);
    const [blindModeSliderValue, setBlindModeSliderValue] = useState(0);
    const [blindModeSliderLock, toggleBlindModeSliderLock] = useState(!blindMode);

    function handleBlindModeSliderChange(e) {
      e.preventDefault();
      // if(blindModeSliderLock){
      //   console.log('here')
      //   setBlindModeSliderValue(()=> 50);
      //   return;
      // }
      let newValue = Number(e.target.value);
      setBlindModeSliderValue(()=> newValue);
    }

    useEffect( () => {
      if(blindModeSliderLock){
        setBlindModeSliderValue(() => 50)
        return;
      }
      let timeOut;
      console.log('sliderVal', blindModeSliderValue)

      // if(blindModeSliderValue < 48 && blindModeSliderValue >= 0){
      //   timeOut = setTimeout(() => {
      //     setBlindModeSliderValue(() => 0);
      //     // iterateBlindModeSliderDown();
      //   }, 
      //   1500)
      //   console.log('timeout', timeOut)
      // } else {
      //   console.log('lock slider-----------------------')
      //   toggleBlindModeSliderLock(true);
      //   setBlindModeSliderValue(() => 50);
      // }

      if( blindModeSliderValue > 48){
        console.log('lock slider-----------------------')
        handleToggleBlindMode();
        toggleBlindModeSliderLock(true);
        setBlindModeSliderValue(() => 50);
      } else {
        timeOut = setTimeout(() => {
          setBlindModeSliderValue(() => 0);
          // iterateBlindModeSliderDown();
        }, 
        1500)
        // console.log('timeout', timeOut)
      }
      return ( ()=> {
          if(blindModeSliderValue < 48 && blindModeSliderLock){
            clearTimeout(timeOut)
            console.log('locked ************************')
          }
        }
      )
    }, [blindModeSliderValue]);
    // Trying to create a smooth function that can iterate down the slider range value without jumping straight to 0;
    function iterateBlindModeSliderDown() {
      let timerID;
      console.log('here');

      timerID = setInterval( ()=> {
        if(blindModeSliderValue > 0){
          setBlindModeSliderValue(() => blindModeSliderValue - 1);
        }
      }, 50)
      clearInterval(timerID);
    }

    useEffect( ()=> {
      if(!blindMode) {
        setBlindModeSliderValue(()=> 50)
      }
      console.log(blindModeSliderValue, blindModeSliderLock)
    }, [blindMode])

    return(
        <div className='toolsContainer'>
            {/* I am tools */}

            <div className='blindModeContainer'>
              {blindModeSliderLock ? 
              <div>
                Blind-Run mode is disabled <FontAwesomeIcon icon={faPowerOff} style={{color: 'red'}} />

                </div> :
                <div>
                  <button onClick={e=> {
                   e.preventDefault();
                   toggleShowBlindModeSlider(true);
                  }}>Disable Blind-Run mode</button>         
                  <FontAwesomeIcon icon={faPowerOff} style={blindModeSliderValue > 48 ? 
                  {color: 'red'} :
                  {color: 'green'} } />
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
{/* 
            <button onClick={e=> {e.preventDefault(); testContainer.handleTest()}}>
                test {test1}
            </button>
            <button onClick={e=> {e.preventDefault(); testContainer.handleBlarp()}}>
                test updateTest1
            </button> */}

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