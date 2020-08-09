import React, {Component} from 'react'
import {
    MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText
} from 'mdbreact';
import fire from "../Firebase/context";
import showNotification from "../notifications";



export default class JobList extends Component {

    constructor(props) {
        super(props);
        this.ref = fire.firestore().collection('jobs');
        this.unsubscribe = null;
        this.state = {
            currentJobList: [],

        };
        this.user = {}

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

    //  onToggleModal = (e) => {
    //   e.preventDefault();
    //   this.setState({
    //       modal: !this.state.modal
    //   })

    //}

    onDelete = (id) => {


        fire.firestore().collection('jobs').doc(id).delete()
            .then(() => {
                console.log('Document successfully deleted!');
                showNotification('Successfully deleted', '')

            }).catch(error => {
            console.log('Error removing ', error.message);
        })
    }


    render() {

        //  let deleteJob = <div><a href="/#" className="close" data-dismiss="alert" aria-label="close"
        //                          style={{color: 'red'}} onClick={this.onToggleModal}>&times;</a></div>;

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
                            <MDBCardText>{job.jobDescription}</MDBCardText>
                            <MDBBtn color="elegant" href="#">Find out more</MDBBtn>
                        </MDBCardBody>

                    </MDBCard>
                )}


            </MDBCol>
        );
    }
}