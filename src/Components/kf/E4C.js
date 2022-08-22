import React, {useState, useEffect} from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faThumbTack } from '@fortawesome/free-solid-svg-icons';
import confetti from 'canvas-confetti';

import '../../Styles/EncounterStyling.css';



function E4C() {

    const navigate = useNavigate();

    const thisRaid = 'kf';
    const thisEncounter = 'e4c'
    const roles = ['Spotter', 'Low Plate', 'Middle Plate', 'High Plate', 'Brand Holder', 'Plate Defender']

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
          setTimeout(()=>{
            navigate('/kf/e5c');
            handleClickNavEncounter(null, 'e5');
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
        <div className='encounterContentContainer e1'>
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
                    Warpriest
                </div>

            <div className={encounterContentClass}>
                {/* I am E4C */}

                <div className='encounterSection challengeMode'>
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
                                    <ul style={{paddingRight: '5px'}}>
                                        <li>
                                            Hive Thrall
                                        </li>
                                        <li>
                                            Hive Acolyte
                                        </li>
                                        <li>
                                            Hive Sword Knight
                                        </li>
                                        <li>
                                            Taken Thrall ***
                                        </li>
                                        <li>
                                            Taken Psions ***
                                        </li>
                                        <li>
                                            Taken Knight ***
                                        </li>

                                    </ul>
                                </td>
                                <td>
                                    <ul style={{paddingLeft: '15px'}}>
                                        <li>
                                            Adept *
                                        </li>
                                        <li>
                                            Hallowed Thrall
                                            <ol className='encounterSubBulletPoint'>
                                                Major Cursed Thrall
                                            </ol>
                                        </li>
                                        <li>
                                            Hallowed Knight **
                                            <ol className='encounterSubBulletPoint'>
                                                Major Hive Sword Knight
                                            </ol>
                                        </li>
                                        <li>
                                            Tortured Knight ***
                                            <ol className='encounterSubBulletPoint'>
                                                Major Taken Boomer Knight
                                            </ol>
                                        </li>

                                    </ul>
                                </td>
                                <td>
                                    <ul style={{paddingLeft: '10px'}}>
                                        <li>
                                            Warpriest
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
                        ** Killing Hallowed Knights ends the Add Phase and starts the glyph sequence        
                    </div>
                    <div>
                        *** After Warpriest gets below 40% health, he will no longer spawn Hive enemies, and instead spawn Taken enemies        
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
                                The Add Phase is close to finishing when the Hive Knight Scream audio cue plays. Just after, three Hallowed Knights spawn 
                                
                                <ol className='encounterSubBulletPoint'>
                                When all three Hallowed Knights are dead, the glyph sequence starts. They might be finishable with Aeon's for heavy ammo?
                                </ol>
                                
                            </li>
                            <li className='encounterBulletPoint'>
                                If the Brand of the Initiate Timer ever hits zero, no matter how many stacks, you die
                            </li>
                            <li className='encounterBulletPoint'>
                                Divinity and Brand Holder should always be two separate guardians
                            </li>
                            <li className='encounterBulletPoint'>
                                Jumping onto the High Plate (aka Left Plate) protects your fireteam from flinch caused by adds during DPS
                            </li>
                            <li className='encounterBulletPoint'>
                                You no longer need a spotter after the second damage phase
                                <ol className='encounterSubBulletPoint'>
                                You can infer which glyphs need to be activated in what order based on which of the remaining monoliths are or aren't glowing
                                </ol>
                            </li>
                            <li className='encounterBulletPoint'>
                                Tortured Knights spawn on the glyph plates! Don't be surprised during the Taken phases when you get slapped by a Knight spawning behind you
                            </li>
                            <li className='encounterBulletPoint'>
                                Know where your fireteam is going to dps BEFORE your Brand Carrier steps on the final glyph
                                <ol className='encounterSubBulletPoint'>
                                Ideally, your fireteam should call it out before EVERY dps phase, just in case you decide to switch positions based on the remaining monoliths
                                </ol>
                            </li>
                            <li className='encounterBulletPoint'>
                                Brand Holders should stop DPS at 5 seconds of each stack and find their next Acolyte - it could take a moment to swap weapons and prepare. Always reload when resetting your Brand timer!
                            </li>
                            <li className='encounterBulletPoint'>
                              Expect this fight to be a DPS check, like Caretaker in Vow of the Disciple
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
                                Single target, high damage, crit multiplier. All around consistent
                            </div>
                        </div>
                        <div className='buildSlot'>
                            <div className='buildSlotIcon whisper'>
                                {/* Icon */}
                            </div>
                            <div className='buildSlotDetails'>
                                Whisper's back, baby. Whispered Breathing all day, all night
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
                                See Cataclysmic. Slightly more prone to missing damage from flinch
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
                                Rockets don't get a crit multiplier from Div. Great burst damage, though
                            </div>
                        </div>

                        <div className='buildSlot'>
                            <div className='buildSlotIcon orpheus'>
                                {/* Icon */}
                            </div>
                            <div className='buildSlotDetails'>
                                Big damage with Orpheus or Quick Damage with Nighthawk
                            </div>
                        </div>

                        <div className='buildSlot'>
                            <div className='buildSlotIcon wellRadiance'>
                                {/* Icon */}
                            </div>
                            <div className='buildSlotDetails'>
                                Free Damage for Everybody! Hey, is Warpriest shooting me?
                            </div>
                        </div>

                        <div className='buildSlot'>
                            <div className='buildSlotIcon sundering'>
                                {/* Icon */}
                            </div>
                            <div className='buildSlotDetails'>
                                It stacks with Divinity, Warpriest is far away - Someone should use it
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
                                Warpriest, like many Hive, deals Arc damage
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
                                Increased enemy density
                            </li>
                            <li className='encounterBulletPoint'>
                                Unlikely to see champions in normal difficulty. Hive have Barrier Knight and Unstoppable Ogre, which doesn't mesh with this encounter, and Taken have Overload Hobgoblins and Unstoppable Phalanxes, which also don't align with this encounter
                            </li>
                            <li className='encounterBulletPoint'>
                                Lucent Hive. With champions unlikey, it is easy to see the Hive Knights or Hallowed Knights be replaced by Lucent Hive Knights
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
                            After all of the preamble of the first three encounters, you and your fireteam have finally arrived at the first true boss of King's Fall - the Warpriest. You obejctive in this fight is simple - defeat the Warpriest by bringing his health down to zero. This is made more complicated in that your fireteam can only damage the Warpriest while within the aura of the Brand of the Initiate, among other obstacles.
                        </p>
                        <p className='encounterWalkthroughParagraph image'>
                            The arena for the Warpriest encounter is fairly straightforward. On a raised stage in the back of the room, is the Warpriest himself (the large black circle in the map). Before him are three Monoliths covered in Hive runes (the three black lines near the center). Those Monoliths are in front of three glyph plates, with the Left Glyph Plate being on a high platform, the Right Glyph Plate being on a medium height platform, and lastly, the Middle Glyph Plate, at ground level.
                        </p>

                        <div className='walkthroughImageContainer'>
                            <a className='imgLink' 
                            rel="noreferrer"
                            href='https://i.imgur.com/XBLFg8b.png'
                            target='_blank'>
                                <img 
                                    className='walkthroughImage'
                                    src="https://i.imgur.com/XBLFg8b.png" alt="A top down view of Warpriest arena" /> 
                            </a>
                            A top down view of Warpriest arena. Warpriest is the large black circle, Monoliths are the three black rectangles, and the Glyph Plates are the three white circles. Image courtesy of u/terminalfury46
                        </div>

                        <p className='encounterWalkthroughParagraph'>
                            The Warpriest fight has three primary mechanics - the Glyph Sequence, the Brand of the Initiate, and the Monoliths. The Glyph Sequence will happen shortly after every Add Phase. When the three Hallowed Knights are defeated, a Glyph Sequence will start. One of the three Monolith's will start glowing on the Warpriest's side of the arena. This is to indicate which Glyph needs to be stepped on first. After it has been activated, a second Monolith will light up, corresponding to the second plate, and finally, the third will light up, corresponding to the third plate. For the first half of the fight, a Spotter will need to go behind the monoliths to spot which of the Monoliths are glowing, during this phase. After two Monoliths have been defeated, the fireteam will be able to infer which Glyphs to step on, as the air where the destroyed Monoliths used to be will glow to indicate the order. When the third Monolith has correctly been stepped on in order, the last guardian to step on their respective plate will gain the Brand of the Initiate.
                        </p>

 
                        <p className='encounterWalkthroughParagraph wide'>
                            The Brand of the Initiate operates similary to the Brand of Weaving and the Brand of Unraveling from the Annihilator Totems encounter, but with different effect. Instead of providing protection from damage, anyone within the aura of the Brand of the Initiate, including the Brand holder themselves, will be able to damage the Warpriest. The Brand will start off with five stacks, and count down to zero. When the Brand hits zero, the Brand Holder will die. To offset this, the Brand Holder can kill any add in the Warpriest's arena to reset the timer of the Brand of the Initiate and lose one stack. This process repeats, until all stacks of the Brand of the Initiate have been dispelled, and the damage phase ends.
                        </p>

                        <div className='walkthroughImageContainer'>
                            <a className='imgLink' 
                            rel="noreferrer"
                            href='https://cdnb.artstation.com/p/assets/images/images/001/354/553/medium/mike-stavrides-ttk-024.jpg'
                            target='_blank'>
                                <img 
                                    className='walkthroughImage'
                                    src="https://cdnb.artstation.com/p/assets/images/images/001/354/553/medium/mike-stavrides-ttk-024.jpg" alt="The Oculus activating, highlighting the safe zones in shadow" /> 
                            </a>
                            The Oculus activating, highlighting the safe zones behind the Monoliths in shadow. Image courtesy of Mike Stavrides, Staff (Principal) VFX Artist at Bungie
                        </div>

                        <p className='encounterWalkthroughParagraph'>
                            The final mechanic of this encounter presents itself immediately after a DPS phase ends. When the final Brand of the Initiate stack has been dispelled, the Warpriest will summon an Oculus, an enormous ball of painful light in the center of the arena. If you are caught in light of the Oculus, you will be killed! Luckily, the three Monoliths provide excellent shelter from the Oculus, allowing you to avoid its effects, but unfortunately, any time a Monolith shields a guardian from the Oculus, it is destroyed. As a result, this fight has a hard enrage cap at four DPS phases, as after three DPS phases, there will be no Monoliths to hide behind, and the Oculus will wipe the fireteam. Therefore, after DPS, your entire fireteam should hide behind the same Monolith as everyone else, every time. Be sure to communicate which Monolith you'll be hiding behind towards the end of every DPS phase.
                        </p>

                        <p className='encounterWalkthroughParagraph'>
                            The order of the fight is fairly simple. The phases rotates from Add-Clear, to Glyph Sequence, to DPS, then Oculus, and repeat. The only major change is when Warpriest drops below 30%~40% health, when the adds that spawn will change from Hive to Taken. The mechanics will remain unchanged. 
                        </p>

                        <p className='encounterWalkthroughParagraph image'>
                            The fight will begin in earnest when three guardians step on the three Glyph Plates. An Add phase will start the encounter, with the Middle plate handling Thrall and Knights, while the Left and Right kill Acolyte's and Adepts. During these Add phases, the Warpriest will fire on any visible guardians with his Arc Boomer. After the adds have been cleared, three Hallowed Knights will spawn. On their death, the Glyph Sequence phase will begin.
                        </p>

                        <div className='walkthroughImageContainer'>
                            <a className='imgLink' 
                            rel="noreferrer"
                            href='https://i.imgur.com/onQVEQW.png'
                            target='_blank'>
                                <img 
                                    className='walkthroughImage'
                                    src="https://i.imgur.com/onQVEQW.png" alt="The back of the Monoliths, one of which is glowing" /> 
                            </a>
                            The back of the Monoliths, one of which is glowing. 
                            <a className='imgLink'
                            rel="noreferrer"
                            href='https://www.youtube.com/watch?v=ox8VfGPMCTM&ab_channel=evanf1997'
                            target='_blank'>
                             Image courtesy of evanf1997 on Youtube
                             </a>
                        </div>

                        <p className='encounterWalkthroughParagraph '>
                            When the Glyph Sequence has been correctly input, the last guardian to activate a Glyph Plate (hereafter called the Brand Holder) will recieve the Brand of the Initiate(x5). The rest of the fireteam will quickly group up with the Brand Holder, and, while standing within the Aura the Brand Holder provides, damage the Warpriest. The Brand Holder will use the first few seconds of every timer refresh to supplement damage on Warpriest, but should priorize always having an Acolyte to kill, to extend the timer. If the timer is not successfully reset, not only does the Brand Holder die, but anywhere from 10 to 50 seconds worth of DPS are wasted. In a fight with a best case scenario of 200 seconds of dps time, any loss is disastrous.
                        </p>

                        <p className='encounterWalkthroughParagraph '>
                            When the final stack of the Brand of the Initiate has been dispelled by the Brand Holder, the Warpriest will summon the Oculus, bathing the arena in deadly light. The fireteam will group up and hide behind the same Monolith for safety. After a few seconds, the Oculus will fade, and the Monolith that guarded the fireteam will be destroyed. Finally, the encounter will return to another Add phase. Depending on the Warpriest's remaining health he will summon either Hive or Taken enemies, and repeat the phases. 
                        </p>

                        <p className='encounterWalkthroughParagraph'>
                            What will make this encounter challenging is the Brand of the Initiate mechanic. It should only take a few attempts for the fireteam to learn how to read the Glyph Sequence and hide from the Oculus, but the Brand of the Initiate provides the most complication by far. A lot of time can be saved in every DPS phase by having all players who aren't standing on a Glyph Plate pre-emptively head towards where DPS will happen. They might run straight to the Brand Holder, or run to a specific, pre-chosen location. As a Brand Holder, you should not move, and should stand your ground as much as you can, to provide the easiest DPS aura for your allies. Well of Radiance, Healing Wells, and Healing Grenades may all be quite helpful in keeping you alive should you find yourself dying to Warpriest or Acolytes.
                        </p>

                        <p className='encounterWalkthroughParagraph'>
                            When the mechanics have been largely solved, and your fireteam is reliably hitting the enrage, your next concern will be doing enough damage. This is the first of three damage checks in King's Fall, so prioritize long term DPS. While Wolf-Pack Rockets and Izanagi quick swapping provide high burst damage, rockets don't get a crit multiplier, and the amount of damage you can deal per heavy brick is highly in favor Linear Fusions and Sniper Rifles. Other crazy DPS options might include stacking the whole fireteam on Warpriest's feet with Well of Radiance, and everyone using triple Shotguns or Acrius with Trench Barrel, which the Brand Holder peaks over the high ground to refresh the timer.
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

export default E4C;