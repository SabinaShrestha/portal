import React from 'react';
import { connect } from 'react-redux';
import { getUnits, addUnit, updateUnit } from '../reducers/units';
import { Container, Segment, Form } from 'semantic-ui-react';
import Unit from './Unit.js'
  
  class Units extends React.Component {

    initialState = { name: '', position: 100, editing: false }

    state = { ...this.initialState }
    componentDidMount = () => {
      const { dispatch, course } = this.props
      const courseId = this.props.match.params.course_id
      dispatch(getUnits(courseId))
    }
  
    displayUnits = () => {
      const courseId = this.props.match.params.course_id
      const { units } = this.props
      return units.map( unit => {
        return(
          <Unit courseId={courseId} key={unit.id} unit={unit} />
        )
      })
    }

    handleChange = (e) => {
      const { name, value } = e.target
      this.setState({ [name]: value })
    }
    
    handleSubmit = (e) => {
      e.preventDefault()
      const courseId = this.props.match.params.course_id
      const unitId = this.props.match.params.unit_id 
      let unit = this.state
      debugger
      const { dispatch } = this.props
      if (unitId) {
        dispatch(updateUnit(courseId, unitId, unit))
      } else {
        dispatch(addUnit(courseId, unit))
        this.setState({ ...this.initialState })
      }
    }
    
    render() {
      const { name } = this.state 
      return (
        <Container>
          {this.displayUnits()}
          <Segment>
            <button>Add a Module</button> 
            <Form onSubmit={this.handleSubmit}>
            <Form.Input 
              type='text' 
              name="name"
              placeholder="name"
              value={name}
              onChange={this.handleChange}
              label="name"
              required
            />
            </Form> 
          </Segment>
        </Container> 
      )
    }
  }
    
  const mapStateToProps = (state) => {
    return { units: state.units, course: state.course }
  }
  
  export default connect(mapStateToProps)(Units);
  