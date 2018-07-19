import React, { Fragment } from 'react'
import {
  Header,
  Table,
  Icon,
  Divider,
  Container,
  Dropdown,
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAssignments } from '../../reducers/assignments'
import AssignmentForm from './AssignmentForm'
import Permission from '../hoc/Permission'
import { CommonButton, Pointer } from '../styles/CommonStyles'
import moment from 'moment'
import { deleteAssignment, editAssignment } from '../../reducers/assignments'



class Assignments extends React.Component {
  state = { showForm: false, assignments: [] }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(getAssignments(this.props.match.params.course_id))
  }

  toggleForm = () => {
    this.setState({showForm: !this.state.showForm})
  }

  dropChange = (e, { value }, assignment) => {
    switch(value) {
      case 'delete':
        this.props.dispatch(deleteAssignment(assignment.course_id, assignment, this.props.history))
        break
      case 'publish':
        assignment.published = !assignment.published
        this.props.dispatch(editAssignment(assignment.course_id, assignment))
        break
      default:
    }
  }

  render() {
    const { showForm } = this.state
    const { assignments } = this.props
    const settings = [
      { key: 'delete', text: 'delete', value: 'delete' },
      { key: 'publish', text: 'publish', value: 'publish' }
    ]

    return(
      <Container>
          <Header as="h1" textAlign='center'>Assignments</Header>
          <Container textAlign="center">
            { showForm ?
              <Fragment>
                <AssignmentForm assignments={assignments} course_id={this.props.match.params.course_id} toggleForm={this.toggleForm}/>
              </Fragment>
              :
              <CommonButton type='button' onClick={this.toggleForm}>
                Add Assignment
              </CommonButton>
            }
          </Container>
          <Divider />
        <Table padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Points</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Description</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Due</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Published</Table.HeaderCell>
                <Permission type="staff">
                  <Table.HeaderCell textAlign='center'>Settings</Table.HeaderCell>
                </Permission>
            </Table.Row>
          </Table.Header>
        {assignments.map(assignment =>
          <Table.Body key={assignment.id}>
            <Table.Row>
              <Table.Cell width='4'>
                <Link to={`/courses/${assignment.course_id}/assignments/${assignment.id}`}>
                  <Icon name='file alternate'/>
                  {assignment.title}
                </Link>
              </Table.Cell>
              <Table.Cell textAlign='center'>
                {assignment.points}
              </Table.Cell>
              <Table.Cell textAlign='center'>
                {assignment.description}
              </Table.Cell>
              <Table.Cell textAlign='center'>
                {moment(assignment.due_date).format('MM/DD/YYYY')}
              </Table.Cell>
              <Table.Cell textAlign='center'>
                {assignment.published === true && <Icon fitted name='check'/>}
              </Table.Cell>
              <Permission type="staff">
                <Table.Cell textAlign='center'>
                  <Pointer>
                    <Icon fitted name='setting' onClick={this.handleEdit} />
                    <Dropdown upward floating onChange={(e, obj) => this.dropChange(e, obj, assignment)}  options={settings} text=' ' />
                  </Pointer>
                </Table.Cell>
              </Permission>
            </Table.Row>
          </Table.Body>
          )
        }
        </Table>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return { assignments: state.assignments }
}

export default connect(mapStateToProps)(Assignments)
