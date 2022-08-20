import React, {useState} from 'react';
import {Outlet, Link, NavLink} from 'react-router-dom'
import '../Styles/Menu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faXmark  } from '@fortawesome/free-solid-svg-icons';


function Menu(props) {


    return (
        <div className='menuContainer'>
            {/* I am Menu  &nbsp; */}
            <div className='menuHeader' style={{color: 'white'}}>
                {/* <div className='normalDifficulty'> Normal</div> */}
                <NavLink
                    className='menuHeaderLink'
                    style={({isActive}) => {
                        return {
                            color: isActive ? "#ad4646" : 'white',
                        };
                    }}
                    to="/">{props.inChallengeMode ? "Challenge Mode" : "Normal Mode"}</NavLink>
                <div className='challengeDifficulty' 
                    style={(!props.blindMode || props.raidStateKF.e9.completed) ?
                        {color: 'gray' } : {color: 'gray', textDecoration: 'line-through'}}
                    onClick={e => props.handleChallengeModeToggle(e)}
                > {props.inChallengeMode ? "Normal" : "Challenge"} </div>
            </div>
            <div className='navMenuSlot' onClick={e => props.handleClickNavEncounter(e, 'e1')}>
                <div className='navMenuEncounterTitle'>
                    <NavLink
                        className='navMenuEncounterLink'
                        style={({isActive}) => {
                            return {
                                color: isActive ? "#ad4646" : 'white',
                                // text-decoration: 'none'
                            };
                        }}
                        to={props.inChallengeMode ? "/kf/e1c" : "/kf/e1"}>{(!props.blindMode || props.seenEncounters.e1) ? 'The Hall of Souls' : '? ? ? ? ? ? ? ? ? ?'}</NavLink>
                </div>
                <div className='navMenuEncounterCheck'>
                    <FontAwesomeIcon icon={props.raidStateKF.e1.completed ?faCheck : faXmark} style={props.raidStateKF.e1.completed ? {color:'green'} : {color:'red'}}/>&nbsp;
                    <FontAwesomeIcon icon={props.raidStateKF.e1c.completed ?faCheck : faXmark} style={props.raidStateKF.e1c.completed ? {color:'green'} : {color:'red'}}/>
                </div>
            </div>

            <div className='navMenuSlot' onClick={e => props.handleClickNavEncounter(e, 'e2')}>
                <div className='navMenuEncounterTitle'>
                <NavLink
                    className='navMenuEncounterLink'
                    style={({isActive}) => {
                        return {
                            color: isActive ? "#ad4646" : 'white',
                        };
                    }}
                    to={props.inChallengeMode ? "/kf/e2c" : "/kf/e2"}>{(!props.blindMode || props.seenEncounters.e2) ? 'Totem Ships' : '? ? ? ? ? ? ? ? ? ?'}</NavLink>
                </div>
                <div className='navMenuEncounterCheck'>
                <FontAwesomeIcon icon={props.raidStateKF.e2.completed ?faCheck : faXmark} style={props.raidStateKF.e2.completed ? {color:'green'} : {color:'red'}}/>&nbsp;
                    <FontAwesomeIcon icon={props.raidStateKF.e2c.completed ?faCheck : faXmark} style={props.raidStateKF.e2c.completed ? {color:'green'} : {color:'red'}}/>
                </div>
            </div>

            <div className='navMenuSlot' onClick={e => props.handleClickNavEncounter(e, 'e3')}>
                <div className='navMenuEncounterTitle'>
                <NavLink
                    className='navMenuEncounterLink'
                    style={({isActive}) => {
                        return {
                            color: isActive ? "#ad4646" : 'white',
                        };
                    }}
                    to={props.inChallengeMode ? "/kf/e3c" : "/kf/e3"}>{(!props.blindMode || props.seenEncounters.e3) ? 'Annihilator Totems' : '? ? ? ? ? ? ? ? ? ?'}</NavLink>
                </div>
                <div className='navMenuEncounterCheck'>
                    <FontAwesomeIcon icon={props.raidStateKF.e3.completed ?faCheck : faXmark} style={props.raidStateKF.e3.completed ? {color:'green'} : {color:'red'}}/>&nbsp;
                    <FontAwesomeIcon icon={props.raidStateKF.e3c.completed ?faCheck : faXmark} style={props.raidStateKF.e3c.completed ? {color:'green'} : {color:'red'}}/>
                </div>
            </div>

            <div className='navMenuSlot' onClick={e => props.handleClickNavEncounter(e, 'e4')}>
                <div className='navMenuEncounterTitle'>
                <NavLink
                    className='navMenuEncounterLink'
                    style={({isActive}) => {
                        return {
                            color: isActive ? "#ad4646" : 'white',
                        };
                    }}
                    to={props.inChallengeMode ? "/kf/e4c" : "/kf/e4"}>{(!props.blindMode || props.seenEncounters.e4) ? 'Warpriest' : '? ? ? ? ? ? ? ? ? ?'}</NavLink>
                </div>
                <div className='navMenuEncounterCheck'>
                    <FontAwesomeIcon icon={props.raidStateKF.e4.completed ?faCheck : faXmark} style={props.raidStateKF.e4.completed ? {color:'green'} : {color:'red'}}/>&nbsp;
                    <FontAwesomeIcon icon={props.raidStateKF.e4c.completed ?faCheck : faXmark} style={props.raidStateKF.e4c.completed ? {color:'green'} : {color:'red'}}/>
                </div>
            </div>

            <div className='navMenuSlot' onClick={e => props.handleClickNavEncounter(e, 'e5')}>
                <div className='navMenuEncounterTitle'>
                <NavLink
                    className='navMenuEncounterLink'
                    style={({isActive}) => {
                        return {
                            color: isActive ? "#ad4646" : 'white',
                        };
                    }}
                    to={props.inChallengeMode ? "/kf/e5c" : "/kf/e5"}>{(!props.blindMode || props.seenEncounters.e5) ? "Golgoroth's Cellar" : '? ? ? ? ? ? ? ? ? ?'}</NavLink>
                </div>
                <div className='navMenuEncounterCheck'>
                    <FontAwesomeIcon icon={props.raidStateKF.e5.completed ?faCheck : faXmark} style={props.raidStateKF.e5.completed ? {color:'green'} : {color:'red'}}/>&nbsp;
                    <FontAwesomeIcon icon={props.raidStateKF.e5c.completed ?faCheck : faXmark} style={props.raidStateKF.e5c.completed ? {color:'green'} : {color:'red'}}/>
                </div>
            </div>

            <div className='navMenuSlot' onClick={e => props.handleClickNavEncounter(e, 'e6')}>
                <div className='navMenuEncounterTitle'>
                <NavLink
                    className='navMenuEncounterLink'
                    style={({isActive}) => {
                        return {
                            color: isActive ? "#ad4646" : 'white',
                        };
                    }}
                    to={props.inChallengeMode ? "/kf/e6c" : "/kf/e6"}>{(!props.blindMode || props.seenEncounters.e6) ? "Golgoroth" : '? ? ? ? ? ? ? ? ? ?'}</NavLink>
                </div>
                <div className='navMenuEncounterCheck'>
                    <FontAwesomeIcon icon={props.raidStateKF.e6.completed ?faCheck : faXmark} style={props.raidStateKF.e6.completed ? {color:'green'} : {color:'red'}}/>&nbsp;
                    <FontAwesomeIcon icon={props.raidStateKF.e6c.completed ?faCheck : faXmark} style={props.raidStateKF.e6c.completed ? {color:'green'} : {color:'red'}}/> 
                   </div>
            </div>

            <div className='navMenuSlot' onClick={e => props.handleClickNavEncounter(e, 'e7')}>
                <div className='navMenuEncounterTitle'>
                <NavLink
                    className='navMenuEncounterLink'
                    style={({isActive}) => {
                        return {
                            color: isActive ? "#ad4646" : 'white',
                        };
                    }}
                    to={props.inChallengeMode ? "/kf/e7c" : "/kf/e7"}>{(!props.blindMode || props.seenEncounters.e7) ? "Piston Jumping Puzzle" : '? ? ? ? ? ? ? ? ? ?'}</NavLink>
                </div>
                <div className='navMenuEncounterCheck'>
                    <FontAwesomeIcon icon={props.raidStateKF.e7.completed ?faCheck : faXmark} style={props.raidStateKF.e7.completed ? {color:'green'} : {color:'red'}}/>&nbsp;
                    <FontAwesomeIcon icon={props.raidStateKF.e7c.completed ?faCheck : faXmark} style={props.raidStateKF.e7c.completed ? {color:'green'} : {color:'red'}}/>
                </div>
            </div>

            <div className='navMenuSlot' onClick={e => props.handleClickNavEncounter(e, 'e8')}>
                <div className='navMenuEncounterTitle'>
                <NavLink
                    className='navMenuEncounterLink'
                    style={({isActive}) => {
                        return {
                            color: isActive ? "#ad4646" : 'white',
                        };
                    }}
                    to={props.inChallengeMode ? "/kf/e8c" : "/kf/e8"}>{(!props.blindMode || props.seenEncounters.e8) ? "Daughters of Oryx" : '? ? ? ? ? ? ? ? ? ?'}</NavLink>
                </div>
                <div className='navMenuEncounterCheck'>
                    <FontAwesomeIcon icon={props.raidStateKF.e8.completed ?faCheck : faXmark} style={props.raidStateKF.e8.completed ? {color:'green'} : {color:'red'}}/>&nbsp;
                    <FontAwesomeIcon icon={props.raidStateKF.e8c.completed ?faCheck : faXmark} style={props.raidStateKF.e8c.completed ? {color:'green'} : {color:'red'}}/> 
                </div>
            </div>

            <div className='navMenuSlot' onClick={e => props.handleClickNavEncounter(e, 'e9')}>
                <div className='navMenuEncounterTitle'>
                <NavLink
                    className='navMenuEncounterLink'
                    style={({isActive}) => {
                        return {
                            color: isActive ? "#ad4646" : 'white',
                        };
                    }}
                    to={props.inChallengeMode ? "/kf/e9c" : "/kf/e9"}>{(!props.blindMode || props.seenEncounters.e9) ? "Oryx, the Taken King" : '? ? ? ? ? ? ? ? ? ?'}</NavLink>
                </div>
                <div className='navMenuEncounterCheck'>
                    <FontAwesomeIcon icon={props.raidStateKF.e9.completed ?faCheck : faXmark} style={props.raidStateKF.e9.completed ? {color:'green'} : {color:'red'}}/>&nbsp;
                    <FontAwesomeIcon icon={props.raidStateKF.e9c.completed ?faCheck : faXmark} style={props.raidStateKF.e9c.completed ? {color:'green'} : {color:'red'}}/>
                </div>
            </div>

            <div className='navMenuSlot' onClick={e => props.handleClickNavEncounter(e, 'e10')}>
                <div className='navMenuEncounterTitle'>
                <NavLink
                    className='navMenuEncounterLink'
                    style={{color: 'white'}}
                    to="/">{ "? ? ? ? ? ? ? ? ? ?"}</NavLink>
                </div>
                <div className='navMenuEncounterCheck'>
                    <FontAwesomeIcon icon={faXmark} style={{color:'red'}}/>&nbsp; 
                    {/* <div></div> */}
                    <FontAwesomeIcon icon={faXmark} style={{color:'red'}}/>

                </div>
            </div>

        </div>
    );
}

export default Menu;