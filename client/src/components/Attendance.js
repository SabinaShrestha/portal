import React from 'react'
import axios from 'axios'
import { 
  Header, 
  Container, 
  Divider, 
  List, 
  Button, 
  Item,
  Icon,
} from 'semantic-ui-react'
import { setHeaders } from '../reducers/headers'
import { connect } from 'react-redux'
import AttendanceView from './AttendanceView' 

class Attendance extends React.Component {
  state = { students: [], allPresent: false  }

    componentDidMount() {
      const { dispatch, course } = this.props
        axios.get(`/api/courses/${course.id}/get_students`)
          .then( ({ data, headers }) => {
            dispatch(setHeaders(headers))
            this.setState({ students: data })
          })
          .catch( error => {
            console.log(error.response)
          })
    }
    
    recordAllPresent = () => {
      const { dispatch, course } = this.props
      const today = new Date()
      const date = today.toString()
      const record = { present: true, date: date }
      this.state.students.map( s => {
        axios.post(`/api/courses/${course.id}/attendances/${s.id}`, record)
          .then( ({ data, headers }) => {
            dispatch(setHeaders(headers))
          })
          .catch( error => {
            dispatch(setHeaders(error.headers))
            console.log(error)
          })
      })
    }

  render() {
    const { students } = this.state
    return (
      <Container>
        <Header as='h1' textAlign='center'>
          Attendance
        </Header>
        <Divider/>
        <List horizontal>
          <List.Item>
            <Button onClick={() => this.recordAllPresent()}>
              <Icon name="check" color="green"/>
                Mark all Present
              </Button>
          </List.Item>
        </List>
        <Divider/>
          <Item.Group divided>
            {students.map( s =>
              <AttendanceView student={s} />
            )
          }
          </Item.Group>
          <Button onClick={this.saveAttendance}>
            save
          </Button>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return { course: state.course }
}

export default connect(mapStateToProps)(Attendance)

