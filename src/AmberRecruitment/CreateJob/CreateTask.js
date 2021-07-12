import React, { Component } from "react";
import { MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import './style/CreateTask.css';
import fire from "../Firebase/context";
import showNotification from "../notifications";

export default class CreateTask extends Component {

    state = {
        taskTitle: '',
        taskSubTitle: '',
        taskEstimate: '',
        taskDescription: ''
    }

    handleTaskTitle = (e) => {

        this.setState({
            taskTitle: e.target.value
        })
    }

    handleTaskSubTitle = (e) => {

        this.setState({
            taskSubTitle: e.target.value,
        })
    }

    handleTaskEstimate = (e) => {

        this.setState({
            taskEstimate: e.target.value
        })
    }

    handleTaskDescription = (e) => {

        this.setState({
            taskDescription: e.target.value
        })
    }

    handleSubmitJob = (e) => {
        e.preventDefault();

        let requiredFields = document.getElementById('create-task-required-fields');

        let { taskTitle, taskSubTitle, taskEstimate, taskDescription } = this.state;

        if (taskTitle !== '' && taskSubTitle !== '' && taskEstimate && taskDescription !== '') {

            fire.firestore().collection('jobs').add({
                taskTitle,
                taskSubTitle,
                taskEstimate,
                taskDescription

            }).then(res => {
                console.log(res);
                showNotification('Task added: ', taskTitle, taskSubTitle, taskEstimate, taskDescription);

            }).catch(err => {
                console.log(err.message);

            })

        } else {
            requiredFields.style.color = 'red';
            requiredFields.textContent = 'All Fields Required';
        }
    }

    enterPressed = (e) => {
        if (e.key === 'Enter') {
            this.handleSubmitJob(e);
        }
    }

    componentWillUnmount() {

        console.log('Job Umounting');
    }

    render() {
        return (
            <MDBCol lg="6" id='create-job'>
                <form>
                    <p className="h5 text-center mb-4">Create a task</p>
                    <div className="grey-text">
                        <MDBInput onChange={this.handleTaskTitle} label="Type a task title" group type="text"
                            id='task-title' validate error="wrong"
                            success="right" />
                        <MDBInput onChange={this.handleTaskSubTitle} label="Type a task subtitle" group type="text"
                            id="task-subtitle" validate error="wrong" />
                        <MDBInput onChange={this.handleTaskEstimate} label="Estimate" group type="text"
                            id="task-estimate" validate error="wrong" />
                        <MDBInput onChange={this.handleTaskDescription} label="Job details" group id='task-description'
                            type="textarea" rows="5" onKeyPress={this.enterPressed} />
                        <p id="create-task-required-fields" />
                    </div>
                    <div className="text-center">
                        <MDBBtn onClick={this.handleSubmitJob}>Create</MDBBtn>
                    </div>
                </form>
            </MDBCol>
        );
    };
}
