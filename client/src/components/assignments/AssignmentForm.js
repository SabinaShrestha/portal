import React from 'react'
import { CommonButton, Pointer } from '../styles/CommonStyles'
import { connect } from 'react-redux'
import { addAssignment } from '../../reducers/assignments'
import {
  Header,
  Form,
  Divider,
  Container,
} from 'semantic-ui-react'


class AssignmentForm extends React.Component {
  state = { title: '', description: '', due_date: '', points: '', published: "false", submission_type: '', grade_type: '', unlocks_at: '', locks_at: '' }

handleSubmit = (e) => {
  const { dispatch, course_id, toggleForm } = this.props
  const { title, description, due_date, points, published, submission_type, grade_type, unlocks_at, locks_at } = this.state
  e.preventDefault()
  let assignment = { title: title, description: description, due_date: due_date, points: points, published: published, submission_type: submission_type, grade_type: grade_type, unlocks_at: unlocks_at, locks_at: locks_at }
  dispatch(addAssignment( course_id, assignment))
  toggleForm()
  this.props.assignments.push(assignment)
}

handleChange = ( e, { name, value }) => {
  this.setState({ [name]: value })
}

handleCheckChange = (e) => {
  const { published } = this.state
  this.setState({published: !published})
}


render(){
  const{ title, description, due_date, points, published, submission_type, grade_type, unlocks_at, locks_at } = this.state
  return(
    <Container>
      <Header as="h2">Create Assignment</Header>
      <Form onSubmit={this.handleSubmit}>
        <Form.Group widths='equal'>
          <Form.Input
            label='Assignment Title'
            name='title'
            value={title}
            placceholder='Assignment Title'
            autoFocus={"true"}
            required
            onChange={this.handleChange}
            width={8}
          />
          <Form.Input
            label='Description'
            name='description'
            value={description}
            placeholder='Description'
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
            label='Points'
            placeholder='Points'
            name='points'
            value={points}
            type='float'
            onChange={this.handleChange}
            width={6}
          />
          <Form.Input
            label='Grade_type'
            placeholder='Grade_type'
            name='grade_type'
            value={grade_type}
            onChange={this.handleChange}
            width={6}
          />
          <Form.Input
            label='Submission_type'
            placeholder='Submission_type'
            name='submission_type'
            value={submission_type}
            required
            onChange={this.handleChange}
            width={6}
          />
          <Form.Input
            label='Unlocks_at'
            placeholder='Unlocks_at'
            name='unlocks_at'
            value={unlocks_at}
            type='date'
            onChange={this.handleChange}
            width={6}
          />
          <Form.Input
            label='Locks_at'
            placeholder='Locks_at'
            name='locks_at'
            value={locks_at}
            type='date'
            onChange={this.handleChange}
            width={6}
          />
        </Form.Group>

          <Divider />
          <Form.Checkbox label='Published' name='published' onChange={this.handleCheckChange} published={published} />
        <Form.Group>
            <Divider />
            <Pointer>
            <CommonButton type='submit'>
              Create
            </CommonButton>
              <CommonButton type='submit' onClick={this.props.toggleForm}>
                Cancel
              </CommonButton>
            </Pointer>
        </Form.Group>
      </Form>
    </Container>
  )
}

}







export default connect()(AssignmentForm)
