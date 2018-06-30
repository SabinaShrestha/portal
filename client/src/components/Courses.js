import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import CourseCard from './CourseCard'
import { Card, Header } from 'semantic-ui-react'
import { CommonButton, Flex } from './styles/CommonStyles'
import CourseForm from './CourseForm'
import Permission from './hoc/Permission'

class Courses extends React.Component {
  state = { showForm: false }

  toggleForm = () => {
    this.setState({ showForm: !this.state.showForm })
  }

  renderCourses = () => {
    const { courses } = this.props
    return courses.map( course =>
      <CourseCard key={ course.id } course={ course } />
    )
  }

  render() {
    const { showForm } = this.state
    return (
      <Fragment>
        <Card.Group stackable centered itemsPerRow={4}>
          { this.renderCourses() }
        </Card.Group>

        <Permission type="admin">
          <Flex alignSelf="flex-end">
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
          </Flex>
        </Permission>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return { courses: state.courses }
}

export default connect(mapStateToProps)(Courses)

