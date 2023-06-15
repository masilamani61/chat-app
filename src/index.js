import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContext, Authcontextprovider } from './context/authcontext';
import { Chatcontextprovider } from './context/chatcontext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Authcontextprovider>
        <Chatcontextprovider>
         <App />
         </Chatcontextprovider>
    </Authcontextprovider>
  
    
    
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


