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


        <Route
          index
          element={
            <BackgroundTitle/>
          }
        />


        <Route path="*"
          element={
            <main style={{padding: "1rem"}}>
              <p>Are you lost, little light? There's nothing here!</p>
            </main>
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
