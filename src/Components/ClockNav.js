// import { isFocusable } from '@testing-library/user-event/dist/utils';
import React, {useState, useEffect} from 'react';
import '../Styles/ClockNav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';

const msInDays = 86400000;
const msInHours = 3600000;
const msInMinutes = 60000;
const msInSeconds = 1000;

// This time previously was the epoch time that the raid race started. It now initializes independantly on each new page load to demonstrate how the functionality worked during an active raid race
const clockContestStart = (new Date()).getTime() + 15000;
// const clockContestEnd = 1661619600000;

// Temp values for development mode
// const clockContestStart = 1661457964000;
const clockContestEnd = 1660856261000;

const encounterBegan = new Date(1660381229000)
const timeSinceBreak = new Date(1660382249000)


function ClockNav(props) {

    const [headerClock, setHeaderClock] = useState(0);

    const [currentDate, setCurrentDate] = useState(new Date());
    const [timerID, setTimerID] = useState();

    const [contestActive, toggleContestActive] = useState(false)
    const [contestTimeElapsed, setContestTimeElapsed] = useState();
    const [contestTimeRemaining, setContestTimeRemaining] = useState();
    const [contestEncounterElapsed, setContestEncounterElapsed] = useState();

    const [timeBreakString, setTimeBreakString] = useState();
    const [timeEncounterString, setTimeEncounterString] = useState();
    
    const [expandClocks, toggleExpandClocks] = useState(false);
    function handleExpandClocks(e) {
        e.preventDefault();
        toggleExpandClocks(!expandClocks);
    }
    
    function clockTick() {
        setCurrentDate(new Date())
    }

    useEffect(() => {
        function calculateTimeDifferential(){
            let timeRemaining = clockContestStart - currentDate;
            let days = 0;
            let hours = 0;
            let minutes = 0;
            let seconds = 0;
            let remainingMillis = timeRemaining;
            let dateString;

            if(timeRemaining >= 0) { // If the contest hasn't begun, go here
                while(remainingMillis > msInDays){
                    days = days + 1;
                    remainingMillis = remainingMillis - msInDays;
                }
                while(remainingMillis > msInHours){
                    hours = hours + 1;
                    remainingMillis = remainingMillis - msInHours;
                }
                while(remainingMillis > msInMinutes){
                    minutes = minutes + 1;
                    remainingMillis = remainingMillis - msInMinutes;
                }
                while(remainingMillis > msInSeconds){
                    seconds = seconds + 1;
                    remainingMillis = remainingMillis - msInSeconds;
                }


                if(hours < 10) {
                    hours = `0`+hours
                }
                if(minutes < 10) {
                    minutes = `0`+minutes
                }
                if(seconds < 10) {
                    seconds = `0`+seconds
                }

                dateString = `${days ? `${days} days, ` : ''} ${hours ? `${hours}:` : ''}${minutes ? `${minutes}:` : ""}${seconds} remaining`;
                setHeaderClock(dateString);
            } else { //If the contest has begun, do calculations in here
                let timeElapsed = currentDate - clockContestStart;
                while(timeElapsed > msInHours){
                    hours = hours + 1;
                    timeElapsed = timeElapsed - msInHours;
                }
                while(timeElapsed > msInMinutes){
                    minutes = minutes + 1;
                    timeElapsed = timeElapsed - msInMinutes;
                }
                while(timeElapsed > msInSeconds){
                    seconds = seconds + 1;
                    timeElapsed = timeElapsed - msInSeconds;
                }

                // Values here are Actual-1 because code counts 0 as interval when counting down
                let remainingHours = 23 - hours;
                let remainingMinutes = 59 - minutes;
                let remainingSeconds = 60 - seconds;

                if(hours < 10) {
                    hours = `0`+hours
                }
                if(minutes < 10) {
                    minutes = `0`+minutes
                }
                if(seconds < 10) {
                    seconds = `0`+seconds
                }

                dateString = `${hours ? `${hours}:` : ''}${minutes ? `${minutes}:` : ""}${seconds} total elapsed`
                setContestTimeElapsed(dateString)



                if(remainingHours < 10) {
                    remainingHours = `0`+remainingHours
                }
                if(remainingMinutes < 10) {
                    remainingMinutes = `0`+remainingMinutes
                }
                if(remainingSeconds < 10) {
                    remainingSeconds = `0`+remainingSeconds
                }

                let remainingString = `${remainingHours}:${remainingMinutes}:${remainingSeconds === 60 ? '00' : remainingSeconds} remaining`
                setContestTimeRemaining(remainingString)
            }
            return dateString;
        }

        setTimerID(setInterval(
            () => clockTick(), 
            (clockContestStart - currentDate > msInDays ? 1000 : 1000)
        ));
        calculateTimeDifferential();

        // Return statement clears previous active timerID to prevent overflow of active timers
        return () => {
            clearInterval(timerID);
        }

    }, [currentDate])

    useEffect( () => {
        let encounterTimer = currentDate - (props.mostRecentEncounterCompletion.getTime());
        let breakTimer = ((currentDate - props.breaks[(props.breaks).length-1].duration*1000)) - props.breaks[(props.breaks).length-1].breakStart.getTime() 
        // console.log(props.breaks[props.breaks.length-1])

        let encounterHours = 0;
        let encounterMinutes = 0;
        let encounterSeconds = 0;
        while( encounterTimer > msInHours){
            encounterHours = encounterHours + 1;
            encounterTimer = encounterTimer - msInHours;
        }
        while( encounterTimer > msInMinutes){
            encounterMinutes = encounterMinutes + 1;
            encounterTimer = encounterTimer - msInMinutes;
        }
        while( encounterTimer > msInSeconds){
            encounterSeconds = encounterSeconds + 1;
            encounterTimer = encounterTimer - msInSeconds;
        }

        if(encounterMinutes < 10) {
            encounterMinutes = `0`+encounterMinutes
        }
        if(encounterSeconds < 10) {
            encounterSeconds = `0`+encounterSeconds
        }

        let encounterString = `${encounterHours ? `${encounterHours}:` : ''}${encounterMinutes ? `${encounterMinutes}:` : ''}${encounterSeconds ? `${encounterSeconds}` : ''} on encounter`;

        setTimeEncounterString(encounterString);

        let breakHours = 0;
        let breakMinutes = 0;
        let breakSeconds = 0;
        while( breakTimer > msInHours){
            breakHours = breakHours + 1;
            breakTimer = breakTimer - msInHours;
        }
        while( breakTimer > msInMinutes){
            breakMinutes = breakMinutes + 1;
            breakTimer = breakTimer - msInMinutes;
        }
        while( breakTimer > msInSeconds){
            breakSeconds = breakSeconds + 1;
            breakTimer = breakTimer - msInSeconds;
        }
        
        if(breakHours < 10) {
            breakHours = `0`+breakHours
        }
        if(breakMinutes < 10) {
            breakMinutes = `0`+breakMinutes
        }
        if(breakSeconds < 10) {
            breakSeconds = `0`+breakSeconds
        }
        
        let breakString = `${breakHours ? `${breakHours}:` : ''}${breakMinutes ? `${breakMinutes}:` : ''}${breakSeconds ? `${breakSeconds}` : '00'} since break`
        // console.log(breakString);
        if (breakString === '00:00:00 since break'){
            setTimeBreakString(`Currently on Break`);    
        } else {
            setTimeBreakString(breakString);
        }

        
    }, [props.mostRecentEncounterCompletion, props.breaks, currentDate])


    // const [menuCheck, toggleMenuCheck] = useState(false);
    // function handleToggleMenuCheck(e){
        // toggleMenuCheck(!menuCheck);
    // }

    // let { menuCheck, handleToggleMenuCheck } = props;

    return (
        <div className={props.expandClocks ? 'clockNav-expanded' : 'clockNav'}
        style={props.darkMode ? {background: '#1c1c1c', color: '#fff'} : {}}>
            <div className='headerClockContainer'>
                {clockContestStart - currentDate > 0 &&                     
                    <div style={{color: 'red'}}>
                        {headerClock}
                    </div>
                }
                {clockContestStart - currentDate < 0 &&
                    <ActiveClocks 
                        contestTimeElapsed={contestTimeElapsed}
                        contestTimeRemaining={contestTimeRemaining}
                        timeSinceBreak={timeBreakString}
                        encounterTimer={timeEncounterString}
                        expandClocks={props.expandClocks}
                        handleExpandClocks={props.handleExpandClocks}
                        darkMode={props.darkMode}
                        />
                }
                {props.isMobileViewport && 
                    <div className='mobileMenuIconContainer'>
                        <input type="checkbox" id="menuInput" checked={props.menuCheck} onChange={e => {
                            props.handleToggleMenuCheck(e);
                            // console.log('clicking')
                            }}/>
                        <label className="menuIcon" htmlFor='menuInput'>
                            <div className="subMenu"></div>
                        </label>
                    </div>
                }
            </div>
        </div>
    )
}

function ActiveClocks(props) {



    const [viewClock, setViewClock] = useState()
    const [altClocksOne, setAltClockOne] = useState();
    const [altClocksTwo, setAltClockTwo] = useState();
    const [altClocksThree, setAltClockThree] = useState();
    const [cycleClocks, setCycleClocks] = useState(0);

    useEffect(() => {
        switch (cycleClocks) {
            case 0:
                setViewClock(props.contestTimeElapsed);
                setAltClockOne(props.contestTimeRemaining);
                setAltClockTwo(props.timeSinceBreak);
                setAltClockThree(props.encounterTimer)
                break;
            case 1:
                setAltClockThree(props.contestTimeElapsed);
                setViewClock(props.contestTimeRemaining);
                setAltClockOne(props.timeSinceBreak);
                setAltClockTwo(props.encounterTimer)
                break;
            case 2:
                setAltClockTwo(props.contestTimeElapsed);
                setAltClockThree(props.contestTimeRemaining);
                setViewClock(props.timeSinceBreak);
                setAltClockOne(props.encounterTimer)
                break;
            case 3:
                setAltClockOne(props.contestTimeElapsed);
                setAltClockTwo(props.contestTimeRemaining);
                setAltClockThree(props.timeSinceBreak);
                setViewClock(props.encounterTimer)
                break;
            default:
                console.log(`hit default in useEffect, from ActiveClocks in ClockNav.js`)
                break;
        }

    },[props.contestTimeElapsed, props.contestTimeRemaining, props.timeSinceBreak, props.encounterTimer])

    function handleCycleClocks(e) {
        e.preventDefault();
        if(cycleClocks <= 2){
            setCycleClocks(cycleClocks + 1)
        } else (
            setCycleClocks(0)
        )

        let temp = viewClock;
        setViewClock(altClocksOne);
        setAltClockOne(altClocksTwo)
        setAltClockTwo(altClocksThree);
        setAltClockThree(temp);
    }




    return (
        <div className='expandClocksContent' style={{color:'green'}}>
            <div className='primaryClock' onClick={e => handleCycleClocks(e)} style={props.darkMode ? {color: '#ad4646'} : {color: 'black'}}>
                {viewClock}
            </div>
        
            <div className="expandClocks" onClick={e => props.handleExpandClocks(e)}>

                {!props.expandClocks &&
                <div className='expandClocksSubContent'>
                    <p className='toggleExpandClocks' style={props.darkMode ? {color: 'white'} : {color: 'black'}}>
                        <FontAwesomeIcon icon={faAngleDown}/>&nbsp;
                        Show Additional Timers&nbsp;
                        <FontAwesomeIcon icon={faAngleDown}/>
                    </p>
                </div>}

                {props.expandClocks && 
                <div className='expandClocksSubContent-expanded' style={props.darkMode ? {color: 'green'} : {color: 'black'}}>
                    <div>
                        {altClocksOne}
                    </div>
                    <div>
                        {altClocksTwo}    
                    </div>
                    <div>
                        {altClocksThree}    
                    </div>
                    <p className='toggleExpandClocks expanded' style={props.darkMode ? {color: 'white'} : {color: 'black'}}>
                        <FontAwesomeIcon icon={faAngleUp}/>&nbsp;
                        Collapse Timers &nbsp;
                        <FontAwesomeIcon icon={faAngleUp}/>
                    </p>
                </div>}
                    
            </div>
        </div>
    )
}

export default ClockNav;