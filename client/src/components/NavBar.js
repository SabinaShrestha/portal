import React, { Component } from 'react'
import { Menu, Image } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { handleLogout } from '../reducers/user'
import PortalLogo from '../assets/images/portal-logo-med-02.png'
import HomePageButton from './HomePageButton'

const MenuBar = styled(Menu)`
  background-color: ${ props => props.theme.primary } !important;
  border-radius: 0px !important;
  margin: 0 !important;
`

const PaddedImage = styled(Image)`
  padding: 5px 15px 7px
`

class NavBar extends Component {
  rightNavs = () => {
    const { user, dispatch, history } = this.props;

    if (user.id) {
      return (
        <Menu.Menu position='right'>
          <Menu.Item
            name='Logout'
            onClick={() => dispatch(handleLogout(history))}
          />
        </Menu.Menu>
      );
    }
    return (
      <Menu.Menu position='right'>
        <Link to='/login'>
          <Menu.Item name='Login' />
        </Link>
      </Menu.Menu>
    );
  }

  render() {
    return (
        <MenuBar >
          <Menu.Item>
            <Link to='/'>
              <PaddedImage src={PortalLogo} height='55px'/>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <HomePageButton />
          </Menu.Item>
          { this.rightNavs() }
        </MenuBar>
    );
  }
}


const mapStateToProps = state => {
  return { user: state.user };
};

export default withRouter(connect(mapStateToProps)(NavBar));
