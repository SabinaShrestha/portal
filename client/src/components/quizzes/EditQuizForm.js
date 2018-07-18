import React, { Component, Fragment } from 'react'
import {
  Form, 
  Container, 
  Divider,
  Header,
  Button,
} from 'semantic-ui-react'
import { CommonButton, Pointer, Flex } from '../styles/CommonStyles'
import { connect } from 'react-redux'
import { 
  getQuizzes, 
  getQuiz, 
  updateQuiz, 
  cancelQuiz, 
  deleteQuiz
} from '../../reducers/quiz'
import moment from 'moment'
import BooleanForm from './BooleanForm'

class EditQuizForm extends Component {
  state = { booleanForm: false, multipleForm: false, essayForm: false, quiz: { name: '', quizType: '', dueDate: moment(), availableFrom: moment(), availableUntil: moment(), points: '', published: '' } }
    
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
    const { name, quizType, dueDate, availableFrom, availableUntil, points, published } = this.state.quiz
    const { dispatch, history } = this.props
    const courseId = this.props.quiz.course_id
    const quizId = this.props.quiz.id
    let quiz = {name: name, quiz_type: quizType, due_date: dueDate, available_from: availableFrom, available_until: availableUntil, points: points, published: published }
    e.preventDefault()
    dispatch(updateQuiz( courseId, quizId, quiz, history ))
    dispatch(getQuizzes( courseId ))
  }
  
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  handleDropdownChange = (e, data) => {
    this.setState({quizType: data.value})
  }
  
  handleCheckChange = (e) => {
    const { published } = this.state.quiz;
    this.setState({published: !published});
  }

  handleCancel = () => {
    const{ dispatch, history } = this.props
    const courseId = this.props.match.params.course_id
    dispatch(cancelQuiz( courseId, history ))
  }

  handleDelete = () => {
    const{ dispatch, history, quiz } = this.props
    const courseId = parseInt(this.props.match.params.course_id)
    dispatch(deleteQuiz( quiz, courseId, history ))
  }

  formatDate = (date) => {
    const offset = (new Date()).getTimezoneOffset()/60
    return moment(date).utc().subtract(offset, 'hours').format('YYYY-MM-DD')
  }

  toggleBooleanForm = () => {
      console.log('Boolean Form')
      this.setState({booleanForm: !this.state.booleanForm})
    }

  toggleEssayForm = () => {
    console.log('Essay Form')
    this.setState({essayForm: !this.state.essayForm})
    //TODO build the essay form component and render here
  }

  toggleMultipleForm = () => {
    console.log('MultipleChoiceForm')
    this.setState({multipleForm: !this.state.multipleForm})
    // TODO build the multiple choice form componeent and rnder here. 
  }
  
  render() {
    const { showBoolean } = this.state.booleanForm
    const { showEssay } = this.state.essayForm 
    const { showMultiple } = this.state.multipleForm 
    const { name, quizType, dueDate, availableFrom, availableUntil, points, published } = this.state.quiz
    const quizTypeOption = [
      {
        text: 'Graded',
        value: 'Graded',
        name: 'Graded'
      },
      {
        text: 'Not Graded',
        value: 'Not Graded',
        name: 'Not Graded'
      }
    ]
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
            <Form.Dropdown
              selection 
              label='Quiz Type'
              value={quizType}
              placeholder='Quiz Type'
              required
              options={quizTypeOption}
              onChange={this.handleDropdownChange}
              width={8}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              label='Due Date'
              name='dueDate'
              value={this.formatDate(dueDate)}
              type='date'
              onChange={this.handleChange}
              width={16}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              label='Available Starting Date'
              name='availableFrom'
              value={this.formatDate(availableFrom)}
              type='date'
              onChange={this.handleChange}
              width={6}
            />
            <Form.Input
              label='Unpublish Date'
              name='availableUntil'
              value={this.formatDate(availableUntil)}
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
            <Flex justifyContent='flex-end'>
              <Form.Checkbox 
                label='Published'
                name='published'   
                onChange={this.handleCheckChange} 
                checked={!!published} 
              />
            </Flex>
              <Divider />
          <Form.Group>
            <Divider />
            <Pointer>
              <CommonButton type='submit' onSubmit={this.handleSubmit}>
                Edit
              </CommonButton>
              <Button type='button' onClick={this.handleCancel}>Cancel</Button>
              <Button type='button' onClick={this.handleDelete}>Delete Quiz</Button>
            </Pointer>
          </Form.Group>

            <Divider />

          <Form.Group>
            <Pointer>
              <Flex justifyContent="space-between">
              { showBoolean ? 
                <Fragment>
                  <BooleanForm quiz_id={this.props.quiz.id} toggleForm={this.toggleBooleanForm} />
                </Fragment>
                :
                <CommonButton type='button' onClick={this.toggleBooleanForm}>
                  Add Boolean Question
                </CommonButton>      
              }
                <CommonButton type='button' onClick={this.toggleEssayForm}>
                  Add Essay Question
                </CommonButton>

                <CommonButton type='button' onClick={this.toggleMultipleForm}>
                  Add Mulitiple Choice 
                </CommonButton>
              </Flex>
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
