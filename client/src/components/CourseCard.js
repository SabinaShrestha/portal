import React from 'react'
import { Button, Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import { CommonButton } from './styles/CommonStyles'

class CourseCard extends React.Component {
  render() {
    const { course } = this.props
    return (
        <Card>
          <Card.Content as={Link} to={`/courses/${course.id}`}>
            <Card.Header>
              {course.name}
            </Card.Header>
            <Card.Description>
              {course.description}
            </Card.Description>
          </Card.Content>
          <Card.Content>
            <div>
              <Button.Group fluid>
                <CommonButton
                  as={Link}
                  to={`/courses/${course.id}`}
                >
                  View Course
                </CommonButton>
              </Button.Group>
            </div>
          </Card.Content>
        </Card>
    )
  }
}

export default CourseCard;
