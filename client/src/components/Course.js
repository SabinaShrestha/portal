import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { setCourse, clearCourse } from '../reducers/course'
import CourseNavs from './CourseNavs'

class Course extends React.Component {
  componentDidMount() {
    const { course, dispatch } = this.props
    if (course.id)
      dispatch(setCourse(course))
  }

  componentDidUpdate(prevProps) {
    const { course, dispatch } = this.props
    if (prevProps.course.id !== course.id)
      dispatch(setCourse(course))
  }

  componentWillUnmount() {
    this.props.dispatch(clearCourse())
  }

  render() {
    return (
      <Fragment>
        <CourseNavs />
      </Fragment>
    )
  }
}

const mapStateToProps = (state, props) => {
  const { match: { params: { id }} } = props
  const { courses } = state
  const course = courses.find( c => c.id === parseInt(id, 10) ) || {}
  return { course }
}

export default connect(mapStateToProps)(Course)
