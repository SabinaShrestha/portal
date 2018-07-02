import React from 'react'
import { connect } from 'react-redux'
import { Motion, spring } from 'react-motion'
import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'
import { Pointer } from './styles/CommonStyles'

const MotionContainer = styled.div`
  width: 100%;
  padding-left: 10px;
  display: flex;
  justify-content: center;
`

const Item = styled.div`
  position: absolute;
  background-color: ${ props => props.theme.primary };
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
`

class CourseNavSettings extends React.Component {
  state = {
    topDeltaY: 0,
    mouseY: 0,
    isPressed: false,
    originalPosOfLastPressed: 0,
    order: [],
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
    this.setState({ order: this.range(navs) })
  }

  icon = ({ visible, id }) => { 
    let name = 'cancel'
    let color = 'black'
    if (!visible) {
      name = 'eye'
      color = 'white'
    }

    return <Icon name={name} color={color} />
  }

  render() {
    const { navs } = this.props
    const {mouseY, isPressed, originalPosOfLastPressed, order} = this.state
    const springConfig = { stiffness: 300, damping: 50 } 

    return (
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
                      style={{
                        boxShadow: `rgba(0, 0, 0, 0.2) 0px ${shadow}px ${2 * shadow}px 0px`,
                        transform: `translate3d(0, ${y}px, 0) scale(${scale})`,
                        zIndex: i === originalPosOfLastPressed ? 99 : i,
                      }}
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
    )
  }
}

const mapStateToProps = (state) => {
  const navs = state.course.navs || []
  return { navs }
}

export default connect(mapStateToProps)(CourseNavSettings)
