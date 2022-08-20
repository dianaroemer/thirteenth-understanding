// import React, {useState, useEffect} from 'react';
// // import '../../Styles/EncounterStyling.css';


// function E1() {

//     return(
//         <div className='encounterContentContainer e1'>
//             I am E1, we did it, I'm displaying!
           
//         </div>
//     )

// }

// export default E1;




import React, {useState, useEffect} from 'react';
import { useOutletContext, NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faThumbTack } from '@fortawesome/free-solid-svg-icons';
import confetti from 'canvas-confetti';

import '../../Styles/EncounterStyling.css';



function E1() {

    const navigate = useNavigate();

    const thisRaid = 'kf';
    const thisEncounter = 'e1'
    const roles = ['Runner Left', 'Runner Right', 'Escort Left',
        'Escort Right', 'Floater Left', 'Floater Right']

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

    const [selectedRoles, setSelectedRoles] = useState([6, 6, 6, 6, 6, 6])



    const [showEncounterCompleteSlider, toggleShowEncounterCompleteSlider] = useState(false);
    const [encounterClearedSliderValue, setEncounterClearedSliderValue] = useState(0);
    const [encounterClearedSliderLock, toggleEncounterClearedSliderLock] = useState(!blindMode);

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
        setTimeout(()=>{navigate('/kf/e2');}, 5000)
        
        // XXXUPDATEXXX
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


    useEffect( ()=> {
      if(!blindMode) {
        setEncounterClearedSliderValue(()=> 50)
      }
    }, [blindMode])

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
                                <label htmlFor='blindModeSlider'>Complete</label>
                            </div>
                        </div>}
                    </div>}

                </div>

                {/* If the encounter hasn't been completed, show the attempts increment */}
                {!raidStateKF[thisEncounter].completed &&
                <div className='encounterAttemptsContainer'>
                    <div onClick={e => handleToggleAttemptVisibility(e)}>
                        <FontAwesomeIcon icon={attemptVisibility ? faEyeSlash : faEye}/>&nbsp;
                        { attemptVisibility ? `Attempt # ${raidStateKF[thisEncounter].attempts}` : 'Show Attempts' }&nbsp;
                        <FontAwesomeIcon icon={attemptVisibility ? faEyeSlash : faEye}/>
                    </div>
                    <button onClick={e=> handleRaidStateUpdate(e, thisRaid, thisEncounter, 'attempts', (raidStateKF[thisEncounter].attempts+1))}>
                        + Add Attempt +
                    </button>

                    <div className='encounterAttemptsVisibility'>
                    </div>
                </div>
                }
                
                
            </div>

            <div className='encounterTitle'>
                    Hall of Souls
                </div>

            <div className={encounterContentClass}>
                {/* I am E1 */}



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
                                {/* <th>Majors</th> */}
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
                                            Taken Thrall
                                        </li>
                                        <li>
                                            Taken Acolyte
                                            <ol className='encounterSubBulletPoint'>
                                                Acolyte's Eye
                                            </ol>
                                        </li>
                                        <li className='shieldedEnemy arc'>
                                            {/* <span>Taken Centurion</span> */}
                                            Taken Centurion
                                            
                                        </li>
                                        <li className='emphasizedEnemy'>
                                            <u>
                                            Taken Phalanx
                                            </u>
                                        </li>
                                    </ul>
                                </td>
                                {/* <td>
                                    <ul>
                                        <li>
                                            Blah
                                        </li>
                                    </ul>
                                </td> */}
                            </tr>
                        </tbody>
                    </table>

                </div>

                <div className='encounterSection tips'>
                    <div className='encounterHeader'> 
                        Tips
                    </div>
                    <ul style={{paddingLeft: '20px'}}>
                        <li className='encounterBulletPoint'>
                            Pick up both the left and right relics at the same time. 
                            <ol className='encounterSubBulletPoint'>
                                When either relic is picked up, Taken spawn on both sides of the map!
                            </ol>
                        </li>
                        <li className='encounterBulletPoint'>
                            Remember: Runners are completely defenseless with the relic. No running, double jumping, or abilities of any kind!
                        </li>
                        <li className='encounterBulletPoint'>
                            Left and Right escorts should either kill Phalanxes first OR the walls first, so Runners reach the middle at the same time.
                        </li>
                        <li className='encounterBulletPoint'>
                            Don't jump while dunking!
                        </li>
                    </ul>
                </div>

                <div className='encounterSection recommended'>
                    <div className='encounterHeader'> 
                        Recommended Weapons and Builds
                    </div>

                </div>

                <div className='encounterSection walkthrough'>
                    <div className='encounterHeader'> 
                        Walkthrough
                    </div>

                    <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas viverra risus enim. Phasellus at turpis diam. Donec in blandit tellus, vitae faucibus libero. Sed posuere iaculis bibendum. Suspendisse massa libero, venenatis in ex nec, eleifend lobortis eros. Pellentesque a viverra augue. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec fringilla ipsum vitae ornare pellentesque. Aenean efficitur felis sit amet nunc rhoncus vestibulum. Duis pharetra venenatis volutpat. Curabitur in arcu urna. Aliquam rutrum venenatis massa, vel consequat risus sagittis vitae. Cras ac nunc blandit, hendrerit velit id, maximus libero. Duis sodales orci et blandit posuere.
            </p>
            <p>
Aliquam convallis tellus vitae nisi dictum egestas. Integer vitae massa purus. Suspendisse eleifend faucibus tortor, facilisis pharetra ex volutpat pulvinar. Phasellus facilisis odio in libero convallis sollicitudin. Sed vitae blandit quam, vel fringilla libero. Ut quis sodales turpis. Nulla sit amet est non tortor aliquet volutpat non sed elit. Etiam pulvinar lacinia tortor, ut euismod lacus cursus faucibus. Phasellus et pellentesque ligula, in maximus est.
            </p>
            <p>
Mauris placerat condimentum ultrices. Fusce eget vehicula ipsum. Maecenas massa lectus, pretium eu sollicitudin nec, sollicitudin at nisl. Nulla ultrices eu dui et sagittis. Phasellus eleifend augue sed urna pulvinar molestie. Donec iaculis ullamcorper arcu malesuada convallis. Pellentesque eleifend lectus at orci cursus porttitor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla tempus, odio euismod vulputate imperdiet, lorem nunc fringilla magna, at efficitur nibh velit non mauris. Etiam sagittis fringilla nulla quis bibendum. Quisque vel leo vitae elit lobortis posuere quis vitae quam. Curabitur sollicitudin feugiat enim et vulputate.
            </p>
            <p>
Integer eget rhoncus elit. Ut cursus quis ante quis maximus. Donec sodales sapien in nunc fringilla dictum. Nulla a pretium enim. Maecenas convallis finibus sem. Pellentesque id commodo leo, eu sollicitudin elit. Curabitur at malesuada ante. Aliquam eu commodo lectus, a volutpat tortor. Quisque ut tellus enim. In imperdiet magna a massa rutrum consequat. Ut nec diam quis lectus posuere maximus. Sed fermentum, metus ut sagittis tempus, ante leo pellentesque orci, elementum fermentum lacus nunc sit amet risus. Vivamus pharetra pulvinar augue, ut tristique est lobortis porta. Aliquam eget risus luctus, pulvinar lorem sit amet, tempor sem. Vestibulum pretium massa sit amet dolor interdum consectetur. Aenean sit amet enim vel urna egestas ultricies.
            </p>
            <p>
Nullam quis aliquam lorem. Duis ornare, mauris sed imperdiet efficitur, nisl quam pretium magna, quis feugiat nulla turpis vel elit. Donec non fringilla tellus, in blandit augue. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nam eget massa vitae ipsum facilisis dapibus. Morbi mauris elit, consequat fringilla tempor sed, lobortis vel sem. Mauris semper varius odio at mollis. In quis sollicitudin nulla. Pellentesque libero arcu, bibendum at lorem nec, feugiat pulvinar eros.
            </p>

                </div>
            </div>
            

           
        </div>
    )

}

export default E1;