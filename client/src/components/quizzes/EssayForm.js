import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Header, 
  Button,
} from 'semantic-ui-react'
import {
  FormContainer
} from '../styles/CommonStyles'

class EssayForm extends Component {

  render() {
    return(
      <div>
        <FormContainer>
          <Header>
            Add Essay Question
          </Header>
          <Button onClick={this.props.toggleEssayForm}>
            Cancel
          </Button>
        </FormContainer>
      </div>
    )
  }

}

export default connect()(EssayForm)