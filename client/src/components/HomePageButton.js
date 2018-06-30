import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { updateUser } from '../reducers/user'
import { CommonButton } from './styles/CommonStyles'

const FlexWrapper = styled.div`
  align-self: flex-end;
  margin-left: auto;
`

class HomePageButton extends React.Component {
  setHomePage = () => {
    const { user, location, dispatch } = this.props
    const homepage = location.pathname 
    dispatch(updateUser({ ...user, homepage }))
  }

  render() {
    const { user, location } = this.props
    if (user.homepage === location.pathname)
        return null
    return (
      <FlexWrapper>
        <CommonButton onClick={this.setHomePage}> 
          Set As Homepage
        </CommonButton>
      </FlexWrapper>
    )
  }
}

const mapStateToProps = (state) => {
  return { user: state.user }
}

export default withRouter(connect(mapStateToProps)(HomePageButton))
