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
import UpdateCourse from './components/UpdateCourse';
import UserSignOut from './components/UserSignOut';
import PrivateRoute from './components/PrivateRoute';

const App = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route exact path='/' component={Courses} />
                <PrivateRoute path='/courses/create' component={CreateCourse} />
                <PrivateRoute path='/courses/:id/update' component={UpdateCourse} />
                <Route exact path='/courses/:id' component={CourseDetail} />
                <Route path='/signin' component={UserSignIn} />
                <Route path='/signup' component={UserSignUp} />
                <Route path='/signout' component={UserSignOut} />
            </Switch>
        </div>
    </BrowserRouter>
);


export default App;
