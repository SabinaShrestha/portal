import React from 'react'
import { connect } from 'react-redux'
import { addCourse } from '../reducers/courses'
import { Form, Button } from 'semantic-ui-react'
import { CommonButton, FullWidth } from './styles/CommonStyles'

class CourseForm extends React.Component {
  initialState = {
    id: null,
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
    this.loadCourse()
  }
  
  componentDidUpdate() {
    this.loadCourse()
  }

  loadCourse = () => {
    if (!this.state.id) {
      if (this.props.id)
        this.setState({ ...this.props })
    }
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

  departmentOptions = () => {
    return [
      { key: 1, value: 'Full-Time', text: 'Full Time' },
      { key: 2, value: 'Part-Time', text: 'Part Time' },
      { key: 3, value: 'Code On', text: 'Code On' },
    ]
  }

  handleOption = (e, { value }) => {
    this.setState({ department: value })
  }
  
  render() {
    const { 
      name,
      description, 
      starts, 
      ends,
      department,
    } = this.state
    
    return (
      <FullWidth>
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
          <Form.Select 
            label="deparment"
            options={this.departmentOptions()} 
            value={department} 
            name="department"
            onChange={this.handleOption}
          />

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
      </FullWidth>
    )
  }
}

const mapStateToProps = (state) => {
  return {...state.course}
}

export default connect(mapStateToProps)(CourseForm)
