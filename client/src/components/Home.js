import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class Home extends Component {
  render() {
    const { user } = this.props
    if (user.id)
      return <Redirect to={user.homepage} />
    return (
      <Container fluid>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.user }
}

export default connect(mapStateToProps)(Home)
