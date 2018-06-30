import { Component } from 'react'
import { connect } from 'react-redux'

class Permission extends Component {
  teacher = () => {
    const { enrollment: { role }, children } = this.props
    return role === 'teacher' ? children : null 
  }

  admin = () => {
    return this.props.admin 
  }

  staff = () => {
    const { enrollment = {}, children } = this.props
    const regex = new RegExp(/(teacher|ta)/)
    return regex.test(enrollment.role) ? children : null
  }

  render() {
    const { admin, type, children } = this.props
    if (admin)
      return children

    const func = this[type] 
    if (func())
      return children

    return null
  }
}

const mapStateToProps = (state, props) => {
  const enrollment = props.enrollment || state.enrollment || {}
  return { admin: state.user.is_admin, enrollment }
}

export default connect(mapStateToProps)(Permission)
