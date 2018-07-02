import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { List } from 'semantic-ui-react'
import { updateCourseNavs } from '../reducers/course'
import { isStaff } from '../utils/permissions'
import { withRouter } from 'react-router-dom'
import Nav from './Nav'

class CourseNavs extends React.Component {
  state = { navs: [] }

  componentDidMount() {
    if ( this.props.course.id )
      this.fetchNavs()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.course.id !== this.props.course.id)
      this.fetchNavs()
  }

  fetchNavs = () => {
    const { dispatch, course: { id } } = this.props
    axios.get(`/api/courses/${id}/course_navs`)
      .then( res => {
        const { data: navs, headers } = res
        dispatch(updateCourseNavs(navs, headers))
        this.setState({ navs })
      })
  }

  handleClick = (e) => {

  }

  configNavs = () => {
    const { user: { is_admin }, course: { role } } = this.props
    const { navs } = this.state
    if ( isStaff({ role, is_admin }) ) {
      return navs
    } else {
      return navs.filter( nav => nav.visible )
    }
  }

  render() {
    const { location: { pathname } } = this.props
    return (
      <List divided>
        { this.configNavs().map( nav => <Nav key={nav.id} {...nav} pathname={pathname} /> ) }
      </List>
    )
  }
}

const mapStateToProps = (state) => {
  return { course: state.course, user: state.user }
}

export default withRouter(connect(mapStateToProps)(CourseNavs))
