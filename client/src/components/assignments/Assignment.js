import React from 'react'
import { connect } from 'react-redux'
import {
  Header,
  Segment,
  Container,
  Divider,
  Icon,
} from 'semantic-ui-react'
import moment from 'moment'
import { Flex, CommonButton } from '../styles/CommonStyles'
import AssignmentForm from './AssignmentForm'
import { getAssignments, deleteAssignment } from '../../reducers/assignments'
import Permission from '../hoc/Permission'
import SubmissionForm from './SubmissionForm'

class Assignment extends React.Component {
  state = { editForm: false, submissionForm: false }

  toggleForm = (state) => {
    this.setState({ editForm: !this.state.editForm })
  }

  toggleSubmissionForm = () => {
    this.setState({ submissionForm: !this.state.submissionForm })
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(getAssignments(this.props.match.params.course_id))
  }


  render() {
    const { assignment = {}, dispatch } = this.props
    const { editForm, submissionForm } = this.state
    return (
      <Flex>
        {editForm ?
          <AssignmentForm assignment={assignment} course_id={this.props.match.params.course_id} toggleForm={this.toggleForm} />
          :
          <div>
            <Flex justifyContent='flex-end'>
              <Permission type='admin'>
                <CommonButton floated='right' onClick={this.toggleForm}>Edit</CommonButton>
                <CommonButton floated='right' onClick={() => dispatch(deleteAssignment(this.props.match.params.course_id, assignment, this.props.history))}>Delete</CommonButton>
              </Permission>
                <CommonButton floated='right' onClick={this.toggleSubmissionForm}>Submit</CommonButton>
            </Flex>
            <Divider hidden />
            <Container textAlign='center'>
              <Segment padded='very'>
                <Header as='h1' textAlign='center'>
                  {assignment.title}
                </Header>
                <Divider />
                <Segment as='h3'>
                  Description: {assignment.description}
                </Segment>
                <p>Points: {assignment.points}</p>
                <p>Submission Type: {assignment.submission_type}</p>
                <p>Grade Type: {assignment.grade_type}</p>
                <p>Due Date: {moment(assignment.due_date).format('MM/DD/YYYY')}</p>
                <Container>
                  <p>Unlocks: {moment(assignment.unlocks_at).format('MM/DD/YYYY')} - Locks: {moment(assignment.locks_at).format('MM/DD/YYYY')}</p>
                  <p>published: {assignment.published && <Icon disabled name='check' />}</p>
                </Container>
                <Container fluid>
                { submissionForm && <SubmissionForm assignment={ assignment } toggleSubmissionForm={this.toggleSubmissionForm} />}
                </Container>
              </Segment>
            </Container>
          </div>
        }
      </Flex>
    )
  } 
}

const mapStateToProps = (state, props) => {
  return { assignment: state.assignments.find( a => a.id === parseInt(props.match.params.id, 10 )) }
}

export default connect(mapStateToProps)(Assignment)
