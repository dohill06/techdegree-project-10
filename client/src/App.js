import React from 'react';
import {
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom';



import Header from './components/Header';
import Courses from './components/Courses';

const App = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Courses />
        </div>
    </BrowserRouter>
);


export default App;
