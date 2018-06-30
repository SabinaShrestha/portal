import React from 'react'
import { Flex } from './styles/CommonStyles'
import CourseForm from './CourseForm'
import CourseNavSettings from './CourseNavSettings'

const CourseSettings = () => (
  <Flex justifyContent="center"> 
    <CourseForm />
    <CourseNavSettings />
  </Flex>
)

export default CourseSettings
