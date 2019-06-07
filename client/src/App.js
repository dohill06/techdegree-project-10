import React from 'react';
import {
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom';



import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';

const App = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route exact path='/' component={Courses} />
                <Route exact path='/courses/:id' component={CourseDetail} />
            </Switch>
        </div>
    </BrowserRouter>
);


export default App;
