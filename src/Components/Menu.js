import React, {useState} from 'react';
import {Outlet, Link, NavLink} from 'react-router-dom'
import '../Styles/Menu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faXmark  } from '@fortawesome/free-solid-svg-icons';


function Menu(props) {


    return (
        <div className='menuContainer'>
            {/* I am Menu */}
            <div className='menuHeader' style={{color: 'white'}}>
                <NavLink
                    className='menuHeaderLink'
                    style={({isActive}) => {
                        return {
                            color: isActive ? "#ad4646" : 'white',
                        };
                    }}
                    to="/">Encounters</NavLink>
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
                        to="/kf/e1">{(!props.blindMode || props.seenEncounters.e1) ? 'The Court of Oryx' : '? ? ? ? ? ? ? ? ? ?'}</NavLink>
                </div>
                <div className='navMenuEncounterCheck'>
                    <FontAwesomeIcon icon={faCheck} style={{color:'green'}}/>
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
                    to="/kf/e2">{(!props.blindMode || props.seenEncounters.e2) ? 'Totem Ships Jumping Puzzle' : '? ? ? ? ? ? ? ? ? ?'}</NavLink>
                </div>
                <div className='navMenuEncounterCheck'>
                    <FontAwesomeIcon icon={faXmark} style={{color:'red'}}/>
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
                    to="/kf/e3">{(!props.blindMode || props.seenEncounters.e3) ? 'Annihilator Totems' : '? ? ? ? ? ? ? ? ? ?'}</NavLink>
                </div>
                <div className='navMenuEncounterCheck'>
                    <FontAwesomeIcon icon={faXmark} style={{color:'red'}}/>
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
                    to="/kf/e4">{(!props.blindMode || props.seenEncounters.e4) ? 'Warpriest' : '? ? ? ? ? ? ? ? ? ?'}</NavLink>
                </div>
                <div className='navMenuEncounterCheck'>
                    <FontAwesomeIcon icon={faXmark} style={{color:'red'}}/>
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
                    to="/kf/e5">{(!props.blindMode || props.seenEncounters.e5) ? "Golgoroth's Cellar" : '? ? ? ? ? ? ? ? ? ?'}</NavLink>
                </div>
                <div className='navMenuEncounterCheck'>
                    <FontAwesomeIcon icon={faXmark} style={{color:'red'}}/>
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
                    to="/kf/e6">{(!props.blindMode || props.seenEncounters.e6) ? "Golgoroth" : '? ? ? ? ? ? ? ? ? ?'}</NavLink>
                </div>
                <div className='navMenuEncounterCheck'>
                    <FontAwesomeIcon icon={faXmark} style={{color:'red'}}/>
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
                    to="/kf/e7">{(!props.blindMode || props.seenEncounters.e7) ? "Piston Jumping Puzzle" : '? ? ? ? ? ? ? ? ? ?'}</NavLink>
                </div>
                <div className='navMenuEncounterCheck'>
                    <FontAwesomeIcon icon={faXmark} style={{color:'red'}}/>
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
                    to="/kf/e8">{(!props.blindMode || props.seenEncounters.e8) ? "Daughters of Oryx" : '? ? ? ? ? ? ? ? ? ?'}</NavLink>
                </div>
                <div className='navMenuEncounterCheck'>
                    <FontAwesomeIcon icon={faXmark} style={{color:'red'}}/>
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
                    to="/kf/e9">{(!props.blindMode || props.seenEncounters.e9) ? "Oryx, the Taken King" : '? ? ? ? ? ? ? ? ? ?'}</NavLink>
                </div>
                <div className='navMenuEncounterCheck'>
                    <FontAwesomeIcon icon={faXmark} style={{color:'red'}}/>
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
                    <FontAwesomeIcon icon={faXmark} style={{color:'red'}}/>
                </div>
            </div>

        </div>
    );
}

export default Menu;