import React, { Component } from 'react'
import {
  Header,
  Grid,
  Icon,
  Divider,
} from 'semantic-ui-react'
import axios from 'axios'
import { connect } from 'react-redux'
import { setHeaders } from '../reducers/headers'


class Assignments extends Component {
  state = { assignments: [] }

  componentDidMount() {
    axios.get(`/api/courses/${this.props.match.params.course_id}/assignments`)
      .then( res => {
        this.props.dispatch(setHeaders(res.headers))
        this.setState({ assignments: res.data } )
      })
  }

  contentChange = () => {

  }

  toggleEdit = () => {

  }

  render() {
    const {assignments} = this.state
    return(
      <div>
      <Header as="h1" textAlign='center'>Assignments</Header>
      <Divider />
      {assignments.map(assignment => {
          return (
            <Grid key={assignment.id}>
              <Grid.Row columns={4} >
                <Grid.Column>
                  <Header as='h3'>
                  <Icon name='file alternate'/>
                  {assignment.title}
                  </Header>
                </Grid.Column>
                <Grid.Column>
                  {assignment.description}
                </Grid.Column>
                <Grid.Column>
                  due:{assignment.due_date}
                </Grid.Column>
                <Grid.Column>
                  points:{assignment.points}
                </Grid.Column>

              </Grid.Row>
              <Divider />
            </Grid>
          )
        }
          )}
      </div>
    )
  }



}



export default connect()(Assignments)
