import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Label, Dropdown, List } from 'semantic-ui-react'
import { Flex } from './styles/CommonStyles.js'
import { getEnrollments } from '../reducers/enrollments'
import Enrollment from './Enrollment'

class People extends React.Component {
  state = { role: 'all' }

  componentDidMount() {
    const { dispatch, match: { params: { course_id } } } = this.props
    dispatch(getEnrollments(course_id))
  }

  options = () => {
    return ['All', 'Student', 'Teacher', 'TA', 'Observer'].map( (role) => {
      return { text: role, key: role, value: role.toLowerCase() }
    })
  }

  handleChange = (e, { value: role }) => {
    this.setState({ role })
  }

  group = (enrollments) => {
    const teachers = enrollments.filter( e => e.role === 'teacher' )
    const tas = enrollments.filter( e => e.role === 'ta' )
    const students = enrollments.filter( e => e.role === 'student' )
    const observers = enrollments.filter( e => e.role === 'observer' )
    return [...teachers, ...tas, ...students, ...observers]
  }

  byFilter = () => {
    const { role } = this. state
    const { enrollments } = this.props
    if (role === 'all')
      return this.group(enrollments)
    return enrollments.filter( e => e.role === role )
  }

  render() {
    const { role } = this.state
    const options = this.options()
    return (
      <Fragment>
        <span style={{ paddingRight: '50px' }}>
          Filter By: 
        </span>
        <Dropdown value={ role } onChange={this.handleChange} options={options} /> 
        <List divided relaxed>
          { this.byFilter().map( enrollment => <Enrollment {...enrollment} key={enrollment.id} /> ) }
        </List>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return { enrollments: state.enrollments }
}

export default connect(mapStateToProps)(People)

