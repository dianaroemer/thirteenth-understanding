import logo from './logo.svg';

import {link} from "react-router-dom";
import './App.css';


function App() {
  return (
    <div className="App">

      <nav className='appNav'
      //   style={{
      //   borderBottom: "solid 1px",
      //   paddingBottom: "1rem",
      // }}
      >
        <div className='titleContainer navContainer'>
          <h1 className='navTitle'>
            13th Understanding
          </h1>
          <div className='titleQuote'>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;—&nbsp;"To rend one's enemies is to see them not as equals, but objects—hollow of spirit and meaning."
          </div>
        </div>
        <div className='navClockContainer navContainer'>
          <h2>
            CLOCK
          </h2>
        </div>
        <div className='navOtherThings navContainer'>
          <h2>
            Other things?
          </h2>
          <h5>
          This webpage is designed to help with the King's Fall Day 1 Raid race
          </h5>
        </div>

      </nav>

      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
