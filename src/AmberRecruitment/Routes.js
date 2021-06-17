import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from "./Home/Home";
import CreateJob from "./CreateJob/CreateJob";
import JobList from "./JobList/JobList";
import JobDescription from './JobDescription/JobDescription';
import NotFoundPage from "./NotFoundPage/NotFoundPage";

export default class Routes extends Component {

    render() {
        return (
            <div>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/jobs/' component={JobList}/>
                   {/* <Route path="/jobs/:id" component={JobListId}/> */}
                    <Route path='/create-a-job/' component={CreateJob}/>
                    <Route path='/job-description/' component={JobDescription}/>
                    <Route component={NotFoundPage}/>
                </Switch>
            </div>
        )
    }
}