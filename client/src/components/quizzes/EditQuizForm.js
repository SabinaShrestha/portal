import React, { Component } from 'react'
import {
  Form, 
  Container, 
  Divider,
  Header,
} from 'semantic-ui-react'
import { CommonButton, Pointer } from '../styles/CommonStyles'
import { connect } from 'react-redux'
import { getQuiz, updateQuiz } from '../../reducers/quiz'

class EditQuizForm extends Component {
  state = { quizTitle: '', quizType: '', due_date: '', points: '', available_from: '', unpublish_date: '', published: "false" }

  componentDidMount() {
    debugger
    const { quizTitle, quizType, due_date, points, available_from, unpublished_date, published } = this.props.quiz
    const courseId = this.props.match.params.course_id
    const quizId = this.props.quiz_id
    this.props.dispatch(getQuiz(courseId, quizId))
    this.setState({ quizTitle, quizType, due_date, points, available_from, unpublished_date, published })
  }
  
  handleSubmit = (e) => {
    const { quizTitle, quizType, due_date, points, available_from, unpublished_date, published } = this.state
    const { courseId } = this.props.quiz
    const { quizId } = this.props.quiz_id
    const { course, dispatch, toggleEdit } = this.props
    e.preventDefault()
    dispatch(updateQuiz(courseId, quizId, { quizTitle, quizType, due_date, points, available_from, unpublished_date, published }))
    dispatch(getQuiz( courseId, quizId ))
    toggleEdit()
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  handleCheckChange = (e) => {
    const { published } = this.state;
    this.setState({published: !published});
  }

  render() {
    const { quizTitle, quizType, due_date, points, available_from, unpublish_date, published } = this.state
    return(
      <Container>
        <Header as="h2">Update Quiz</Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths='equal'>
            <Form.Input
              label='Quiz Title'
              name='quizTitle'
              value={quizTitle}
              placceholder='Quiz Title'
              autoFocus={"true"}
              required
              onChange={this.handleChange}
              width={8}
            />
            <Form.Input
              label='Quiz Type'
              name='quizType'
              value={quizType}
              placeholder='Quiz Type'
              required
              onChange={this.handleChange}
              width={8}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              label='Due Date'
              value={due_date}
              name='due_date'
              type='date'
              onChange={this.handleChange}
              width={12}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              label='Available Starting Date'
              placeholder='available starting'
              name='available_from'
              value={available_from}
              type='date'
              onChange={this.handleChange}
              width={6}
            />
            <Form.Input
              label='Unpublish Date'
              placeholder='Available until'
              name='unpublish_date'
              value={unpublish_date}
              type='date'
              onChange={this.handleChange}
              width={6}
            />
            <Form.Input
              label='Total Points'
              placeholder='Points'
              name='points'
              value={points}
              type='number'
              required
              onChange={this.handleChange}
              width={6}
            />
          </Form.Group>
          
            <Divider />
            <Form.Checkbox label='Published' onChange={this.handleCheckChange} published={published} />
          <Form.Group>
              <Divider />
              <Pointer>
                <CommonButton type='submit' onSubmit={this.handleSubmit}>
                  Edit
                </CommonButton>
                <CommonButton onClick={this.props}>
                  Cancel Editing
                </CommonButton>
              </Pointer>
          </Form.Group>
        </Form>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    quiz: state.quiz, 
    course: state.course
  }
}

export default connect(mapStateToProps)(EditQuizForm)
