import styled from 'styled-components'
import { Button } from 'semantic-ui-react'

export const CommonButton = styled(Button)`
  background-color: ${ props => props.theme.primary } !important;
  color: white !important;
`
