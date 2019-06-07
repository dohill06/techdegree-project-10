import React from 'react';
import {
    BrowserRouter,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';



import Header from './components/Header';
import Courses from './components/Courses';

const App = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route exact path='/' render={() => <Redirect to='/courses' /> } />
                <Route exact path='/courses' component={Courses} />
            </Switch>
        </div>
    </BrowserRouter>
);


export default App;
