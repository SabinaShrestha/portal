import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { getUnits, editUnits, addUnits } from '../reducers/units'
import { Container, Grid, Header, Input, Form } from 'semantic-ui-react'
import AddUnitBar from './AddUnitBar'
import Permission from './hoc/Permission'
import styled from 'styled-components'
import { CommonButton } from './styles/CommonStyles'

//the below gave the error TypeError: Cannot read property 'match' of undefined
// const courseId = this.props.match.params.course_id

const TopPad = styled.div`
  margin-top: 50px;
  width: 90%;
`

const Content = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: center;
  border: solid 1px darkgray !important;
`

class AllUnits extends React.Component {
  state = { showForm: false }

  toggleForm = () => {
    this.setState({ showForm: !this.state.showForm })
  }

  componentDidMount() {
    const { dispatch, course } = this.props
    if (course.id !== course.id) 
      dispatch(getUnits(course.id))
  }
  
  componentDidUpdate(prevProps) {
    const { dispatch, course } = this.props
    //the below didn't get a new error, but didn't help either. 
    // const courseId = this.props.match.params.course_id
    if (prevProps.course.id !== course.id)
    dispatch(getUnits(course.id))
  }
  
  toggleForm = () => {
    this.setState({ showForm: !this.state.showForm })
  }
  //need to add an edit button for each of these units 
  //figure out why the unit.position never rendered
  //add a "new unit" button like Dave's New Course button at the bottom
  //component: create a Course Form that toggles when you edit and saves the new info to db 
  //function: course form also renders if you click New Course 
  //component: units needs to render unit items under it 
  //reducer: gets the unit items 
  handleSubmit = (e) => {
    e.preventDefault()
    const unit = { ...this.state }
    const { toggleForm, dispatch } = this.props
    if (unit.id) {
      dispatch(editUnits(unit))
    } else {
      dispatch(addUnits(unit))
      this.setState({ ...this.initialState })
      this.toggleForm() 
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  units = () => {
    return this.props.units.map( unit => 
      <Grid textAlign='center' columns={1}>
        <Grid.Row>
          <Grid.Column>
              <Content>
              <div className='header' key={unit.position}>{unit.name}</div>
                <Permission type="staff">
                  <CommonButton circular size="medium">Edit</CommonButton>
                  <CommonButton circular size="medium">Delete</CommonButton>
                </Permission> 
              </Content> 
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }

  renderUnits() {
    return (
      <Container>
        <Header as="h3" textAlign="center">Units</Header>
        { this.units() }
      </Container>
    )
  }

  render() {
    const { showForm, name } = this.state
    return (
      <TopPad>
        { showForm ?
            <Permission type="staff">
              { showForm &&
                <Fragment>
                  { this.units() }
                  <Header> Add a Unit </Header>
                  <Form onSubmit={this.handleSubmit}>
                    <Form.Input
                    name="name"
                    placeholder="name"
                    value={name}
                    onChange={this.handleChange}
                    label="name"
                    course={this.props.course}
                    required
                    />
                  </Form> 
                </Fragment>
              }
            </Permission>
            :
            <Grid.Column>
              { this.renderUnits() }
              <Permission type="staff">
                { !showForm && <AddUnitBar toggleForm={this.toggleForm} /> }
              </Permission>
            </Grid.Column>
        }
      </TopPad>
    )
  }
}
const mapStateToProps = (state) => {
  return { units: state.units, course: state.course }
}

export default connect(mapStateToProps)(AllUnits);
