import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
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
        axios.get(`http://localhost:5000/api${this.props.match.url}`)
        .then(res => {
            this.setState({
                course: res.data.course,
                user: `${res.data.course.User.firstName} ${res.data.course.User.lastName}`
            });
            console.log(res.data);
            console.log(this.state);
        })
    };

    render() {
        return (
            <div>
                <div className="actions--bar">
                    <div className="bounds">
                        <div className="grid-100">
                        <span>
                            <Link className="button" to={`/courses/${this.state.course.id}/update`}>Update Course</Link>
                            <Link className="button" to="delete-course.html">Delete Course</Link>
                        </span>                        
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
                                    <ul>
                                        <ReactMarkdown source={this.state.course.materialsNeeded} />
                                    </ul>
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