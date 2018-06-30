import styled from 'styled-components'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export const CommonButton = styled(Button)`
  background-color: ${ props => props.theme.primary } !important;
  color: white !important;
  &:hover {
    background-color: black !important;
`
export const Flex = styled.div`
  display: flex;
  justify-content: ${ props => props.justifyContent };
  align-self: ${ props => props.alignSelf };
`
export const LinkEnabled = styled(Link)`
  color: white !important;
`
export const LinkDisabled = styled(Link)`
  color: ${ props => props.theme.lockedText } !important;
`
