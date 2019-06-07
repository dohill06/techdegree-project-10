import React, {Component} from 'react';
import axios from 'axios';

class Courses extends Component{

    state = {
        courses: []
    };

    componentDidMount() {
        this.getCourses();
    };

    getCourses = () => {
        axios.get('http://localhost:5000/api/courses')
        .then(res => {
            this.setState(res.data);
        })
        .catch(err => {
            console.log('Error', err)
        });
    };

    render() {
        return (
            <div className="bounds">
                {this.state.courses.map(course => (
                    <div className="grid-33" key={course.id}>
                        <a className="course--module course--link" href="course-detail.html">
                            <h4 className="course--label">Course</h4>
                            <h3 className="course--title">{course.title}</h3>
                        </a>
                    </div>
                ))}
            </div>
        )
    };
}

export default Courses;