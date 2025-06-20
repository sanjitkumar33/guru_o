import React from "react";
import ReactDom from 'react-dom/client';
import Routing from './Routing';
import './assets/css/customStyle.css';
import { ApplicationContextProvider } from './context/ApplicationContext'; 

const container = document.getElementById('root');
const root = ReactDom.createRoot(container);
root.render(
  <ApplicationContextProvider>
    <Routing />
  </ApplicationContextProvider>
);
