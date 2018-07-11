import React, { Component } from 'react'
import {
  Form, 
  Container, 
  Divider,
  Header,
} from 'semantic-ui-react'
import { CommonButton, Pointer } from '../styles/CommonStyles'
import { connect } from 'react-redux'
import { addQuiz } from '../../reducers/quiz'

class QuizForm extends Component {
  state = { quizTitle: '', quizType: '', due_date: '', points: '', available_from: '', unpublish_date: '', published: "false" }

  handleSubmit = (e) => {
    const { history, dispatch } = this.props
    const courseId  = this.props.match.params.course_id
    const { quizTitle, quizType, due_date, points, available_from, unpublished_date, published } = this.state
    e.preventDefault()
    let quiz = { name: quizTitle, quiz_type: quizType, due_date: due_date, points: points, available_from: available_from, available_until: unpublished_date, published: published}
    dispatch(addQuiz( courseId, quiz, history))
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
        <Header as="h2">Create Quiz</Header>
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
                  Create
                </CommonButton>
              </Pointer>
          </Form.Group>
        </Form>
      </Container>
    )
  }
}

export default connect()(QuizForm)
