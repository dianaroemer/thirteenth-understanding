import React, {useState, useEffect} from 'react';
import { useOutletContext, NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faThumbTack } from '@fortawesome/free-solid-svg-icons';
import confetti from 'canvas-confetti';

import '../../Styles/EncounterStyling.css';



function E3C() {

    const navigate = useNavigate();

    const thisRaid = 'kf';
    const thisEncounter = 'e3c'
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
        setTimeout(()=>{navigate('/kf/e4c');}, 5000)
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
                {/* I am E3C */}

                <div className='encounterSection challengeMode'>
                    <div className='encounterHeader challengeMode'> 
                        Possible Challenge Mode
                    </div>
                        <ul style={{paddingLeft: '10px', maxWidth: '400px'}}>
                            <li>
                                Guardians cannot recieve the same brand two times in a row
                                <ol className='encounterSubBulletPoint'>
                                    For example, players will need to swap from Red Room to Blue Room after every deposit of Deathsinger's Power.
                                </ol>
                            </li>
                            <li>
                                Don't kill any Boomer Knights (shudder)
                            </li>
                            <li>
                                Deathsinger's Power can only be banked if two guardians are banking at the same time
                            </li>
                            <li>
                                A fireteam can never drop a Brand
                            </li>
                            <li>
                                Don't kill any wizards
                            </li>
                        </ul>
                </div>

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
                                ASOP - Always Stay On the Plates. The only exception is if you have Deathsinger's Power AND someone else to hold your totem while you bank
                            </li>
                            <li className='encounterBulletPoint'>
                                Wait until you pass the brand to an ally BEFORE leaving your plate. Don't start running early
                            </li>
                            <li className='encounterBulletPoint'>
                                It's not just you! Every time the brand is passed, the protective bubble gets smaller! Hug your buddy!
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
                            <div className='buildSlotIcon glaiveArc'>
                                {/* Icon */}
                            </div>
                            <div className='buildSlotDetails'>
                                Block on plate, haters gon' hate
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
                                <ol className='encounterSubBulletPoint'>
                                    The answer to the above question is always prioritize standing under your Annihlator Totem.
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

                    <div className='walkthroughImageContainer'>
                            <a className='imgLink' 
                            rel="noreferrer"
                            href='https://images.squarespace-cdn.com/content/v1/5570fe14e4b0a0d418a2bf32/1444886267393-TUAUSV513HIEPV8AD0ZH/Center+Room.png'
                            target='_blank'>
                                <img 
                                    className='walkthroughImage'
                                    src="https://images.squarespace-cdn.com/content/v1/5570fe14e4b0a0d418a2bf32/1444886267393-TUAUSV513HIEPV8AD0ZH/Center+Room.png" alt="A view of the entrance to the Basilica, across from the gate" /> 
                            </a>
                            A view of the entrance to the Basilica, across from the gate. Note the plate on the ground in front of the player, where guardians will bank their Deathsinger's Power. Image courtesy of scottfinegamedesign.com
                            {/* https://scottfinegamedesign.com/design-blog/tag/King%27s+Fall */}
                        </div>

                        <p className='encounterWalkthroughParagraph'>
                            The Annihilator Totems is the first encounter of King's Fall under a Darkness Zone - from here on out, in primary encounters, when you die, it will be a wipe zone. Rack up enough deaths, and you'll find yourself restarting at the beginning of this encounter. The first and foremost goal of this encounter is to open the door opposite the entrance to the encounter. This is done by standing on the plate in the middle of the arena with Deathsinger's Power. Over a short time, any existing stacks of Deathsinger's Power will drain away, leaving the guardian who started standing on the platform with zero, once again.
                        </p>
                        
                        <p className='encounterWalkthroughParagraph image'>
                            The room is split into three primary segments - a left side (called the Red or Orange side), a right side (called the Blue or Green side (depending on colorblind settings)), and the middle section. Your primary obstacles to completing this encounter is a simple wipe mechanic present in both the Red side and the Blue side. In the back of each room are two Annihilator totems, similar to the Annihilator Totem present in Pit of Heresy after the maze section. The premise of the Annihilator Totems is simple - underneath the totem is a plate. If a guardian does not stand on the plate under an Annihilator Totem within a certain timer (about 10 seconds), the Totem will activate, wiping the entire raid. Quickly stepping on and off the Totem resets the timer to zero, instead of decrementing, however best practices usually dictate standing under the Totem at all times to prevent any accidental mishaps and wipes.
                        </p>

                        <div className='walkthroughImageContainer'>
                            <a className='imgLink' 
                            rel="noreferrer"
                            href='https://i.imgur.com/WkzFhwm.png'
                            target='_blank'>
                                <img 
                                    className='walkthroughImage'
                                    src="https://i.imgur.com/WkzFhwm.png" alt="A top down view of the Annihilator Totems Encounter" /> 
                            </a>
                            A top down view of the Annihilator Totems Encounter. Players start in the middle, with the Red Room on the Left, Blue Room on the Right, and the exit at middle top. Image courtesy of u/terminalfury46
                        </div>

                        <p className='encounterWalkthroughParagraph'>
                            To further complicate things, both the Red room and the Blue room are filled with damaging mist - simply standing in the room will slowly tick away at your health. This can be prevented by standing within the bubble of protection provided by a Brand of Weaving or a Brand of Unraveling. This protection is granted to the first guardian to pick up a large Taken orb at the entrace to the Red or Blue room. That player will then get the Brand, providing protection from the mist to themselves and any nearby guardians for 30 seconds. When the timer expires, the Brand will do two things - firstly, it will give the player who was holding the brand ten stacks of Deathsinger's Power(x10), and secondly, jump to any nearby eligible player within the bubble. This way, by rotating players in and out, a fireteam will always be able to have someone with the Brand standing underneath the Annihilator Totem. The timing works out such that three guardians per side keeps 100% uptime of a Brand underneath an Annihilator Totem.
                        </p>

                        <p className='encounterWalkthroughParagraph'>
                            The final complication to the encounter is one you should be familiar with by now - Adds. Enemies will spawn from the center room, in front of the Deathsinger plate. They will pour out of a portal, similar to Hive Summoning Public Events in the Savathun's Throne World and near the Hellmouth. Initially ranging from thrall and acolytes, the enemy types will escalate as the encounter progresses. Similarly, enemies will spawn in the Red and Blue rooms, the most important of which *by far* are the Boomer Knight's that will spawn on raised ledges above the Annihilator Totems. These Knights should be prioritized whenever possible, as they have almost complete line of sight on the Annihilator Totems. Snipers are effective, though Linear Fusions can be just as powerful. 
                        </p>

                        <div className='walkthroughImageContainer'>
                            <a className='imgLink' 
                            rel="noreferrer"
                            href='https://i.imgur.com/1JgFEEK.png'
                            target='_blank'>
                                <img 
                                    className='walkthroughImage'
                                    src="https://i.imgur.com/1JgFEEK.png" alt="A view of the Blue Room while standing under the Blue Annihilator Totem" /> 
                            </a>
                            A view of the Blue Room while standing under the Blue Annihilator Totem, facing the center. Note the highlighted Boomer Spawn location, which is roughly consistent to the Red Room's spawn location. Image courtesy of gamedeveloper.com 
                            {/* https://www.gamedeveloper.com/design/an-in-depth-look-at-king-s-fall---objective-power-the-glyph */}
                        </div>


                        <p className='encounterWalkthroughParagraph'>
                            The flow of the encounter is straightforward. Fireteams will split into two groups of three. Each group will follow the same rotation, I will describe the Red room as an example. To start the encounter, Red Adds (and Blue Adds) will attack the Hive Acolytes and Adepts kneeling before the doorway exit to the encounter. Red Pickup will run towards the Red room, picking up the Taken orb and recieving 30 seconds of their Brand of Protection. Red Defender will run with them, helping to kill any adds that spawn and defending Red Pickup. Both Red Defender and Red Pickup will stand under the Annihilator Totem until the Brand timer runs out on Red Pickup, and the Brand transfers to Red Defender. At this time, Red Pickup will run to the middle plate (with their Deathsinger's Power x10), swapping places with Red Adds. Red Pickup banks their Deathsinger's Power on the middle totem, while Red Defender and Red Adds stand under their Annihilator Totem, until the both rotates and the players swap again. This is repeated on both the Red side and the Blue side until the encounter completes.
                        </p>

                        <p className='encounterWalkthroughParagraph'>
                            If a fireteam is struggling, identify whether or not the failure is due to being overwhelmed by Adds or by execution of the mechanics. Adds should be fairly easy to manage, as they spawn from set locations every time. Taking the extra moments on your first few encounters to learn add spawns can let you camp those spawns to prevent from being overwhelmed. Mechanically, this encounter can be difficult to recover from - one single mistake often throws the whole rotation out of alignment. Make sure that everyone knows the prioritize standing under their Annihilator Totems at all times - don't be a hero and try to bank the final squeek of Deathsinger's Power to open the door. Communicate clearly on who can resurrect, when, and how you plan on following up when recovering from death's and mistakes. Use proper noun names when talking to other fireteam members ("Goose(I) can revive Atom(dead you) in 10 seconds once someone can cover my Totem" is always more clear than "I can get you in 10 seconds").
                        </p>

                        <p className='encounterWalkthroughParagraph'>
                            Communcate, exercise patience, and this encounter should be over in a flash. Don't be afraid to be liberal with your Heavy and Supers, as the ammo economy in Destiny 2 is complete different than in Destiny 1. Try to always know what you're doing, what you should be doing next, and what the other members of your fireteam are doing, to anticipate and quickly recover from any complications or mishaps. You'll have completed this encounter in no time!
                        </p>

                       
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

export default E3C;