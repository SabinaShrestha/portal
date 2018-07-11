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
  state = { quiz: {} }
    
  componentDidMount() {
    const courseId = this.props.match.params.course_id
    const quizId = this.props.match.params.quiz_id
    let editQuiz = this.props.quiz.filter(q => q.id === this.props.match.params.quiz_id)
    this.setState({quiz: editQuiz})
    debugger
    this.props.dispatch(getQuiz(courseId, quizId))
  }
  
  handleSubmit = (e) => {
    const { name, quiz_type, points, due_date, multiple_attempts, available_from, available_until, published } = this.state
    const { courseId } = this.props.quiz
    const { quizId } = this.props.quiz_id
    const { course, dispatch, toggleEdit } = this.props
    e.preventDefault()
    dispatch(updateQuiz(courseId, quizId, { name, quiz_type, points, due_date, multiple_attempts, available_from, available_until, published }))
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
    const { quiz } = this.state
    return(
      <Container>
        <Header as="h2">Update Quiz</Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths='equal'>
            <Form.Input
              label='Quiz Title'
              name='name'
              value={quiz.name}
              placceholder='${quiz.name}'
              required
              onChange={this.handleChange}
              width={8}
            />
            <Form.Input
              label='Quiz Type'
              name='quiz_type'
              value={quiz.quiz_type}
              placeholder='Quiz Type'
              required
              onChange={this.handleChange}
              width={8}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              label='Due Date'
              value={quiz.due_date}
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
              value={quiz.available_from}
              type='date'
              onChange={this.handleChange}
              width={6}
            />
            <Form.Input
              label='Unpublish Date'
              placeholder='Available until'
              name='available_until'
              value={quiz.available_until}
              type='date'
              onChange={this.handleChange}
              width={6}
            />
            <Form.Input
              label='Total Points'
              placeholder='Points'
              name='points'
              value={quiz.points}
              type='number'
              required
              onChange={this.handleChange}
              width={6}
            />
          </Form.Group>
          
            <Divider />
            <Form.Checkbox label='Published' onChange={this.handleCheckChange} published={quiz.published} />
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
