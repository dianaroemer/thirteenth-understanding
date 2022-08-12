import React, {useState} from 'react';
import '../Styles/Menu.css';


function Menu() {


    const [menuCheck, toggleMenuCheck] = useState(false);
    function handleToggleMenuCheck(e){
        toggleMenuCheck(!menuCheck);
    }

    return (
        <div className='menuContainer'>
            I am Menu, nihao are ya
            
            {/* <input type="checkbox" id="menuInput" checked={menuCheck} onChange={e => handleToggleMenuCheck(e)}/>
            <label className="menuIcon" htmlFor='menuInput'>
                <div className="subMenu"></div>
            </label> */}

        </div>
    );
}

export default Menu;