import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Container, 
  Header, 
  Button,
} from 'semantic-ui-react'

class EssayForm extends Component {

  render() {
    return(
      <div>
        <Container>
          <Header>
            Proof of Essay Question
          </Header>
          <Button type='submit' onClick={this.props.toggleEssayForm}>
            Cancel
          </Button>
        </Container>
      </div>
    )
  }

}

export default connect()(EssayForm)