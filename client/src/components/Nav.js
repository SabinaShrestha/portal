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
`

const Nav = ({ id, name, url, external, visible }) => {
  const Link = visible ? LinkEnabled : LinkDisabled
  return (
    <NavLink as={Link} to={url}>
      {name}
    </NavLink>
  )
}

export default Nav
