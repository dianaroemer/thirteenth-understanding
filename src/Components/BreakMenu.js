import React, {useState, useEffect} from 'react';
import '../Styles/BreakMenu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';

function BreakMenu(props) {

    const [breakMenuExpanded, toggleBreakMenuExpanded] = useState(true);
    const [breakMenuClassString, setBreakMenuClassString] = useState('breakMenu')
    const [breakMenuContentClassString, setBreakMenuContentClassString] = useState('breakMenuContent')
    function handleBreakMenuClick(e) {
        e.preventDefault();
        toggleBreakMenuExpanded(()=> !breakMenuExpanded);
        if(breakMenuExpanded) {
            setBreakMenuClassString('breakMenu expanded')
            setBreakMenuContentClassString('breakMenuContent expanded')

        } else {
            setBreakMenuClassString('breakMenu')
            setBreakMenuContentClassString('breakMenuContent')

        }
    }

    const [readableRemainingBreakDuration, setReadbleRemainingBreakDuration] = useState('');
    useEffect(()=> {
        let remTime = props.remainingBreakDuration;
        let readableString = ''
        let hours = 0;
        let minutes = 0;
        let seconds = 0;
        while(remTime >= 3600){
            remTime = remTime - 3600;
            hours = hours + 1;
        }
        while(remTime >= 60){
            remTime = remTime - 60;
            minutes = minutes + 1;
        }
        seconds = remTime;
        // if(minutes < 10) {
        //     minutes = `0`+minutes;
        // }
        if(seconds < 10){
            seconds = `0`+seconds
        }
        setReadbleRemainingBreakDuration(`${hours ? `${hours}:` : ''}${minutes ? `${minutes}:` : `00:`}${seconds ? `${seconds}` : `00`}`)
    }, [[props.remainingBreakDuration]])


    return(
        <div className={breakMenuClassString} onClick={e => handleBreakMenuClick(e)}>
            {(props.remainingBreakDuration !== 0) ? 
                <div>
                    <FontAwesomeIcon icon={breakMenuExpanded ? faAngleUp : faAngleDown}/>&nbsp;
                    Break Remaining: {readableRemainingBreakDuration}

                </div> : 
                <div>
                <FontAwesomeIcon icon={breakMenuExpanded ? faAngleUp : faAngleDown}/>&nbsp;
                Take a Break&nbsp;
                <FontAwesomeIcon icon={breakMenuExpanded ? faAngleUp : faAngleDown}/>
            </div>
            }
            
            <div className={breakMenuContentClassString}>
                here

                Total Break Time: {(()=> {
                    let t = 0;

                })}
            </div>
        </div>
    )

}

export default BreakMenu;