import React from 'react'
import axios from 'axios'
import { Header, 
         Container, 
         Divider, 
         List,  
         Item,
} from 'semantic-ui-react'
import { setHeaders } from '../reducers/headers'
import { connect } from 'react-redux'

class Attendance extends React.Component {
  state = { students: [] }

    componentDidUpdate(prevProps) {
      const { dispatch, course } = this.props
      if (prevProps.course.id !== this.props.course.id) {
        axios.get(`/api/courses/${course.id}/get_students`)
          .then( ({ data, headers }) => {
            dispatch(setHeaders(headers))
            this.setState({ students: data })
          })
          .catch( error => {
            console.log(error.response)
          })
      }
    }


  render() {
    return (
      <Container>
        <Header as='h1' textAlign='center'>
          Attendance View
        </Header>
        <Divider/>
        <List horizontal>
          <List.Item>
            Mark all Present
          </List.Item>
          <List.Item>
            Mark all Absent 
          </List.Item>
        </List>
        <Divider/>
        <Item.Group divided>
          {this.state.students.map( s =>
          <Item key={s.id}>
            <Item.Image size='tiny' src={s.image} />
            <Item.Content verticalAlign='middle'>{s.first_name} {s.last_name}</Item.Content>
          </Item>
          )
        }
        </Item.Group>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return { course: state.course }
}

export default connect(mapStateToProps)(Attendance)

