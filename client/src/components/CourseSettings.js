import React from 'react'
import { Flex, FlexNum } from './styles/CommonStyles'
import CourseForm from './CourseForm'
import CourseNavSettings from './CourseNavSettings'
import CourseControl from './CourseControl'

const CourseSettings = () => (
  <Flex justifyContent="center" alignItems="flex-end"> 
    <FlexNum num={2}>
      <CourseForm />
    </FlexNum>
    <CourseNavSettings />
    <FlexNum num={2} alignSelf="center">
      <CourseControl />
    </FlexNum>
  </Flex>
)

export default CourseSettings
