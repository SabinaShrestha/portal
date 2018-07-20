import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Form,
  Header,
  Button,
  Radio,
} from 'semantic-ui-react'
import {
  FormContainer, 
  CommonButton,
} from '../styles/CommonStyles'
import { addQuestion } from '../../reducers/quizQuestions';

class BooleanForm extends Component {
  state = { tfQuestion: '' }

  handleSubmit = (e) => {
    const { tfQuestion } = this.state
    const { dispatch, history } = this.props
    const quizId = this.props.quiz.id 
    const courseId = this.props.course.id 
    e.preventDefault()
    let body = tfQuestion 
    dispatch(addQuestion(courseId, quizId, body))
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  render() {
    const { tfQuestion } = this.state
    
    return(
      <div>
        <FormContainer textAlign='center'>
          <Header>
            Add a True or False Question
          </Header>
          
          <Form.Group>
            <Form.Input
              width={16}
              label='Question'
              name='tfQuestion'
              value={tfQuestion}
              placeholder='Enter Question:'
              required
              onChange={this.handleChange}
            />
            </Form.Group>
            <Form.Group>
            <Form.Field>
              <Radio
                label='True'
                name='truthy'
                defaultValue='true'
              />
            </Form.Field>
            <Form.Field>
              <Radio
                label='False'
                name='truthy'
                defaultValue='false'
              />
            </Form.Field>
          </Form.Group>

        
          <CommonButton type='submit' onclick={this.handleSubmit}>
            Submit
          </CommonButton>
          <Button onClick={this.props.toggleBooleanForm}>
            Cancel
          </Button>

        </FormContainer>
      </div>
    )
  }
}

export default connect()(BooleanForm)
