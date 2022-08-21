import React, {useState, useEffect} from 'react';
import { useOutletContext, NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faThumbTack } from '@fortawesome/free-solid-svg-icons';
import confetti from 'canvas-confetti';

import '../../Styles/EncounterStyling.css';



function E3() {

    const navigate = useNavigate();

    const thisRaid = 'kf';
    const thisEncounter = 'e2'
    const roles = ['Red Pickup', 'Red Defender', 'Red Adds', 'Blue Pickup', 'Blue Defender', 'Blue Adds ']

    const [raidStateKF,
        handleRaidStateUpdate,
        handleEncounterCompletion,
        handleToggleBlindMode, 
        blindMode, 
        fireteam, 
        fireteamFunctionContainer] = useOutletContext();

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
        console.log(e.target.value)
        let newArray = [...selectedRoles]
        newArray[roleNumber] = Number(e.target.value);
        setSelectedRoles(() => newArray);
        console.log(newArray)
        console.log(newArray.indexOf(1))
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
        setTimeout(()=>{navigate('/kf/e4');}, 5000)
        // XXXUPDATEXXX On new Encounters

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
        <div className='encounterContentContainer e2'>
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
                    Annihilator Totems
                </div>

            <div className={encounterContentClass}>
                {/* I am E3 */}

                {/* <div className='encounterSection challengeMode'>
                    <div className='encounterHeader challengeMode'> 
                        Possible Challenge Mode
                    </div>
                        None
                </div> */}

                <div className='encounterSection roles'>
                    <div className='encounterHeader'>
                        Roles
                    </div>
                    <div className='encounterRoleSelectorContainer'>
                        {/* None */}
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

                    {/* 
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
                    */}

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
                            </tr>
                        </thead>
                        <tbody>
                            
                            <tr>
                                <td>
                                    <ul>
                                        <li>
                                            Hive Acolyte
                                        </li>
                                        <li className='emphasizedEnemy'>
                                            Hive Boomer Knight*
                                        </li>
                                        <li>
                                            Hive Thrall
                                        </li>
                                        <li className='shieldedEnemy solar'>
                                            Hive Wizard
                                        </li>
                                        <li>
                                            Hive Sword Knight
                                        </li>
                                    </ul>
                                </td>
                                <td>
                                    <ul>
                                        <li>
                                            Adept**
                                            <ol className='encounterSubBulletPoint'>
                                                Major Hive Acolyte 
                                            </ol>
                                        </li>
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='encounterSubSection'>
                    <div>
                    * Boomer Knights are the biggest threat in this encounter. They should be killed on spawn every time. Arc Damage Resist + Concussive Dampeners        
                    </div>
                        <div>
                        ** On death, Adepts enrage nearby Acolytes to use an Ogre's Eye beam. Either prioritze Acolytes, or destroy the whole pack at once        
                        </div>
                    
                    </div>
                    

                </div>

                <div className='encounterSection tips'>
                    <div className='encounterHeader'> 
                        Tips
                    </div>
                    <div className='encounterSubSection'>

                        <ul style={{paddingLeft: '20px'}}>

                        <li className='encounterBulletPoint'>
                                Watch for Boomers! Always kill them on spawn
                                <ol className='encounterSubBulletPoint'>
                                    If you have to rotate away before killing a boomer, let your teammates know that it's still alive!
                                </ol>
                            </li>
                            <li className='encounterBulletPoint'>
                                If you have ANY stacks of Deathsinger's Power, you cannot receive a Brand (Weaver or Unraveler)
                            </li>
                            <li className='encounterBulletPoint'>
                                You can restore a dropped Brand if someone dies, drops it, or no one picks it up
                            </li>
                            <li className='encounterBulletPoint'>
                                If no one receives your Brand at the end of its timer, STAY UNDER YOUR TOTEM until someone comes and redeems you
                                <ol className='encounterSubBulletPoint'>
                                    It is always better for a single guardian to die under a totem, allowing for a recovery attempt and extending the encounter for everyone, than it is to wipe the whole fireteam by trying bank their Deathsinger's Power
                                </ol>
                            </li>
                            <li className='encounterBulletPoint'>
                                ASOP - Always Stay On the Plates. The only exception is if you have Deathsinger's Power
                            </li>
                            <li className='encounterBulletPoint'>
                                Wait until you pass the brand to an ally BEFORE leaving your plate. Don't start running early
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
                            <div className='buildSlotIcon arcResist'>
                            <div className='buildSlotIcon arcResist colors'>
                                {/* subIcon */}
                                </div>
                                {/* Icon */}
                            </div>
                            <div className='buildSlotDetails'>
                                Most enemies here deal Arc damage. Also use Concussive Dampener
                            </div>
                        </div>
                        <div className='buildSlot'>
                            <div className='buildSlotIcon riskrunner'>
                                {/* Icon */}
                            </div>
                            <div className='buildSlotDetails'>
                                Arc Resist AND Add Clear
                            </div>
                        </div>
                        <div className='buildSlot'>
                            <div className='buildSlotIcon witherhoard'>
                                {/* Icon */}
                            </div>
                            <div className='buildSlotDetails'>
                                Add clear. Kill enemies as they spawn and zone control
                            </div>
                        </div>
                        <div className='buildSlot'>
                            <div className='buildSlotIcon anarchy'>
                                {/* Icon */}
                            </div>
                            <div className='buildSlotDetails'>
                                Heavy Witherhoard. Kill enemies as they spawn
                            </div>
                        </div>

                        <div className='buildSlot'>
                            <div className='buildSlotIcon sniper'>
                                {/* Icon */}
                            </div>
                            <div className='buildSlotDetails'>
                                Snipe those Boomers immediately! Don't spare them a moment of life
                            </div>
                        </div>

                        <div className='buildSlot'>
                            <div className='buildSlotIcon thunderlord'>
                                {/* Icon */}
                            </div>
                            <div className='buildSlotDetails'>
                                So much add clear and so much ammo
                            </div>
                        </div>

                        <div className='buildSlot'>
                            <div className='buildSlotIcon agers'>
                                {/* Icon */}
                            </div>
                            <div className='buildSlotDetails'>
                                Make Crow/Uldren cry by using his gun for add clear
                            </div>
                        </div>

                        <div className='buildSlot'>
                            <div className='buildSlotIcon osteo'>
                                {/* Icon */}
                            </div>
                            <div className='buildSlotDetails'>
                                Effective against minors. Struggles with Knights and Wizards
                            </div>
                        </div>

                        <div className='buildSlot'>
                            <div className='buildSlotIcon gjallarhorn'>
                                {/* Icon */}
                            </div>
                            <div className='buildSlotDetails'>
                                Kill.
                                <div>Them.</div>
                                All.
                            </div>
                        </div>

                        <div className='buildSlot'>
                            <div className='buildSlotIcon healingGrenade'>
                                {/* Icon */}
                            </div>
                            <div className='buildSlotDetails'>
                                Healing Grenade and Restoration counter-act the poison Totem rooms
                            </div>
                        </div>

                        <div className='buildSlot'>
                            <div className='buildSlotIcon stasis'>
                                {/* Icon */}
                            </div>
                            <div className='buildSlotDetails'>
                                Stasis for add clear. Do you wanna build a SnowThrall?
                            </div>
                        </div>

                        <div className='buildSlot'>
                            <div className='buildSlotIcon blinding'>
                                {/* Icon */}
                            </div>
                            <div className='buildSlotDetails cantdont'><div>Any Blinding GL.</div>
                                Enemies can't kill you if they don't see you</div>
                        </div>


                    </div>
                </div>

                <div className='encounterSection reprisedChanges'>
                    <div className='encounterHeader'> 
                        Expected Changes in Destiny 2
                    </div>
                    <div className='encounterSubSection'>
                    <ul style={{paddingLeft: '20px'}}>
                            <li className='encounterBulletPoint'>
                                Increased enemy density
                            </li>
                            <li className='encounterBulletPoint'>
                                Unlikely to see champions in normal difficulty. The immediate translation is that Boomer Knights become Barrier Boomer Knights, but that seems like a Master Difficulty change
                            </li>
                            <li className='encounterBulletPoint'>
                                Lucent Hive. A Lucent Hive Knight could easily replace the Sword Knights that spawn later in the fight
                                <ol className='encounterSubBulletPoint'>
                                    Their death would force the uncomfortable position of "Do I risk leaving my totem to finish the Knight, or stay and watch it resurrect because I killed it too early?"
                                </ol>
                            </li>
                            <li className='encounterBulletPoint'>
                                Some enemy types may be upgraded to majors to increase the difficulty jumping from Destiny 1 to Destiny 2
                            </li>
                            <li className='encounterBulletPoint'>
                                Expect similar plate and bank mechanics. Maybe the poison in the red or blue room prevents *all* forms of healing unless you're under a Brand's protection?
                            </li>
                        </ul>
                    </div>
                </div>

                <div className='encounterSection walkthrough'>
                    <div className='encounterHeader'> 
                        Walkthrough
                    </div>

                    <div className='encounterWalkthroughContainer'>

                    <p className='encounterWalkthroughParagraph image'>
                            The second encounter of King's Fall is a transitionary encounter split into three sections. The first two are relatively simple jumping puzzles with a token force enemies that are easily dispatched without concern.  The third involves a simple plate mechanic that will repeat throughout the raid in later encounters, something which King's Fall has become quite notorious for - standing on a plate.
                        </p>    

                        <div className='walkthroughImageContainer'>
                            <a className='imgLink' 
                            rel="noreferrer"
                            href='https://static.wikia.nocookie.net/destinypedia/images/a/a2/KingsFallHeader.jpg'
                            target='_blank'>
                                <img 
                                    className='walkthroughImage'
                                    src="https://static.wikia.nocookie.net/destinypedia/images/a/a2/KingsFallHeader.jpg" alt="The first jumping puzzle of King's Fall - the swinging pillars" /> 
                            </a>
                                The first jumping puzzle of King's Fall - the swinging pillars. Image courtesy of destiny.fandom.com
                        </div>

                        <p className='encounterWalkthroughParagraph'>
                            After stepping through the gate in the Court of Oryx, you can collect your loot from the present chest, and proceed forward. You'll find an enormous chasm separating you from the next hallway, the gap punctuated by a number of swinging pillars. In this first section of the second encounter, you simply need to cross the gap to the door on the other side. 
                        </p>    

                        <p className='encounterWalkthroughParagraph'>
                            Like the Hall of Souls, the entirety of the second encounter is not a Darkness zone, so you can die as much as you need to in order to platform your way across. The path is relatively straightforward, but jumping across the pillars comes with its own complications. When jumping from one pillar to the next, it helps to jump 'earlier' than you would think that you need to. The difficulty in this section comes from the speed variance between the pillars - jumping early helps to try and mitigate that. Because the pillars create a large speed differential when swinging past each other, it is easy to jump from one pillar to the next and slide off, or even get Architected on landing. Predictively jumping from pillar to pillar, instead of reactively jumping, will let you fly through this encounter in no time.
                        </p>  

                        <p className='encounterWalkthroughParagraph'>
                            Upon clearing the pillar section, you will travel forward to the second section of the jumping puzzle. The path to the second section will split to the left and right, with both leading to the same destination - the Tomb Ships. This is where you'll find your first Hive Adept, a Major Acolyte that, upon its death, frenzies nearby Acolytes (Adepts not included) into using an Ogre Eye Beam attack. Simply kill the Acolytes first to avoid this surprising damage, and prepare for the Tomb Ships.
                        </p>  

                        <p className='encounterWalkthroughParagraph image'>
                            The first thing you'll notice when entering this room is another chasm from the entrance to the exit, but instead of using swinging pillars to cross the distance, you will be jumping on top of Tomb Ships, like the Agents on the highway in The Matrix Reloaded. Each Tomb Ship spawns in a set location based on a rotation, like clockwork. They will fly in a set path, for a set duration, and then they will despawn. Crossing this chasm is simply a matter of learning which ships take you to your destination.
                        </p>  

                        <div className='walkthroughImageContainer'>
                            <a className='imgLink' 
                            rel="noreferrer"
                            href='https://i.imgur.com/kZF9IHA.png'
                            target='_blank'>
                                <img 
                                    className='walkthroughImage'
                                    src="https://i.imgur.com/kZF9IHA.png" alt="A map of the Tomb Ship jumping puzzle, showing which direction to jump and how long to wait on each Tomb Ship" /> 
                            </a>
                            A map of the Tomb Ship jumping puzzle, showing which direction to jump and how long to wait on each Tomb Ship. The dotted arrows show roughly which direction to jump, while the numbers show the approximate duration to wait before jumping to the next ship. Image courtesy of u/FireBumToo
                        </div>

                        <p className='encounterWalkthroughParagraph'>
                            Due to the quick, timed nature of this jumping puzzle, I will spare you the difficulty of parsing a text description of what to do. Instead, consult the image of the map. The numbers on each ship show the rough amount of time you should expect to be on the Tomb Ship before jumping to the next one, whereas the colored arrow shows which direction the Tomb Ship should be travelling. Finally, the dotted arrows show which direction you should be jumping to reach your next Tomb Ship.
                        </p>  

                        <p className='encounterWalkthroughParagraph'>
                            That aside, this section of Encounter Two is fairly straightforward, though there are two exceptions of note. The first is the safe ledge roughly a third of the way through the puzzle (in the map, it is the blue block labeled platform, with a wait time of 3 seconds). This ledge is the only checkpoint in this section of the encounter - if you make it to the ledge, and further deaths will respawn you at this platform.
                        </p>  

                        <p className='encounterWalkthroughParagraph wide'>
                            The second exception is the Red rectangle on the second Tomb Ship after the checkpoint - this Tomb Ship is a distraction and a ruse. Simply put, after jumping onto the purple Tomb Ship(labeled 21), you will see a Tomb Ship spawn in front of you, to the left. This Tomb Ship will cross directly atop your current ride, trying to knock you off or bait you into jumping into it - you should do neither of those things! The map tells you to sit down (BE HUMBLE) and crouch under the offending Tomb Ship. After it passes, an additional Tomb Ship will spawn ahead of you on the right (the green ship labeled 6, on the map). Because your current ship (21) is tilted, it is easier to jump to your next ship (6) if you stand on the raised up, left side of your ship. A final piece of advice, courtesy of Reddit user /u/DrobUWP, in that when jumping from (Orange 8) to (Purple 25), you should stand on the back half of (Orange 8). Orange 8 is tilted downwards, so standing on the back half gives a little more height to make the jump.
                        </p>  

                        <iframe src="https://www.youtube.com/embed/p4JVg9Hpc8k?start=540" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" className='youtubeEmbed' allowfullscreen></iframe>

                        <p className='encounterWalkthroughParagraph '>
                            Take your time in this jumping puzzle, you do not need to rush from one jump to the next. The worst part of this encounter is the time it takes for a Tomb Ship cycle to reset, so an early death in second half can leave you waiting for a minute or more for the cycle to restart. Included here is a link to TheLegendHimself's excellent guide to King's Fall in Destiny 1, from which most of this guide is derived. His video section on the Tomb Ship clearly shows which jumps to take and when - I recommend playing the video around the same time your own Tomb Ship starts moving to keep the video synchronized. The first Tomb Ship starts to move at about 9:06 in the video.
                        </p>  

                        <p className='encounterWalkthroughParagraph '>
                            When you finally complete the Tomb Ship jumping puzzle, you'll shortly find yourself at another Tomb Ship docking bay. Just like in the previous section, standing on top of the Tomb Ship will cause it to start moving forward. This section, however, requires at least 3 people to progress, as a large barrier prevents any guardians from riding the Tomb Ship to its destination. Instead, on the left and the right of the Tomb Ship's initial berth, you will find two Hive Plates (first plates of the raid!). When a guardian is standing on both plates, the barrier goes down, and any Guardians riding the Tomb Ship can travel through.
                        </p>  

                        <p className='encounterWalkthroughParagraph '>
                            At the destination bay of Tomb Ship, there will be two more Hive Plates that operate identically to the first two - allowing any Guardians who pass through to ferry the remaining members of the fireteam across. The principle is simple - stand on the plates to allow two guardians to pass through, then those two guardians will stand on their destination plates to allow the rest of the fireteam to pass through. When all six guardians are on the other side, you can proceed to the next encounter.
                        </p>  

                        <div className='encounterHeader'>
                            Secret Chest
                        </div>

                        <p className='encounterWalkthroughParagraph '>
                            There is a secret chest present in this encounter! After completing the first two sections, when you first encounter the plates, you can jump off the left of the Tomb Ship instead of riding it through to the end. Jumping on a small ledge will allow you to carefully scale the ascending ridge of the wall to a door. This door operates on the same principle as the barrier blocking the Tomb Ship - if two guardians stand on this section's starting plates, the door will open, revealing the chest. Once four fireteam members are through, they can open the chest and jump down to the destination plates, allowing the first two guardians on the initial plates to navigate their way to the secret chest and claim it for themselves.
                        </p>  

                        <iframe src="https://www.youtube.com/embed/p4JVg9Hpc8k?start=760" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" className='youtubeEmbed' allowfullscreen></iframe>
                        
                    </div>


                </div>

                <div className='encounterSection resources'>
                    <div className='encounterHeader'> 
                        Additional Resources
                    </div>
                    <div>
                        Point of Failure Checklist
                    </div>
                    <a className='dimLink' href='https://www.destinyitemmanager.com/' target='_blank'>
                        <div className='dimIcon'>
                            Destiny Item Manager
                        </div>
                    </a>
                    

                </div>
            </div>
            

           
        </div>
    )

}

export default E3;