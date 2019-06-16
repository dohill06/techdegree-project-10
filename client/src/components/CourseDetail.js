import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Consumer } from './Context';
import axios from 'axios';


class CourseDetail extends Component {

    state = {
        course: {},
        user: ''
    };

    componentDidMount() {
        this.getCourse();
    };

    getCourse = () => {
        axios.get(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
        .then(res => {
            const { course } = res.data;
            this.setState({
                course,
                user: `${course.User.firstName} ${course.User.lastName}`                
            });
        }).catch(err => {
            if (err.response.status === 404) {
                this.props.history.push('/notfound');
            } else if (err.response.status === 500) {
                this.props.history.push('/error');
            }
            console.log(err.response.status)
        });
    };

    deleteCourse = (user) => {
        const { emailAddress, password } = user;
        axios({
            method: 'delete',
            url: `http://localhost:5000/api/courses/${this.state.course.id}`,
            auth: {
                username: emailAddress,
                password
            }
        }).then(() => {
            this.props.history.push('/');
        }).catch(err => {
            console.log(err);
        });
    };

    render() {
        return (
            <div>
                <div className="actions--bar">
                    <div className="bounds">
                        <div className="grid-100">
                        <Consumer>
                            {({ user }) =>
                                user.id && user.id === this.state.course.userId
                                ? (
                                    <span>
                                        <Link className="button" to={`/courses/${this.state.course.id}/update`}>Update Course</Link>
                                        <button className="button" onClick={() => this.deleteCourse(user)}>Delete Course</button>
                                    </span>
                                ) : (
                                    ''
                                )
                            }       
                        </Consumer>                        
                        <Link className="button button-secondary" to='/'>Return to List</Link>
                        </div>
                    </div>
                </div>
                <div className="bounds course--detail">
                    <div className="grid-66">
                        <div className="course--header">
                            <h4 className="course--label">Course</h4>
                            <h3 className="course--title">{this.state.course.title}</h3>
                            <p>By {this.state.user}</p>
                        </div>
                        <div className="course--description">
                            <ReactMarkdown source={this.state.course.description} />
                        </div>
                    </div>
                    <div className="grid-25 grid-right">
                        <div className="course--stats">
                            <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    <h3>{this.state.course.estimatedTime}</h3>
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>                                   
                                    <ReactMarkdown source={this.state.course.materialsNeeded} />                                    
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
}

export default CourseDetail;