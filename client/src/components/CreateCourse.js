import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Consumer } from './Context';
import axios from 'axios';


class CreateCourse extends Component {
    state = {
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        error: {}
    }

    createCourse = user => {
        const {
            title,
            description,
            estimatedTime,
            materialsNeeded
        } = this.state;
        const {
            emailAddress,
            password,
        } = user;
        console.log(emailAddress)
        axios({
            method: 'post',
            url: 'http://localhost:5000/api/courses',
            auth: {
                username: emailAddress,
                password
            },
            data: {
                title,
                description,
                estimatedTime,
                materialsNeeded,
            }
        }).then(() => {
            this.props.history.push('/');
        }).catch(err => {
            console.log(err.response);
        });
    };

    onChange = e => {
    const { name, value } = e.target;
    this.setState({
        [name]: value
    });
    console.log(name, value);
    };

    onSubmit = (e, user) => {
        e.preventDefault();
        this.createCourse(user);
        console.log(user.password);
    };

    render() {
        return (
            <div className="bounds course--detail">
                <h1>Create Course</h1>
                <div>
                    <div>
                        <h2 className="validation--errors--label">Validation errors</h2>
                        <div className="validation-errors">
                            <ul>
                                <li>Please provide a value for "Title"</li>
                                <li>Please provide a value for "Description"</li>
                            </ul>
                        </div>
                    </div>
                    <Consumer>
                        {({ user }) => (
                            <form onSubmit={e => {this.onSubmit(e, user)}}>
                                <div className="grid-66">
                                    <div className="course--header">
                                        <h4 className="course--label">Course</h4>
                                        <div>
                                            <input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." onChange={this.onChange}/>
                                        </div>
                                        <p>{`By ${user.firstName} ${user.lastName}`}</p>
                                    </div>
                                    <div className="course--description">
                                        <div>
                                            <textarea id="description" name="description" className="" placeholder="Course description..." onChange={this.onChange}></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid-25 grid-right">
                                    <div className="course--stats">
                                        <ul className="course--stats--list">
                                            <li className="course--stats--list--item">
                                                <h4>Estimated Time</h4>
                                                <div>
                                                    <input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" onChange={this.onChange}/>
                                                </div>
                                            </li>
                                            <li className="course--stats--list--item">
                                                <h4>Materials Needed</h4>
                                                <div>
                                                    <textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." onChange={this.onChange}></textarea>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="grid-100 pad-bottom">
                                    <button className="button" type="submit">Create Course</button>
                                    <Link className="button button-secondary" to='/'>Cancel</Link>
                                </div>
                            </form>
                        )}
                    </Consumer>
                </div>
            </div>
        )
    };
}

export default CreateCourse;