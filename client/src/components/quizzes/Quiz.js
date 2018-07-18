import React from 'react'
import { 
  Header, 
  Container, 
  Divider,
  Table,
  Icon, 
} from 'semantic-ui-react'
import { CommonButton, Pointer } from '../styles/CommonStyles'
import { connect } from 'react-redux'
import Permission from '../hoc/Permission'
import { getQuizzes } from '../../reducers/quiz'
import { Link } from 'react-router-dom'

class Quiz extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props
    const courseId = this.props.match.params.course_id
    dispatch(getQuizzes(courseId))
  }

  handleEdit = (id) => {
    this.props.history.push(`/courses/${this.props.course.id}/edit_quiz/${id}`)
  }

  quizzes = () => {
    return this.props.quizzes.map( quiz =>
      <Table.Row key={quiz.id}>
        <Table.Cell>
          {quiz.name}
        </Table.Cell>
        <Table.Cell textAlign='center'>
          {quiz.points}
        </Table.Cell>
        <Table.Cell textAlign='center'>
          Questions
        </Table.Cell>
        <Table.Cell textAlign='center'>
          {quiz.published === true && 
            <p>Published</p>
          }
        </Table.Cell>
          <Permission type="staff">
            <Table.Cell textAlign='center'>
              <Pointer>
                  <Icon fitted name='edit' onClick={() => this.handleEdit(quiz.id)} />
              </Pointer>
            </Table.Cell>
          </Permission>
      </Table.Row>
    ) 
  }

  render() {
    let formLink = `/courses/${this.props.course.id}/quiz_form`
    return (
      <Container>
        <Header as='h1'>Quizzes
          <Link to={formLink}>
            <CommonButton floated='right'>
              Add Quiz
            </CommonButton>
          </Link>
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
                <Table.Body>
                  { this.quizzes() }
                </Table.Body>
            </Table>
      </Container>
    )
  } 
}

const mapStateToProps = (state) => {
  return {
    course: state.course,
    quizzes: state.quiz
  }
}

export default connect(mapStateToProps)(Quiz)
