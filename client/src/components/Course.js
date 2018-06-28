import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Flex } from './styles/CommonStyles'

const Course = ({ course }) => (
  <Flex>
  </Flex>
)

const mapStateToProps = (state) => {
  return { course: state.course }
}

export default connect(mapStateToProps)(Course)
