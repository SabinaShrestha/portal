import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { setCourse, clearCourse } from '../reducers/course'
import { Flex } from './styles/CommonStyles'
import CourseNavs from './CourseNavs'

class FetchCourse extends React.Component {
  componentDidMount() {
    const { location: { pathname }, courses, dispatch } = this.props
    const id = pathname.split('courses/')[1]
    const activeCourse = courses.find( c => c.id === parseInt(id, 10) ) || {}
    dispatch(setCourse(activeCourse)) 
  }

  componentDidUpdate(prevProps) {
    const { location: { pathname }, course, courses, dispatch } = this.props
    const id = pathname.split('courses/')[1]
    const prevId = prevProps.location.pathname.split('courses/')[1]
    const courseId = parseInt(id, 10)
    if (prevId !== id || course.id !== courseId) {
      const activeCourse = courses.find( c => c.id === courseId )
      if (activeCourse)
        dispatch(setCourse(activeCourse)) 
    }
  }

  componentWillUnmount() {
    this.props.dispatch(clearCourse)
  }

  render() {
    return (
      <Flex>
        <CourseNavs />
        { this.props.children }
      </Flex>
    )
  }
}

const mapStateToProps = (state, props) => {
  return { course: state.course, courses: state.courses }
}

export default withRouter(connect(mapStateToProps)(FetchCourse))
