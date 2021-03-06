import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Consumer, Context } from './Context';
import axios from 'axios';
import ValidationErrors from './ValidationErrors'

class UpdateCourse extends Component {

    state = {
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        validationErrors: [],
        user: {}
    };

// fire off methods at mount
    componentDidMount() {
        const { user } = this.context;
        this.setState({ user });
        this.getCourse();
    };

// method to retrieve course to be updated if course owner
    getCourse = async () => {
        axios.get(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
        .then(res => {
            const {
                title,
                description,
                estimatedTime,
                materialsNeeded,
                userId
            } = res.data.course;
            if (userId === this.state.user.id) {
                this.setState({
                    title,
                    description,
                    estimatedTime,
                    materialsNeeded
                });
            } else {
                this.props.history.push('/forbidden');
            }
        }).catch(err => {
            if (err.response.status === 404) {
                this.props.history.push('/notfound');
            } else if (err.response.status === 500) {
                this.props.history.push('/error');
            }
        });
    };

// method to update course if course owner
    updateCourse = user => {
        const {
            title,
            description,
            estimatedTime,
            materialsNeeded
        } = this.state;
        const {
            emailAddress,
            password
        } = user;
        axios({
            method: 'put',
            url: `http://localhost:5000/api/courses/${this.props.match.params.id}`,
            auth: {
                username: emailAddress,
                password
            },
            data: {
                title,
                description,
                estimatedTime,
                materialsNeeded
            }
        }).then(() => {
            this.props.history.push(`/courses/${this.props.match.params.id}`);
        }).catch(err => {
            this.setState({
                validationErrors: err.response.data.message
            });
        });
    };    

// method to take in user input
    onChange = e => {
        const {
            name,
            value
        } = e.target;
        this.setState({
            [name]: value
        });
    };

// method to submit form
    onSubmit = (e, user) => {
        e.preventDefault();
        this.updateCourse(user);
    };

// render with conditional validation error handling
    render() {
        const { title, description, estimatedTime, materialsNeeded } = this.state;
        return (
            <div className="bounds course--detail">
                <h1>Update Course</h1>
                <div>
                    {this.state.validationErrors.length === 0 ?
                        ('') :
                    (<ValidationErrors errors={this.state.validationErrors} />)
                    }                
                    <Consumer>
                        {({ user }) => (
                            <form onSubmit={e => {
                                this.onSubmit(e, user);
                            }}>
                                <div className="grid-66">
                                    <div className="course--header">
                                        <h4 className="course--label">Course</h4>
                                        <div>
                                            <input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." value={title} onChange={this.onChange}/>
                                        </div>
                                        <p>{`By ${user.firstName} ${user.lastName}`}</p>
                                    </div>
                                    <div className="course--description">
                                        <div>
                                            <textarea id="description" name="description" className="" placeholder="Course description..." value={description} onChange={this.onChange}></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid-25 grid-right">
                                    <div className="course--stats">
                                        <ul className="course--stats--list">
                                            <li className="course--stats--list--item">
                                                <h4>Estimated Time</h4>
                                                <div>
                                                    <input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" value={estimatedTime} onChange={this.onChange}/>
                                                </div>
                                            </li>
                                            <li className="course--stats--list--item">
                                                <h4>Materials Needed</h4>
                                                <div>
                                                    <textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." value={materialsNeeded} onChange={this.onChange}></textarea>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="grid-100 pad-bottom">
                                    <button className="button" type="submit">Update Course</button>
                                    <Link className="button button-secondary" to={`/courses/${this.props.match.params.id}`}>Cancel</Link>
                                </div>
                            </form>
                        )}
                    </Consumer>
                </div>
            </div>
        )
    };
}

// Context for lifecycle method
UpdateCourse.contextType = Context;

export default UpdateCourse;