import React from 'react'
import { Header, Container, Divider, List, Card } from 'semantic-ui-react'

class Attendance extends React.Component {
  render() {
    return (
      <Container>
        <Header as='h1'>
          Attendance View
        </Header>
        <Divider/>
        <List horizontal>
          <List.Item>
            Present
          </List.Item>
          <List.Item>
            absent 
          </List.Item>
          <List.Item>
            tardy
          </List.Item>
        </List>
        <Divider/>
        <Card>
          <Card.Header>
            Student Name
          </Card.Header>  
        </Card>
      </Container>
    )
  }
}

export default Attendance
