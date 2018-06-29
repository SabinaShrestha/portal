import React from 'react';
import { connect } from 'react-redux';
import { addCourse } from '../reducers/courses';
import { Form, Button } from 'semantic-ui-react';
import { CommonButton } from './styles/CommonStyles'

class CourseForm extends React.Component {
  initialState = {
    name: '',
    description: '',
    department: 'Full-Time',
    starts: '',
    ends: '',
    lock_after_end: false,
    lock_before_start: false,
    published: false,
  }

  state = { ...this.initialState }
  
  componentDidMount() {
    if (this.props.id)
      this.setState({ ...this.props })
  }
  
  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }
  
  handleSubmit = (e) => {
    e.preventDefault()
    const course = { ...this.state }
    const { toggleForm, dispatch } = this.props
    dispatch(addCourse(course))
    this.setState({ ...this.initialState })
    toggleForm()
  }
  
  render() {
    const { 
      name,
      description, 
      starts, 
      ends,
    } = this.state
    
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Input
          name="name"
          placeholder="name"
          value={name}
          onChange={this.handleChange}
          label="name"
          required
        />
        <Form.Input
          name="description"
          placeholder="description"
          value={description}
          onChange={this.handleChange}
          label="description"
          required
        />
        <Form.Field
          name="department"
          control='select'
          label="department"
          onChange={this.handleChange}
          required
        >
          <option> Select Department</option>
          <option value={"Full-Time"}>Full Time</option>
          <option value={"Part-Time"}>Part Time</option>
          <option value={"Code on"}>Code On</option>
        </Form.Field>

        {/* Can we bring in a calendar thing to make it easy to select start/end dates? */}
        <Form.Input
          name="starts"
          value={starts}
          onChange={this.handleChange}
          label="starts"
        />
        <Form.Input
          name="ends"
          value={ends}
          onChange={this.handleChange}
          label="ends"
        />
        <CommonButton type='submit'>Save</CommonButton>
        <Button type='button' onClick={this.props.toggleForm}>cancel</Button>
      </Form>
    )
  }
}

export default connect()(CourseForm)
