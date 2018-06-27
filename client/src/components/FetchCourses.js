import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { getCourses } from '../reducers/courses'

class FetchCourses extends React.Component {
  componentDidMount() {
    this.props.dispatch(getCourses())
  }

  render() {
    return (
      <Switch>
        {/* Add nested course routes here */}
        {/* <Route exact path="/courses/<anything> */}
      </Switch>
    )
  }
}

const mapStateToProps = (state) => {
  return { courses: state.courses }
}

export default connect(mapStateToProps)(FetchCourses)
