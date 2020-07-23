import React, {Component} from "react";
import {MDBCol, MDBInput, MDBBtn} from 'mdbreact';
import './style/CreateJob.css';
import fire from "../Firebase/context";
import showNotification from "../notifications";

export default class CreateJob extends Component {

        state = {
            jobTitle: '',
            jobDescription: ''
        }


    handleJobTitle = (e) => {

        this.setState({
            jobTitle: e.target.value
        })
    }

    handleJobDescription = (e) => {

        this.setState({
            jobDescription: e.target.value
        })
    }

    handleSubmitJob = (e) => {
        e.preventDefault();

        let {jobTitle, jobDescription} = this.state;

        if (jobTitle !== '' && jobDescription !== '') {

            fire.firestore().collection('jobs').add({
                jobTitle,
                jobDescription

            }).then(res => {
                console.log(res);
                showNotification('Data added', '');

            }).catch(err => {

                console.log(err.message);
            })

        }
    }

    render() {

        return (
            <MDBCol lg="6" id='create-job'>
                <form>
                    <p className="h5 text-center mb-4">Post a new job</p>
                    <div className="grey-text">
                        <MDBInput onChange={this.handleJobTitle} label="Type a new job title" group type="text"
                                  id='job-title' validate error="wrong"
                                  success="right"/>
                        <MDBInput onChange={this.handleJobDescription} label="Job details" group id='job-description'
                                  type="textarea" rows="5"/>
                    </div>
                    <div className="text-center">
                        <MDBBtn onClick={this.handleSubmitJob}>Post</MDBBtn>
                    </div>
                </form>
            </MDBCol>
        );
    };
}
