import React from 'react';
import ReactDOM from 'react-dom';
import Board from '../Board/Board';
import '../../assets/index.css';

const App = (props) => (
  <div>
    <Board />
  </div>
);

// class App extends React.Component {
//   state = {users: []};
//   componentDidMount() {
//     fetch('/users')
//       .then(res => res.json())
//       .then(users => this.setState({users}));
//   }
//   render() {
//     return (
//       <div className="App">
//         <h1>Users</h1>
//         {this.state.users.map(user =>
//           <div key={user.id}>{user.username}</div>
//         )}
//       </div>
//     );
//   }
// }

export default App;
// ========================================

// ReactDOM.render(
//   <Game />,
//   document.getElementById('root')
// );
