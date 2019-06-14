import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Consumer } from './Context';
import axios from 'axios';

class UpdateCourse extends Component {
    state = {
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: ''
    }

    componentDidMount() {
        this.getCourse();
    };

    getCourse = () => {
        axios.get(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
        .then(res => {
            const {
                title,
                description,
                estimatedTime,
                materialsNeeded
            } = res.data.course;
            this.setState({
                title,
                description,
                estimatedTime,
                materialsNeeded
            });
            console.log(res.data);
            console.log(this.state);
        }).catch(err => {
            console.log(err.response);
        })
    }

        onChange = e => {
            const {
                name,
                value
            } = e.target;
            this.setState({
                [name]: value
            });
            console.log(name, value);
        };

    render() {
        const { title, description, estimatedTime, materialsNeeded } = this.state;
        return (
            <div className="bounds course--detail">
                <h1>Update Course</h1>
                <div>
                    <form>
                        <div className="grid-66">
                            <div className="course--header">
                                <h4 className="course--label">Course</h4>
                                <div>
                                    <input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." defaultValue={title} onChange={this.onChange}/>
                                </div>
                                <p>By Joe Smith</p>
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
                                            <input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" defaultValue={estimatedTime} onChange={this.onChange}/>
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
                </div>
            </div>
        )
    };
}

export default UpdateCourse;