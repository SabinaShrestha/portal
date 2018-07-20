import React, { Component } from 'react'
import { connect } from 'react-redux'
import { 
  Header, 
  Button,
} from 'semantic-ui-react'
import {
  FormContainer
} from '../styles/CommonStyles'

class MultipleForm extends Component {

  render() {
    return(
      <div>
        <FormContainer>
          <Header>
            Add Multiple Choice Question
          </Header>
          <Button onClick={this.props.toggleMultipleForm}>
            Cancel
          </Button>
        </FormContainer>
      </div>
    )
  }

}

export default connect()(MultipleForm)
