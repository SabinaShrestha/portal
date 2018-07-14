import React from 'react'
import axios from 'axios'
import { setHeaders } from '../reducers/headers'
import { connect } from 'react-redux'
import { Container, Button, Divider, Header, Segment } from 'semantic-ui-react'
import { Flex, FlexNum, CommonButton } from './styles/CommonStyles'


class Wikis extends React.Component {
  //TODO -> add visibility toggle
  state = { wikis: [] }

  componentDidMount() {
    const { dispatch } = this.props
    axios.get(`/api/courses/${this.props.match.params.course_id}/wikis`)
      .then(res => {
        dispatch(setHeaders(res.headers))
        this.setState({ wikis: res.data })
      })
  }

  handleNew() {
    console.log("New function")
    //TODO -> toggle visibility of all wiki handles and drop in the Wiki form
  }

  handleEdit() {
    console.log("Edit function")
    //TODO -> same as on New
  }

  handleDelete() {
    console.log("Delete function")
    //TODO -> make the call to delete the wiki
    //TODO -> give a confirm before deleting
  }

  handleShow() {
    console.log("Show function")
    //TODO -> Render an individual Wiki component
  }

  render() {
    const { wikis } = this.state
    return (
      <Container>
        <Flex alignContent="flex-end">
          Put something here?
        </Flex>
        <Flex alignContent="center" direction="column" alignItems="center">
          <Header as="h1" textAlign="center">Course Wiki</Header>
          <CommonButton style={{ width: '180px' }} onClick={this.handleNew}>Create New Wiki</CommonButton>
        </Flex>
        <Divider hidden />
        { wikis.map( w => {
          return(
            <div key={w.id}>
              <Segment>
                <Flex>
                  <FlexNum num={2} alignSelf="center">
                    {w.title}
                  </FlexNum>
                  <CommonButton onClick={this.handleEdit}>Edit</CommonButton>
                  <CommonButton onClick={this.handleDelete}>Delete</CommonButton>
                  <CommonButton onClick={this.handleShow}>View</CommonButton>
                </Flex>
              </Segment>
            </div>
          )
        })}
      </Container>
    )
  }
}

export default connect()(Wikis)