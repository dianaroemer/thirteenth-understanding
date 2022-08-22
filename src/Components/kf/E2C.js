import React, {useState, useEffect} from 'react';
import { useOutletContext, NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faThumbTack } from '@fortawesome/free-solid-svg-icons';
import confetti from 'canvas-confetti';

import '../../Styles/EncounterStyling.css';



function E2C() {

    const navigate = useNavigate();

    const thisRaid = 'kf';
    const thisEncounter = 'e2c'
    const roles = ['Runner Left', 'Escort Left', 'Floater Left', 'Runner Right', 'Escort Right', 'Floater Right']

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
        setTimeout(()=>{navigate('/kf/e3c');}, 5000)
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
                    Tomb Ships
                </div>

            <div className={encounterContentClass}>
                {/* I am E2C */}

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
                    </div>
                    

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
                                When jumping, aim for the front of the swinging pillars and the front third of the Tomb Ship. Aiming for the middle can make you slide off
                            </li>
                            <li className='encounterBulletPoint'>
                                ASOP - Always Stand On Plates. If you're first to an empty plate, you are now on plate duty. Show off them dance moves
                            </li>
                            <li className='encounterBulletPoint'>
                                Watch out for any titans or sword users who might harbor fratricidal intentions...
                            </li>
                            <li className='encounterBulletPoint'>
                                3rd person with a sword allows you to see around your character model, but can change how you perceive your movement. Pick one POV in the beginning and stick to it
                            </li>
                            <li className='encounterBulletPoint'>
                                In earlier raids, secret chests had a despawn timer after they've been opened. Wait for your whole fireteam to arrive before cracking open a cold one, lest someone who's struggling with the jumping puzzle miss out 
                                <ol className='encounterSubBulletPoint'>
                                (Sorry Phoenix)
                                </ol>
                            </li>
                            <li className='encounterBulletPoint'>
                                Consider not opening the secret chest if you plan on also going for a Challenge Mode clear after a regular clear. Your second run will give the chest a larger pool of unlocked loot to pick from. 
                                <ol className='encounterSubBulletPoint'>
                                Worst case scenario, you can return to the raid after Day 1 but before reset, to defeat any encounters you missed
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
                                3rd person POV and a little extra oomph to reach those far ledges
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
                                Look, I'm not going to tell you against Eager Edge, but just... Why do you have to be like this?
                            </div>
                        </div>
                    </div>
                </div>

                <div className='encounterSection reprisedChanges'>
                    <div className='encounterHeader'> 
                        Expected Changes in Destiny 2
                    </div>
                    <div className='encounterSubSection'>
                        None
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

                        <iframe src="https://www.youtube.com/embed/p4JVg9Hpc8k?start=540" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" className='youtubeEmbed' allowFullScreen></iframe>

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

                        <iframe src="https://www.youtube.com/embed/p4JVg9Hpc8k?start=760" title="YouTube video player" frameBorde="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" className='youtubeEmbed' allowFullScreen></iframe>
                        
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

export default E2C;