import React from 'react'
import { connect } from 'react-redux'
import { addCourse } from '../reducers/courses'
import { Form, Button, Header, Grid, Divider } from 'semantic-ui-react'
import { CommonButton } from './styles/CommonStyles'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment';


class CourseForm extends React.Component {
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

  handleStartDate = (date) => {
    this.setState({starts: date})
  }

  handleEndDate = (date) => {
    this.setState({ends: date})
  }
  
  handleSubmit = (e) => {
    e.preventDefault()
    const course = { ...this.state }
    const { toggleForm, dispatch } = this.props
    if (course.id) {
      dispatch(updateCourse(course))
    } else {
      dispatch(addCourse(course))
      this.setState({ ...this.initialState })
      toggleForm()
    }
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
        <Divider hidden />
        <Grid textAlign='center' verticalAlign='middle' >
          <Grid.Row columns={2} centered>
            <Grid.Column>
              <Header as='h3' floated='left'>Starts On</Header>
              <DatePicker 
                name="starts"
                selected={this.state.starts} 
                onChange={this.handleStartDate}
              />
            </Grid.Column>

            <Grid.Column>
            <Header as='h3' floated='left'>Ends On</Header>
            <DatePicker 
              name="ends"
              selected={this.state.ends} 
              onChange={this.handleEndDate}
            />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider hidden />

        <Form.Field
          name="department"
          onChange={this.handleOption}
        />
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
      <Button type='button' onClick={this.props.toggleForm}>cancel</Button>
    </Form>
  )
  }
}

const mapStateToProps = (state) => {
  return {...state.course}
}

export default connect(mapStateToProps)(CourseForm)
