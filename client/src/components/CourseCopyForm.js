import React from 'react'
import { connect } from 'react-redux'
import { copyCourse } from '../reducers/courses'
import { Button, Header, Divider, Grid, Form } from 'semantic-ui-react'
import { CommonButton } from './styles/CommonStyles'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment';

class CourseCopyForm extends React.Component {
  initialState = {
    id: null,
    name: '',
    description: '',
    department: 'Full-Time',
    starts: moment(),
    ends: moment(),
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
    toggleCopyForm()
  }

  handleOption = (e, { value }) => {
    this.setState({ department: value })
  }

  handleStartDate = (date) => {
    this.setState({ starts: date })
  }

  handleEndDate = (date) => {
    this.setState({ ends: date })
  }

  render() {
    const { name, description, starts, ends, department, } = this.state
    const departmentOptions = [
      { value: 'Full-Time', text: 'Full Time', name: 'Full-Time' },
      { value: 'Part-Time', text: 'Part Time', name: 'Part-Time' },
      { value: 'Code On', text: 'Code On', name: 'Code On' },
    ]

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
        <Divider hidden />
        <Grid textAlign='center' verticalAlign='middle' >
          <Grid.Row columns={2} centered>
            <Grid.Column>
              <Header as='h3' floated='left'>Starts On</Header>
              <DatePicker
                name="starts"
                selected={moment(starts)}
                onChange={this.handleStartDate}
              />
            </Grid.Column>
            <Grid.Column>
              <Header as='h3' floated='left'>Ends On</Header>
              <DatePicker
                name="ends"
                selected={moment(ends)}
                onChange={this.handleEndDate}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider hidden />
        <Form.Dropdown
          selection
          label='department'
          name="department"
          onChange={this.handleOption}
          value={department}
          placeholder='department'
          options={departmentOptions}
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
