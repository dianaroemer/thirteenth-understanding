import React, {useState, useEffect} from 'react';
import { useOutletContext } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons';

function Tools(props) {

    const [raidStateKF,handleRaidStateUpdate,handleEncounterCompletion,handleToggleBlindMode] = useOutletContext();

    return(
        <div className='toolsContainer'>
            {/* I am tools */}

            <div className='blindModeContainer' >
                <button onClick={e=> handleToggleBlindMode(e)}>
                Disable Blind Run Mode
                </button>
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