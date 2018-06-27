import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { getCourses } from '../reducers/courses'
import Courses from './Courses'
import Course from './Course'
import Quiz from './Quiz'

class FetchCourses extends React.Component {
  componentDidMount() {
    this.props.dispatch(getCourses())
  }

  render() {
    return (
      <Switch>
        <Route exact path="/courses" component={Courses} />
        <Route exact path="/courses/:id" component={Course} />
        <Route exact path='/courses/:course_id/quizzes/:id' component={Quiz} />
      </Switch>
    )
  }
}

const mapStateToProps = (state) => {
  return { courses: state.courses }
}

export default connect(mapStateToProps)(FetchCourses)
