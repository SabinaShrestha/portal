import React from 'react'
import { CommonButton, Pointer } from '../styles/CommonStyles'
import { connect } from 'react-redux'
import { addAssignment, editAssignment } from '../../reducers/assignments'
import {
  Header,
  Form,
  Divider,
  Container,
  Button,
  Grid,
} from 'semantic-ui-react'


class AssignmentForm extends React.Component {
  state = { title: '', description: '', due_date: '', points: '', published: false, submission_type: '', grade_type: '', unlocks_at: '', locks_at: '' }

  componentDidMount(){
    if (this.props.assignment)
      this.setState({...this.props})
  }

  handleSubmit = (e) => {
    const { dispatch, course_id, toggleForm } = this.props
    e.preventDefault()
    let assignment = {...this.state}
    const func = this.props.assignment ? editAssignment : addAssignment
    dispatch(func( course_id, assignment))
    toggleForm()
    if (func === addAssignment)
      this.props.assignments.push(assignment)
  }

  handleChange = ( e, { name, value }) => {
    this.setState({ [name]: value })
  }

  handleCheckChange = (e) => {
    const { published } = this.state
    this.setState({published: !published})
  }

  handleDropdownGrade = (e, data) => {
    this.setState({grade_type: data.value})
  }

  handleDropdownSubmission = (e, data) => {
    this.setState({submission_type: data.value})
  }


  render() {
    let stateOrProps
    { this.props.assignment ? (stateOrProps = this.props.assignment) : (stateOrProps = this.state) }
    const { title, description, due_date, points, published, unlocks_at, locks_at, submission_type, grade_type } = stateOrProps
    const gradeTypeOption = [
      {
        text: 'Graded',
        value: 'graded',
        name: 'graded'
      },
      {
        text: 'Not Graded',
        value: 'not_graded',
        name: 'not_graded'
      },
      {
        text: 'complete',
        value: 'complete',
        name: 'complete'
      },
      {
        text: 'Incomplete',
        value: 'incomplete',
        name: 'incomplete'
      },
      {
        text: 'Points',
        value: 'points',
        name: 'points'
      }
    ]
    const submissionTypeOption = [
      {
        text: 'No Submission',
        value: 'no_submission',
        name: 'no_submission'
      },
      {
        text: 'Online',
        value: 'online',
        name: 'online'
      },
      {
        text: 'On Paper',
        value: 'on_paper',
        name: 'on_paper'
      },
      {
        text: 'External Tool',
        value: 'external_tool',
        name: 'external_tool'
      }
    ]
    return(
      <Container>
        {this.props.assignment ?
          <Header as="h2">Edit Assignment</Header>
        :
          <Header as="h2">Create Assignment</Header>
        }
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
            </Form.Group>
            <Form.TextArea
              required
              label='Description'
              name='description'
              value={description}
              placeholder='Description'
              onChange={this.handleChange}
              width={16}
            />
            <Divider hidden />
          <Form.Group>
            <Form.Input
              label='Due Date'
              value={due_date}
              name='due_date'
              type='date'
              onChange={this.handleChange}
              width={4}
            />
            <Form.Input
              label='Points'
              placeholder='Points'
              name='points'
              value={points}
              type='float'
              onChange={this.handleChange}
              width={4}
            />
            <Form.Input
              label='Unlocks_at'
              placeholder='Unlocks_at'
              name='unlocks_at'
              value={unlocks_at}
              type='date'
              onChange={this.handleChange}
              width={4}
            />
            <Form.Input
              label='Locks_at'
              placeholder='Locks_at'
              name='locks_at'
              value={locks_at}
              type='date'
              onChange={this.handleChange}
              width={4}
            />
          </Form.Group>
          <Divider hidden />
            <Grid columns={2}>
              <Grid.Column width={8}>
                <Form.Dropdown
                  selection
                  label="Grade Type"
                  defaultValue={grade_type}
                  placeholder='Grade Type'
                  options={gradeTypeOption}
                  onChange={this.handleDropdownGrade}
                />
              </Grid.Column>
              <Grid.Column width={8}>
                <Form.Dropdown
                  selection
                  label="Submission Type"
                  defaultValue={submission_type}
                  placeholder='Submission Type'
                  options={submissionTypeOption}
                  onChange={this.handleDropdownSubmission}
                />
              </Grid.Column>
            </Grid>
            <Divider />
            <Form.Checkbox label='Published' name='published' onChange={this.handleCheckChange} published={published} />
          <Form.Group>
              <Divider />
              <Pointer>
              <CommonButton type='submit'>
                Save
              </CommonButton>
                <Button type='submit' onClick={this.props.toggleForm}>
                  Cancel
                </Button>
              </Pointer>
          </Form.Group>
        </Form>
      </Container>
    )
  }

}







export default connect()(AssignmentForm)