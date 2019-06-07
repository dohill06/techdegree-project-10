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
            <Switch>
                <Courses />
            </Switch>
        </div>
    </BrowserRouter>
);


export default App;
