import { BrowserRouter as Router } from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { RaterProject } from './RaterProject';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <RaterProject />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);