import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from "./Home/Home";
import CreateTask from "./CreateJob/CreateTask";
import TaskList from './TaskList/TaskList';
import NotFoundPage from "./NotFoundPage/NotFoundPage";

export default class Routes extends Component {

    render() {
        return (
            <div>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/tasks/' component={TaskList}/>
                    <Route path='/create-a-task/' component={CreateTask}/>
                    <Route component={NotFoundPage}/>
                </Switch>
            </div>
        )
    }
}