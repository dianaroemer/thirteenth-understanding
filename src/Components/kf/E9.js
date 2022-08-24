import React, {useState, useEffect} from 'react';
import { useOutletContext, NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faThumbTack } from '@fortawesome/free-solid-svg-icons';
import confetti from 'canvas-confetti';

import '../../Styles/EncounterStyling.css';



function E9() {

    const navigate = useNavigate();

    const thisRaid = 'kf';
    const thisEncounter = 'e9'
    const roles = ['Plate 1', 'Plate 2', 'Plate 3', 'Plate 4', 'Runner', 'Floater']

    const [raidStateKF,
        handleRaidStateUpdate,
        handleEncounterCompletion,
        handleToggleBlindMode, 
        blindMode, 
        fireteam, 
        fireteamFunctionContainer,
        handleClickNavEncounter] = useOutletContext();

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
          setTimeout(()=>{
            navigate('/kf/e1c');
            // handleClickNavEncounter(null, 'e9');
        }, 5000)        // XXXUPDATEXXX On new Encounters

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
                {/* I am E9 */}

                {/* <div className='encounterSection challengeMode'>
                    <div className='encounterHeader challengeMode'> 
                        Possible Challenge Mode Changes
                    </div>
                    <ul style={{paddingLeft: '20px'}}>
                        <li className='encounterBulletPoint'>
                            No guardian steps on the same plate twice
                        </li>
                        <li className='encounterBulletPoint'>
                            Don't kill the Taken Vandals
                        </li>
                        <li className='encounterBulletPoint'>
                            Vandals must be killed within five seconds of each other
                        </li>
                        <li className='encounterBulletPoint'>
                            Daughters of Oryx must be killed within 30 seconds of each other
                        </li>
                        <li className='encounterBulletPoint'>
                            No one can take damage from a Daughter of Oryx (like Shuro Chi)
                        </li>
                    </ul>
                </div>  */}

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
                                            Hive Thrall
                                        </li>
                                        <li>
                                            Taken Thrall
                                        </li>
                                        <li>
                                            Taken Vandals
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
                                    </ul>
                                </td>
                                <td>
                                    <ul style={{paddingLeft: '15px'}}>
                                        <li className='shieldedEnemy arc'>
                                            Taken Centurion
                                        </li>
                                    </ul>
                                </td>
                                <td>
                                    <ul style={{paddingLeft: '15px'}}>
                                        <li>
                                            Ir Anuk
                                        </li>
                                        <li>
                                            Ir Halak
                                        </li>
                                        
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                        
                    </table>
                </div>

                <div className='encounterSection tips'>
                    <div className='encounterHeader'> 
                        Tips
                    </div>

                    <div className='encounterSubSection'>
                        <ul style={{paddingLeft: '20px'}}>
                            <li className='encounterBulletPoint'>
                                Vandals spawn above plates at 00:40s, double check your Vandal killing weapon of choice at 00:45 for ammo
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
                                Always double check you can kill the second sister on the next phase when killing your first sister
                                <ol className='encounterSubBulletPoint'>
                                    Nothing is worse than running out of heavy on the final stretch when you could have just done one more rotation to be safe
                                </ol>
                            </li>
                            <li className='encounterBulletPoint'>
                                Stay inside the Aura until your screen fades back in from the White Hymn/Dirge. Stepping away before the song is fully finished can kill just as quickly as if you were never your safe Aura
                            </li>

                            <li className='encounterBulletPoint'>
                                Triple Tap and Fourth Times the Charm weaponry (Sniper or Shotgun) will both be effective due to their free ammo generation
                            </li>

                            <li className='encounterBulletPoint'>
                                While under a Brand or Aura of protection you cannot take damage - but you can still be flinched by incoming fire
                                <ol className='encounterSubBulletPoint'>
                                    When you set up for DPS with your fireteam under your Brand or Aura, spare an extra few bullets or grenade for any enemies nearby to make your DPS experience just that little bit easier
                                </ol>
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
                            It was the G.O.A.T. in D1, and now it's back. Ammo economy is unbeatable
                            </div>
                        </div>
                        <div className='buildSlot'>
                            <div className='buildSlotIcon sleeper'>
                                {/* Icon */}
                            </div>
                            <div className='buildSlotDetails'>
                                Higher burst than Whisper, but lower sustained and total dmg 
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
                                See Cataclysmic. Slightly worse ammo economy than Cataclysmic
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
                                Wolfpack & rockets have higher burst than Linears, but lower total damage
                            </div>
                        </div>

                        <div className='buildSlot'>
                            <div className='buildSlotIcon acrius'>
                                {/* Icon */}
                            </div>
                            <div className='buildSlotDetails'>
                                Trench Barrel. Punch that Daughter in the shins and go to town
                            </div>
                        </div>

                        <div className='buildSlot'>
                            <div className='buildSlotIcon ragnhild'>
                                {/* Icon */}
                            </div>
                            <div className='buildSlotDetails'>
                                Only use with Acrius and Well of Radiance
                            </div>
                        </div>

                        <div className='buildSlot'>
                            <div className='buildSlotIcon sniper'>
                                {/* Icon */}
                            </div>
                            <div className='buildSlotDetails'>
                                Special weapon of choice in this encounter. Also good for Vandals
                            </div>
                        </div>

                        <div className='buildSlot'>
                            <div className='buildSlotIcon sundering'>
                                {/* Icon */}
                            </div>
                            <div className='buildSlotDetails'>
                                Pairs best with snipers and linears. Used to stack with Divinity
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
                                Daughters deal Arc damage, but Solar and Void is also present
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
                                This might actually not see a change to enemy density. The Daughters encounter is more about teaching your fireteam about the Plates and Platform mechanics, I don't think more or tougher enemies is a significant change to this encounter
                            </li>
                            <li className='encounterBulletPoint'>
                                Champions would be unlikely in Normal difficulty. Those Vandals will ABSOLUTELY be Overload Hobgoblins in Master difficulty, though. Perhaps the Major Centurion will become an Unstoppable Ogre, or Unstoppable Taken Phalanx?
                            </li>
                            <li className='encounterBulletPoint'>
                                Lucent Hive are also unlikely. Perhaps the Taken Centurion will be a Lucent Hive, demanding that the Add Clear player kill it and chase down its ghost while the remaining players are tied to their plates?
                            </li>
                            <li className='encounterBulletPoint'>
                                Tweaks to the Plates mechanic. Perhaps the plate order will change from the classic Counter-Clockwise every time
                            </li>
                            <li className='encounterBulletPoint'>
                                Perhaps the fireteam will be able to choose who gets Torn Between Dimensions
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
                            The Daughter's of Oryx (aka the Deathsingers Encounter) is, in my unprofessional opinion, the easiest boss encounter of King's Fall. There are three threats to guardians in this encounter - Taken Vandals that harass Plate holders, a minimal Add presence that can be handled without difficulty, and lastly an execution based slip-up, in which your Platformer misses a jump or a Plate holder accidentally steps off their Plate prematurely. The mechanics are straightforward, the enemies are only a threat while your fireteam doesn't have a Brand or Aura - by all accounts this should be an easy encounter, in theory. Having said that, I now fully expect to have jinxed my raid team for this encounter on day 1...
                            </p>


                        <p className='encounterWalkthroughParagraph image'>
                            The Daughter's encounter takes place in a large open courtyard, split in the middle by two enormous pillars on the left and right, and then those halves are split again by the four smaller pillars, which each house a Plate. The two bosses of the encounter, Ir Anuk and Ir Halak both sit atop the larger two pillars in the center of the arena, facing each other. There is sparse cover on the ground level of the arena, as the courtyard is punctuated by a number of smaller pillars and keystones. Towards the far end of the arena from the entrance yawns the vast emptiness of space above Jupiter.
                            </p>

                            <div className='walkthroughImageContainer'>
                            <a className='imgLink' 
                            rel="noreferrer"
                            href='https://i.imgur.com/AUZgPHQ.png'
                            target='_blank'>
                                <img 
                                    className='walkthroughImage'
                                    src="https://i.imgur.com/AUZgPHQ.png" alt="A top down view of the Daughers of Oryx's arena" /> 
                            </a>
                            A top down view of the Daughers of Oryx's arena. Image courtesy of u/Taux (this person's maps are **chef's kiss**)
                        </div>

                        <p className='encounterWalkthroughParagraph'>
                            In short, one of the two sisters will begin each rotation of the encounter by casting a Hymn to kill everything. The Runner's job is to climb a series of escalating platforms, powered by your fireteam standing on correctly ordered plates, so that they can get a temporary buff which will allow them to steal a protection aura from the non-channeling sister.
                            </p>


                        <p className='encounterWalkthroughParagraph'>
                            There are two mechanics in this encounter, one of which alternates interchangably in name, but not in function. The first is the Plate and Platform mechanic. When your fireteam arrives in the Deathsingers encounter, one member of your fireteam will be Torn Between Dimensions. Their screen and perspective will be shifted to a vaporous Taken effect. That player must then claim a Brand of the Claimer, a Taken orb floating in the air above one of the plates. The only way to reach said Brand is to ascend a series of escalating platforms that spawn for the Torn player (hereafter called the Runner) around the arena. The plates have a minor mechanic in and of themselves that will repeat itself in the next encounter.
                            </p>

                        <p className='encounterWalkthroughParagraph wide'>
                            When a guardian steps on any plate, it will spawn a number of platforms at a escalating height level. The first Plate stepped on will spawn low height plates, the second Plate will spawn medium Plates, the third spawns High plates, and the Fourth and last plate spawns the Zenith of height, equal to the height of the floating Brand of the Claimer. The order of the plates, in Destiny 1, was the same in both this encounter and the next encounter - from the top down, starting counter-clockwise once from the Plate with the Brand above it, step on Plates in consecutive counter-clockwise order to create a linearly escalating series of platforms up to the Brand. This image should help.
                            </p>

                            <div className='walkthroughImageContainer'>
                            <a className='imgLink' 
                            rel="noreferrer"
                            href='https://i.imgur.com/k4PaEUs.png'
                            target='_blank'>
                                <img 
                                    className='walkthroughImage'
                                    src="https://i.imgur.com/k4PaEUs.png" alt="A top down view of which a potential orientation for the Daughters encounter to get the Brand of the Claimer" /> 
                            </a>
                            A top down view of which a potential orientation for the Daughters encounter to get the Brand of the Claimer. Image courtesy of u/gamedeveloper.com 
                            {/* https://www.gamedeveloper.com/design/in-depth-look-at---objective-defeat-the-daughters-of-oryx */}
                        </div>


                         
                            
                        <p className='encounterWalkthroughParagraph image'>
                            Using the image as an example, assuming you name your plates Front Left and Right, and Back Left and Right (FL, FR, BL, BR). If the Brand appears above FL, the next plate, going counter-clockwise, is FR, which should be stepped on first. The second Plate would be BR, with the third at BL, and finally the last plate being the one under the Brand in the air, FL.
                            </p>

                            {/* XXXUPDATEXXX Add Plates order widget here */}
                        
                        <p className='encounterWalkthroughParagraph image'>
                            As the Runner, you will see the ascending platforms around the arena - if the order is correct, each platform will have a small Taken orb on it, like Toland in the Dreaming City's Shattered Realm and on the Moon. If you fall, ask your Plate Holders to stay on their Plate while you get up and try again - you have plenty of time before the wipe mechanic. When you finally reach the last Platform, you'll stand next to the Brand, and should pick it up, giving you the Brand of the Claimer. From there, you will see the two Deathsingers below you - one of the two will be channeling a wipe mechanic.
                            </p>

                            <div className='walkthroughImageContainer'>
                            <a className='imgLink' 
                            rel="noreferrer"
                            href='https://i.imgur.com/R52Oz46.png'
                            target='_blank'>
                                <img 
                                    className='walkthroughImage'
                                    src="https://i.imgur.com/R52Oz46.png" alt="A view from the perspective of the Runner, jumping towards the Brand of the Claimer" /> 
                            </a>
                            A view from the perspective of the Runner, jumping towards the Brand of the Claimer. Image courtesy of u/gamedeveloper.com 
                            {/* https://www.gamedeveloper.com/design/in-depth-look-at---objective-defeat-the-daughters-of-oryx */}
                        </div>

                        <p className='encounterWalkthroughParagraph'>
                            The wipe mechanic will be called either the Hymn of Weaving or the Dirge of Unraveling, and have a debuff timer on the side of your screen corresponding to its detonation. The actual name of the buff doesn't matter, but what does matter is that the Runner claims the correct Brand and Aura from the OPPOSITE Sister - that is, you always take the Brand from the Daughter that isn't channeling. Think of it this way, if Ir Anuk is channeling a Kill Everything ability, Ir Halak would use some sort of protection to keep herself safe from Ir Anuk's Kill Everything ability - as the Runner, it's your job to steal that protection and use it for your fireteam. From here on out, I'll be referring to the Hymn and Dirge collectively as the Hymn, and the Brand of Unraveling and the Brand of Weaving as the Brand (distinct and separate from the Brand of the Claimer - you should only have Claimer Brand for as long as it takes to steal protection).
                            </p>

                        <p className='encounterWalkthroughParagraph wide'>
                            To reiterate - one of the two sisters will begin each rotation of the encounter by casting a Hymn to kill everything. The Runner's job is to climb a series of escalating platforms, powered by your fireteam standing on correctly ordered plates, so that they can get a temporary buff which will allow them to steal a protection aura from the non-channeling sister.
                            </p>

                            <div className='walkthroughImageContainer'>
                            <a className='imgLink' 
                            rel="noreferrer"
                            href='https://i.imgur.com/naMV1OU.png'
                            target='_blank'>
                                <img 
                                    className='walkthroughImage'
                                    src="https://i.imgur.com/naMV1OU.png" alt="A view of the Brand and the Platforms from a plate" /> 
                            </a>
                            A view of the Brand and the Platforms from a plate. Image courtesy of u/gamedeveloper.com 
                            {/* https://www.gamedeveloper.com/design/in-depth-look-at---objective-defeat-the-daughters-of-oryx */}
                        </div>

                        <p className='encounterWalkthroughParagraph image'>
                            In practice, this has a number of smaller complications. Adds will spawn around ground floor of the arena, which can be easily dispatched by a dedicated Add Clear role. On each rotation, four guardians must stand on plates, and one must be a Runner. An easy method of role distribution to handle the random assignment of the Runner is to assign a Floater who will hang out in the center of the arena. Whenever another guardian becomes Torn Between Dimensions, they will call it out, and the Floater will replace their position.
                            </p>

                        <p className='encounterWalkthroughParagraph'>
                            Plate holders have the incredibly important job of standing on plates, without fail or mistake, for upwards of 20 seconds. This can be incredibly difficult for some guardians. It may help to take your hand off the keyboard in these situations (move your thumbs off the joysticks and jump button). You are under minimal threat from adds on the ground during this time. Your biggest threat comes in the form of a Taken Vandal that spawns at 00:45s remaining of each Hymn. This Vandal is perfectly positioned in the air above each plate, outside of the arena, so as to be as inconspicuous as possible while it kills you. ALWAYS kill vandals on spawn, their spawn is consistent and predictable. It is a good habit for someone to call out Vandal spawns on every rotation of the fight, to remind everyone (including the Floater). 
                            </p>

                        <p className='encounterWalkthroughParagraph image'>
                            Before you begin the encounter, you should communicate with your fireteam to decide where to DPS the Daughters from. A popular position is one of the plates on the vulnerable sister's side of the map, or at the entrance to arena, away from any remaining adds that might still be alive from the Plate phase of the fight. When the Runner has claimed their Brand, all of the fireteam should run to their location and get set up - Well of Radiance, Divinity, Sundering Glare, and unleash as much damage as they can muster on the Daughter of Oryx whose Brand was stolen. When the Hymn finishes its timer, the fireteam can continue to damage the vulnerable Daughter until she takes her Brand back and begins singing her next Hymn, restarting the rotation of the encounter. Make sure everyone in the fireteam stays inside the Aura provided by the Brand until the screen fades back to normal. Stepping out too soon can cause an unnecessary death.
                            </p>

                            <div className='walkthroughImageContainer'>
                            <a className='imgLink' 
                            rel="noreferrer"
                            href='https://i.imgur.com/ZX4GoRi.png'
                            target='_blank'>
                                <img 
                                    className='walkthroughImage'
                                    src="https://i.imgur.com/ZX4GoRi.png" alt="One of the Daughter's of Oryx without her protective Brand" /> 
                            </a>
                            One of the Daughter's of Oryx without her protective Brand. Image courtesy of u/gamedeveloper.com 
                            {/* https://www.gamedeveloper.com/design/in-depth-look-at---objective-defeat-the-daughters-of-oryx */}
                        </div>


                        <p className='encounterWalkthroughParagraph'>
                            A final piece of advice - whenever you kill a Daughter of Oryx, you must be sure that you can ALWAYS kill the next Daughter on the next rotation of the fight. Remember, you are only safe from the Daughter's wipe mechanic when using the opposite Daughter's Brand - by killing one of the Daughters, you eliminate that Brand from the fight. The Runner gets their Brand of the Claimer, as normal, but then steals the protective Brand from the channeling sister, making her vulnerable to damage from the fireteam. If you are unable to kill her in time, she will finish her Hymn and wipe the fireteam, resetting any progress made. Best practices usually involve getting one of the sisters down to about 10% health (a guaranteed kill) and stopping DPS entirely, even if there is extra time before the Hymn goes off. That ensures that when next Daughter dies, the first can always be finished off on the next rotation.
                        </p>

                        <p className='encounterWalkthroughParagraph'>
                            With any luck, you'll find the Daughters falling in just a few attempts, and, fully the Plate mechanics and how they work, will progress on to the final encounter of King's Fall...
                        </p>
                    </div> 
                </div>  



                <div className='encounterSection resources'>
                    <div className='encounterHeader'> 
                        Additional Resources
                    </div>

                    <a className='dimLink' href='https://www.gamedeveloper.com/design/in-depth-look-at---objective-defeat-the-daughters-of-oryx' target='_blank' rel='noreferrer'>
                        <div className='gamedeveloperIcon'>
                            A very impressive guide to Daughters of Oryx from gamedeveloper.com
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
                        <iframe src="https://www.youtube.com/embed/p4JVg9Hpc8k?start=2783" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className='youtubeEmbed'></iframe>
                            The Legend Himself's first guide to the Daughters of Oryx
                    </div>

                    <div className='encounterSection videoContainer'>
                        <iframe src="https://www.youtube.com/embed/ZMwUgwiWN88" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className='youtubeEmbed'></iframe>
                            Datto's guide to the Daughters of Oryx
                    </div>

{/* 
                    <div className='encounterSection videoContainer'>
                        <iframe src="https://www.youtube.com/embed/3U1OnA77ktU" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className='youtubeEmbed'></iframe>
                            Datto's first guide to Golgoroth
                    </div>

                    <div className='encounterSection videoContainer'>
                        <iframe src="https://www.youtube.com/embed/ulj0AU_JGx4" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className='youtubeEmbed'></iframe>
                            Datto's second, more in-depth guide to Golgoroth
                    </div>

                    <div className='encounterSection videoContainer'>
                        <iframe src="https://www.youtube.com/embed/CCh31wFPKjA" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className='youtubeEmbed'></iframe>
                            Datto's Challenge Mode (from Destiny 1) guide to Golgoroth
                    </div> */}


                </div>

                
            </div>
            

           
        </div>
    )

}

export default E9;