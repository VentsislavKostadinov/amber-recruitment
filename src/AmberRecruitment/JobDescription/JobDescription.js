//import React from 'react';
//import { propTypes } from 'react-bootstrap/esm/Image';
//import JobList from '../JobList/JobList';


/*const JobDescription = (props) => {


return (
     
   <div>Empty</div>
    ) 
} 

export default JobDescription; */

import * as React from 'react';
import { Component } from 'react'
import JobList from '../JobList/JobList';

class JobDescription extends Component {


  render() {

    console.log(window.jobName)

    return (

      <div>
        <h2>{window.jobName.jobTitle}</h2>
      </div>
    )
  }
}

export default JobDescription;