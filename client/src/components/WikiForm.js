import React from 'react'
import { connect } from 'react-redux'
import { addWiki } from '../reducers/wikis'
import { Form, Button, Divider, Header } from 'semantic-ui-react'
import { CommonButton } from './styles/CommonStyles'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment';

class WikiForm extends React.Component {
  state = {
    course_id: null,
    pinned: false,
    published: false,
    is_public: false,
    publish_at: moment(),
    wiki_type: '',
    title: '',
    body: '',
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleSubmit = (e) => {
    const { course_id, dispatch, toggleForm } = this.props
    const { title, body, wiki_type, publish_at, is_public, published, pinned } = this.state
    e.preventDefault()
    let wiki = { title: title, 
                 body: body, 
                 wiki_type: 
                 wiki_type, 
                 publish_at: publish_at, 
                 public: is_public, 
                 published: published, 
                 pinned: pinned, 
                 course_id: course_id }
    dispatch(addWiki(course_id, wiki))
    toggleForm()
  }

  handleOption = (e, data) => {
    this.setState({ wiki_type: data.value })
  }

  handlePublishAt = (date) => {
    this.setState({ publish_at: date })
  }

  render() {
    const { title, body } = this.state
    const wikiOptions = [
      { value: 'type1', text: 'Type1', name: 'Type1' },
      { value: 'type2', text: 'Type2', name: 'Type2' },
      { value: 'type3', text: 'Type3', name: 'Type3' },
      { value: 'type4', text: 'Type4', name: 'Type4' },
    ]

    return (
      <Form onSubmit={this.handleSubmit}>
        <Header as="h2" textAlign="center">{`Create a new Wiki on course id ${this.props.course_id}`} </Header>
        <Form.Input
          name="title"
          placeholder="title"
          value={title}
          onChange={this.handleChange}
          label="title"
          required
        />
        <Form.TextArea
          name="body"
          placeholder="body"
          value={body}
          onChange={this.handleChange}
          label="body"
          required
        />
        <Divider hidden />
        <Form.Dropdown
          selection
          label='wiki_type'
          name='wiki_type'
          onChange={this.handleOption}
          value={this.wiki_type}
          placeholder='wiki_type'
          options={wikiOptions}
          required
        />
        <Form.Checkbox label="Public" />
        <Form.Checkbox label="Published" />
        <Form.Checkbox label="Pinned" />
        <DatePicker
          name="publish_at"
          selected={moment(this.state.publish_at)}
          onChange={this.handlePublishAt}
        />
        <CommonButton type='submit'>Save</CommonButton>
        <Button type='button' onClick={this.props.toggleForm}>Cancel</Button>
      </Form>
    )
  }
}

const mapStateToProps = (state) => {
  return { ...state.course }
}

export default connect(mapStateToProps)(WikiForm)
