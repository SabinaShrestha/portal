import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

class FetchCourses extends React.Component {
  componentDidMount() {
    //TODO wire up redux to get courses from the server
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

export default connect(mapStateToProps)(Courses)
