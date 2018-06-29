import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import CourseCard from './CourseCard'
import { Card, Container, Header } from 'semantic-ui-react';
import { CardPadding, CommonButton } from './styles/CommonStyles'
import CourseForm from './CourseForm'

class Courses extends React.Component {
  state = { showForm: false }

  toggleForm = () => {
    this.setState({ showForm: !this.state.showForm })
  }

  render() {
    const { showForm } = this.state
    return (
      <Fragment>
        <Container>
        { showForm ? 
          <Fragment>
            <Header> Add a course </Header>
            <CourseForm toggleForm={this.toggleForm}/>
          </Fragment>
          :
          <CommonButton type='button' onClick={this.toggleForm}>
            add a course
          </CommonButton>
        }
        </Container>
      </Fragment>
    )
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
