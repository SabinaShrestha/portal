import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Container, 
  Header, 
  Button,
} from 'semantic-ui-react'

class MultipleForm extends Component {

  render() {
    return(
      <div>
        <Container>
          <Header>
            Proof of Multiple Choice
          </Header>
          <Button type='submit' onClick={this.props.toggleMultipleForm}>
            Cancel
          </Button>
        </Container>
      </div>
    )
  }

}

export default connect()(MultipleForm)
