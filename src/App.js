import React from 'react';
import Routes from "./AmberRecruitment/Routes";
import './App.css';
//import 'bootstrap/dist/css/bootstrap.min.css'
//import 'mdbreact/dist/css/mdb.css';
import Navigation from './AmberRecruitment/Navigation/Navigation';


const App = () => {
        return (

            <div className="App">
                <Navigation />
                <Routes/>
            </div>

        );
    }

export default App;

