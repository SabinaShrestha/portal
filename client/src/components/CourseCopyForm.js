import React from 'react'
import { connect } from 'react-redux'
import { copyCourse } from '../reducers/courses'
import { Form, Button } from 'semantic-ui-react'
import { CommonButton } from './styles/CommonStyles'

class CourseCopyForm extends React.Component {
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
    const { toggleCopyForm, dispatch } = this.props
    dispatch(copyCourse(course))
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
          type="date"
          onChange={this.handleChange}
          label="starts"
        />
        <Form.Input
          name="ends"
          value={ends}
          type="date"
          onChange={this.handleChange}
          label="ends"
        />
        <CommonButton type='submit'>Save</CommonButton>
      </Form>
    )
  }
}

const mapStateToProps = (state) => {
  return { ...state.course }
}

export default connect(mapStateToProps)(CourseCopyForm)
