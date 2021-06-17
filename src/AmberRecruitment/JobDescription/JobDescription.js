//import React from 'react';

/*const JobDescription = (props) => {
    

    return(
        <div>
            <h2></h2>
        </div>
    )
}

export default JobDescription; */

import * as React from 'react';
import { Component } from 'react'
import JobList from '../JobList/JobList';

class JobDescription extends Component {

    render() {

        return <div>
            <JobList message="Hello " />
        </div>;
    }
}

export default JobDescription;