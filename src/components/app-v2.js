import React, { Component } from 'react';
import axios from 'axios';

import BarChart from './bar_chart';

const DATA_URL = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    }
  }
  componentDidMount() {
    var _this = this;
    this.serverRequest = axios.get(DATA_URL).then((result) => {
      _this.setState({
        data: result.data
      });
    })
  }
   render() {
     return (
      <div className='App'>
        <div className="row">
          <div className="col-lg-12">
            <h1>{this.state.data.name}</h1>
            <p>Source: <strong>{this.state.data.source_name}</strong></p>
            { Object.keys(this.state.data).length === 0 ? null : <BarChart data={this.state.data.data} size={[1000,500]} /> }
            <div className="notes">{this.state.data.description}</div>
          </div>
        </div>
      </div>
     )
   }
};
