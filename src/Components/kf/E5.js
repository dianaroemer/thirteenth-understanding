import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faThumbTack } from '@fortawesome/free-solid-svg-icons';


function E5() {

    const [attemptVisibility, toggleAttemptVisibility] = useState(false)
    function handleToggleAttemptVisibility(e) {
        e.preventDefault();
        toggleAttemptVisibility(!attemptVisibility)
    }

    const [stickTools, toggleStickTools] = useState(false)
    function handleToggleStickTools(e) {
        e.preventDefault();
        toggleStickTools(!stickTools);
        if(stickTools){
            setEncounterToolsClass('encounterTools pinned')
            setEncounterContentClass('encounterContent pinned')
        } else {
            setEncounterToolsClass('encounterTools')
            setEncounterContentClass('encounterContent')

        }
        // console.log('here')
        // console.log(stickTools)
        // console.log(encounterToolsClass)
    }

    const [encounterToolsClass, setEncounterToolsClass] = useState('encounterTools');
    const [encounterContentClass, setEncounterContentClass] = useState('encounterContent')

    return(
        <div className='encounterContentContainer e5'>
            <div className={encounterToolsClass}>
                {/* I am encounter toolbox */}
                <FontAwesomeIcon icon={faThumbTack} 
                    className='pinEncounterTools'
                    onClick={e=> handleToggleStickTools(e)}
                        />

                <div className='encounterClearedButtonContainer'>
                    <button onClick={e=> e.preventDefault()}>
                        Encounter Cleared!     
                    </button>
                </div>

                <div className='encounterAttemptsContainer'>
                    <div onClick={e => handleToggleAttemptVisibility(e)}>
                        <FontAwesomeIcon icon={attemptVisibility ? faEyeSlash : faEye}/>&nbsp;
                         { attemptVisibility ? 'Attempt # 78' : 'Show Attempts' }&nbsp;
                         <FontAwesomeIcon icon={attemptVisibility ? faEyeSlash : faEye}/>
                    </div>
                    <button onClick={e=> e.preventDefault()}>
                        + Add Attempt +
                    </button>
                    <div className='encounterAttemptsVisibility'>

                    </div>

                </div>
                
            </div>
            <div className={encounterContentClass}>
                I'm here or something
            </div>
            
            I am E5

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
    )

}

export default E5;