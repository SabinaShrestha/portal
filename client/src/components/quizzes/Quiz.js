import React from 'react'
import { 
  Header, 
  Container, 
  Divider,
  Table,
  Icon, 
} from 'semantic-ui-react'
import { CommonButton, Pointer } from '../styles/CommonStyles'
import axios from 'axios'
import { connect } from 'react-redux'
import { setHeaders } from '../../reducers/headers'
import Permission from '../hoc/Permission'
import { getQuizzes } from '../../reducers/quiz'

class Quiz extends React.Component {
  state = { column: null, direction: null, quizzes: [] }

  componentDidMount() {
    const { quizzes } = this.state
    const { dispatch } = this.props
    const courseId = this.props.match.params.course_id
    // dispatch(getQuizzes( courseId ))

    axios.get(`/api/courses/${courseId}/quizzes`)
    .then( ({ data, headers }) => {
      dispatch(setHeaders(headers))
      this.setState({ quizzes: data })
    })
    .catch( error => {
      console.log(error.response)
    })
  }
  
  handleClick = (e) => {
    e.preventDefault()
    this.props.history.push(`/courses/${this.props.course.id}/quiz_form`)
  }

  handleEdit = (e) => {
    // TODO populate form with the information you want to edit if there is an id - add delete button
  }
  
  render() {
    let { column, direction } = this.state
    return (
      <Container>
        <Header as='h1'>Quizzes
          <CommonButton floated='right' onClick={this.handleClick}>
            Add Quiz
          </CommonButton>
        </Header>
          <Divider /> 
     
            <Table cell padded>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Quiz Name</Table.HeaderCell>
                  <Table.HeaderCell textAlign='center'>Points</Table.HeaderCell>
                  <Table.HeaderCell textAlign='center'>Questions</Table.HeaderCell>
                  <Table.HeaderCell textAlign='center'>Published</Table.HeaderCell>
                    <Permission type="staff">
                      <Table.HeaderCell textAlign='center'>Edit</Table.HeaderCell>
                    </Permission>
                </Table.Row>
              </Table.Header>
          { this.state.quizzes.map( quiz =>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    {quiz.name}
                  </Table.Cell>
                  <Table.Cell textAlign='center'>
                    {quiz.points}
                  </Table.Cell>
                  <Table.Cell textAlign='center'>
                    Questions {/* TODO = figure out how to count the questions */}
                  </Table.Cell>
                  <Table.Cell textAlign='center'>
                    {quiz.published === true && 
                     <p>Published</p>
                    }
                  </Table.Cell>
                    <Permission type="staff">
                      <Table.Cell textAlign='center'>
                        <Pointer>
                            <Icon fitted name='edit' onClick={this.handleEdit} />
                        </Pointer>
                      </Table.Cell>
                    </Permission>
                </Table.Row>
              </Table.Body>
              ) 
            }
            </Table>
      </Container>
    )
  } 
}

const mapStateToProps = (state) => {
  return {
    course: state.course
  }
}

export default connect(mapStateToProps)(Quiz)