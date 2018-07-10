import React from 'react';
import {Header, Card, Container, List, Segment, Divider} from 'semantic-ui-react';
import ProfileForm from './ProfileForm';

//this needs to pull out existing user information
//need to get data from store
class UserProfile extends React.Component{
    

  render() {
    return (
      <Container>
        <Header as='h1' textAlign='center'>Profile page</Header>
        <Card>
          <Card.Content >
            {/* the first name is a placeholder, it needs the users first name?*/}
            <Card.Header as='h2' textAlign='center'>Your first name</Card.Header>
            <List>
              <Segment>
                {/*These List.Items have placeholders inserted, they need existing user information*/}
                 <List.Item>placeholder nickname</List.Item> 
                <Divider />
                <List.Item>placeholder@email.com</List.Item> 
                <Divider />
                <List.Item>555 555-5555</List.Item> 
                <Divider />
                <p>This is a place holder bio because I cant figure out how to pull out user data.</p>
              </Segment>
            </List>
          </Card.Content>
        </Card>
        <ProfileForm />
      </Container>
    )
  }
}
export default UserProfile;
