import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Segment, Header } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { CommonButton, FullWidth, Flex } from './styles/CommonStyles'
import { deleteCourse, updateCourse } from '../reducers/courses'

class CourseControl extends React.Component {
  state = { showConfirm: false, msg: null, action: null }

  launchConfirm = (msg, action) => {
    this.setState({ msg, action })
    this.toggleConfirm()
  }

  toggleConfirm = () => {
    this.setState( (state) => {
      const msg = state.showConfirm ? { msg: null, action: null } : {}
      return { showConfirm: !state.showConfirm, ...msg }
    })
  }

  confirmElement = () => {
    const { msg, action = f => f } = this.state
    return (
      <Flex direction="column">
        <Header as="h1">{msg}</Header>
        <CommonButton 
          onClick={this.toggleConfirm}
          color="gray"
        >
          Cancel
        </CommonButton> 
        <CommonButton 
          onClick={this[action]}
          color="red"
        >
          Confirm
        </CommonButton> 
      </Flex>
    )
  }

  deleteCourse = () => {
    this.toggleConfirm()
    const { course, dispatch, history } = this.props
    dispatch(deleteCourse(course.id))
    history.push('/courses')
  }

  concludeCourse = () => {
    const { course, dispatch } = this.props
    const courseObj = { ...course, concluded: !course.concluded }
    dispatch(updateCourse(courseObj))
    this.toggleConfirm()
  }

  publishCourse = () => {
    const { course, dispatch } = this.props
    const courseObj = { ...course, published: !course.published }
    dispatch(updateCourse(courseObj))
  }

  render() {
    const { course } = this.props
    const { showConfirm } = this.state
    return (
      <FullWidth>
          <Segment color="red">
            <Flex 
              direction="column" 
              justifyContent='space-around' 
              height="40vh"
            >
              { showConfirm ? 
                  <Fragment>
                    <Header as="h1" color="red">
                      Please Confirm
                    </Header>
                    { this.confirmElement() } 
                  </Fragment>
                  :
                  <Fragment>
                    <Header as="h1">
                      Course Controls
                    </Header>
                    <CommonButton 
                      size="massive"
                      onClick={this.publishCourse}
                    >
                      { course.published ? 'Unpublish' : 'Publish' } Course
                    </CommonButton>
                    <CommonButton size="massive">Copy Course</CommonButton>
                    <CommonButton 
                      size="massive"
                      onClick={ () => this.launchConfirm(`Do you really want to conclude/resume this course?`, 'concludeCourse') }
                    >
                      { course.concluded ? 'Resume' : 'Conclude' } Course
                    </CommonButton>
                    <CommonButton 
                      size="massive"
                      onClick={() => this.launchConfirm('Do you really want to delete this course?', 'deleteCourse') }
                    >
                      Delete Course
                    </CommonButton>
                  </Fragment>
              }
            </Flex>
          </Segment>
      </FullWidth>
    )
  }
}

const mapStateToProps = (state) => {
  return { course: state.course }
}

export default withRouter(connect(mapStateToProps)(CourseControl))

