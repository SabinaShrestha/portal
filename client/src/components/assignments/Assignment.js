import React from 'react'
import axios from 'axios'
import { setHeaders } from '../../reducers/headers'
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

class Assignment extends React.Component {
  state = { assignment: '', editForm: false }

  componentDidMount(){
    const courseId = this.props.match.params.course_id
    const id = this.props.match.params.id
    axios.get(`/api/courses/${courseId}/assignments/${id}`)
      .then( res => {
        this.props.dispatch(setHeaders(res.headers))
        this.setState({ assignment: res.data } )
      })
  }

  // componentDidUpdate(){
  //   const courseId = this.props.match.params.course_id
  //   const id = this.props.match.params.id
  //   axios.get(`/api/courses/${courseId}/assignments/${id}`)
  //     .then( res => {
  //       this.props.dispatch(setHeaders(res.headers))
  //       this.setState({ assignment: res.data } )
  //     })
  // }

  toggleForm = (state) => {
    this.setState({editForm: !this.state.editForm})
  }

 render() {
   const { assignment, editForm } = this.state
   return(
    <Flex>
      { editForm ? 
      <AssignmentForm toggleForm={this.toggleForm} assignment={assignment}/>
      :
      <Container textAlign='center'>
        <Segment padded='very'>
          <Header as='h1' textAlign='center'>
            {assignment.title}
            <CommonButton floated='right' onClick={this.toggleForm}> Edit Assignment </CommonButton>
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
        </Segment>
      </Container>
      }
    </Flex>
   )
 }

}


export default connect()(Assignment)