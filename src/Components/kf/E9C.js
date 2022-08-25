import React, {useState, useEffect} from 'react';
import { useOutletContext, NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faThumbTack } from '@fortawesome/free-solid-svg-icons';
import confetti from 'canvas-confetti';

import '../../Styles/EncounterStyling.css';



function E9C() {

    const navigate = useNavigate();

    const thisRaid = 'kf';
    const thisEncounter = 'e9c'
    const roles = ['Plate 1', 'Plate 2', 'Plate 3', 'Plate 4', 'Runner', 'Floater']

    const [raidStateKF,
        handleRaidStateUpdate,
        handleEncounterCompletion,
        handleToggleBlindMode, 
        blindMode, 
        fireteam, 
        fireteamFunctionContainer,
        handleClickNavEncounter,
        handleChallengeModeToggle] = useOutletContext();

    const [attemptVisibility, toggleAttemptVisibility] = useState(false)
    function handleToggleAttemptVisibility(e) {
        e.preventDefault();
        toggleAttemptVisibility(!attemptVisibility)
    }

    const [stickTools, toggleStickTools] = useState(true)
    function handleToggleStickTools(e) {
        e.preventDefault();
        // console.log(e)
        // e.stopPropagation();
        toggleStickTools(!stickTools);
        if(stickTools){
            setEncounterToolsClass('encounterTools pinned')
            setEncounterContentClass('encounterContent pinned')
        } else {
            setEncounterToolsClass('encounterTools')
            setEncounterContentClass('encounterContent')
        }
    }

    const [encounterToolsClass, setEncounterToolsClass] = useState('encounterTools');
    const [encounterContentClass, setEncounterContentClass] = useState('encounterContent')

    function handleRoleUpdate(e,roleNumber, targetRole) {
        e.preventDefault();
        // console.log(e.target.value)
        let newArray = [...selectedRoles]
        newArray[roleNumber] = Number(e.target.value);
        setSelectedRoles(() => newArray);
        // console.log(newArray)
        // console.log(newArray.indexOf(1))
    }

    // The initial state of each guardian is set to 6, whereas the potential values are 1,2,3,4,5,7. This is due to my realization that indexOf returning -1 evaluates as TRUE in a boolean context, so rather than rewrite the role selection functionality, I tested the default value of 7 to replace guardian 1's initial 0 value (which evaluated as false), rather than set the initial state of the selected roles to [7,7,7, 7,7,7]. This can and should be an initial value of [7,7,7,7,7,7] with role 1 in the selector evaluating as 1, and each of the other role selectors respectively evaluating at 2, 3, 4, 5, and lastly 6. Would require combing through the roleSelector code and pruning, but I ain't got time for that, so for now, it stays, until I have time to fix it.
    const [selectedRoles, setSelectedRoles] = useState([6, 6, 6, 6, 6, 6])



    const [showEncounterCompleteSlider, toggleShowEncounterCompleteSlider] = useState(false);
    const [encounterClearedSliderValue, setEncounterClearedSliderValue] = useState(0);
    const [encounterClearedSliderLock, toggleEncounterClearedSliderLock] = useState(false);

    function handleEncounterClearedSliderChange(e) {
      e.preventDefault();
      let newValue = Number(e.target.value);
      setEncounterClearedSliderValue(()=> newValue);
    }
    useEffect( () => {
      if(encounterClearedSliderLock){
        setEncounterClearedSliderValue(() => 50)
        return;
      }
      let timeOut;
      if( encounterClearedSliderValue > 48){
        // Success, you've done the thing, now do the thing here
        handleEncounterCompletion(thisRaid, thisEncounter);
        confetti({
            particleCount: 150,
            spread: 80,
            startVelocity: 60,
            origin: { y: .95 }
          });

          var duration = 20 * 1000;
          var animationEnd = Date.now() + duration;
          var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
          
          function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
          }
          
          var interval = setInterval(function() {
            var timeLeft = animationEnd - Date.now();
          
            if (timeLeft <= 0) {
              return clearInterval(interval);
            }
          
            var particleCount = 50 * (timeLeft / duration);
            // since particles fall down, start a bit higher than random
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.4), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.6, 0.9), y: Math.random() - 0.2 } }));
          }, 250);


        //   handleChallengeModeToggle();
        //   setTimeout(()=>{
            // navigate('/kf/e1c');
            // handleClickNavEncounter(null, 'e9');
        // }, 5000)        

        toggleEncounterClearedSliderLock(true);
        setEncounterClearedSliderValue(() => 50);
      } else {
        timeOut = setTimeout(() => {
          setEncounterClearedSliderValue(() => 0);
        }, 
        1500)
      }
      return ( ()=> {
          if(encounterClearedSliderValue < 48 && encounterClearedSliderLock){
            clearTimeout(timeOut)
            console.log('locked ************************')
          }
        }
      )
    }, [encounterClearedSliderValue]);


    // useEffect( ()=> {
    //   if(encounterClearedSliderLock) {
    //     setEncounterClearedSliderValue(()=> 50)
    //   }
    // }, [encounterClearedSliderLock])

    return(
        <div className='encounterContentContainer e8'>
            <div className={encounterToolsClass}>
                {/* I am encounter toolbox */}
                {!raidStateKF[thisEncounter].completed && 
                    <div className='pinEncounterToolsContainer'                         onClick={e=> handleToggleStickTools(e)}>
                    <FontAwesomeIcon icon={faThumbTack} 
                        className='pinEncounterTools'/>
                    </div>
                }
                

                {/* <div className='encounterClearedButtonContainer'>
                    <button onClick={( e=> {
                        e.preventDefault()
                        handleEncounterCompletion(thisRaid, thisEncounter);
                        navigate('/kf/e6');
                    })}> Encounter Cleared Test Button </button>
                </div>  */}

                <div className='encounterClearedContainer'>
                    {raidStateKF[thisEncounter].completed ? 
                    <div className='encounterClearedContent cleared'>
                        Congratulations! 
                        <div>Encounter Completed in {/*raidStateKF[thisEncounter].startTime.getTime()*/}</div>
                        <div>
                            {raidStateKF[thisEncounter].attempts} Attempts!
                        </div>
                    </div> :
                    <div className='encounterClearedContent'>
                        {!showEncounterCompleteSlider && 
                            <button onClick={(e=> {
                                e.preventDefault();
                                toggleShowEncounterCompleteSlider(true);
                            })}> Encounter Completed </button>
                        }
                        {showEncounterCompleteSlider && 
                        <div className='encounterClearedSliderContainer'>
                            
                            <div className='encounterClearedSlider'> 
                            <input type='range'
                                id='encounterClearedSlider' 
                                min={0} max={50} 
                                value={encounterClearedSliderValue}
                                onChange={e=> handleEncounterClearedSliderChange(e)}></input> 
                                <label htmlFor='encounterClearedSlider'>Complete</label>
                            </div>
                        </div>}
                    </div>}

                </div>

                {/* If the encounter hasn't been completed, show the attempts increment */}
                {!raidStateKF[thisEncounter].completed &&
                <div className='encounterAttemptsContainer'>
                    <div onClick={e => handleToggleAttemptVisibility(e)}>
                        {/* <FontAwesomeIcon icon={attemptVisibility ? faEye : faEyeSlash}/>&nbsp; */}
                        { attemptVisibility ? 
                        'Show Attempts' :
                        `Attempt # ${raidStateKF[thisEncounter].attempts}` 
                        }&nbsp;&nbsp;
                        <FontAwesomeIcon icon={attemptVisibility ? faEye : faEyeSlash}/>
                    </div>
                    <button onClick={e=> handleRaidStateUpdate(e, thisRaid, thisEncounter, 'attempts', (raidStateKF[thisEncounter].attempts+1))}>
                        + Add Attempt +
                    </button>

                    <div className='encounterAttemptsVisibility'>
                    </div>
                </div>
                }
                
                
            </div>

            <div className={stickTools ? 'encounterTitle' : 'encounterTitle stickTools'}>
                    Oryx, the Taken King
                </div>

            <div className={encounterContentClass}>
                {/* I am E9C */}

                <div className='encounterSection challengeMode'>
                    <div className='encounterHeader challengeMode'> 
                        Challenge Mode - Hand's Off
                    </div>
                    <ul style={{paddingLeft: '20px'}}>
                        <li className='encounterBulletPoint'>
                            No guardian can be hit by a Shade of Oryx
                        </li>
                        <li className='encounterBulletPoint'>
                            Oryx isn't allow to damage a guardian when smashing a plate
                        </li>
                        <li className='encounterBulletPoint'>
                            Light Eater Knights and Vessels of Oryx cannot touch any Orbs Corrupted Light
                        </li>
                        <li className='encounterBulletPoint'>
                            No guardian steps on the same plate twice
                        </li>
                    </ul>
                </div> 

                <div className='encounterSection roles'>
                    <div className='encounterHeader'>
                        Roles
                    </div>
                    <div className='encounterRoleSelectorContainer'>
                        <div className='encounterRoleSelector'>
                            {roles[0]}: &nbsp;
                            <select id='role1' onChange={e=>handleRoleUpdate(e, 0)}>
                                <option value={9}>

                                </option>

                                {(selectedRoles.indexOf(7) === -1 || selectedRoles[0] === 7) &&
                                <option value={7}>
                                    {fireteam[0].name}
                                </option>}

                                {(selectedRoles.indexOf(1) === -1 || selectedRoles[0] === 1) &&<option value={1}>
                                    {fireteam[1].name}
                                </option>}

                                {(selectedRoles.indexOf(2) === -1 || selectedRoles[0] === 2) &&<option value={2}>
                                    {fireteam[2].name}
                                </option>}

                                {(selectedRoles.indexOf(3) === -1 || selectedRoles[0] === 3) &&<option value={3}>
                                    {fireteam[3].name}
                                </option>}

                                {(selectedRoles.indexOf(4) === -1 || selectedRoles[0] === 4) &&<option value={4}>
                                    {fireteam[4].name}
                                </option>}

                                {(selectedRoles.indexOf(5) === -1 || selectedRoles[0] === 5) &&<option value={5}>
                                    {fireteam[5].name}
                                </option>}
                            </select>
                        </div>
                        <div className='encounterRoleSelector'>
                            {roles[1]}: &nbsp;
                            <select id='role2' onChange={e=>handleRoleUpdate(e, 1)}>
                                <option value={9}>

                                </option>

                                {(selectedRoles.indexOf(7) === -1 || selectedRoles[1] === 7) &&<option value={7}>
                                    {fireteam[0].name}
                                </option>}

                                {(selectedRoles.indexOf(1) === -1 || selectedRoles[1] === 1) &&<option value={1}>
                                    {fireteam[1].name}
                                </option>}

                                {(selectedRoles.indexOf(2) === -1 || selectedRoles[1] === 2) &&<option value={2}>
                                    {fireteam[2].name}
                                </option>}

                                {(selectedRoles.indexOf(3) === -1 || selectedRoles[1] === 3) &&<option value={3}>
                                    {fireteam[3].name}
                                </option>}

                                {(selectedRoles.indexOf(4) === -1 || selectedRoles[1] === 4) &&<option value={4}>
                                    {fireteam[4].name}
                                </option>}

                                {(selectedRoles.indexOf(5) === -1 || selectedRoles[1] === 5) &&<option value={5}>
                                    {fireteam[5].name}
                                </option>}
                            </select>
                        </div>
                        <div className='encounterRoleSelector'>
                            {roles[2]}: &nbsp;
                            <select id='role3' onChange={e=>handleRoleUpdate(e, 2)}>
                                <option value={9}>

                                </option>

                                {(selectedRoles.indexOf(7) === -1 || selectedRoles[2] === 7) &&<option value={7}>
                                    {fireteam[0].name}
                                </option>}

                                {(selectedRoles.indexOf(1) === -1 || selectedRoles[2] === 1) &&<option value={1}>
                                    {fireteam[1].name}
                                </option>}

                                {(selectedRoles.indexOf(2) === -1 || selectedRoles[2] === 2) &&<option value={2}>
                                    {fireteam[2].name}
                                </option>}

                                {(selectedRoles.indexOf(3) === -1 || selectedRoles[2] === 3) &&<option value={3}>
                                    {fireteam[3].name}
                                </option>}

                                {(selectedRoles.indexOf(4) === -1 || selectedRoles[2] === 4) &&<option value={4}>
                                    {fireteam[4].name}
                                </option>}

                                {(selectedRoles.indexOf(5) === -1 || selectedRoles[2] === 5) &&<option value={5}>
                                    {fireteam[5].name}
                                </option>}
                            </select>
                        </div>
                        <div className='encounterRoleSelector'>
                            {roles[3]}: &nbsp;
                            <select id='role4' onChange={e=>handleRoleUpdate(e, 3)}>
                                <option value={9}>

                                </option>

                                {(selectedRoles.indexOf(7) === -1 || selectedRoles[3] === 7) &&<option value={7}>
                                    {fireteam[0].name}
                                </option>}

                                {(selectedRoles.indexOf(1) === -1 || selectedRoles[3] === 1) &&<option value={1}>
                                    {fireteam[1].name}
                                </option>}

                                {(selectedRoles.indexOf(2) === -1 || selectedRoles[3] === 2) &&<option value={2}>
                                    {fireteam[2].name}
                                </option>}

                                {(selectedRoles.indexOf(3) === -1 || selectedRoles[3] === 3) &&<option value={3}>
                                    {fireteam[3].name}
                                </option>}

                                {(selectedRoles.indexOf(4) === -1 || selectedRoles[3] === 4) &&<option value={4}>
                                    {fireteam[4].name}
                                </option>}

                                {(selectedRoles.indexOf(5) === -1 || selectedRoles[3] === 5) &&<option value={5}>
                                    {fireteam[5].name}
                                </option>}
                            </select>
                        </div>
                        <div className='encounterRoleSelector'>
                            {roles[4]}: &nbsp;
                            <select id='role5' onChange={e=>handleRoleUpdate(e, 4)}>
                                <option value={9}>

                                </option>

                                {(selectedRoles.indexOf(7) === -1 || selectedRoles[4] === 7) &&<option value={7}>
                                    {fireteam[0].name}
                                </option>}

                                {(selectedRoles.indexOf(1) === -1 || selectedRoles[4] === 1) &&<option value={1}>
                                    {fireteam[1].name}
                                </option>}

                                {(selectedRoles.indexOf(2) === -1 || selectedRoles[4] === 2) &&<option value={2}>
                                    {fireteam[2].name}
                                </option>}

                                {(selectedRoles.indexOf(3) === -1 || selectedRoles[4] === 3) &&<option value={3}>
                                    {fireteam[3].name}
                                </option>}

                                {(selectedRoles.indexOf(4) === -1 || selectedRoles[4] === 4) &&<option value={4}>
                                    {fireteam[4].name}
                                </option>}

                                {(selectedRoles.indexOf(5) === -1 || selectedRoles[4] === 5) &&<option value={5}>
                                    {fireteam[5].name}
                                </option>}
                            </select>
                        </div>
                        <div className='encounterRoleSelector'>
                            {roles[5]}: &nbsp;
                            <select id='role6' onChange={e=>handleRoleUpdate(e, 5)}>
                                <option value={9}>

                                </option>

                                {(selectedRoles.indexOf(7) === -1 || selectedRoles[5] === 7) &&<option value={7}>
                                    {fireteam[0].name}
                                </option>}

                                {(selectedRoles.indexOf(1) === -1 || selectedRoles[5] === 1) &&<option value={1}>
                                    {fireteam[1].name}
                                </option>}

                                {(selectedRoles.indexOf(2) === -1 || selectedRoles[5] === 2) &&<option value={2}>
                                    {fireteam[2].name}
                                </option>}

                                {(selectedRoles.indexOf(3) === -1 || selectedRoles[5] === 3) &&<option value={3}>
                                    {fireteam[3].name}
                                </option>}

                                {(selectedRoles.indexOf(4) === -1 || selectedRoles[5] === 4) &&<option value={4}>
                                    {fireteam[4].name}
                                </option>}

                                {(selectedRoles.indexOf(5) === -1 || selectedRoles[5] === 5) &&<option value={5}>
                                    {fireteam[5].name}
                                </option>}
                            </select>
                        </div>

                     
                    <div className='encounterDivinitySelector'>
                        Divinity: 
                        <select id='divSelector'>
                            <option value={9}>

                            </option>
                            {fireteam[0].hasDiv && 
                                <option value={1}>
                                    {fireteam[0].name}
                                </option>
                            }
                            {fireteam[1].hasDiv && 
                                <option value={1}>
                                    {fireteam[1].name}
                                </option>
                            }
                            {fireteam[2].hasDiv && 
                                <option value={1}>
                                    {fireteam[2].name}
                                </option>
                            }
                            {fireteam[3].hasDiv && 
                                <option value={1}>
                                    {fireteam[3].name}
                                </option>
                            }
                            {fireteam[4].hasDiv && 
                                <option value={1}>
                                    {fireteam[4].name}
                                </option>
                            }
                            {fireteam[5].hasDiv && 
                                <option value={1}>
                                    {fireteam[5].name}
                                </option>
                            }
                        </select>
                    </div> 
                    

                    </div>
                </div>

                <div className='encounterSection enemies'>
                    <div className='encounterHeader'> 
                        Expected Enemies
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Minors</th>
                                <th>Majors</th>
                                <th>Boss</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            <tr>
                                <td>
                                    <ul style={{paddingRight: '2px'}}>
                                        <li>
                                            Taken Thrall
                                        </li>
                                        <li>
                                            Taken Vandals
                                        </li>
                                        <li>
                                            Taken Boomer Knights
                                        </li>
                                        <li>
                                            Taken Acolytes
                                            <ol className='encounterSubBulletPoint'>
                                                Acolyte's Eyes
                                                </ol>
                                        </li>
                                        <li className='shieldedEnemy arc'>
                                            Taken Centurion
                                        </li>
                                        <li>
                                            Light Eater Knight *
                                        </li>
                                    </ul>
                                </td>
                                <td>
                                    <ul style={{paddingLeft: '15px'}}>
                                        <li>
                                            Vessel of Oryx
                                            <ol className='encounterSubBulletPoint'>
                                                Major Hive Sword Knight
                                                </ol>
                                        </li>
                                        <li>
                                            Taken Boomer Knight **
                                        </li>
                                        <li>
                                            Light Eater Ogre ***
                                            <ol className='encounterSubBulletPoint'>
                                                Ultra Taken Ogre
                                                </ol>
                                        </li>
                                    </ul>
                                </td>
                                <td>
                                    <ul style={{paddingLeft: '15px'}}>
                                        <li>
                                            Oryx, the Taken King
                                        </li>
                                        <li>
                                            Shade of Oryx
                                        </li>
                                        
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                        
                    </table>

                    <div className='encounterSubSection'>
                        <div>
                            * Light Eater Knights were Minor Hive Knights present only in Hard Mode of King's Fall. Bungie has stepped away from adding additional mechanics to higher tier Raid difficulties, so it is unknown if King's Fall will be preserved at its Normal Difficulty, without the Light Eater Knights, or Hard Difficulty, with them        
                        </div>
                        <p></p>
                        <div>
                            ** Major Taken Boomer Knights spawn on each plate during Oryx's Artillery phase. In Destiny 1, they could be ignored completely and automatically died when the phase ended        
                        </div>
                        <p></p>
                        <div>
                            *** Light Eater Ogre's drop Corrupted Light, used to damage Oryx. They may be Ultras in Destiny 2, and the Floater might be able to use Aeon's Cult Finisher to generate Heavy Ammo for the fireteam to pick up in between phases, provided the Floater can evacuate the Corrupted Light before detonating it after the finisher        
                        </div>

                    </div>

                </div>

                <div className='encounterSection tips oryx'>
                    <div className='encounterHeader'> 
                        Tips
                    </div>

                    <div className='encounterSubSection oryx'>
                        <ul style={{paddingLeft: '20px'}}>

                            <li className='encounterBulletPoint'>
                                Though Divinity offers a large crit spot against most enemies, Oryx's chest is already enormous. Consider not using Divinity at all, and instead using Sundering Glare exclusively
                                <ol className='encounterSubBulletPoint'>
                                    If Sundering Glare applies as expected, use it, otherwise test Divinity and Tether for easiest debuff to apply during damage checks
                                </ol>
                            </li>

                            <li className='encounterBulletPoint'>
                                Oryx is an execution based fight with little randomness
                                <ol className='encounterSubBulletPoint'>
                                Small mistakes in execution escalate into bigger problems quickly, so teams should communicate effectively when encountering trouble
                                </ol>
                                <ol className='encounterSubBulletPoint'>
                                Floaters will have a lot of responsibility and be familiar with every mechanic to act as a safety
                                </ol>

                            </li>

                            <li className='encounterBulletPoint'>
                                Priority adds in higher difficulties are as follows:
                                <ol className='encounterSubBulletPoint'>
                                Kill Light Eater Ogres as they spawn, don't let them move
                                </ol>
                                <ol className='encounterSubBulletPoint'>
                                Kill Acolyte's Eyes, as their fast projectile is very threatening
                                </ol>
                                <ol className='encounterSubBulletPoint'>
                                Taken Centurion's, as their Axion Darts while likely do unreasonable damage in Contest mode
                                </ol>
                            </li>

                            <li className='encounterBulletPoint'>
                                Stepping off ANY plate at ANY time will cause ALL of the plates to become insubstantial for the Runner
                            </li>

                            <li className='encounterBulletPoint'>
                                You can activate the platforms as quickly as you want, there is no timer or delay necessary
                                <ol className='encounterSubBulletPoint'>
                                    Try watching for the previous plate's Nameplate through the wall or across the map. When it jumps up and stops at a higher elevation, you're cleared to jump yourself
                                </ol>
                            </li>

                            <li className='encounterBulletPoint'>
                                Plate-holders should be aware that Oryx always slams twice - once to initiate the Runner Phase, and a second time to initiate his DPS Check. Get off your plate after your Runner has the Brand of the Claimer/Immortality!
                            </li>


                            <li className='encounterBulletPoint'>
                                Runners should not touch the Tomb Ship that flies through the arena - it will instantly kill you
                            </li>


                            <li className='encounterBulletPoint'>
                                The entire fireteam should be in position for the DPS Check immediately after Oryx slams his plate the second time - if your screen shakes, stop what you're doing and get ready to stagger Oryx
                            </li>

                            <li className='encounterBulletPoint'>
                                Brand Holders should continue to damage Oryx while the fireteam is detonating their Corrupted Light, otherwise his chest will close and he will take no damage from the Corrupted Light's detonations
                            </li>

                            <li className='encounterBulletPoint'>
                                Countdown before everyone steps into the Corrupted Light, don't just sprint to the orb - some orbs are farther than others
                                <ol className='encounterSubBulletPoint'>
                                "Orbs in Three, Two,..."
                                </ol>
                            </li>

                            <li className='encounterBulletPoint'>
                                Don't leave your Corrupted Light until you see your name in the in-game feed!
                            </li>

                            <li className='encounterBulletPoint'>
                                You don't have to run and detonate your Corrupted Lights immediately after staggering Oryx, you can spend a few seconds clearing threatening adds from the safety of the Brand of Immortality before running to your orb
                                <ol className='encounterSubBulletPoint'>
                                If you wait too long, Oryx will reset to an Artillery Phase or a Shade of Oryx Phase, forcing you to detonate the orbs later in the fight
                                </ol>
                                <ol className='encounterSubBulletPoint'>
                                Another powerful option is an Omnioculus Hunter Smoke Bomb for invis - give every 7 extra seconds to run without threat from adds (Omnioculus also provides damage resistant to anyone invisble)
                                </ol>
                            </li>

                            <li className='encounterBulletPoint'>
                                Taken Boomer Knights spawn on the Back two plates when entering a Shade of Oryx phase - make sure they die quickly
                            </li>

                            <li className='encounterBulletPoint'>
                                When in the Blight with the Shade of Oryx, you can continue to damage him while he is in the mist - look for and shoot that spooky lad!
                            </li>

                            <li className='encounterBulletPoint'>
                                Whenever you get teleported into the Blight with the Shade of Oryx, always move away from the center of the arena as quickly as possible!
                                <ol className='encounterSubBulletPoint'>
                                    <a className='dimLink' href='https://youtu.be/ZMwUgwiWN88?t=877' target='_blank' rel='noreferrer'>
                                    Datto explains why
                                    </a>
                                </ol>
                                
                            </li>

                            <li className='encounterBulletPoint'>
                                In Destiny 1, a Shadowshot suppressed the Shade of Oryx - perhaps Suppressing Grenades, Bombadiers, or Blinding Grenades will work in Destiny 2?
                            </li>

                            <li className='encounterBulletPoint'>
                                The Shade of Oryx will flash White before he enters the arena to attack players - always call it out so players can avoid his slam (think Rhulk's kick in Vow of the Disciple)
                            </li>

                            <li className='encounterBulletPoint'>
                                Whenever the Shade of Oryx teleports, he'll leave behind an after-effect indicating which direction he teleported, always call this out so everyone can track him
                                <ol className='encounterSubBulletPoint'>
                                    <a className='dimLink' href='https://youtu.be/ZMwUgwiWN88?t=897' target='_blank' rel='noreferrer'>
                                    Datto explains again
                                    </a>
                                </ol>
                            </li>

                            <li className='encounterBulletPoint'>
                                When performing the 16 Orb strategy, you may need to spend extra time to activate all 4 of your orbs. Always make sure every orb detonates, even if it kills you
                                <ol className='encounterSubBulletPoint'>
                                    In particular, this is where having a countdown before activating the Orbs is helpful
                                </ol>
                                <ol className='encounterSubBulletPoint'>
                                    Call out to your fireteam if you're dying intentionally to activate the Orbs so they can revive you BEFORE Oryx's Last Stand
                                </ol>
                            </li>

                            <li className='encounterBulletPoint'>
                                While under a Brand or Aura of protection you cannot take damage - but you can still be flinched by incoming fire
                                <ol className='encounterSubBulletPoint'>
                                    When you set up for DPS with your fireteam under your Brand or Aura, spare an extra few bullets or grenade for any enemies nearby to make your DPS experience just that little bit easier
                                </ol>
                            </li>

                            <li className='encounterBulletPoint'>
                                Triple Tap and Fourth Times the Charm weaponry (Sniper or Shotgun) will both be effective due to their free ammo generation
                            </li>

                        </ul>
                    </div>


                </div>

                <div className='encounterSection recommended'>
                    <div className='encounterHeader'> 
                        Recommended Weapons and Builds
                    </div>
                    <div className='buildSlotsContainer'>
                        <div className='buildSlot'>
                            <div className='buildSlotIcon whisper'>
                                {/* Icon */}
                            </div>
                            <div className='buildSlotDetails'>
                            Whispered Breathing and Ammo Economy. Hit that DPS Check
                            </div>
                        </div>
                        <div className='buildSlot'>
                            <div className='buildSlotIcon sleeper'>
                                {/* Icon */}
                            </div>
                            <div className='buildSlotDetails'>
                                Higher burst than Whisper, but needs Heavy Bricks to drop 
                            </div>
                        </div>
                        <div className='buildSlot'>
                            <div className='buildSlotIcon cataclysmic'>
                                {/* Icon */}
                            </div>
                            <div className='buildSlotDetails'>
                                Legendary Sleeper, huge damage, ammo generation
                            </div>
                        </div>
                        <div className='buildSlot'>
                            <div className='buildSlotIcon stormchaser'>
                                {/* Icon */}
                            </div>
                            <div className='buildSlotDetails'>
                                See Cataclysmic. Worse ammo economy. Affected by flinch more
                            </div>
                        </div>

                        <div className='buildSlot'>
                            <div className='buildSlotIcon outbreak'>
                                {/* Icon */}
                            </div>
                            <div className='buildSlotDetails'>
                                When you have no Heavy but still need damage. Pair w/ Cataclysmic
                            </div>
                        </div>

                        <div className='buildSlot'>
                            <div className='buildSlotIcon gjallarhorn'>
                                {/* Icon */}
                            </div>
                            <div className='buildSlotDetails'>
                                Rockets have huge burst, but Oryx's chest is a free crit spot
                            </div>
                        </div>

                        <div className='buildSlot'>
                            <div className='buildSlotIcon sniper'>
                                {/* Icon */}
                            </div>
                            <div className='buildSlotDetails'>
                                Special weapon of choice in this encounter. Good for Ogres and Knights
                            </div>
                        </div>

                        <div className='buildSlot'>
                            <div className='buildSlotIcon sundering'>
                                {/* Icon */}
                            </div>
                            <div className='buildSlotDetails'>
                                Pairs best with snipers and linears. Does not stack with Divinity
                            </div>
                        </div>

                        <div className='buildSlot'>
                            <div className='buildSlotIcon witherhoard'>
                                {/* Icon */}
                            </div>
                            <div className='buildSlotDetails'>
                                Put the icky on the enemy spawns. Pairs well with Legendary Linears
                            </div>
                        </div>

                        <div className='buildSlot'>
                            <div className='buildSlotIcon arcResist'>
                                {/* Icon */}
                                <div className='buildSlotIcon arcResist colors'>
                                {/* subIcon */}
                                </div>
                            </div>
                            <div className='buildSlotDetails'>
                                Acolytes, Eyes, and Ogres deal Arc. Melee Resist for the Shade
                            </div>
                        </div>

                        <div className='buildSlot'>
                            <div className='buildSlotIcon voidResist'>
                                {/* Icon */}
                                <div className='buildSlotIcon voidResist colors'>
                                {/* subIcon */}
                                </div>
                            </div>
                            <div className='buildSlotDetails'>
                                Centurions and Knights deal Void
                            </div>
                        </div>

                        <div className='buildSlot'>
                            <div className='buildSlotIcon acrius'>
                                {/* Icon */}
                            </div>
                            <div className='buildSlotDetails'>
                                [softly]
                                <div>
                                    "Don't."
                                </div>
                            </div>
                        </div>

                        <div className='buildSlot'>
                            <div className='buildSlotIcon touchOfMalice'>
                                {/* Icon */}
                            </div>
                            <div className='buildSlotDetails thisIsWhere'>
                                This is where I would put my Touch of Malice... IF I HAD ONE
                            </div>
                        </div>

                        <div className='buildSlot'>
                            <div className='buildSlotIcon wishender'>
                                {/* Icon */}
                            </div>
                            <div className='buildSlotDetails'>
                                Something funny
                            </div>
                        </div>

                        <div className='buildSlot'>
                            <div className='buildSlotIcon malfeasance'>
                                {/* Icon */}
                            </div>
                            <div className='buildSlotDetails'>
                                <a className='dimLink' href='https://wiki.teamfortress.com/w/images/f/f8/Medic_sf13_influx_big02.wav' target='_blank' rel='noreferrer'>
                                    The Anti-Taken Machine. Only use as full fireteam
                                </a>
                                <div style={{fontSize: 'x-small'}}>volume warning</div>
                            </div>
                        </div>

                    </div>
                    
                </div>

                <div className='encounterSection expectedChanges'>
                    <div className='encounterHeader'> 
                        Expected Changes in Destiny 2
                    </div>

                    <div className='encounterSubSection'>
                        <ul style={{paddingLeft: '20px'}}>
                            <li className='encounterBulletPoint'>
                                If Season of Plunder's activities have shown us anything, it's that Bungie has figured out how to absolutely flood the map with enemies. Expect so many Thrall and Acolytes that you have 
                            </li>
                            <li className='encounterBulletPoint'>
                                Champions would be unlikely in Normal difficulty. It's possible the Vessel of Oryx becomes a Barrier Knight, though it contradicts having a Sword with a Champion Knight's Boomer. Maybe the Taken Knights during the Artillery Phase become champions? Oh, could you imagine an Unstoppable Light Eating Ogre, though? If you stunned it too soon before it popped out of the ground and sprinted into the middle of the arena? That would be so crazy, just totally unreasonable...
                                <p></p>
                                ...right?
                            </li>
                            <li className='encounterBulletPoint'>
                                Lucent Hive could make an appearance here. Because there isn't a "Damage Phase", and only a DPS-Check and the execution of mechanics, it wouldn't be beyond the realm of imagination to see Bungie replace a single (or both) of the Taken Centurions during the Runner Phase with a Lucent Hive Wizard, that would be absolutely brutal to deal with in the best possible way. 
                            </li>
                            <li className='encounterBulletPoint'>
                                Tweaks to the Plates mechanic could be possible. Perhaps the plate order will change from the classic's Counter-Clockwise every time
                            </li>
                        </ul>
                    </div>


                </div>

                 <div className='encounterSection walkthrough'>
                    <div className='encounterHeader'> 
                        Walkthrough
                    </div>

                    <div className='encounterWalkthroughContainer'>

                            <p className='encounterWalkthroughParagraph'>
                                It is time, Guardian. You've killed his son, eliminated his Light tithing structure, and infiltrated his Throne World to put yourselves before the greatest threat the solar system has seen since the First Collapse. It is time for to face off against The Taker of Will, The Destroyer of Light, The First Navigator - Oryx, the Taken King.
                            </p>

                            <p className='encounterWalkthroughParagraph'>
                                The Oryx fight is a long and thorough affair primarily focused around the execution of several mechanics, Minor, Major, and Ultra add clear, a white-knuckle DPS check, and a one-on-one duel against a sword wielding nightmare, before a final Last Stand that introduced the mechanic to the Destiny franchise. Let's get into the details.
                            </p>

                            <div className='walkthroughImageContainer'>
                                <a className='imgLink' 
                                rel="noreferrer"
                                href='https://i.imgur.com/3KUEolS.png'
                                target='_blank'>
                                    <img 
                                        className='walkthroughImage'
                                        src="https://i.imgur.com/3KUEolS.png" alt="A view of initial state of the Oryx encounter" /> 
                                </a>
                                A view of initial state of the Oryx encounter. Note the ordering and naming convention of the plates. Image courtesy of u/Taux 
                            </div>


                            <p className='encounterWalkthroughParagraph'>
                                The Oryx fight takes place in the same arena as the Daughters of Oryx encounter, with only a single modification made to the arena later on in the Shade of Oryx Phase. For roles, assign four guardians to Plates, just as in the Daughters encounter, along with a dedicated Runner (you get to choose who platforms for the relic in this encounter!), and finally a Floater. Though everyone's job is important, the Floater has the highest barrier to entry, as they have to know every role intimately to assist and replace fallen Guardians on the fly, at any time during the encounter. This is only of particular importance during the Runner phase, but is still relevant later on throughout the fight.
                            </p>

                            <p className='encounterWalkthroughParagraph'>
                                The fight is split into a number of phases that follow a predictable order. First, as a prologue, there will be a token add wave of enemies. Once cleared, Oryx will enter the Runner Phase, followed by the DPS-Check phase. After completing a DPS-Check, Oryx will enter either the Artillery Phase or the Shade of Oryx Phase depending on his remaining health. Upon completion of the Shade of Oryx or an Artillery Phase, Oryx will return to another Runner Phase. Upon bringing Oryx's health down to zero, he'll return to the front of the arena, where he first appeared, for a final DPS-Check and Last Stand mechanic. If you can stagger him a final time, it's game over for the Taken King, and you'll either have completed your first kill or you'll be claiming your Day 1 Emblem.
                            </p>

                            <p className='encounterWalkthroughParagraph wide'>
                                For the purpose of this guide, I will be referencing the images provided. They will precede each respective section.
                            </p>

                            <div className='walkthroughImageContainer'>
                                <a className='imgLink' 
                                rel="noreferrer"
                                href='https://i.imgur.com/1YagBup.png'
                                target='_blank'>
                                    <img 
                                        className='walkthroughImage'
                                        src="https://i.imgur.com/1YagBup.png" alt="Phase 1 of the Oryx encounter, the add clearing prologue" /> 
                                </a>
                                Phase 1 of the Oryx encounter, the add clearing prologue. Image courtesy of u/Taux 
                            </div>


                            <p className='encounterWalkthroughParagraph'>
                                The fight begins when a guardian approaches the Taken Orb at the edge of the arena after defeating the Daughters of Oryx. Oryx will emerge from below the terrain, a gigantic, 100 foot tall monstrosity. That said, Oryx will not immediately enter the fight. Instead, a number of Taken Thrall appear in the corners and two Taken Knights will spawn on plates 3 and 4. On the death of the Taken Knights, Oryx will enter the next phase of the fight - the Runner Phase, so make sure the Thrall are dead before turning towards the Knights. It should be fairly easy, as they spawn from the same location every time.
                            </p>

                            <div className='walkthroughImageContainer'>
                                <a className='imgLink' 
                                rel="noreferrer"
                                href='https://i.imgur.com/U5VYRdJ.png'
                                target='_blank'>
                                    <img 
                                        className='walkthroughImage'
                                        src="https://i.imgur.com/U5VYRdJ.png" alt="The Runner/DPS Phase, showing where each enemy spawns in the arena" /> 
                                </a>
                                The Runner/DPS Phase, showing where each enemy spawns in the arena. Image courtesy of u/Taux 
                            </div>

                                

                            <p className='encounterWalkthroughParagraph image'>
                                The Runner Phase will begin with Oryx rotating around the edges of the arena before coming to a stop at a plate. Raising a fist, he will slam the plate, killing any guardians on it - make sure you stand clear, as the AoE is a bit overzealous. On raising his fist, Oryx will leave a small Taken orb. The first guardian to touch the Orb will become Torn Between Dimensions - identical to the Daughters of Oryx encounter. Oryx will then fire his face laser (yes that's a real thing) at the player who is Torn, hereafter called the Runner. The Runner must climb an ascending series of platforms, identical in shape, height, and order to the Daughter's Encounter. Upon reaching the end of their jumping platforms the Runner will recieve a Brand of the Claimer, identical to the Daughters encounter, and be returned to the physical realm.
                            </p>

                            <p className='encounterWalkthroughParagraph'>
                                In order for the Runner to ascend, the rest of the fireteam will need to step on the four(4) plates in the Arena in a counter-clockwise order, identical to the Daughters encounter. The same rules apply - if any Guardian steps off the plate, ALL of the other platforms will despawn, forcing the platforms, and the Runner, to start over from the beginning. This time, instead of Taken Vandals spawning outside of the arena, a Major (or Ultra) Light Eater Ogre will spawn out of the ground next to each plate whenever it is stepped on. The Ogres will always spawn at the same time, and should be killed on spawn every time. If you need help, the other Plate Holder on your side can assist you, and upon killing your Ogre, you should help your ally with killing their Ogre. A number of token Thrall, Acolytes and one Taken Centurion will also spawn on each side, which should be dealt with while the Runner retrieves the Brand of the Claimer.
                            </p>

                            <p className='encounterWalkthroughParagraph'>
                                As a brief aside - we do not know yet if the Oryx encounter will include the Light Eater Knights present in Destiny 1's hard mode. Just in case, here's how to handle them. Every time an Ogre dies, a Light Eater Knight will spawn on the opposite side of that side of the arena. Using the image above as reference, when the Ogre just above Plate 1 dies, a minor Light Eater Knight will spawn in the corner of the arena below 2, where the Taken Thrall image is shown. These Knights will run without stopping to their corresponding Corrupted Light, and if they reach it, will detonate the Corrupted Light, often wiping the fireteam, if not upsetting your total damage against Oryx. These should ALWAYS be killed after an Ogre dies - there is always one Knight per Ogre.
                            </p>

                            <p className='encounterWalkthroughParagraph'>
                                At this point, the Plate-holders will have noticed that killing an Ogre drops a swirling black sphere at their place of death. These are Orbs of Corrupted Light. Standing next to one for a few seconds will cause it to detonate, showing "Player has detonated Corrupted Light" in the in-game feed. When the Corrupted Light detonates, it kills nearly everything in the arena, and has the potential to deal significant damgage to Oryx - if he's able to taken damage.
                            </p>

                            <p className='encounterWalkthroughParagraph'>
                                The Orb of Corrupted Light can only be survived one way. When the Runner retrieves their Brand of the Claimer, a Hive Tomb Ship will spawn at the top end of the arena, where the Oryx encounter was first started. A Major Vessel of Oryx will drop out of it, with a Brand of Immortality, similar to the Daughters of Oryx's Brand of Weaving and Brand of Unraveling. Any guardian standing in the Aura provided by this Brand will have complete damage immunity - even from self damage like Rockets, Tommy's Matchgun, or [redacted] from Destiny 1, though they can be flinched by incoming fire. 
                            </p>

                            <p className='encounterWalkthroughParagraph'>
                                When the Runner claims the Brand of Immortality from the Vessel of Oryx, it should be immediately destroyed by the rest of the fireteam, as the Vessel of Oryx will operate similary to the Light Eater Knights, running to and detonating any Orbs of Corrupted Light that it can get its hands on. 
                            </p>

                            <p className='encounterWalkthroughParagraph'>
                                The Runner should then reposition into the center of the arena, in between the two tall pillars where the Daughters were position in the previous encounter. Shortly after the Runner gets their Brand of the Claimer (and then the Brand of Immortality), Oryx will raise his fist and slam the same platform that he's been standing behind during the Runner phase (your Plate-holder 'did' evacuate that plate, right?). Immediately after, Oryx will begin to cast Doxology, a wipe mechanic that will occur several times over the course of the fight. When casting, Oryx's chest will open up and begin to glow white - the fireteam should immediately begin to damage his chest as soon as it starts to glow. If the guardians deal enough damage, Oryx will stagger, stopping the cast. If the guardians don't deal enough damage, Oryx will not stagger, complete the cast, and wipe the fireteam, killing everyone and resetting any progress in the encounter.
                            </p>
                            
                            <p className='encounterWalkthroughParagraph image'>
                                This cast of Doxology is the mini-phase called the DPS-Check. It happens as soon the runner claims the Brand of Immortality from the Vessel of Oryx. As soon as the Runner has the brand, the fireteam should kill the Knight, and, regardless of the remaining enemies in the arena (excluding Light Eater Ogres and Light Eater Knights, which should already be dead), group up next to the Runner, in the safety of the Brand of Immortality. All players should immediately followup and damage Oryx to stagger him the moment his chest opens up. If successfully staggered, the players will have a chance to deal 'actual' damage to Oryx utilizing the Orbs of Corrupted Light.
                                </p>


                                <div className='walkthroughImageContainer'>
                                <a className='imgLink' 
                                rel="noreferrer"
                                href='https://images.squarespace-cdn.com/content/v1/5570fe14e4b0a0d418a2bf32/1445848540346-1BXJSMJFL0HB2WGXPV8U/image-asset.png'
                                target='_blank'>
                                    <img 
                                        className='walkthroughImage'
                                        src="https://images.squarespace-cdn.com/content/v1/5570fe14e4b0a0d418a2bf32/1445848540346-1BXJSMJFL0HB2WGXPV8U/image-asset.png" alt="Oryx casting Doxology, with his chest open" /> 
                                </a>
                                Oryx casting Doxology, with his chest open. Image courtesy of scottfinegamedesign.com 
                                {/* https://scottfinegamedesign.com/design-blog/tag/King%27s+Fall */}
                            </div>

                            

                                <p className='encounterWalkthroughParagraph'>
                                After casting Doxology, Oryx's chest will open, and, as long as he continues to take damage to his chest, stay open. The Runner and the Floater should remain *inside* the Aura of Immortality continuing to damage Oryx with Primary weapons (keeping his chest open), while the four Plate-holders will then separate from the Aura, returning to their Plates, and activating the Orbs of Corrupted Light. This is usually done after a short count-down ("Three, Two, One, Go"), so their detonations can be synced. After the Plate-holder sees their name in the in-game feed, they will turn and run back to the Aura of Immortality to survive the detonation of the Corrupted Light. If one player detonates too soon, it can result in their Corruped Light detonating early, before the other players have made it back to the Aura of Immortality, killing them. If an Orb is detonated too late, it will still detonate with the others, however the offending player will likely die running back to the Aura for safety. In the event that one of the Plate-Holders has died, the Floater can activate their Orb of Corrupted Light. If two Plate-holders died, the Brand of Immortality can activate one Orb, while the Floater covers the other, however the Brand of Immortality should IMMEDIATELY return to the center of the arena - if they don't protect the rest of the fireteam with their Aura, EVERYONE dies.
                            </p>

                            <p className='encounterWalkthroughParagraph'>
                                If done correctly, the four Orbs of Corrupted Light will detonate while Oryx's chest remained open. Each Orb's detonation deals roughly 6% of Oryx's total health, with four dealing exactly 25%, and 16 Orbs killing Oryx completely. As the orbs don't go anywhere or do anything without being deliberately detonated by guardians, Light Eater Knights, or a Vessel of Oryx, it is possible to stack them. That, in fact, was the Challenge for Oryx in Destiny 1's version of King's Fall - detonate all 16 Orbs of Corrupted Light at once to take Oryx from 100% health down to 0, in a single huge burst.
                            </p>

                            <p className='encounterWalkthroughParagraph image'>
                                With that done, you will have completed first, and most important, phase of the fight. After every Runner/DPS-Check phase, Oryx will follow it up with an Artillery Phase, if his health is above 50%, or a Shade of Oryx Phase, if his health is at or below 50%. In a perfect fight, the order will be as follows: Prologue, Runner/DPS, Artillery, Runner/DPS, Shade of Oryx, Runner/DPS, Shade of Oryx, Runner/DPS, Last Stand. 
                            </p>

                            <div className='walkthroughImageContainer'>
                                <a className='imgLink' 
                                rel="noreferrer"
                                href='https://i.imgur.com/DR2zxmJ.png'
                                target='_blank'>
                                    <img 
                                        className='walkthroughImage'
                                        src="https://i.imgur.com/DR2zxmJ.png" alt="The Artillery Phase, and different routes to avoid Oryx's attacks" /> 
                                </a>
                                The Artillery Phase, and different routes to avoid Oryx's attacks. Image courtesy of u/Taux 
                            </div>
                          

                            <p className='encounterWalkthroughParagraph'>
                                Upon your first completion of a Runner/DPS phase to Oryx, he will stagger out of the Arena and drift away from the Dreadnaught. Four Major Taken Boomer Knights will spawn, one on each plate, though they can safely be ignored. Oryx, out in space, will begin firing enormous artillery blasts, notified by a growing marker on the ground by each guardian. These artillery blasts can easily by outrun by sprinting, outpacing the blast radius. Visible in the above image are dotted lines show potential safe routes that each guardian can take in order to avoid getting hit by the artillery blast, while simultaneously avoiding any overlap with any other guardian's path, preventing overlap and accidental fratricide. 
                            </p>

                            <p className='encounterWalkthroughParagraph wide'>
                                After a moderate duration (around 45 seconds), Oryx will stop firing his artillery blasts and return back to the arena, ready to resume with a new Runner/DPS phase. Any remaining Taken Boomer Knights on the plate will die automatically as the phase ends, and players prepare for another round of Platforms, Light Eater Ogres, and Orbs of Corrupted Light.
                            </p>

                            <div className='walkthroughImageContainer'>
                                <a className='imgLink' 
                                rel="noreferrer"
                                href='https://i.imgur.com/BNDeKEh.png'
                                target='_blank'>
                                    <img 
                                        className='walkthroughImage'
                                        src="https://i.imgur.com/BNDeKEh.png" alt="The Shade of Oryx phase, and the spawn location of Taken enemies in it" /> 
                                </a>
                                The Shade of Oryx phase, and the spawn location of Taken enemies in it. Image courtesy of u/Taux 
                            </div>

                            <p className='encounterWalkthroughParagraph image'>
                                When Oryx reaches 50% health and lower, or after eight(8) Orbs of Corrupted Light detonations, Oryx will follow up the Runner/DPS phase with a Shade of Oryx phase. Returning to the front of the arena, Oryx will summon a Taken Blight, creating a pocket realm. One by one, players will be teleported inside the realm. Once all 6 players are inside, Oryx will begin to cast Doxology, wiping the fireteam without any ability for them to stop him (clever girl...).
                            </p>

                            <p className='encounterWalkthroughParagraph'>
                                In addition, there will be a number of additional enemy distractions, consisting of Taken Thrall (spawning in the corner of the arena near plates 3 and 4), and two Minor Taken Boomer Knights (spawning on plates 3 and 4). These enemies will run towards the Taken Blight, and if they are allowed to reach it, they will be teleported inside the Blight to the arena with the rest of the guardians. If you are outside of the arena, split your fireteam and kill any enemies as they spawn to protect the guardians inside. 
                            </p>

                            <p className='encounterWalkthroughParagraph image'>
                                While inside the arena, guardians will be unable to recover health. They will have to contend with a Shade of Oryx, a 10-foot tall sword wielding projection of Oryx's will that can likely one-shot players (Melee Damage Resist + 10 resilience PLEASE BE ENOUGH). This Shade of Oryx acts as a miniboss to the full Oryx fight. The Shade will patrol outside of the edges of the arena, using the mist to obscure itself from vision. It can use teleportation to maneuver around the arena to avoid detection, though each time it teleports, it leaves a small after-effect indicating which direction it teleported in, which should be called out so that the fireteam can track its movements. When the Shade pulses with white energy, it will raise its sword and enter into the arena, looking to drift around and smash a player. Its movements are erratic and are to be avoided at all times. Keep as much distance as possible.
                            </p>

                            <div className='walkthroughImageContainer'>
                                <a className='imgLink' 
                                rel="noreferrer"
                                href='https://i.ytimg.com/vi/r2Aftt3dyNk/maxresdefault.jpg'
                                target='_blank'>
                                    <img 
                                        className='walkthroughImage'
                                        src="https://i.ytimg.com/vi/r2Aftt3dyNk/maxresdefault.jpg" alt="The Shade of Oryx pursuing a player" /> 
                                </a>
                                The Shade of Oryx pursuing a player. Image courtesy of HakkezZ 
                            </div>

                            <p className='encounterWalkthroughParagraph wide'>
                                If the Shade of Oryx is defeated, the fireteam will be ejected from the Blight and back into the arena, which will automatically stagger Oryx if he was casting Doxology, preventing a wipe. Simply put, if you get teleported into the Arena with the Shade of Oryx, kill it as quickly as possible. If you don't kill it fast enough, you wipe. While other guardians are being teleported into the arena, any remaining guardians should be killing adds that seek to teleport into the arena and make killing the Shade more difficult. You do not need to worry about staggering Oryx out of his Doxology cast upong returning to the normal battle arena, and should prepare for another Runner/DPS phase.
                            </p>

                            <div className='walkthroughImageContainer'>
                                <a className='imgLink' 
                                rel="noreferrer"
                                href='https://assets.vg247.com/current//2015/12/Oryx-is-finally-dead-Copy.jpg'
                                target='_blank'>
                                    <img 
                                        className='walkthroughImage'
                                        src="https://assets.vg247.com/current//2015/12/Oryx-is-finally-dead-Copy.jpg" alt="Oryx's Last Stand" /> 
                                </a>
                                Oryx's final cast of Doxology. Image courtesy of VG247 
                            </div>
                                

                            <p className='encounterWalkthroughParagraph image'>
                                Those are all of the mechanics to the Oryx encounter! Easy peasy, right? If successfully executed, Oryx should see his health drop to zero with the successful completion of fourth Runner/DPS phase. After Oryx's health drops to 'zero', he will return to the front of the arena for one final cast of Doxology - a successful stagger here will stop Oryx once and for all, as the fireteam will be rewarded with, not only loot, but the priceless image of Oryx drifting out into the dead space of Jupiter, forever defeated (until King's Fall was reprised...).
                                </p>
                            <p className='encounterWalkthroughParagraph'>
                                There are two primary strategies to this fight that have become popular. The first is as described, detonating Orbs of Corrupted Light any time they are availabled to be used against Oryx. This is technically the 'safer' strategy in the long run, as this method sends four guardians out after every Doxology, preventing any Orbs of Corrupted Light from being detonated by any wayward Vessels of Oryx or Light Eater Knights. That said, every time the fireteam has to leave the Aura of Immortality has express risks if the adds nearby haven't been dealt with. Taking a few moments to kill some nearby adds BEFORE leaving the Aura and detonating your Orbs can reduce the risk significantly, which can be further mitigated with the use of a Hunter's invisibility Smoke Bomb giving a precious few seconds of invis. 
                            </p>
                            <p className='encounterWalkthroughParagraph'>
                                The other strategy was forced by necessity of the Challenge in Destiny 1, is to leave the Orbs of Corrupted Light after each Runner/DPS phase, and instead only detonate them after 16 have been created. This is safer in that the Plate-holders only have to leave the Brand of Immortality once, but riskier, in that there is much greater room for error if a Vessel of Oryx, Light Eater Knight, or wayward guardian accidentally activates any of the orbs, requiring even more rotations of the fight (which in and of themselves increase the risk for mistakes and inevitable distaster). Both strategies for Oryx are largely dependant on defeating him in four rotations of the fight.
                            </p>

                    </div> 
                </div>  

                <div className='encounterSection resources'>
                    <div className='encounterHeader'> 
                        Additional Resources
                    </div>

                    <a className='dimLink' href='https://scottfinegamedesign.com/design-blog/tag/King%27s+Fall' target='_blank' rel='noreferrer'>
                        <div className='scottFineIcon'>
                            A comprehensive impressive guide to Oryx from scottfinegamedesign.com
                        </div>
                    </a>

                    <a className='dimLink' href='https://www.destinyitemmanager.com/' target='_blank' rel='noreferrer'>
                        <div className='dimIcon'>
                            Destiny Item Manager
                        </div>
                    </a>

                    <a className='dimLink' href='https://docs.google.com/spreadsheets/d/1i1KUwgVkd8qhwYj481gkV9sZNJQCE-C3Q-dpQutPCi4/edit#gid=242217075' target='_blank' rel='noreferrer'>
                        <div className='googleSheetsIcon'>
                            Destiny Buff and Debuff Stacking Guide
                        </div>
                    </a>



                    <a className='dimLink' href='https://docs.google.com/spreadsheets/d/12vF7ckMzN4hex-Tse4HPiVs_d9huFOKlvUoq5V41nxU/edit#gid=2085890105' target='_blank' rel='noreferrer'>
                        <div className='googleSheetsIcon'>
                            Damage Chart Madness (PvE, Raid) DPS Charts
                        </div>
                    </a>

                    <div className='encounterSection videoContainer'>
                        <iframe src="https://www.youtube.com/embed/p4JVg9Hpc8k?start=3112" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className='youtubeEmbed'></iframe>
                            The Legend Himself's guide to Oryx
                    </div>

                    <div className='encounterSection videoContainer'>
                        <iframe src="https://www.youtube.com/embed/ZMwUgwiWN88?start=403" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className='youtubeEmbed'></iframe>
                            Datto's first guide to Oryx
                    </div>

                    <div className='encounterSection videoContainer'>
                        <iframe src="https://www.youtube.com/embed/FWsQpiHKvbM" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className='youtubeEmbed'></iframe>
                            Datto's guide to Challenge Mode Oryx (Destiny 1)
                    </div>

                    <div className='encounterSection videoContainer'>
                        <iframe src="https://www.youtube.com/watch?v=_8c0GYQYE7A" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className='youtubeEmbed'></iframe>
                            Now that you've killed Oryx, go touch grass. Or maybe...
                    </div>


                </div>

            </div>
            

           
        </div>
    )

}

export default E9C;