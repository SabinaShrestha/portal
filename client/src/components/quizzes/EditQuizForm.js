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
  state = { name: '', quizType: '', dueDate: '', availableFrom: '', availableUntil: '', points: '', published: '' }
    
  componentDidMount() {
    const courseId = this.props.match.params.course_id
    const quizId = parseInt(this.props.match.params.quiz_id)
    this.props.dispatch(getQuiz(courseId, quizId))
    const { quiz } = this.props
    const editingQuiz = quiz.filter(q => q.id === quizId)
    const editQuiz = editingQuiz[0]
    this.setState({ name: editQuiz.name, quizType: editQuiz.quiz_type, dueDate: editQuiz.due_date, availableFrom: editQuiz.available_from, availableUntil: editQuiz.available_until, points: editQuiz.points, published: editQuiz.published })
  }
  
  handleSubmit = (e) => {
    const { name, quizType, dueDate, availableFrom, availableUntil, points, published } = this.state
    const { dispatch, history } = this.props
    const courseId = this.props.quiz.course_id
    const quizId = this.props.quiz.id
    let quiz = {name: name, quiz_type: quizType, due_date: dueDate, available_from: availableFrom, available_until: availableUntil, points: points, published: published }
    e.preventDefault()
    dispatch(updateQuiz( courseId, quizId, quiz, history ))
    // dispatch(getQuiz( courseId, quizId ))
  }
  
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }
  
  handleCheckChange = (e) => {
    const { published } = this.state;
    this.setState({published: !published});
  }
  
  render() {
    const { name, quizType, dueDate, availableFrom, availableUntil, points, published } = this.state
    return(
      <Container>
        <Header as="h2">Update Quiz</Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths='equal'>
            <Form.Input
              label='Quiz Title'
              name='name'
              defaultValue={name}
              required
              onChange={this.handleChange}
              width={8}
            />
            <Form.Input
              label='Quiz Type'
              name='quizType'
              defaultValue={quizType}
              placeholder='Quiz Type'
              required
              onChange={this.handleChange}
              width={8}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              label='Due Date'
              name='dueDate'
              value={dueDate}
              type='date'
              onChange={this.handleChange}
              width={16}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              label='Available Starting Date'
              placeholder='available starting'
              name='availableFrom'
              value={availableFrom}
              type='date'
              onChange={this.handleChange}
              width={6}
            />
            <Form.Input
              label='Unpublish Date'
              placeholder='Available until'
              name='availableUntil'
              value={availableUntil}
              type='date'
              onChange={this.handleChange}
              width={6}
            />
            <Form.Input
              label='Total Points'
              name='points'
              value={points}
              type='number'
              required
              onChange={this.handleChange}
              width={6}
            />
          </Form.Group>
          
            <Divider />
            <Form.Checkbox 
              label='Published'   
              onChange={this.handleCheckChange} 
              published={published} 
            />
          <Form.Group>
              <Divider />
              <Pointer>
                <CommonButton type='submit' onSubmit={this.handleSubmit}>
                  Edit
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
