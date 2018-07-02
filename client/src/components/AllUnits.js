import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUnits } from '../reducers/units';
import { Menu, Container, Grid, Header, Card, Image } from 'semantic-ui-react';

class AllUnits extends React.Component {

  componentDidUpdate(prevProps) {
    const { dispatch, course } = this.props
    if (prevProps.course.id !== course.id)
      dispatch(getUnits(course.id))
  }

  units = () => {
    return this.props.units.map( unit => 
      <Grid textAlign='center' columns={1}>
        <Grid.Row>
          <Grid.Column>
            <Menu fluid vertical>
              <Menu.Item className='header'>{this.position} {unit.name}</Menu.Item>
            </Menu>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }

  render() {
    return (
      <Container>
        <Header as="h3" textAlign="center">Units</Header>
        { this.units() }
      </Container>
    )
  }
}
const mapStateToProps = (state) => {
  return { units: state.units, course: state.course }
}

export default connect(mapStateToProps)(AllUnits);