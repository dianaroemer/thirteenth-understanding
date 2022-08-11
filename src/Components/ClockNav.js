import { isFocusable } from '@testing-library/user-event/dist/utils';
import React, {useState, useEffect} from 'react';
import '../Styles/ClockNav.css';

// const clockContestStart = 1661533200000;
// const clockContestEnd = 1661619600000;

const clockContestStart = 1660198645000;
const clockContestEnd = 1660283681000;


const msInDays = 86400000;
const msInHours = 3600000;
const msInMinutes = 60000;
const msInSeconds = 1000;


function ClockNav(props) {

    const [headerClock, setHeaderClock] = useState(0);

    const [currentDate, setCurrentDate] = useState(new Date());
    const [timerID, setTimerID] = useState();

    const [expandClocks, toggleExpandClocks] = useState(false);

    const [contestActive, toggleContestActive] = useState(false)
    const [contestTimeElapsed, setContestTimeElapsed] = useState();
    const [contestTimeRemaining, setContestTimeRemaining] = useState();
    const [contestEncounterElapsed, setContestEncounterElapsed] = useState();
    
    function handleExpandClocks(e) {
        e.preventDefault();
        toggleExpandClocks(!expandClocks);
        console.log(expandClocks);
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
                dateString = `${days ? `${days} days, ` : ''} ${hours ? `${hours}:` : ''}${minutes ? `${minutes}:` : ""}${seconds} Remaining`;
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
                dateString = `${hours ? `${hours}:` : ''}${minutes ? `${minutes}:` : ""}${seconds} Elapsed`
                setContestTimeElapsed(dateString)

                // Values here are Actual-1 because code counts 0 as interval when counting down
                let remainingHours = 23 - hours;
                let remainingMinutes = 59 - minutes;
                let remainingSeconds = 60 - seconds;

                let remainingString = `${remainingHours}:${remainingMinutes}:${remainingSeconds === 60 ? '00' : remainingSeconds} Remaining`
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
        if(contestTimeElapsed) {
            toggleContestActive(true);
        }
    }, [contestTimeElapsed]);


    

    return (
        <div className='clockNav'
        style={props.darkMode ? {background: '#1c1c1c', color: '#fff'} : {}}>
            <div className='headerClockContainer'>
                {clockContestStart - currentDate > 0 &&                     
                    <div style={{color: 'red'}}>
                        {headerClock}
                    </div>
                }
                {clockContestStart - currentDate < 0 &&
                    <div style={{color:'green'}}>
                        <p>
                        {contestTimeElapsed}
                        </p>
                        
                        <div className="expandClocks" onClick={e => handleExpandClocks(e)}>

                            {!expandClocks &&
                            <div className='expandClocksContent'>
                                <p className='toggleExpandClocks'>Expand Clocks</p>
                            </div>}

                            {expandClocks && 
                            <div className='expandClocksContent'>
                                {contestTimeRemaining}
                                <p className='toggleExpandClocks'>
                                    Collapse Clocks 
                                </p>
                            </div>}
                            
                        </div>
                    </div>
                }
            </div>

        </div>
    )

}

function Clock() {



}

export default ClockNav;
