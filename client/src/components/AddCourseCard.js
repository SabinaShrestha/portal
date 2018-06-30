import React from 'react'
import { Card } from 'semantic-ui-react'
import { CommonButton } from './styles/CommonStyles'
import styled from 'styled-components'

const Content = styled(Card.Content)`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  border: dashed 1px darkgray !important;
  background-color: lightgray !important;
`

const AddCourseCard = ({ toggleForm }) => (
  <Card onClick={toggleForm}>
    <Content>
      <Card.Header>Add Course</Card.Header>
      <Card.Description>
        <CommonButton circular size="massive">+</CommonButton>
      </Card.Description>
    </Content>
  </Card>
)

export default AddCourseCard
