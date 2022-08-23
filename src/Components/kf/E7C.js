import React, {useState, useEffect} from 'react';
import { useOutletContext, NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faThumbTack } from '@fortawesome/free-solid-svg-icons';
import confetti from 'canvas-confetti';

import '../../Styles/EncounterStyling.css';



function E7C() {

    const navigate = useNavigate();

    const thisRaid = 'kf';
    const thisEncounter = 'e7c'
    const roles = ['Runner Left', 'Escort Left', 'Floater Left', 'Runner Right', 'Escort Right', 'Floater Right']

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
            navigate('/kf/e8c');
            handleClickNavEncounter(null, 'e8');
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
        <div className='encounterContentContainer e7'>
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
                    Piston Jumping Puzzle
                </div>

            <div className={encounterContentClass}>
                {/* I am E7C */}

                <div className='encounterSection challengeMode'>
                    <div className='encounterHeader challengeMode'> 
                        Possible Challenge Mode
                    </div>
                        None
                </div>

                <div className='encounterSection roles'>
                    <div className='encounterHeader'>
                        Roles
                    </div>
                    <div className='encounterRoleSelectorContainer'>
                        None
                        {/* <div className='encounterRoleSelector'>
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
                        </div> */}

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
                    None
                    {/* <table>
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
                                        <li>
                                            Hive Knight
                                        </li>
                                    </ul>
                                </td>
                                <td>
                                    <ul>
                                        <li>
                                            Adept*
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
                    * On death, Adepts enrage nearby Acolytes to use an Ogre's Eye beam. Either prioritze Acolytes, or destroy the whole pack at once
                    </div> */}
                    

                </div>

                <div className='encounterSection tips'>
                    <div className='encounterHeader'> 
                        Tips
                    </div>
                    <div className='encounterSubSection'>

                        <ul style={{paddingLeft: '20px'}}>
                            <li className='encounterBulletPoint'>
                                If you hold jump, you jump higher. If you tap jump, you jump lower. True story
                            </li>
                            <li className='encounterBulletPoint'>
                                When navigating invisible platforms, you can pull out your ghost to ping nearby invisible objects and see where to go
                            </li>
                            <li className='encounterBulletPoint'>
                                ASOP - Always Stand On Plates. If you're first to an empty plate, you are now on plate duty. Show off them dance moves
                                <ol className='encounterSubBulletPoint'>
                                    On the first Plate, you can crouch on the edge of the plate to avoid being hit by the piston while keeping the plate active
                                </ol>
                            </li>
                            <li className='encounterBulletPoint'>
                                Break out your swords and Eager Edge to victory
                            </li>
                            <li className='encounterBulletPoint'>
                                If guardians stand on all three plates at once, the platforms activate and lock, staying active for everyone else
                            </li>
                            <li className='encounterBulletPoint'>
                                In earlier raids, secret chests had a despawn timer after they've been opened. Wait for your whole fireteam to arrive before cracking it open 
                            </li>
                            <li className='encounterBulletPoint'>
                                Consider not opening the secret chest if you plan on also going for a Challenge Mode clear after a regular clear. Your second run will give the chest a larger pool of unlocked loot to pick from. 
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
                            <div className='buildSlotIcon stompees'>
                                {/* Icon */}
                            </div>
                            <div className='buildSlotDetails'>
                                Better hops, easier platforming
                            </div>
                        </div>
                        <div className='buildSlot'>
                            <div className='buildSlotIcon transversive'>
                                {/* Icon */}
                            </div>
                            <div className='buildSlotDetails'>
                                Only improves sprint speed, but gives you momentum before you yeet
                            </div>
                        </div>
                        <div className='buildSlot'>
                            <div className='buildSlotIcon wingsSacredDawn'>
                                {/* Icon */}
                            </div>
                            <div className='buildSlotDetails'>
                                Where we're going, we don't need roads. Or Tomb Ships.
                            </div>
                        </div>
                        <div className='buildSlot'>
                            <div className='buildSlotIcon lionRampant'>
                                {/* Icon */}
                            </div>
                            <div className='buildSlotDetails'>
                                Titan has hops. Eternal flight when paired with swords
                            </div>
                        </div>

                        <div className='buildSlot'>
                            <div className='buildSlotIcon mobility'>
                                {/* Icon */}
                            </div>
                            <div className='buildSlotDetails'>
                                More mobility, more jump height
                            </div>
                        </div>

                        <div className='buildSlot'>
                            <div className='buildSlotIcon daybreak'>
                                {/* Icon */}
                            </div>
                            <div className='buildSlotDetails'>
                                {/* Fly like an eagle
                                <div>to the sea</div>
                                Fly like an eagle,
                                <div>let my spirit carry me</div> */}
                                Time keeps on slippin',
                                <div>into the future</div>
                                I wanna fly like an eagle...
                            </div>
                        </div>

                        <div className='buildSlot'>
                            <div className='buildSlotIcon tripleJump'>
                                {/* Icon */}
                            </div>
                            <div className='buildSlotDetails'>
                                * Slaps Triple Jump *
                                <div>This bad boy can hold so many hops</div>
                            </div>
                        </div>

                        <div className='buildSlot'>
                            <div className='buildSlotIcon sword'>
                                {/* Icon */}
                            </div>
                            <div className='buildSlotDetails'>
                                Can we still sword climb up the wall to skip the puzzle? Let's find out
                            </div>
                        </div>

                        <div className='buildSlot'>
                            <div className='buildSlotIcon astrocyte'>
                                {/* Icon */}
                            </div>
                            <div className='buildSlotDetails'>
                                Hey everyone, look at me! Look how cool I am! I'm nearly ther-woops I fell
                            </div>
                        </div>

                        <div className='buildSlot'>
                            <div className='buildSlotIcon acrius'>
                                {/* Icon */}
                            </div>
                            <div className='buildSlotDetails'>
                                Unequip Acrius! It reduces your jump height, even when stowed
                            </div>
                        </div>

                        <div className='buildSlot'>
                            <div className='buildSlotIcon eagerEdge'>
                                {/* Icon */}
                            </div>
                            <div className='buildSlotDetails'>
                                Most DPS to bosses? Nonono, only most Allied guardian kills matter
                            </div>
                        </div>
                    </div>
                </div>

                <div className='encounterSection reprisedChanges'>
                    <div className='encounterHeader'> 
                        Expected Changes in Destiny 2
                    </div>
                    <div className='encounterSubSection'>
                        <ul>
                            <li className='encoutnerBulletPoint'>
                                Update to the (Basketball) Court of Oryx
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
                            After the pressure of Golgoroth, your fireteam will get one final chance to relax and blow off some steam in the final jumping puzzle of the raid - the Pistons. Set on the side of the wall in a bottomless chasm, you must navigate across the perilous ledges and hostile pistons to reach the exit. This is the final non-Darkness zone, so take your time and die as much as you need to in order to get it out of your system before the final encounters. 
                       </p>    

                       <p className='encounterWalkthroughParagraph image'>
                            The route to the end is simple. From your start in the chasm, navigate down and to your left, avoiding pistons whenever possible. You'll arrive at the first plate of the puzzle. Standing on the plate will make a number of ledges appear in the air to cross the chasm, leading to a second plate with an identical mechanic. Standing on the second plate will see you navigate along the far side of the chasm wall, while the third plate will bring your fireteam back onto the initial wall for the final section. 
                        </p>    

                        <div className='walkthroughImageContainer'>
                            <a className='imgLink' 
                            rel="noreferrer"
                            href='https://i.ytimg.com/vi/wYQ0GB3kWF0/maxresdefault.jpg'
                            target='_blank'>
                                <img 
                                    className='walkthroughImage'
                                    src="https://i.ytimg.com/vi/wYQ0GB3kWF0/maxresdefault.jpg" alt="Two guardians standing on the first plate, revealing the path to the second" /> 
                            </a>
                            Two guardians standing on the first plate, revealing the path to the second. Image courtesy of GameSkinny.com
                        </div>

                        <p className='encounterWalkthroughParagraph'>
                            The final section will require you to backtrack towards where you first entered the jumping puzzle, avoiding pistons while climbing ascending platforms. Unlike the Tomb Ships, this puzzle just requires a bit of patience and navigation to make it to the door at the end of the puzzle. If you ever find yourself unable to make a jump, no matter how hard you try, it's often because you're missing another ledge somewhere else that will make the jump easier - take the time to look around and find the easiest route to your destination, rather than stretching your jump.
                        </p>   

                        <div className='walkthroughImageContainer'>
                            <a className='imgLink' 
                            rel="noreferrer"
                            href='https://i.ytimg.com/vi/HokR8x60YVQ/maxresdefault.jpg'
                            target='_blank'>
                                <img 
                                    className='walkthroughImage'
                                    src="https://i.ytimg.com/vi/HokR8x60YVQ/maxresdefault.jpg" alt="A fireteam navigating the final stretch of the Piston Jumping Puzzle" /> 
                            </a>
                            A fireteam navigating the final stretch of the Piston Jumping Puzzle. Image courtesy of Mark Anderson on Youtube
                        </div>





                </div>

                <div className='encounterSection secretChest'>
                    <div className='encounterHeader secretChest'> 
                        Secret Chest
                    </div>
                    
                    <p className='encounterWalkthroughParagraph '>
                        The final secret chest of King's Fall is in this encounter! After arriving at the first Plate, instead of jumping to the left, jump across the chasm to a support beam on the right with a small ledge running around it. Navigating the rest of the pathway up the next ledge requires using your ghost to highlight the invisible platforms. From the second ledge on the support pillar, jump up to the high ledge hugging the wall below the ceiling on that side of the chasm. Using your ghost to ping a final time will show you invisible platforms below the doorway to the secret chest. If you're confident in your Eager Edge movement or changing direction in midair with Icarus Dash, you can skip the final invisible ledge and jump straight up to the doorway. In the back of the room is the final secret chest of the raid! The video guide below is courtesy of The Legend Himself on Youtube.
                    </p>  

                        <iframe src="https://www.youtube.com/embed/p4JVg9Hpc8k?start=2529" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" className='youtubeEmbed' allowFullScreen></iframe>
                        
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
                    

                </div>
            </div>
            

           
        </div>
    )

}

export default E7C;