import React, { Component } from 'react';
import axios from 'axios';

import storedData from './stored_data.json';
import BarChart from './bar_chart';

const DATA_URL = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: storedData.data
    }
  }
  componentDidMount() {
    var _this = this;
    this.serverRequest = axios.get(DATA_URL).then((result) => {
      _this.setState({
        // data: result.data
      });
    })
  }
   render() {
     return (
      <div className='App'>
        <div className="row">
          <div className="col-lg-12">
            <h1>{storedData.name}</h1>
            <p>Source: <strong>{storedData.source_name}</strong></p>
            <BarChart data={this.state.data} size={[1000,500]} />
            <div className="notes">{storedData.description}</div>
          </div>
        </div>
      </div>
     )
   }
};
