import React from 'react'
import { connect } from 'react-redux'

class Courses extends React.Component {
  render() {
    return null
  }
}

const mapStateToProps = (state) => {
  return { courses: state.courses }
}

export default connect(mapStateToProps)(Courses)

