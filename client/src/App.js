import React from 'react';
import {
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom';



import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';

const App = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route exact path='/' component={Courses} />
                <Route exact path='/courses/:id' component={CourseDetail} />
                <Route path='/signin' component={UserSignIn} />
            </Switch>
        </div>
    </BrowserRouter>
);


export default App;
