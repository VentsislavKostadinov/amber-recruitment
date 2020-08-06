import React, {Component} from 'react'
import {
    MDBCol,
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBContainer,
    MDBModal,
    MDBModalHeader,
    MDBModalFooter
} from 'mdbreact';
import fire from "../Firebase/context";

let currentId = null;

export default class JobList extends Component {

    constructor(props) {
        super(props);
        this.ref = fire.firestore().collection('jobs');
        this.unsubscribe = null;
        this.state = {
            currentJobList: []
        };
        this.user = {}
        this.modal = false;
    }


    onCollectionUpdate = (querySnapshot) => {
        let currentJobList = [];
        querySnapshot.forEach(doc => {
            const {jobTitle, jobDescription} = doc.data();
            currentJobList.push({
                key: doc.id,
                doc,
                jobTitle,
                jobDescription
            });

            currentId = doc.id;
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
        this.authListener()
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

    onToggleModal = (e) => {
        e.preventDefault();
        this.setState({
            modal: !this.state.modal
        })
    }

    onDelete = (e) => {
        e.preventDefault();

        fire.firestore().collection('jobs').doc(currentId).delete()
            .then(() => {
                console.log('Document successfully deleted!');

            }).catch(error => {
            console.log('Error removing ', error.message);
        })

    }

    render() {
        let deleteJob = <div><a href="/#" className="close" data-dismiss="alert" aria-label="close"
                                style={{color: 'red'}} onClick={this.onToggleModal} id={currentId}>&times;</a></div>
        return (
            <MDBCol>
                {this.state.currentJobList.map(job =>
                    <MDBCard  key={job.key} style={{margin: '20px'}}>
                        <MDBCardBody>{this.state.user ? deleteJob : null}
                            <MDBCardTitle>{job.jobTitle}</MDBCardTitle>
                            <MDBCardText>
                                {job.jobDescription}
                            </MDBCardText>
                            <MDBBtn color="elegant" href="#">Find out more</MDBBtn>
                        </MDBCardBody>
                    </MDBCard>
                )}
                <MDBContainer className='confirmDelete'>
                    <MDBModal isOpen={this.state.modal} toggle={this.onToggleModal}>
                        <MDBModalHeader toggle={this.onToggleModal}>Confirm Delete!</MDBModalHeader>
                        <MDBModalFooter>
                            <MDBBtn color="black" onClick={this.onToggleModal}>Cancel</MDBBtn>
                            <MDBBtn color="danger" onClick={this.onDelete}>Delete</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>
                </MDBContainer>
            </MDBCol>
        );
    }
}










