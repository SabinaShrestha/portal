import React from 'react'
import {Card, Form, Segment } from 'semantic-ui-react';
import { CommonButton } from './styles/CommonStyles'

//this needs to update state on the user profile page
//needs error handling for input fields
//to change data we need to dispatch an action

class ProfileForm extends React.Component {
  
  state = { editing: false, nickname:'', email:'', phone:'', bio:''  }


  handleEdit = () => {
    this.setState({ editing: !this.state.editing })
  }

  handleChange =(e)=> {
    const { name, value} = e.target
  this.setState({[name]: value})
  }

  handleSubmit =(e)=> {
    e.preventDefault()
    this.state ={ name:'' }

  }

    render() {
      
      const {nickname, bio, phone, email }  = this.state
        return(
          <Card>
            { this.state.editing ?
              <Segment>
              <Form onSubmit={this.handleSubmit}>
              <Form.Input
                  label='Nickname'
                  type='text'
                  placeholder='New nickname'
                  defaultValue={ nickname } 
                  onChange={this.handleChange}
                />
                <Form.Input
                  label='Email'
                  type='email'
                  placeholder='New email'
                  defaultValue={ email } 
                  onChange={this.handleChange}
                />
                <Form.Input
                  label='Phone'
                  type='integer'
                  placeholder='New phone number'
                  defaultValue={ phone } 
                  onChange={this.handleChange}
                />
                <Form.TextArea
                  label='Bio'
                  type='text area'
                  placeholder='Type some things about you'
                  defaultValue={ bio } 
                  onChange={this.handleChange}
                />
              <CommonButton type='submit'>Save</CommonButton> 
              <CommonButton onClick={() => this.handleEdit()}>Cancel</CommonButton>
              </Form>
              </Segment>
                :
              <CommonButton onClick={() => this.handleEdit()}>Edit info</CommonButton>
        }
          </Card>
    )
  }
}
export default ProfileForm;
