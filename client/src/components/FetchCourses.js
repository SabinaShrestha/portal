import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route, withRouter } from 'react-router-dom'
import { getCourses } from '../reducers/courses'
import Courses from './Courses'
import Course from './Course'
import Attendance from './Attendance'
import Quiz from './quizzes/Quiz'
import FetchCourse from './FetchCourse'
import BuildQuiz from './quizzes/BuildQuiz'
import QuizForm from './quizzes/QuizForm'
import EditQuizForm from './quizzes/EditQuizForm'
import CourseSettings from './CourseSettings'
import Units from './Units'
import Assignments from './assignments/Assignments'
import Assignment from './assignments/Assignment'
import Wikis from './Wikis'
import People from './People'


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
          <Route exact path='/courses/:course_id/quizzes' component={Quiz} />
          <Route exact path='/courses/:course_id/quiz_create/' component={BuildQuiz} />
          <Route exact path='/courses/:course_id/quiz_form/' component={QuizForm} />
          <Route exact path='/courses/:course_id/edit_quiz/:quiz_id' component={EditQuizForm} />
          <Route exact path="/courses/:course_id/attendances/:id" component={Attendance} />
          <Route exact path="/courses/:course_id/settings" component={CourseSettings} />
          <Route exact path='/courses/:course_id/modules' component={Units} />
          <Route exact path="/courses/:course_id/assignments" component={Assignments} />
          <Route exact path="/courses/:course_id/assignments/:id" component={Assignment} />
          <Route exact path="/courses/:course_id/wiki" component={Wikis} />
          <Route exact path="/courses/:course_id/people" component={People} />
        </FetchCourse>
      </Switch>
    )
  }
}

const mapStateToProps = (state) => {
  return { courses: state.courses }
}

export default withRouter(connect(mapStateToProps)(FetchCourses))
