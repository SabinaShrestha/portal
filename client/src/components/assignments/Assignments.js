import React, { Fragment } from 'react'
import {
  Header,
  Table,
  Icon,
  Divider,
  Container,
} from 'semantic-ui-react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { setHeaders } from '../../reducers/headers'
import AssignmentForm from './AssignmentForm'
import Permission from '../hoc/Permission'
import { CommonButton, Pointer } from '../styles/CommonStyles'


class Assignments extends React.Component {
  state = { showForm: false, assignments: [] }

  componentDidMount() {
    axios.get(`/api/courses/${this.props.match.params.course_id}/assignments`)
      .then( res => {
        this.props.dispatch(setHeaders(res.headers))
        this.setState({ assignments: res.data } )
      })
  }

  toggleEdit = () => {
  }

  toggleForm = () => {
    this.setState({showForm: !this.state.showForm})
  }

  render() {
    const {showForm, assignments} = this.state
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
        <Table cell padded>
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
                {assignment.due_date}
              </Table.Cell>
              <Table.Cell textAlign='center'>
                {assignment.published === true && <p>Published</p>}
              </Table.Cell>
              <Permission type="staff">
                <Table.Cell textAlign='center'>
                  <Pointer>
                      <Icon fitted name='setting' onClick={this.handleEdit} />
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


export default connect()(Assignments)