import React from 'react'
import { CommonButton, Flex} from '../styles/CommonStyles'
import { connect } from 'react-redux'
import {
  Header,
  Form,
  Divider,
  Container,
  Button,
} from 'semantic-ui-react'
import {addSubmission} from '../../reducers/submissions'

class SubmissionForm extends React.Component {
  state = {
    sub_type: {
      url: '',
      file: '',
    },
    date_submitted: '',
  }

  componentDidMount(){
    if (this.props.assignment)
      this.setState({...this.props.assignment})
  }

  handleChange = ( e, { name, value }) => {
    this.setState({ [name]: value })
  }

  handleSubmit = (e) => {
    const { dispatch, assignment, toggleSubmissionForm } = this.props
    e.preventDefault()
    let submission = {...this.state}
    dispatch(addSubmission( assignment.course_id, submission ))
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
            value={sub_type.file}
            placeholder='Submission Type'
            autoFocus={"true"}
            onChange={this.handleChange}
            width={8}
            type="file"
          />
        </Flex>
        <Header as='h3'>Or</Header>
        <Flex justifyContent='center'>
          <Form.Input
            name='sub_type'
            value={sub_type.url}
            placeholder='URL'
            onChange={this.handleChange}
            width={8}
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
