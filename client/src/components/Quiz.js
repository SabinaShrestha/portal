import React from 'react'
import { Header, Container, Divider, List } from 'semantic-ui-react'

class Quiz extends React.Component {
  render() {
    return (
      <Container>
        <Header as='h1'>
          Quiz Title Here
        </Header>
        <Divider/>
        <List horizontal>
          <List.Item>
            Due: due date placed here
          </List.Item>
          <List.Item>
            Points: points placed here
          </List.Item>
          <List.Item>
            Number of questions
          </List.Item>
          <List.Item>
            Time Limit
          </List.Item>
        </List>
        <Divider/>
      </Container>
    )
  }
}

export default Quiz
