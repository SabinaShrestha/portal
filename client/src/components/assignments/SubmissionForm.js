import React from 'react'
import { CommonButton, Pointer, Flex} from '../styles/CommonStyles'
import { connect } from 'react-redux'
import {
  Header,
  Form,
  Divider,
  Container,
  Button,
} from 'semantic-ui-react'
import moment from 'moment'
import {addSubmission} from '../../reducers/submissions'

class SubmissionForm extends React.Component {
  state = {
    sub_type: '',
    due_date: '',
    date_submitted: '',
    grade_type: '',
  }

  componentDidMount(){
    if (this.props.assignment)
      this.setState({...this.props.assignment})
  }

  handleChange = ( e, { name, value }) => {
    this.setState({ [name]: value })
  }

  handleSubmit = (e) => {
    const { dispatch, course_id, toggleSubmissionForm } = this.props
    e.preventDefault()
    let submission = {...this.state}
    dispatch(addSubmission( course_id, submission ))
    toggleSubmissionForm()
  }
  
  render() {
    const { sub_type } = this.state
    return(
      <Container textAlign='center'>
      <Divider />
        <Form onSubmit={this.handleSubmit}>
        <Flex justifyContent='center'>
          <Form.Input
              label='Submission Type'
              name='sub_type'
              value={this.state.sub_type}
              placeholder='Submission Type'
              autoFocus={"true"}
              required
              onChange={this.handleChange}
              width={8}
              type="file"
          />
          </Flex>
          <Divider hidden />
            <CommonButton type="submit">Submit</CommonButton>
            <Button onClick={() => this.props.toggleSubmissionForm()}>Cancel</Button>
        </Form>
      </Container>
    )
  }
}
export default connect()(SubmissionForm)
