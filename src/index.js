import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter,
          Routes,
          Route
         } from "react-router-dom";
import './index.css';
import App from './App';
import BackgroundTitle from './Components/BackgroundTitle';
import E1 from './Components/kf/E1';
import E2 from './Components/kf/E2';
import E3 from './Components/kf/E3';
import E4 from './Components/kf/E4';
import E5 from './Components/kf/E5';
import E6 from './Components/kf/E6';
import E7 from './Components/kf/E7';
import E8 from './Components/kf/E8';
import E9 from './Components/kf/E9';

import E1C from './Components/kf/E1C';
import E2C from './Components/kf/E2C';
import E3C from './Components/kf/E3C';
import E4C from './Components/kf/E4C';
import E5C from './Components/kf/E5C';
import E6C from './Components/kf/E6C';
import E7C from './Components/kf/E7C';
import E8C from './Components/kf/E8C';
// import E9C from './Components/kf/E9C';



import Tools from './Components/Tools';


import '.'

// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route path="kf/e1" element={<E1 />} />
        <Route path="kf/e2" element={<E2 />} />
        <Route path="kf/e3" element={<E3 />} />
        <Route path="kf/e4" element={<E4 />} />
        <Route path="kf/e5" element={<E5 />} />
        <Route path="kf/e6" element={<E6 />} />
        <Route path="kf/e7" element={<E7 />} />
        <Route path="kf/e8" element={<E8 />} />
        <Route path="kf/e9" element={<E9 />} />

        <Route path="kf/e1c" element={<E1C />} />
        <Route path="kf/e2c" element={<E2C />} />
        <Route path="kf/e3c" element={<E3C />} />
        <Route path="kf/e4c" element={<E4C />} />
        <Route path="kf/e5c" element={<E5C />} />
        <Route path="kf/e6c" element={<E6C />} />
        <Route path="kf/e7c" element={<E7C />} />
        <Route path="kf/e8c" element={<E8C />} />
        {/* <Route path="kf/e9c" element={<E9C />} /> */}


        <Route path="tools" element={<Tools />} />

        <Route
          index
          element={
            <BackgroundTitle/>
          }
        />


        <Route path="*"
          element={
            <div className="error404Page">
              <p>Are you lost, little light? There's nothing here!</p>
              <BackgroundTitle />
            </div>
          }
        />

      </Route>
    </Routes>
    </HashRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
