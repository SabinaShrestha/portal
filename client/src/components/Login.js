import React, { Component } from 'react'
import {
  Container,
  Form,
  Grid,
  Segment,
  Header,
} from 'semantic-ui-react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { handleLogin } from '../reducers/user'
import background from '../assets/images/geoBg.jpg'
import { CommonButton } from '../CommonStyles'

const AppContainer = styled(Container)`
  background: linear-gradient(to bottom right, #aliceblue, #black) !important;
`

class Login extends Component {
  state = { email: '', password: '' };

  handleChange = event => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  }

  handleSubmit = event => {
    event.preventDefault();
    const { dispatch, history } = this.props;
    const { email, password } = this.state;
    dispatch(handleLogin({ email, password }, history));
  }

  render() {
    const { email, password } = this.state;
    return (
      <AppContainer fluid>
        <Segment>
          <Grid textAlign='center' >
            <Grid.Column mobile={16} tablet={8} computer={8} largeScreen={5} widescreen={5}>
              <Header as='h1' textAlign='center'>Login</Header>
              <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                  <label htmlFor='email'>Email</label>
                  <input
                    required
                    id='email'
                    value={email}
                    placeholder='Email'
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <label htmlFor='password'>Password</label>
                  <input
                    required
                    id='password'
                    value={password}
                    placeholder='Password'
                    type='password'
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <Segment textAlign='center' basic>
                  <CommonButton type='submit'>Login</CommonButton>
                </Segment>
              </Form>
            </Grid.Column>
          </Grid>
        </Segment>
      </AppContainer>
    );
  }
}

export default connect()(Login);
