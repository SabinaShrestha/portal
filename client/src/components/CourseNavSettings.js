import React from 'react'
import { connect } from 'react-redux'
import { Motion, spring } from 'react-motion'
import styled from 'styled-components'
import axios from 'axios'
import { Icon, Button } from 'semantic-ui-react'
import { Pointer, CommonButton, Flex } from './styles/CommonStyles'
import { updateCourseNavs } from '../reducers/course'

const MotionContainer = styled.div`
  padding-left: 10px;
  display: flex;
  justify-content: center;
`

const SettingsContainer = styled.div`
  min-width: 320px;
  margin: 0 50px;
`

const Item = styled.div`
  position: absolute;
  background-color: ${ props => props.visible ? props.theme.primary : 'gray' };
  width: 320px;
  height: 38px;
  overflow: visible;
  pointer-events: auto;
  transform-origin: 50% 50% 0px;
  border-radius: 4px;
  line-height: 38px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  color: white;
  padding-left: 10px;
  padding-right: 10px;
  box-shadow: ${ props => `rgba(0, 0, 0, 0.2) 0px ${props.shadow}px ${2 * props.shadow}px 0px` };
  transform: ${ props => `translate3d(0, ${props.y}px, 0) scale(${props.scale})` };
  zIndex: ${ props => props.i === props.originalPosOfLastPressed ? 99 : props.i };
`

class CourseNavSettings extends React.Component {
  state = {
    topDeltaY: 0,
    mouseY: 0,
    isPressed: false,
    originalPosOfLastPressed: 0,
    order: [],
    navs: [],
  }

  componentDidMount() {
    window.addEventListener('touchmove', this.handleTouchMove)
    window.addEventListener('touchend', this.handleMouseUp)
    window.addEventListener('mousemove', this.handleMouseMove)
    window.addEventListener('mouseup', this.handleMouseUp)
    this.setInitialOrder()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.navs.length !== this.props.navs.length)
      this.setInitialOrder()
  }

  clamp = (n, min, max) => {
    return Math.max(Math.min(n, max), min);
  }

  reinsert = (arr, from, to) => {
    const _arr = arr.slice(0);
    const val = _arr[from];
    _arr.splice(from, 1);
    _arr.splice(to, 0, val);
    return _arr;
  }

  handleTouchStart = (key, pressLocation, e) => {
    this.handleMouseDown(key, pressLocation, e.touches[0])
  }

  handleTouchMove = (e) => {
    e.preventDefault()
    this.handleMouseMove(e.touches[0])
  }

  handleMouseDown = (pos, pressY, { pageY }) => {
    this.setState({
      topDeltaY: pageY - pressY,
      mouseY: pressY,
      isPressed: true,
      originalPosOfLastPressed: pos,
    })
  }

  handleMouseMove = ({ pageY }) => {
    const { isPressed, topDeltaY, order, originalPosOfLastPressed } = this.state;
    const { navs } = this.props

    if (isPressed) {
      const mouseY = pageY - topDeltaY;
      const currentRow = this.clamp(Math.round(mouseY / 40), 0, navs.length - 1);
      let newOrder = order;

      if (currentRow !== order.indexOf(originalPosOfLastPressed)){
        newOrder = this.reinsert(order, order.indexOf(originalPosOfLastPressed), currentRow);
      }

      this.setState({mouseY: mouseY, order: newOrder});
    }
  }

  handleMouseUp = () => {
    this.setState({ isPressed: false, topDeltaY: 0 })
  }

  range = (items) => {
    return Array.from({ length: items.length }, (_, i) => i )
  }

  setInitialOrder = () => {
    const { navs } = this.props
    this.setState({ order: this.range(navs), navs })
  }

  swapVisible = (id) => {
    const { navs } = this.state
    this.setState({
      navs: navs.map( n => {
        if (n.id === id) {
          return {
            ...n,
            visible: !n.visible
          }
        }
        return n
      })
    })
  }

  icon = ({ visible, id }) => { 
    let name = 'cancel'
    let color = 'black'
    if (!visible) {
      name = 'eye'
      color = null
    }

    color = { color }

    return <Icon name={name} {...color} onClick={() => this.swapVisible(id)} />
  }

  calcTop = () => {
    const { navs } = this.state
    return ( navs.length + 1 ) * 38
  }

  updateNavs = () => {
    const { order, navs: navState } = this.state
    const { dispatch, course } = this.props
    const navs = order.map( (navI, i) => {
      const nav = navState[navI]
      return { ...nav, priority: i }
    })

    axios.put(`/api/courses/${course.id}/update_course_navs`, { navs })
      .then( res => dispatch(updateCourseNavs(navs, res.headers)) )
  }

  render() {
    const { navs } = this.state
    const {mouseY, isPressed, originalPosOfLastPressed, order} = this.state
    const springConfig = { stiffness: 300, damping: 50 } 

    return (
      <SettingsContainer>
        <MotionContainer>
          { this.range(navs).map( i => {
              const style = originalPosOfLastPressed === i && isPressed
              ? {
                  scale: spring(1.1, springConfig),
                  shadow: spring(16, springConfig),
                  y: mouseY,
                }
              : {
                  scale: spring(1, springConfig),
                  shadow: spring(1, springConfig),
                  y: spring(order.indexOf(i) * 40, springConfig)
                }
                return (
                  <Motion style={style} key={i}>
                    { ({ scale, shadow, y }) => 
                      <Item
                        onMouseDown={this.handleMouseDown.bind(null,i,y) }
                        onTouchStart={this.handleTouchStart.bind(null,i,y) }
                        shadow={shadow}
                        y={y}
                        i={i}
                        scale={scale}
                        originalPosOfLastPressed={originalPosOfLastPressed}
                        visible={navs[i].visible}
                      >
                        <div>
                          { navs[i].name }
                        </div>
                        <Pointer>
                          { this.icon(navs[i]) }
                        </Pointer>
                      </Item>
                    }
                  </Motion>
                )
            })
          }
        </MotionContainer>
        <Flex alignSelf="flex-end" paddingTop={this.calcTop()}>
          <Button 
            onClick={this.setInitialOrder}
          >
            Reset
          </Button>
          <CommonButton
            onClick={this.updateNavs}
          >
            Save
          </CommonButton>
        </Flex>
      </SettingsContainer>
    )
  }
}

const mapStateToProps = (state) => {
  const { course } = state
  const navs = state.course.navs || []
  return { navs, course }
}

export default connect(mapStateToProps)(CourseNavSettings)
