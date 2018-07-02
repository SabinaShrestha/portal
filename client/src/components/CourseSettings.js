import React from 'react'
import { Flex } from './styles/CommonStyles'
import CourseForm from './CourseForm'
import CourseNavSettings from './CourseNavSettings'
import CourseControl from './CourseControl'

const CourseSettings = () => (
  <Flex justifyContent="center"> 
    <CourseForm />
    <CourseNavSettings />
    <CourseControl />
  </Flex>
)

export default CourseSettings
