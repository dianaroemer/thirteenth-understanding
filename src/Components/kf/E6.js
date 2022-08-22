import React, {useState, useEffect} from 'react';
import { useOutletContext, NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faThumbTack } from '@fortawesome/free-solid-svg-icons';
import confetti from 'canvas-confetti';

import '../../Styles/EncounterStyling.css';



function E6() {

    const navigate = useNavigate();

    const thisRaid = 'kf';
    const thisEncounter = 'e6'
    const roles = ['Left Taunter', 'Left DPS', 'Left DPS', 'Right Taunter', 'Right DPS', 'Right Thrall Duty']

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
            navigate('/kf/e7');
            handleClickNavEncounter(null, 'e7');
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
        <div className='encounterContentContainer e6'>
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
                    Golgoroth
                </div>

            <div className={encounterContentClass}>
                {/* I am E6 */}

                {/* <div className='encounterSection challengeMode'>
                    <div className='encounterHeader challengeMode'> 
                        Possible Challenge Mode Changes
                    </div>
                    <ul style={{paddingLeft: '20px'}}>
                        <li className='encounterBulletPoint'>
                            No guardian can hold the Brand of the Initiate twice
                        </li>
                        <li className='encounterBulletPoint'>
                            No guardian can step on the same plate twice
                        </li>
                        <li className='encounterBulletPoint'>
                            Hallowed Knights must be killed within five seconds of each other
                        </li>
                        <li className='encounterBulletPoint'>
                            Tortured Knights must be killed within five seconds of each other
                        </li>
                        <li className='encounterBulletPoint'>
                            Adepts are not allowed to frenzy ANY acolytes
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
                                    <ul style={{paddingRight: '5px'}}>
                                        <li>
                                            Hive Thrall
                                        </li>
                                        <li>
                                            Cursed Thrall
                                        </li>
                                        <li>
                                            Acolytes
                                        </li>
                                        <li>
                                            Taken Thrall**
                                        </li>
                                    </ul>
                                </td>
                                <td>
                                    <ul style={{paddingLeft: '15px'}}>
                                        <li>
                                            Adept*
                                        </li>
                                    </ul>
                                </td>
                                <td>
                                    <ul style={{paddingLeft: '15px'}}>
                                        <li>
                                            Golgoroth
                                        </li>
                                        
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                        
                    </table>
                    <div className='encounterSubSection'>
                    <div>
                        * On death, Adepts enrage nearby Acolytes to use an Ogre's Eye beam. Either prioritze Acolytes, or destroy the whole pack at once        
                    </div>
                    <div>
                        ** After reducing Golgoroth to 25% health and lower, many Taken Thrall will spawn instead of Cursed Thrall
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
                                When shooting Golgoroth's back to gain his Gaze, don't just tickle him - shoot until you get it
                            </li>
                            <li className='encounterBulletPoint'>
                                If you are a Gaze Holder, having a clear line of sight to Golgoroth prevent's his Ogre's Venom from jumping around cover erratically
                            </li>
                            <li className='encounterBulletPoint'>
                                Always have a way to count out Golgoroth's remaining timer when there are ten(10) seconds remaining, whether that's verbally counting them down, or emoting at 10 seconds and again at 5
                                <ol className='encounterSubBulletPoint'>
                                    No one should ever be surprised by Golgoroth losing or shifting his gaze
                                </ol>
                            </li>
                            <li className='encounterBulletPoint'>
                                If you are about to take Golgoroth's Gaze from another Gaze Holder, you can help your DPS by weakening the next Orb of Reclaimed Light on the ceiling at 10 seconds left. That allows your DPS to move seamlessly from one pool to another
                            </li>
                            <li className='encounterBulletPoint'>
                                Cursed Thrall will wipe you. Always count three Cursed Thrall kills every time you swap Golgoroth's Gaze
                            </li>

                            <li className='encounterBulletPoint'>
                                Your entire fireteam should always know which order you will be rotating when changing pools of light, or know Golgoroth's exact Gaze timer when doing the Single Orb strategy
                            </li>

                            <li className='encounterBulletPoint'>
                                Divinity's bubble will likely be in Golgoroth's Hitbox, similar to Caretaker from Vow of the Disciple. Expect to still have to aim for his belly crit spot
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
                            <div className='buildSlotIcon sleeper'>
                                {/* Icon */}
                            </div>
                            <div className='buildSlotDetails'>
                                High damage, crit multiplier. All around consistent
                            </div>
                        </div>
                        <div className='buildSlot'>
                            <div className='buildSlotIcon whisper'>
                                {/* Icon */}
                            </div>
                            <div className='buildSlotDetails'>
                                It was the G.O.A.T. in D1, and now it's back. Ammo economy is unbeatable
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
                                See Cataclysmic and Sleeper. Slightly worse ammo economy
                            </div>
                        </div>

                        <div className='buildSlot'>
                            <div className='buildSlotIcon outbreak'>
                                {/* Icon */}
                            </div>
                            <div className='buildSlotDetails'>
                                "Oops, Only Nanites"
                                <div>AKA</div>
                                "I'm out of Heavy"
                            </div>
                        </div>

                        <div className='buildSlot'>
                            <div className='buildSlotIcon gjallarhorn'>
                                {/* Icon */}
                            </div>
                            <div className='buildSlotDetails'>
                                You'll be in melee range, why would you even
                            </div>
                        </div>

                        <div className='buildSlot'>
                            <div className='buildSlotIcon acrius'>
                                {/* Icon */}
                            </div>
                            <div className='buildSlotDetails'>
                                Trench Barrel. This could backfire if you step out of the pools
                            </div>
                        </div>

                        <div className='buildSlot'>
                            <div className='buildSlotIcon ragnhild'>
                                {/* Icon */}
                            </div>
                            <div className='buildSlotDetails'>
                                Pellet Shotguns got a huge buff in this sandbox, very big damage
                            </div>
                        </div>

                        <div className='buildSlot'>
                            <div className='buildSlotIcon malfeasance'>
                                {/* Icon */}
                            </div>
                            <div className='buildSlotDetails'>
                                Let's get weird.
                                <div>
                                Pairs best with Lucky Pants
                                </div> 
                            </div>
                        </div>

                        <div className='buildSlot'>
                            <div className='buildSlotIcon sniper'>
                                {/* Icon */}
                            </div>
                            <div className='buildSlotDetails'>
                                Supplement your damage with a Triple Tap or FTTC Sniper or Shotgun
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
                                Golgoroth primarily deals Void damage
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
                                Increased enemy density (did you expect anything different at this point?)
                            </li>
                            <li className='encounterBulletPoint'>
                                Champions would be unlikely in Normal difficulty, as Golgoroth already requires tight coordination from a fireteam. Perhaps in Master Difficulty
                            </li>
                            <li className='encounterBulletPoint'>
                                Lucent Hive. Similar to the reasoning for Champions, and the fact that Lucent Hive fit much more easily in other encounters, they seem unlikely in Golgoroth on Normal or Master difficulty
                            </li>
                            <li className='encounterBulletPoint'>
                                Tweaks to the Pools of Reclaimed Light. While the Single Orb strategy became popular later on in King's Fall's lifetime, it doesn't seem to be the intended way to solve the encounter. Perhaps Pools start damaging you in you stay in them too long, or you gain a stacking buff every time you step in an additional Pool
                            </li>
                        </ul>
                    </div>


                </div>

                 <div className='encounterSection walkthrough'>
                    <div className='encounterHeader'> 
                        Walkthrough
                    </div>

                    <div className='encounterWalkthroughContainer'>

                        <p className='encounterWalkthroughParagraph wide'>
                            On September 18, 2015, Golgoroth single-handedly ended my fireteam's aspriations for a Day 1 clear. On August 26, 2022, I fully expect to remedy that insult, however it has become clear in preparation for the Day 1 Raid race that Golgoroth will be a significant hurdle for not only my own fireteam, but also for the many others competing. Let's get into why. 

                            Golgoroth is the second Boss encounter of King's Fall, and is infamous for its use of a classic 'tanking' mechanic, similar to traditional MMO's like World of Warcraft or Final Fantasy XIV. It has two distinct phases with only minimal complications to the encounter flow. The transition from each phase and the execution of each step within the DPS phase is what will determine whether or not Golgoroth crumbles under your combined damage.
                        </p>
                  
                        <div className='walkthroughImageContainer'>
                            <a className='imgLink' 
                            rel="noreferrer"
                            href='https://i.imgur.com/UNfFART.png'
                            target='_blank'>
                                <img 
                                    className='walkthroughImage'
                                    src="https://i.imgur.com/UNfFART.png" alt="A top down view of Golgoroth's Arena" /> 
                            </a>
                            A top down view of Golgoroth's Arena. The large black blob in the center is Golgoroth and the white circles are the Orbs of Reclaimed Light, hanging from the ceiling. Image courtesy of u/terminalfury46
                        </div>

                        <p className='encounterWalkthroughParagraph image'>
                            Golgoroth's first mechanic is a large Hive Obelisk in the back of his arena, with six(6) deactivated Hive Runes. Every time a Guardian dies, one of the runes ignites. If all six runes ignite, the Obelisk activates and wipes the fireteam, even if you have revive tokens remaining. At most, your fireteam may die five(5) times over the course of the encounter - if any guardian dies after that, you must start over at the beginning.
                        </p>

                        <p className='encounterWalkthroughParagraph'>
                            As for Golgoroth himself, he has two states of being. The first is when no one is holding his gaze, in which he fires his purple Eye Beam non-stop, only pausing when he turns to different targets. His second state is when a Guardian shoots his crit spot on his back. Doing so causes Golgoroth to face his head and body towards the offending guardian, ceasing his Eye Beam, and instead firing bursts of three Ogre's Venom, Void projectiles identical to a Taken Centurion's seeking orbs. Shooting the Ogre's Venom before they impact you causes them to harmlessly detonate in the air. During this time, the player who shot Golgoroth's back will have a buff on their screen displaying the remaining duration of Golgoroth's Gaze. If the guardian dies or the timer hits zero without any other guardian shooting Golgoroth in the back, claiming his Gaze for themselves, Golgoroth will IMMEDIATELY switch back to his primary state. If your fireteam is still at Golgoroth's feet when this happens, he often stomps, instantly killing the fireteam who happen to be nearby him. For this reason, among others, it is common and necessary for Gaze Holders to count down the final 10 seconds of Golgoroth's Gaze whenever they have it.
                        </p>

                        <p className='encounterWalkthroughParagraph'>
                            The only other mechanic to contend with in this fight are the Orbs of Reclaimed light, present on the ceiling of the encounter. By default, Golgoroth takes 1/10th of the damage expected, even when his Gaze is held. This can be offset by members of the fireteam shooting the Orbs of Reclaimed Light on the ceiling. These Orbs are tanky, not dissimilar to a Major Hive Knight in health, but upon their death, the Orbs shatter, dropping a Pool of Reclaimed Light on the ground beneath it. This pool lasts for about 20-25 seconds, and any guardians who stand in it will gain an aptly-named buff Pool of Reclaimed Light, which will multiply their damage dealt to Golgoroth by ten(10). Effectively, it is only possible to damage Golgoroth while standing within these Pools of Reclaimed Light. Upon shooting down an Orb of Reclaimed Light on the ceiling, the Orbs will respawn after a moderate delay, preventing the fireteam from repeating DPS phases over and over.
                        </p>

                        <div className='walkthroughImageContainer'>
                            <a className='imgLink' 
                            rel="noreferrer"
                            href='https://d1fs8ljxwyzba6.cloudfront.net/assets/editorial/2017/04/Destiny-How-to-Beat-Golgoroth-Challenge-Kings-Fall-Positions.jpg'
                            target='_blank'>
                                <img 
                                    className='walkthroughImage'
                                    src="https://d1fs8ljxwyzba6.cloudfront.net/assets/editorial/2017/04/Destiny-How-to-Beat-Golgoroth-Challenge-Kings-Fall-Positions.jpg" alt="Visible on the ceiling are five of the six Orbs of Reclaimed Light" /> 
                            </a>
                            Visible on the ceiling are five of the six Orbs of Reclaimed Light. Image courtesy of hyperxgaming.com
                        </div>

 
                        <p className='encounterWalkthroughParagraph'>
                            The flow of the fight is simple in description, but difficult in execution. Optimizations ARE NECESSARY to have enough time to damage and kill Golgoroth before his enrage timer wipes the fireteam. The encounter will begin when players shoot the first Orb in the center of the ceiling, which will rouse Golgoroth. Immediately after, Golgoroth will enter the first of two(2) phases in the fight, the Add Clear phase. The role assignments for this phase split the fireteam into two teams of the three guardians each, one of which covers the left half of the room, the other, the right half. Golgoroth will begin firing his deadly Eye Beam, so maintain cover at all times, and only ever move from cover to cover. In the middle of the arena, behind the stairs, a number of Thrall and Cursed Thrall will spawn, and chase down guardians. Upon their defeat, several waves of Hive Acolytes and Adepts will spawn. The usual rule applies to the Adepts, either kill the Acolytes first, or destroy the whole pack at once to avoid the Acolytes gaining Enrage from the Adepts.
                        </p>

                        <p className='encounterWalkthroughParagraph'>
                            When the adds have been cleared, the fight will enter the second phase, wherein the fireteam will begin managing Golgoroth's Gaze while shooting down Orbs of Reclaimed Light to provide Pools of Reclaimed Light to do DPS from. The Role Assignments for this phase are very important, as this portion has many moving parts where one failure could easily result in many deaths. There are two popular methods of DPS for Golgoroth. The first involves having two(2) Gaze Holders, one on the left, and one on the right, who will alternate taking and holding Golgoroth's Gaze while the remaining four(4) fireteam members DPS Golgoroth from within the pit. One of the four dps members is also assigned Cursed Thrall Duty, as every time Golgoroth's Gaze is swapped by shooting him in the back, three(3) Cursed Thrall spawn that will wander their way towards the DPS squad in the pit. 
                        </p>

                        <p className='encounterWalkthroughParagraph'>
                            The Gaze-Swapping method is more difficult, but allows for longer DPS phases and more time between Add Phases. Gaze Holders should always count down their remaining Gaze timer from ten seconds onward. If you are about to take Golgoroth's from another Gaze Holder, you can soften up the next Orb of Reclaimed Light, however make sure you have a weapon loaded and ready to forcibly take Golgoroth's Gaze before the timer hits zero - if you don't do it in time, Golgoroth will end the DPS phase and stomp on your allies in the pit. Whenever you plan on swapping the Gaze, and often before the encounter is even started, make sure your entire fireteam knows which order the Gaze Holders will rotate Orbs of Reclaimed Light. Their positioning of Golgoroth when holding his Gaze determines which Pool of Reclaimed Light the dps squad will stand in. The popular rotation is to destroy the front two Orbs first, the middle two second, and the back two last, though that will force the Gaze Holders to claim Golgoroth's Gaze, then reposition themselves so that Golgoroth will face the appropriate Pool of Reclaimed Light (though occasionally, if the Gaze Holder doesn't reposition correctly, Golgoroth will only turn his head and not his body, keeping his belly crit spot hidden from the dps in the pit). This order prevents your DPS members from having to waste time running around inside the pit when changing from one Pool of Reclaimed Light to the next at the expense of a larger work load for the Gaze Holders. 
                        </p>

                        <div className='walkthroughImageContainer'>
                            <a className='imgLink' 
                            rel="noreferrer"
                            href='https://i.imgur.com/KzJCVff.png'
                            target='_blank'>
                                <img 
                                    className='walkthroughImage'
                                    src="https://i.imgur.com/KzJCVff.png" alt="A map showing the common Orb and Gaze order for Golgoroth in Destiny 1" /> 
                            </a>
                            A map showing the common Orb and Gaze order for Golgoroth in Destiny 1. T(#) indicates which gaze is held when, while L(#) indicates the names the Pools. Common order is L1 → R1 → L2 → R2 → L3 → R3. Image courtesy of u/Rash_Octillery
                        </div>

                        <p className='encounterWalkthroughParagraph'>
                            The second DPS strategy for Golgoroth is called the Single Orb strategy, which is exactly what it sounds. Upon entering the DPS phase, instead of having two Gaze Holders, the fireteam only has one. The dps will stack up inside the pit before anyone claims Golgoroth's Gaze, usually inside a Ward of Dawn, while the one Gaze Holder will destroy the Orb of Reclaimed Light (usually L1, according to the above map) adjacent to the fireteam in the pit. On it's destruction, the Gaze Holder will shoot Golgoroth's back *from the front*, by jumping up(or standing on a box) and shooting his visible crit spot. They hold his Gaze as normal, counting down to zero, before letting it go and allowing Golgoroth to return to an Add phase, while the DPS members of the fireteam make full use of the single Pool's timer to deal as much damage as possible without worrying about moving to another Pool of Light or killing Cursed Thrall (Which only spawn when you swap Golgoroth's gaze).
                        </p>

                        <p className='encounterWalkthroughParagraph'>
                            Regardless of the DPS strategy used, upon reaching 25% health, Golgoroth will start spawning Taken Thrall instead of Cursed Thrall in the arena. AoE primary weaponry is effective against these Taken Thrall, though they will spawn continuously from here on out, so having a single guardian stop DPS to manage adds can often buy enough time for the remaining fireteam members to finish Golgoroth off for good.
                        </p>

                        <p className='encounterWalkthroughParagraph'>
                            Golgoroth is a brutal encounter, and barring some aggressive changes in Destiny 2, I fully expect Golgoroth to be a gatekeeper to many fireteams on Dayt 1, far moreso that Warpriest. If your fireteam is struggling with this encounter, patience is incredibly important, as the nuances of each role are difficult to learn (specifically as Gaze Holder). Don't be afraid to spend a few attempts trying out different strategies and positions just to see what you can do to optimize. If, after optimizing to a sufficient degree, you are still struggling with Golgoroth, focus on hitting the enrage timer with consistency, with no concern for damage. Hitting the enrage timer with regularity means that your fireteam understands and can execute the mechanics of the fight to a degree of competency, and from adding DPS from that point is a relatively simple exercise. While you may be tempted to see what the streaming fireteams are doing, or have done, to defeat Golgoroth, take anything they're doing with a grain of salt, as there are several different viable strategies for Golgoroth, and not all of them are suitable for every fireteam. Take the time to find a DPS strategy that works for you, and don't be worried if you spend an extra few hours here - if and when you clear Golgoroth, you're in the home stretch of King's Fall.
                        </p>


                    </div> 
                </div>  



                <div className='encounterSection resources'>
                    <div className='encounterHeader'> 
                        Additional Resources
                    </div>
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

                    

                </div>
            </div>
            

           
        </div>
    )

}

export default E6;