import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route, withRouter } from 'react-router-dom'
import { getCourses } from '../reducers/courses'
import { Flex } from './styles/CommonStyles'
import Courses from './Courses'
import Course from './Course'
import Quiz from './Quiz'
import Attendance from './Attendance'
import FetchCourse from './FetchCourse'
import CreateQuiz from './quizzes/CreateQuiz'
import QuizForm from './quizzes/QuizForm'
import CourseSettings from './CourseSettings'
import AllUnits from './AllUnits';
import Assignments from './Assignments'

class FetchCourses extends React.Component {
  componentDidMount() {
    this.props.dispatch(getCourses())
  }

  render() {
    const { location } = this.props
    const content = {}
    if (location.pathname === '/courses')
      content.justifyContent = 'center'
    return (
      <Switch>
        <Route exact path="/courses" component={Courses} />
        <FetchCourse>
          <Route exact path="/courses/:id" component={Course} />
          <Route exact path='/courses/:course_id/quizzes/:id' component={Quiz} />
          <Route exact path='/courses/:course_id/quiz_create/' component={CreateQuiz} />
          <Route exact path='/courses/:course_id/quiz_form/' component={QuizForm} />
          <Route exact path="/courses/:course_id/attendances/:id" component={Attendance} />
          <Route exact path="/courses/:course_id/settings" component={CourseSettings} />
          <Route exact path='/courses/:id/modules' component={AllUnits} />
          <Route exact path="/courses/:course_id/assignments" component={Assignments} />
        </FetchCourse>
      </Switch>
    )
  }
}

const mapStateToProps = (state) => {
  return { courses: state.courses }
}

export default withRouter(connect(mapStateToProps)(FetchCourses))
