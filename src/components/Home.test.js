import React from 'react';
import ReactDOM from 'react-dom';
import ConnectedHomePage, {HomePage} from './HomePage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<HomePage />, div);
});
