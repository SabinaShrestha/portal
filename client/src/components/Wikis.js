import React from 'react'
import { connect } from 'react-redux'
import { Container, Divider, Header, Segment } from 'semantic-ui-react'
import { Flex, FlexNum, CommonButton } from './styles/CommonStyles'
import WikiForm from './WikiForm'
import { deleteWiki, getWikis, getWiki } from '../reducers/wikis'

class Wikis extends React.Component {
  state = { visible: false }

  componentDidMount() {
    const { dispatch } = this.props
    const courseId = this.props.match.params.course_id
    dispatch(getWikis(courseId))
  }

  toggleForm = () => {
    this.setState({ visible: !this.state.visible })
  }

  handleNew = () => {
    this.toggleForm()
  }

  handleDelete = (id) => {
    const { dispatch } = this.props
    const courseId = this.props.match.params.course_id
    dispatch(deleteWiki(courseId, id))
  }

  handleShow = (id) => {
    const { dispatch } = this.props
    const course_id = this.props.match.params.course_id
    dispatch(getWiki(course_id, id))
  }

  render() {
    const { visible } = this.state
    const { wikis } = this.props
    const course_id = this.props.match.params.course_id
    return (
      <Container>
        { visible ? 
          <Segment>
            <WikiForm course_id={course_id} toggleForm={this.toggleForm}/>
          </Segment> : 
          null 
        }
        <Flex alignContent="center" direction="column" alignItems="center">
          <Header as="h1" textAlign="center">Course Wikis</Header>
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
                  <CommonButton onClick={() => this.handleDelete(w.id)}>Delete</CommonButton>
                  <CommonButton onClick={() => this.handleShow(w.id)}>View</CommonButton>
                </Flex>
              </Segment>
            </div>
          )
        })
        }
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return { wikis: state.wikis}
}

export default connect(mapStateToProps)(Wikis)