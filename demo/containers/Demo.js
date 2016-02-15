import React, { Component } from 'react';

import Dashboard from '../components/Dashboard';
import Crossfilter from '../components/crossfilter';
import titanic from '../data/titanic';

export default class Demo extends Component {
  render() {
    const attributes = [
      {
        type     : 'linear',
        name     : 'Age',
        dimension: row => +row.age
      },
      {
        type     : 'ordinal',
        name     : 'Boat',
        dimension: row => +row.boat // heh
      },
      {
        type     : 'ordinal',
        name     : 'Class',
        dimension: row => row.pclass
      },
      {
        type     : 'ordinal',
        name     : 'Gender',
        dimension: row => row.sex
      },
      {
        type     : 'ordinal',
        name     : 'Survived?',
        dimension: row => row.survived
      },
      {
        type     : 'ordinal',
        name     : 'Age available in data?',
        dimension: row => row.age !== null
      }
    ];

    return (
      <div>
        <Crossfilter data={titanic} attributes={attributes}>
          <Dashboard />
        </Crossfilter>
      </div>
    );
  }
}
