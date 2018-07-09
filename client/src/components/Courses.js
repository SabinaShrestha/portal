import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Card, Header } from 'semantic-ui-react'
import styled from 'styled-components'
import CourseForm from './CourseForm'
import CourseCard from './CourseCard'
import Permission from './hoc/Permission'
import AddCourseCard from './AddCourseCard'

const TopPad = styled.div`
  margin-top: 50px;
  width: 90%;
`

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
      <TopPad>
        { showForm ?
            <Permission type="admin">
              { showForm &&
                <Fragment>
                  <Header> Add a course </Header>
                  <CourseForm toggleForm={this.toggleForm}/>
                </Fragment>
              }
            </Permission>
            :
            <Card.Group stackable centered itemsPerRow={4}>
              { this.renderCourses() }
              <Permission type="admin">
                { !showForm && <AddCourseCard toggleForm={this.toggleForm} /> }
              </Permission>
            </Card.Group>
        }
      </TopPad>
    )
  }
}

const mapStateToProps = (state) => {
  return { courses: state.courses }
}

export default connect(mapStateToProps)(Courses)
