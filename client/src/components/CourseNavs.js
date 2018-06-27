import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { setHeaders } from '../reducers/headers'
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

  render() {
    return (
      <Flex>
      </Flex>
    )
  }
}

const mapStateToProps = (state) => {
  return { course: state.course }
}

export default connect(mapStateToProps)(CourseNavs)
