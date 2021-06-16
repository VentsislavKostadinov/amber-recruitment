import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from 'mdbreact';
import fire from "../Firebase/context";
import showNotification from "../notifications";


export default class JobList extends Component {

    constructor(props) {
        super(props);
        this.ref = fire.firestore().collection('jobs');
        this.unsubscribe = null;

        this.state = {
            currentJobList: [],
            user: {}
        }
    }

    onCollectionUpdate = (querySnapshot) => {
        let currentJobList = [];
        querySnapshot.forEach(doc => {
            const {jobTitle, jobSalary, jobLocation, jobDescription} = doc.data();
            currentJobList.push({
                key: doc.id,
                doc,
                jobTitle,
                jobSalary,
                jobLocation,
                jobDescription
            });
        });
        this.setState({
            currentJobList
        });
    }
    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
        this.authListener();
    }

    componentWillMount() {
         this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
       this.authListener();
    }

    authListener = () => {
        fire.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({user});

            } else {
                this.setState({user: null});
            }
        })
    }

    onDelete = (id) => {
        fire.firestore().collection('jobs').doc(id).delete()
            .then(() => {
                console.log('Document successfully added!');
                showNotification('Successfully deleted', '')

            }).catch(error => {
            console.log('Error removing ', error.message);
        })
    }

    render() {
        return (
            <MDBCol>
                {this.state.currentJobList.map(job =>
                    <MDBCard key={job.key} style={{margin: '20px'}} id={job.doc.id}>
                        <MDBCardBody>
                            {this.state.user ? (
                                <div><a href="/#" className="close" data-dismiss="alert" aria-label="close"
                                        style={{color: 'red'}} onClick={() => this.onDelete(job.doc.id)}>&times;</a>
                                </div>) : null}
                            <MDBCardTitle>{job.jobTitle}</MDBCardTitle>
                            <MDBCardText><i className ="fas fa-pound-sign"></i> <b>{job.jobSalary}</b> per annum</MDBCardText>
                            <MDBCardText><i className="fas fa-map-marker-alt"></i> <b>{job.jobLocation}</b></MDBCardText>
                            <MDBCardText>{job.jobDescription}</MDBCardText>
                            <MDBBtn color="elegant" onClick={() => console.log(job.doc.id)}>Find out more</MDBBtn>
                        </MDBCardBody>
                    </MDBCard>
                )}
            </MDBCol>
        );
    }
}