// import React from 'react'
// import { Header, Container, Divider, List, Card } from 'semantic-ui-react'
// import { setHeaders } from './reducers/headers'

// class Attendance extends React.Component {
//   state = { column: null }

//   componentDidMount() {
//     axios.get('api/courses/:id/quiz')
//     .then( ({ data, headers }) => {
//       setHeaders(headers)
//       this.setState({ quizzes: data })
//     })
//     .catch( error => {
//       console.log(error.response);
//     });
//   }

//   //above this there is something wrong. this needs to be in redux - dispatch this and it'll work. 

//   render() {
//     const { column } = this.state
//     return (
//       <Container>
//         <Header as='h1'>
//           Attendance View
//         </Header>
//         <Divider/>
//         <List horizontal>
//           <List.Item>
//             Present
//           </List.Item>
//           <List.Item>
//             Absent 
//           </List.Item>
//           <List.Item>
//             Tardy
//           </List.Item>
//         </List>
//         <Divider/>
//         <Card>
//           <Card.Header>
//             Student Name
//           </Card.Header>  
//         </Card>
//       </Container>
//     )
//   }
  
// }

// export default Attendance

