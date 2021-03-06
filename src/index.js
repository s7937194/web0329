import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '../node_modules/normalize.css/normalize.css';
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import MyNFT from "./page/MyNFT/MyNFT";
import { light } from "./styles/Themes";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Market from "./page/Market/Market";
import { MoralisProvider } from "react-moralis"
import './styles/globals.css'

const APP_ID = process.env.REACT_APP_MORALIS_APPLICATION_ID;
const SERVER_URL = process.env.REACT_APP_MORALIS_SERVER_URL;

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider serverUrl={SERVER_URL} appId={APP_ID}>
      <BrowserRouter>
        <GlobalStyles />
        <ThemeProvider theme={light}>
        <Navigation />
        <Routes>
            <Route exact path="/Market" element={<Market/>}/>
            <Route exact path="/MyNFT" element={<MyNFT/>}/>
            <Route exact path="/" element={<App/>}/>
        </Routes>
        <Footer />
        </ThemeProvider>
      </BrowserRouter>
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
