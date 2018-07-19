import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Container,
  Header,
  Button,
} from 'semantic-ui-react'

class BooleanForm extends Component {


  render() {
    return(
      <div>
        <Container>
        <Header>
          Proof of Boolean 
        </Header>
        <Button type='submit' onClick={this.props.toggleBooleanForm}>
          Cancel
        </Button>

        </Container>
      </div>
    )
  }
}

export default connect()(BooleanForm)
