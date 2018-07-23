import React from 'react'
import axios from 'axios'
import { setHeaders } from '../reducers/headers'
import { connect } from 'react-redux'
import { 
  Container,
  Header,
  Icon,
  Item,
  Button,
  Grid,
  Divider,
} from 'semantic-ui-react'

class AttendanceView extends React.Component {
  state = { 
    attendance: [], 
    showAttendance: false, 
    present: false, 
    tardy: false, 
    tardyTime: new Date(),
    reason: '',
    excused: false,
    absent: false,
    date: '',
  }

  componentDidMount() {
    const { dispatch, course, student } = this.props
    axios.get(`/api/courses/${course.id}/attendances/${student.id}`)
      .then( ({ data, headers }) => {
        dispatch(setHeaders(headers))
        this.setState({ attendance: data })
      })
      .catch( error => {
        console.log(error.response)
      })
  }

  toggleAttendance = () => {
    this.setState({ showAttendance: !this.state.showAttendance })
  }

  markPresent = () => {
    const today = new Date()
    const date = today.toString()
    const record = { present: true, date: date }
    this.recordPresent(record)
  }

  recordPresent = (record) => {
    const { dispatch, course, student } = this.props
    axios.post(`/api/courses/${course.id}/attendances/${student.id}`, record)
      .then( ({ data, headers }) => {
        dispatch(setHeaders(headers))
        this.setState({ attendance: data })
      })
      .catch( error => {
        dispatch(setHeaders(error.headers))
        console.log(error)
      })
  }

  markAbsent = () => {
    const today = new Date()
    const date = today.toString()
    const record = { absent: true, date: date }
    this.recordAbsent(record)
  }

  recordAbsent = (record) => {
    const { dispatch, course, student } = this.props
    axios.post(`/api/courses/${course.id}/attendances/${student.id}`, record)
      .then( ({ data, headers }) => {
        dispatch(setHeaders(headers))
        this.setState({ attendance: data })
      })
      .catch( error => {
        dispatch(setHeaders(error.headers))
        console.log(error)
      })
  }

  markTardy = () => {
    const today = new Date()
    const date = today.toString()
    const record = { tardy: true, date: date }
    this.recordTardy(record)
  }

  recordTardy = (record) => {
    const { dispatch, course, student } = this.props
    axios.post(`/api/courses/${course.id}/attendances/${student.id}`, record)
      .then( ({ data, headers }) => {
        dispatch(setHeaders(headers))
        this.setState({ attendance: data })
      })
      .catch( error => {
        dispatch(setHeaders(error.headers))
        console.log(error)
      })
  }
  
  displayAttendance = () => {
    const { student } = this.props
    const { attendance, showAttendance } = this.state
    if (showAttendance){
      return(
        <Container>
          <Header as='h3' textAlign='center'>{student.first_name} {student.last_name}</Header>
          <Divider />
          <Header as='h4' textAlign='center'>Today's Date</Header>
          <Item>
            <Item.Content>
              <Button 
                floated='right'
                onClick={() => this.markAbsent()}>
                <Icon name="x" color="red" />
                Absent
              </Button>
              <Button 
                floated='right'
                onClick={() => this.markTardy()}>
                <Icon name="clock" color="yellow" />
                Tardy
              </Button>
              <Button 
                floated='right'
                onClick={() => this.markPresent()}>
                <Icon name="check" color="green"/>
                  Present
              </Button>
            </Item.Content>
          </Item>
        </Container>
      )
    }    
  }

  render() {
    const { student } = this.props
    // const  { attendance } = this.state
    // const attendance1 = attendance[0]
    return(
      <Grid>
        <Grid.Column floated="left" width={8}>
          <Item key={student.id}>
            <Item.Image size='tiny' src={student.image} />
            <Item.Content verticalAlign='middle'>
              {student.first_name} {student.last_name}
              <Button 
                floated='right'
                onClick={this.toggleAttendance}>
                  view
                  <Icon name="caret right" />
              </Button>
            </Item.Content>
          </Item>
          <Divider />
        </Grid.Column>
        <Grid.Column floated="right" width={8}>
         { this.displayAttendance() }
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return { course: state.course }
}

export default connect(mapStateToProps)(AttendanceView)
