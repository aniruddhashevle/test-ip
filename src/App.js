import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultIp: '',
      IPCountry: '',
      city: ''
    }
  }

  componentDidMount() {
    axios.get("https://ipv6.ip.nf/me.json")
      .then(resp => {
        if (resp && resp.status === 200 && resp.data && resp.data.ip.ip) {
          this.setState({ defaultIp: resp.data.ip.ip });
        }
      })
      .catch(err => {
        console.error('err', err);
      });
  }

  searchCountry = () => {
    axios.get(`https://ip.nf/${this.state.defaultIp}.json`)
      .then(resp => {
        if (resp && resp.status === 200 && resp.data && resp.data.ip.country) {
          this.setState({
            IPCountry: resp.data.ip.country,
            city: resp.data.ip.city
          });
        }
      })
      .catch(err => {
        console.error('err', err);
      });
  }

  onIPChange = (e) => {
    const expectedIP = e.target.value;
    this.setState({ defaultIp: expectedIP });
  }

  render() {
    const {
      IPCountry,
      city
    } = this.state;
    return (
      <div className="App">
        <div className="wrapper">
          <div className="form">
            <input
              name="ip"
              value={this.state.defaultIp}
              onChange={this.onIPChange}
            />
            <button
              onClick={this.searchCountry}
            >Next</button>
            <div className="info-wrapper">
              {
                IPCountry ?
                  <span className="country">{IPCountry}</span>
                  : null
              }
              {
                city ?
                  <span className="city">{city}</span>
                  : null
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
