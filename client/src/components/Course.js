import React from 'react'
import { connect } from 'react-redux'
import { Flex } from './styles/CommonStyles'
import {
  Header,
  Grid,
  Container,
  Divider,
  Icon,
  Segment,
} from 'semantic-ui-react'
import moment from 'moment';

const Course = ({ course }) => (
  <Flex>
    <Container>
      <Segment padded='very' textAlign='center'>
        <Header as='h1' textAlign='center'>
          {course.name}
        </Header>
        <Divider />
        <Header as='h3' textAlign='center'>
          Department: {course.department}
        </Header>
        <Header textAlign='center'>
          {course.description}
        </Header>
        <Container>
          starts: {moment(course.starts).format('MM/DD/YYYY')} - ends: {moment(course.ends).format('MM/DD/YYYY')}
          published: {course.published && <Icon disabled name='check' />}
        </Container>
      </Segment>
    </Container>
  </Flex>
)

const mapStateToProps = (state) => {
  return { course: state.course }
}

export default connect(mapStateToProps)(Course)
