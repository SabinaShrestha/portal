import React from 'react';
import { addUnit, updateUnit, deleteUnit } from '../reducers/units';
import { List, Button, Input, Form } from 'semantic-ui-react';
import { connect } from 'react-redux';


class Unit extends React.Component {

  initialState = { name: '', position: 100, editing: false }

  state = { ...this.initialState }

  toggleEdit = () => {
    this.setState({ editing: !this.state.editing })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const unitId = this.props.unit.id 
    const { courseId, dispatch } = this.props
    debugger 
    let unit  = this.state
    if (unitId) {
      dispatch(updateUnit(courseId, unitId, unit))
      this.setState({ ...this.initialState })
    } else {
      dispatch(addUnit(courseId, unit))
      this.setState({ ...this.initialState })
      debugger 
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  cancelEdit = () => {
    this.setState({ editing: false, name: ''})
  }

  handleDelete = () => {
    const { dispatch, courseId } = this.props
    const unitId = this.props.unit.id 
    dispatch(deleteUnit(courseId, unitId))
    debugger 
  }

  render() {
    const { name } = this.state 
    const { unit } = this.props
    if(this.state.editing)
      return (
        <List.Item>
          <Form onSubmit={this.handleSubmit}>
          <Input 
            type='text' 
            name="name"
            placeholder={unit.name}
            value={name}
            onChange={this.handleChange}
            label="name"
            required
           />
          <Button type="button" onClick={this.cancelEdit}>Cancel</Button>
          <Button primary onClick={this.handleSubmit}>Save</Button>
          </Form>
        </List.Item>
      )
    else 
      return (
        <List.Item 
          name="name"
          placeholder="name"
          value={name}
          onChange={this.handleChange}
          label="name"
          required
        > 
          {unit.name}
          <Button onClick={ this.toggleEdit }>Edit</Button>  
          <Button color='red' onClick={this.handleDelete}>Delete</Button>
        </List.Item> 
      )
  }


}

export default connect()(Unit) 