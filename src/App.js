import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  state = {
    clickCount: 0,
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

  render() {
    return (
      <div>
        <center>
          <h1>Click the Cookie!!</h1>
          <p>
            Username:
            {/* Username should go here */}
            <button>Edit Username</button>
          </p>
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
