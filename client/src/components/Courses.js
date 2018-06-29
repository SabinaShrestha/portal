import React from 'react'
import { connect } from 'react-redux'
import CourseCard from './CourseCard'
import { Card } from 'semantic-ui-react';
import { CardPadding } from './styles/CommonStyles'


class Courses extends React.Component {
  render() {
    return null
  }
  renderCourses = () => {
    const { courses } = this.props
    return courses.map( course =>
      <CourseCard key={ course.id } course={ course } />
    )
  }

  render() {
    return (
      <div class='ui three centered cards'>
      <Card.Group stackable columns='3'>
        { this.renderCourses() }
      </Card.Group>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { courses: state.courses }
}

export default connect(mapStateToProps)(Courses)
