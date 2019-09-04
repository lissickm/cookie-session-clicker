import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  state = {
    clickCount: 0,
    usernameIsEditable: false,
    username: ''
  }

  componentDidMount() {
    this.getCount();
  }

  handleClick = () => {
    axios.post('/add-click')
      .then(() => this.getCount())
      .catch(error => {
        console.log('error making add click post', error);
      });
  }

  getCount = () => {
    axios.get('/get-clicks')
      .then(response => {
        this.setState({
          clickCount: response.data.totalClicks,
        });
      })
      .catch(error => {
        console.log('error making add click post', error);
      });
  }

  getUsername = () => {
    axios.get('/get-username')
      .then(response => {
        this.setState({
          username: response.data.newUsername,
        });
      })
      .catch(error => {
        console.log('error making add username post', error);
      });
  }

  handleNewEntry = (propertyName, event) => {
    console.log("in handle new entry");
    // const newUsername = this.state.username
    // document.cookie = `username=${newUsername}`
    this.setState({
      ...this.state,
      [propertyName]: event.target.value
    })
    console.log(this.state);
  }

  editUsername = () => {
    this.setState({
      usernameIsEditable: true,
    });
  }

  saveUsername = () => {
    this.setState({
      usernameIsEditable: false,
    });
    axios.post('/add-username')
      .then(() => this.getUsername())
      .catch(error => {
        console.log('error making add click post', error);
      });

  }

  render() {
    return (
      <div>
        <center>
          <h1>Click the Cookie!!</h1>
          <pre>{JSON.stringify(this.state)}</pre>
          <p>
            Username:
            {this.state.username}
          </p>
          <div>
            {/* Username should go here */}
            {/* The next block of code is conditional rendering.
            Look at the documentation https://reactjs.org/docs/conditional-rendering.html
            if this is new to you. */}
            {this.state.usernameIsEditable ?
              <div>
                <input type='text' placeholder='add new username' onChange={(event) => { this.handleNewEntry('username', event) }} />
              
                <button onClick={this.saveUsername}>Save Username</button> 
              </div>:
              <button onClick={this.editUsername}>Edit Username</button>
             
            }
          </div>
          <p>{this.state.clickCount}</p>
          <span
            role="img"
            aria-label="cookie"
            style={{fontSize: '100px', cursor: 'pointer'}}
            onClick={this.handleClick}
          >
            🍪
          </span>
        </center>
      </div>
    );
  }
}

export default App;
