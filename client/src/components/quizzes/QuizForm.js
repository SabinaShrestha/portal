import React, { Component } from 'react'
import {
  Form, 
  Button, 
  Container, 
  Divider,
  FormInput,
  Header,
} from 'semantic-ui-react'

class QuizForm extends Component {
  state = { quizTitle: '', due_date: '', points: '', published: false, checked: false }

  handleSubmit = (e) => {
    e.preventDefault()
  }

  handleChange = (e) => {
  }

  handleCheckChange = (e) => {
  }


  render() {
    const { quizTitle, due_date, points, checked } = this.state
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
              autoFocus={true}
              required
              onChange={this.handleChange}
            />
            <FormInput
              label='Due Date'
              value={due_date}
              name='due_date'
              type='date'
              onChange={this.handleChange}
            />
            <FormInput
              label='Total Points'
              placeholder='Points'
              name='points'
              value={points}
              type='number'
              required
              onChange={this.handleChange}
            />
          </Form.Group>
            <Divider />
          <Form.Checkbox label='Published?' onChange={this.handleCheckChange} checked={checked} />
            <Divider />
          <Form.Group>
            <Button basic type='submit'>Create</Button> 
          </Form.Group>
        </Form>
      </Container>
    )
  }
}

export default QuizForm

