import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route, withRouter } from 'react-router-dom'
import { getCourses } from '../reducers/courses'
import Courses from './Courses'
import Course from './Course'
import Quiz from './Quiz'
import Attendance from './Attendance'
import FetchCourse from './FetchCourse'
import { Flex } from './styles/CommonStyles'

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
      <div>
      <Flex {...content}>
        <Switch>
          <Route exact path="/courses" component={Courses} />
          <FetchCourse>
            <Route exact path="/courses/:id" component={Course} />
            <Route exact path='/courses/:course_id/quizzes/:id' component={Quiz} />
            <Route exact path='/courses/:course_id/attendances/:id' component={Attendance} />
          </FetchCourse>
        </Switch>
      </Flex>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { courses: state.courses }
}

export default withRouter(connect(mapStateToProps)(FetchCourses))
