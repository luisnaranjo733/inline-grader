import React from 'react';
import ReactDOM from 'react-dom';
import {Home} from './App';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Home />, div);
});

it('sums', () => {
  var x = 1+1;
});
