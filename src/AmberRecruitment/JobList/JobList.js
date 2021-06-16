import React, { Component } from 'react'
import { MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, } from 'mdbreact';
import fire from "../Firebase/context";

class JobList extends Component {
    constructor(props) {
        super(props);
        this.ref = fire.firestore().collection('jobs');
        this.unsubscribe = null;
        this.state = {
            currentJobs: []
        };
    }

    onCollectionUpdate = (querySnapshot) => {
        let currentJobs = [];
        querySnapshot.forEach((doc) => {
            const { jobTitle, jobDescription } = doc.data();
            currentJobs.push({
                key: doc.id,
                doc,
                jobTitle,
                jobDescription
            });
        });
        this.setState({
            currentJobs
        });

        console.log(currentJobs)
    }

    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    }

    render() {
     
        return (
            <MDBCol>
                {this.state.currentJobs.map(jobs =>
                    <MDBCard key={jobs.key} style={{ margin: '20px' }}>
                        <MDBCardBody>
                            <MDBCardTitle >{jobs.jobTitle}</MDBCardTitle>
                            <MDBCardText>
                                {jobs.jobDescription}
                            </MDBCardText>
                            <MDBBtn color="elegant" href="#">Find out more</MDBBtn>
                        </MDBCardBody>
                    </MDBCard>
                )}
            </MDBCol>
        );
    }
}
export default JobList;









