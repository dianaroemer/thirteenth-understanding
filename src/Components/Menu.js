import React, {useState} from 'react';
import '../Styles/Menu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faXmark  } from '@fortawesome/free-solid-svg-icons';


function Menu(props) {


    return (
        <div className='menuContainer'>
            {/* I am Menu */}
            <div className='menuHeader' style={{color: 'white'}}>
                Encounters
            </div>
            <div className='navMenuSlot' onClick={e => props.handleClickNavEncounter(e, 'e1')}>
                <div className='navMenuEncounterTitle'>
                    {(!props.blindMode || props.seenEncounters.e1) ? 'The Court of Oryx' : '? ? ? ? ? ? ? ? ? ?'}
                </div>
                <div className='navMenuEncounterCheck'>
                    <FontAwesomeIcon icon={faCheck} style={{color:'green'}}/>
                </div>
            </div>

            <div className='navMenuSlot' onClick={e => props.handleClickNavEncounter(e, 'e2')}>
                <div className='navMenuEncounterTitle'>
                    {(!props.blindMode || props.seenEncounters.e2) ? 'Totem Ships Jumping Puzzle' : '? ? ? ? ? ? ? ? ? ?'}
                </div>
                <div className='navMenuEncounterCheck'>
                    <FontAwesomeIcon icon={faXmark} style={{color:'red'}}/>
                </div>
            </div>

            <div className='navMenuSlot' onClick={e => props.handleClickNavEncounter(e, 'e3')}>
                <div className='navMenuEncounterTitle'>
                    {(!props.blindMode || props.seenEncounters.e3) ? 'Annihilator Totems' : '? ? ? ? ? ? ? ? ? ?'}
                </div>
                <div className='navMenuEncounterCheck'>
                    <FontAwesomeIcon icon={faXmark} style={{color:'red'}}/>
                </div>
            </div>

            <div className='navMenuSlot' onClick={e => props.handleClickNavEncounter(e, 'e4')}>
                <div className='navMenuEncounterTitle'>
                    {(!props.blindMode || props.seenEncounters.e4) ? 'Warpriest' : '? ? ? ? ? ? ? ? ? ?'}
                </div>
                <div className='navMenuEncounterCheck'>
                    <FontAwesomeIcon icon={faXmark} style={{color:'red'}}/>
                </div>
            </div>

            <div className='navMenuSlot' onClick={e => props.handleClickNavEncounter(e, 'e5')}>
                <div className='navMenuEncounterTitle'>
                    {(!props.blindMode || props.seenEncounters.e5) ? "Golgoroth's Cellar" : '? ? ? ? ? ? ? ? ? ?'}
                </div>
                <div className='navMenuEncounterCheck'>
                    <FontAwesomeIcon icon={faXmark} style={{color:'red'}}/>
                </div>
            </div>

            <div className='navMenuSlot' onClick={e => props.handleClickNavEncounter(e, 'e6')}>
                <div className='navMenuEncounterTitle'>
                    {(!props.blindMode || props.seenEncounters.e6) ? 'Golgororth' : '? ? ? ? ? ? ? ? ? ?'}
                </div>
                <div className='navMenuEncounterCheck'>
                    <FontAwesomeIcon icon={faXmark} style={{color:'red'}}/>
                </div>
            </div>

            <div className='navMenuSlot' onClick={e => props.handleClickNavEncounter(e, 'e7')}>
                <div className='navMenuEncounterTitle'>
                    {(!props.blindMode || props.seenEncounters.e7) ? 'Piston Jumping Puzzle' : '? ? ? ? ? ? ? ? ? ?'}
                </div>
                <div className='navMenuEncounterCheck'>
                    <FontAwesomeIcon icon={faXmark} style={{color:'red'}}/>
                </div>
            </div>

            <div className='navMenuSlot' onClick={e => props.handleClickNavEncounter(e, 'e8')}>
                <div className='navMenuEncounterTitle'>
                    {(!props.blindMode || props.seenEncounters.e8) ? 'Daughters of Oryx' : '? ? ? ? ? ? ? ? ? ?'}
                </div>
                <div className='navMenuEncounterCheck'>
                    <FontAwesomeIcon icon={faXmark} style={{color:'red'}}/>
                </div>
            </div>

            <div className='navMenuSlot' onClick={e => props.handleClickNavEncounter(e, 'e9')}>
                <div className='navMenuEncounterTitle'>
                    {(!props.blindMode || props.seenEncounters.e9) ? 'Oryx, the Taken King' : '? ? ? ? ? ? ? ? ? ?'}
                </div>
                <div className='navMenuEncounterCheck'>
                    <FontAwesomeIcon icon={faXmark} style={{color:'red'}}/>
                </div>
            </div>

            <div className='navMenuSlot' onClick={e => props.handleClickNavEncounter(e, 'e10')}>
                <div className='navMenuEncounterTitle'>
                    {(!props.blindMode || props.seenEncounters.e10) ? '? ? ? ? ? ? ? ? ? ?' : '? ? ? ? ? ? ? ? ? ?'}
                </div>
                <div className='navMenuEncounterCheck'>
                    <FontAwesomeIcon icon={faXmark} style={{color:'red'}}/>
                </div>
            </div>

        </div>
    );
}

export default Menu;