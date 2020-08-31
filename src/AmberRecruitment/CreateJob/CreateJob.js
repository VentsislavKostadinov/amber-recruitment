import React, { Component } from "react";
import { MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import './style/CreateJob.css';
import fire from "../Firebase/context";
import showNotification from "../notifications";

export default class CreateJob extends Component {

    state = {
        jobTitle: '',
        jobSalary: '',
        jobLocation: '',
        jobDescription: ''
    }

    handleJobTitle = (e) => {

        this.setState({
            jobTitle: e.target.value
        })
    }

    handleJobSalary = (e) => {

        this.setState({
            jobSalary: e.target.value,
        })
    }

    handleJobLocation = (e) => {

        this.setState({
            jobLocation: e.target.value
        })
    }

    handleJobDescription = (e) => {

        this.setState({
            jobDescription: e.target.value
        })
    }

    handleSubmitJob = (e) => {
        e.preventDefault();

        let requiredFields = document.getElementById('create-job-required-fields');

        let { jobTitle, jobSalary, jobLocation, jobDescription } = this.state;

        if (jobTitle !== '' && jobSalary !== '' && jobLocation && jobDescription !== '') {

            fire.firestore().collection('jobs').add({
                jobTitle,
                jobSalary,
                jobLocation,
                jobDescription

            }).then(res => {
                console.log(res);
                showNotification('Job added: ', jobTitle, jobSalary, jobLocation, jobDescription);

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
                    <p className="h5 text-center mb-4">Post a new job</p>
                    <div className="grey-text">
                        <MDBInput onChange={this.handleJobTitle} label= "Type a new job title" group type="text"
                            id='job-title' validate error="wrong"
                            success="right" />
                        <MDBInput onChange={this.handleJobSalary} label="Type an expected salary" group type="text"
                            id="job-salary" validate error="wrong" />
                              <MDBInput onChange={this.handleJobLocation} label="Type a location" group type="text"
                            id="job-salary" validate error="wrong" />
                        <MDBInput onChange={this.handleJobDescription} label="Job details" group id='job-description'
                            type="textarea" rows="5" onKeyPress={this.enterPressed} />
                        <p id="create-job-required-fields" />
                    </div>
                    <div className="text-center">
                        <MDBBtn onClick={this.handleSubmitJob}>Post</MDBBtn>
                    </div>
                </form>
            </MDBCol>
        );
    };
}
