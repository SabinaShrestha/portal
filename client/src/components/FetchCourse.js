import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { setCourse, clearCourse } from '../reducers/course'
import { Flex, CourseContainer } from './styles/CommonStyles'
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
    const id = parseInt(pathname.split('courses/')[1], 10)
    const prevId = parseInt(prevProps.location.pathname.split('courses/')[1], 10)
    if (prevId !== id || course.id !== id) {
      const activeCourse = courses.find( c => c.id === id )
      if (activeCourse)
        dispatch(setCourse(activeCourse)) 
    }
  }

  componentWillUnmount() {
    this.props.dispatch(clearCourse())
  }

  render() {
    return (
      <Flex full>
        <CourseNavs />
        <CourseContainer>
          { this.props.children }
        </CourseContainer>
      </Flex>
    )
  }
}

const mapStateToProps = (state, props) => {
  return { course: state.course, courses: state.courses }
}

export default withRouter(connect(mapStateToProps)(FetchCourse))
