import React from 'react'
import { List } from 'semantic-ui-react'
import styled from 'styled-components'
import { LinkEnabled, LinkDisabled } from './styles/CommonStyles'

const NavLink = styled(List.Item)`
  background-color: ${ props => props.theme.secondary } !important;
  display: flex !important;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 150px;
  color: white;
  &:hover {
      background-color: black !important;
      box-shadow: 2px 2px 5px 1px ${ props => props.theme.primary };
    }
  }
`

const ActiveLink = NavLink.extend`
  background-color: ${ props => props.theme.primary } !important;
`

const Nav = ({ id, name, url, external, visible, pathname }) => {
  const Link = visible ? LinkEnabled : LinkDisabled
  const activelink = url === pathname
  const Component = activelink ? ActiveLink : NavLink
  return (
    <Component as={Link} to={url} >
      {name}
    </Component>
  )
}

export default Nav
