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
import UserSignUp from './components/UserSignUp';
import CreateCourse from './components/CreateCourse';

const App = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route exact path='/' component={Courses} />
                <Route exact path='/courses/:id' component={CourseDetail} />
                <Route path='/courses/create' component={CreateCourse} />
                <Route path='/signin' component={UserSignIn} />
                <Route path='/signup' component={UserSignUp} />
            </Switch>
        </div>
    </BrowserRouter>
);


export default App;
