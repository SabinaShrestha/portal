import React, { Fragment } from 'react'
import { List, Image, Dropdown, Button, Header, Form, Radio } from 'semantic-ui-react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Flex, FlexNum, Pointer, CommonButton } from './styles/CommonStyles'
import { updateEnrollment, deleteEnrollment } from '../reducers/enrollments'
import Permission from './hoc/Permission'

const Avatar = styled(Image)`
height: 50px !important;
width: 50px !important;
`

const ChildFlex = Flex.extend`
align-items: flex-start;
flex-direction: column;
width: 300px;
`

class Enrollment extends React.Component {
  state = { option: '', deleteForm: false, showOptions: false, tmpRole: '' }

  options = [
    { key: 'change', text:'Change Role', value: 'change' },
    { key: 'delete', text: 'Delete From Course', value: 'delete' },
  ]

  handleChange = (e, { value }) => {
    if (value === 'delete') {
      this.toggleForm()
    } else if (value === 'change') {
      this.toggleChangeRole()
    }

    this.setState({ option: '' })
  }

  toggleForm = () => {
    this.setState( state => {
      return { deleteForm: !state.deleteForm }
    })
  }

  confirmDelete = () => {
    const { course, dispatch, id } = this.props
    return (
      <Fragment>
        <Header>Are you sure?</Header>
        <Flex justifyContent="space-around">
          <Button onClick={this.toggleForm}>Cancel</Button>
          <Button color="red" onClick={() => dispatch(deleteEnrollment(course.id, id))}>
            DELETE
          </Button>
        </Flex>
      </Fragment>
    )
  }

  changeRole = (e, { value }) => {
    this.setState({ tmpRole: value })
  }

  toggleChangeRole = () => {
    this.setState( state => {
      return { showOptions: !state.showOptions, tmpRole: this.props.role }
    })
  }

  updateEnrollment = (e) => {
    e.preventDefault()
    const { course, dispatch, id } = this.props
    const { tmpRole } = this.state
    const enrollment = { id, role: tmpRole }
    dispatch(updateEnrollment(course.id, enrollment)) 
    this.setState({ showOptions: false  })
  }

  roleOptions = () => {
    const { role } = this.props
    const { tmpRole } = this.state
    return (
      <Form onSubmit={this.updateEnrollment}>
        <Form.Field>
          Current value: <b>{role}</b>
        </Form.Field>
        { ['teacher', 'ta', 'student', 'observer'].map( r => {
            return (
              <Form.Field key={r}>
                <Radio
                  label={r.toUpperCase()}
                  name="role"
                  value={r}
                  checked={ tmpRole === r }
                  onChange={this.changeRole}
                />
              </Form.Field>
            )
          })
        }
        <Button type="button" onClick={this.toggleChangeRole}>Cancel</Button>
        <CommonButton>Submit</CommonButton>
      </Form>
    )
  }

  show = () => {
    const { showOptions, deleteForm, option } = this.state
    if (showOptions)
      return this.roleOptions()
    else if (deleteForm)
      return this.confirmDelete()
    else
      return ( 
        <Dropdown 
          value={option} 
          icon="setting" 
          options={this.options} 
          onChange={this.handleChange} 
          text=" "
        />
      )
  }

  render() {
    const { id, image, role, first_name, last_name } = this.props
    return (
      <List.Item key={id}>
        <Flex justifyContent="space-around" alignItems="center">
          <Avatar avatar src={image} />
          <List.Content as={ChildFlex}>
            <List.Header>{first_name} {last_name}</List.Header>
            <List.Description>{ role }</List.Description>
          </List.Content>
          <List.Content>
            <Permission>
              { this.show() }
            </Permission>
          </List.Content>
        </Flex>
      </List.Item>
    )
  }
}

const mapStateToProps = (state) => {
  return { course: state.course }
}

export default connect(mapStateToProps)(Enrollment)
