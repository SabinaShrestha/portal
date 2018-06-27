import { Component } from 'react'
import { connect } from 'connect'

class Permission extends Component {
  teacher = () => {
    const { enrollment: { role }, children } = this.props
    return role === 'teacher' ? children : null 
  }

  staff = () => {
    const { enrollment: { role }, children } = this.props
    const regex = new RegExp(/(teacher|ta)/)
    return regex.test(role) ? children : null
  }

  render() {
    const { admin, type, children } = this.props
    if (admin)
      return children

    const func = this[type]
    func()
  }
}

const mapStateToProps = (state, props) => {
  const enrollment = props.enrollment || state.enrollment || {}
  return { admin: user.is_admin, enrollment }
}

export default connect(mapStateToProps)(Permission)
