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
        // let remTime = props.remainingBreakDuration;
        // let readableString = ''
        // let hours = 0;
        // let minutes = 0;
        // let seconds = 0;
        // while(remTime >= 3600){
        //     remTime = remTime - 3600;
        //     hours = hours + 1;
        // }
        // while(remTime >= 60){
        //     remTime = remTime - 60;
        //     minutes = minutes + 1;
        // }
        // seconds = remTime;

        // if(seconds < 10){
        //     seconds = `0`+seconds
        // }
        // setReadbleRemainingBreakDuration(`${hours ? `${hours}:` : ''}${minutes ? `${minutes}:` : `00:`}${seconds ? `${seconds}` : `00`}`)
        setReadbleRemainingBreakDuration(generateReadableTimeString(props.remainingBreakDuration))
    }, [props.remainingBreakDuration])

    function generateReadableTimeString(duration) {
        let remTime = duration;
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

        if(minutes < 10){
            minutes = `0`+minutes
        }
        if(seconds < 10){
            seconds = `0`+seconds
        }

        readableString = (`${hours ? `${hours}:` : ''}${minutes ? `${minutes}:` : `00:`}${seconds ? `${seconds}` : `00`}`);
        return readableString;
    }


    return(
        <div className={breakMenuClassString} onClick={e => handleBreakMenuClick(e)}
            style={(props.remainingBreakDuration > 0) ? {background: '#5b6851'} : {}}>
            {(props.remainingBreakDuration !== 0 || !props.isMobileViewport) ? 
                <div>
                    <FontAwesomeIcon icon={breakMenuExpanded ? faAngleUp : faAngleDown}/>&nbsp;
                    Break Remaining: {readableRemainingBreakDuration}

                    {/* <div className={breakMenuExpanded ? 'breakMenuBackingPlate' : 'breakMenuBackingPlate expanded'} style={{background: '#24282a'}}> </div> */}

                </div> : 
                <div>
                <FontAwesomeIcon icon={breakMenuExpanded ? faAngleUp : faAngleDown}/>&nbsp;
                Take a Break&nbsp;
                <FontAwesomeIcon icon={breakMenuExpanded ? faAngleUp : faAngleDown}/>
                </div>  
            }
            
            <div className={breakMenuContentClassString}>



                <div className='breakMenuButtonContainer'>

                <button onClick={e=> props.addBreak(e, 60)} className='breakMenuButton'>
                        {(props.remainingBreakDuration > 0) ? 
                        '+1 min':
                        '1 min'}
                    </button>

                    <button onClick={e=> props.addBreak(e, 300)} className='breakMenuButton'>
                        {(props.remainingBreakDuration > 0) ? 
                        '+5 min':
                        '5 min'}
                    </button>
                    <button onClick={e=> props.addBreak(e, 600)} className='breakMenuButton'>
                    {(props.remainingBreakDuration > 0) ? 
                        '+10 min':
                        '10 min'}
                    </button>
                    <button onClick={e=> props.addBreak(e, 1200)} className='breakMenuButton'>
                    {(props.remainingBreakDuration > 0) ? 
                        '+20 min':
                        '20 min'}
                    </button>
                </div>

                {props.breaks[1] && <div>
                    Breaks Taken: {
                        props.breaks.length - 1
                    }

                    <br/>
                    Total Break Time: {(()=> {
                        let t= 0;
                        props.breaks.forEach(element =>{
                            t = t + element.duration;
                        })

                        if(t !== 0) {
                            return generateReadableTimeString(t);}
                    })()
                    } 
                
                </div>}
            </div>
        </div>
    )

}

export default BreakMenu;