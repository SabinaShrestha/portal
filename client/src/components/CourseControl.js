import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Segment, Header, Button } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { CommonButton, Flex } from './styles/CommonStyles'
import { deleteCourse, updateCourse } from '../reducers/courses'
import CourseCopyForm from './CourseCopyForm'

class CourseControl extends React.Component {
  state = { showConfirm: false, showCopyForm: false, msg: null, action: null }

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

  toggleCopyForm = () => {
    this.setState({ showCopyForm: !this.state.showCopyForm })
  }

  confirmElement = () => {
    const { msg, action = f => f } = this.state
    return (
      <Flex direction="column">
        <Header as="h1">{msg}</Header>
        <Button 
          onClick={this.toggleConfirm}
        >
          Cancel
        </Button> 
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
    const { showConfirm, showCopyForm } = this.state

    return (
      <Segment color="red">
        <Flex 
          direction="column" 
          justifyContent='space-around' 
          height="50vh"
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
              {!showCopyForm ? 
              <Fragment>
                <Header as="h1">
                  Course Controls
                </Header>
                  <CommonButton
                    size="massive"
                    onClick={this.toggleCopyForm}
                  >
                    Copy Course
                  </CommonButton>
                  <CommonButton 
                    size="massive"
                    onClick={this.publishCourse}
                  >
                    { course.published ? 'Unpublish' : 'Publish' } Course
                  </CommonButton>
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
                </Fragment> : null }
                {showCopyForm ? 
                  <Fragment>
                    <CommonButton size="small" onClick={this.toggleCopyForm}>Cancel</CommonButton>
                    <CourseCopyForm toggleCopyForm={this.toggleCopyForm}/>
                  </Fragment> : null }
            </Fragment>
          }
        </Flex>
      </Segment>
    )
  }
}

const mapStateToProps = (state) => {
  return { course: state.course }
}

export default withRouter(connect(mapStateToProps)(CourseControl))

