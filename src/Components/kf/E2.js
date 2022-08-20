import React, {useState, useEffect} from 'react';
import { useOutletContext, NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faThumbTack } from '@fortawesome/free-solid-svg-icons';
import confetti from 'canvas-confetti';

import '../../Styles/EncounterStyling.css';



function E2() {

    const navigate = useNavigate();

    const thisRaid = 'kf';
    const thisEncounter = 'e2'
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
        setTimeout(()=>{navigate('/kf/e3');}, 5000)
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
                {/* I am E2 */}

                {/* <div className='encounterSection challengeMode'>
                    <div className='encounterHeader challengeMode'> 
                        Possible Challenge Mode Changes
                    </div>
                    <ul style={{paddingLeft: '20px'}}>
                        <li className='encounterBulletPoint'>
                            Likely no changes, similar to Vault of Glass' introduction encounter. But just in case...
                        </li>
                        <li className='encounterBulletPoint'>
                            No guardian can dunk more than two orbs (every guardian has to dunk exactly twice)
                        </li>
                        <li className='encounterBulletPoint'>
                            Taken Phalanxes have to be killed before the barriers
                        </li>
                        <li className='encounterBulletPoint'>
                            Barriers have to be killed before the Taken Phalanxes
                        </li>
                        <li className='encounterBulletPoint'>
                            Timer to dunk orbs is shortened
                        </li>
                        <li className='encounterBulletPoint'>
                            XXXUPDATEXXX
                        </li>
                    </ul>
                </div> */}

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
                                Fly like an eagle
                                <div>to the sea</div>
                                Fly like an eagle,
                                <div>let my spirit carry me</div>
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
                            Welcome, Guardians, to King's Fall. The first encounter of the raid is The Hall of Souls. To complete this encounter, you will open and travel through the gate in the Court of Oryx, however the gate must be powered by the 6 statues in the Hall of Souls (see image, statues are on the sides of the fireteam).
                        </p>

                        <div className='walkthroughImageContainer'>
                            <a className='imgLink' 
                            rel="noreferrer"
                            href='https://obj-kr.thewiki.kr/data/65787465726e616c2f7777772e656e7465727461696e6d656e746275646468612e636f6d2f64657374696e792d74616b656e2d6b696e672d636f7572742d6f662d6f7279782e6a7067.jpg'
                            target='_blank'>
                                <img 
                                    className='walkthroughImage'
                                    src="https://obj-kr.thewiki.kr/data/65787465726e616c2f7777772e656e7465727461696e6d656e746275646468612e636f6d2f64657374696e792d74616b656e2d6b696e672d636f7572742d6f662d6f7279782e6a7067.jpg" alt="Six Guardians in the Hall of Souls" /> 
                            </a>
                                A fireteam enters the Hall of Souls. The front left statue is powered. Image courtesy of beta.thewiki.kr
                        </div>

                        <p className='encounterWalkthroughParagraph'>
                            Initially, the six statues in the Hall of Souls are de-powered, with one single statue glowing, demonstrating that it is ready to become powered. Statues become powered whenever two guardians bank a relic (two relics per statue) in the statue at roughly the same time. If the next statue hasn't been powered within a short amount of time, whichever statue that was most recently powered becomes de-powered. For example, if you power three statues and fail to power a fourth in time, the third will de-power, leaving only two powered statues.
                        </p>

                        <p className='encounterWalkthroughParagraph image'>
                            The Hall of Souls is not a Darkness Zone, so you cannot wipe. Instead, you can die as many times as you need to in order to complete the encounter. Your primary obstacles to powering all six statues will be spawning waves of Taken enemies, barriers, and distance. For every additional statue that is powered, the next relics to power the next statue will spawn farther away from the Hall of Souls on the left and right sections of the Dreadnought. Simply put, the further away the relic, the more time it takes to find, pick up, and return the relic to its statue.

                            
                        </p>

                        <div className='walkthroughImageContainer'>
                            <a className='imgLink' 
                            rel="noreferrer"
                            href='https://i.imgur.com/1zyMFbJ.png'
                            target='_blank'>
                                <img 
                                    className='walkthroughImage'
                                    src="https://i.imgur.com/1zyMFbJ.png" alt="A top down map of the Hall of Souls" /> 
                            </a>
                                A top down map of the Hall of Souls. Guardians spawn at the bottom, with the portal opening at the top of the image. Courtesy of Terminalfury
                        </div>

                        <p className='encounterWalkthroughParagraph'>
                            Returning each relic is further complicated by the enemies and barriers that spawn whenever a relic is picked up. At the start of the encounter, and when any relic(left or right) is picked up from then on, Taken enemies and glowing green barriers will spawn that will try to impede your progress. The barrier doesn't have a visible healthbar, but dies in a few shots from a special weapon - snipers and shotguns were effective in Destiny 1 for their burst damage. Fusion Rifles and Grenade Launchers will likely be just as effective in Destiny 2.             
                        </p>

                        <p className='encounterWalkthroughParagraph'>
                        The enemies will range from Taken thrall in the hallways, to Taken Centurions at the statues, Taken Acolytes in the Hall of Souls where the guardians first spawn, and lastly, Taken Phalanxes. The Taken Phalanxes are the largest threat to the fireteam, as your relic carriers will be completely defenseless while carrying the relic. Unable to use their weapons, abilities, sprint, or even double jump, relic carriers are completely defenseless against a Phalanx boop off the edge. Each relic runner requires at least one escort by default, as, when they pick up a relic, green barriers will prevent them from returning to the Hall of Souls. 
                        </p>

                        <p className='encounterWalkthroughParagraph'>
                            In Destiny 1, there were two primary methods of completing this encounter. The first assigned a runner and two escorts to each side, with both of the escorts assisting in killing enemies and clearing the barriers for the runner. The upside of this strategy meant that each runner could make it to back to the statues to bank relatively quickly, but the downside was that every time a relic squad would return, they would have to deal with a fresh wave of enemies in the Hall of Souls and the Statue Hallway.
                        </p>

                        <p className='encounterWalkthroughParagraph'>
                            The alternative method, which became more popular as the average light level rose and the raid became easier, involved one runner and one escort per side, with two guardians staying in the Hall of Souls to clear adds. As soon as the relic runners picked up a relic, the middle guardians could immediately clear the enemies that spawned, clearing the way for the runners to bank unmolested by adds. The downside, however, was that each escort had to handle five phalanxes AND break the runner's barriers single-handedly, something that became much easier as guardians became strong. In contest mode, this will probably be the most time-efficient strategy, but will probably be riskier than the double escort strategy.
                        </p>

                        <p className='encounterWalkthroughParagraph wide'>
                            Your primary enemy in this encounter is time. Your loadout and supers should be able to handle add clear, with the occasional larger enemies (Taken Centurions at the statues), with no bosses to worry about, so use your supers and heavy freely. High Resilience, like all difficult content in Destiny 2, is a must, and Arc Resist mods combined with Concussive Dampener should make surviving easier. Even then, Devour on Void subclasses is easy to maintain with the volume of enemies, and Restoration is freely available to all classes in Solar 3.0. 
                        </p>

                        <div className='walkthroughImageContainer'>
                            <a className='imgLink' 
                            rel="noreferrer"
                            href='https://i.ytimg.com/vi/NHgS0sA39Jk/maxresdefault.jpg'
                            target='_blank'>
                                <img 
                                    className='walkthroughImage'
                                    src="https://i.ytimg.com/vi/NHgS0sA39Jk/maxresdefault.jpg" alt="The Court of Oryx with it's gate activated. Courtesy of Datto" /> 
                            </a>
                                The Court of Oryx's gate, when activated by the six statues. Image courtesy of Datto
                        </div>

                        <p className='encounterWalkthroughParagraph'>
                            When all six statues in the Hall of Souls are powered, the portal in the Court of Oryx will activate. A number of enemies will come through, among then, a Hive Knight and a Hive Wizard. You do not need to defeat these enemies to pass through the portal. Instead, you can wait 'behind' the portal for it's animation to finish, when you can pass through. Alternatively, keep dancing in and out of it until it teleports you. If all else fails, the Hall of Souls is not a Darkness Zone, so if you die on the way in, you can simply respawn and run back towards it. If the enemies prevent you, take whatever time you need to kill them safely before traveling through, and on to the next encounter.
                        </p>

                    {/* <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas viverra risus enim. Phasellus at turpis diam. Donec in blandit tellus, vitae faucibus libero. Sed posuere iaculis bibendum. Suspendisse massa libero, venenatis in ex nec, eleifend lobortis eros. Pellentesque a viverra augue. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec fringilla ipsum vitae ornare pellentesque. Aenean efficitur felis sit amet nunc rhoncus vestibulum. Duis pharetra venenatis volutpat. Curabitur in arcu urna. Aliquam rutrum venenatis massa, vel consequat risus sagittis vitae. Cras ac nunc blandit, hendrerit velit id, maximus libero. Duis sodales orci et blandit posuere.
                    </p> */}

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

export default E2;