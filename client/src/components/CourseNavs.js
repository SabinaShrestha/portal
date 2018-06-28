import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { List } from 'semantic-ui-react'
import { setHeaders } from '../reducers/headers'
import { isStaff } from '../utils/permissions'
import Nav from './Nav'
import { Flex } from './styles/CommonStyles'

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
        dispatch(setHeaders(res.headers)) 
        this.setState({ navs: res.data })
      })
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
    const { navs } = this.state
    return (
      <List divided>
        { this.configNavs().map( nav => <Nav key={nav.id} {...nav} /> ) }
      </List>
    )
  }
}

const mapStateToProps = (state) => {
  return { course: state.course, user: state.user }
}

export default connect(mapStateToProps)(CourseNavs)