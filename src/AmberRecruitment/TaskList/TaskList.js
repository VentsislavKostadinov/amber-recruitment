import React, { Component } from 'react';
import { MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBNavLink, MDBRow } from 'mdbreact';
import fire from "../Firebase/context";
import showNotification from "../notifications";

export default class TaskList extends Component {


    constructor(props) {
        super(props);
        this.ref = fire.firestore().collection('jobs');
        this.unsubscribe = null;

        this.state = {
            currentJobList: [],
            user: {},
            clickedJob: []

        }
    }

    onCollectionUpdate = (querySnapshot) => {
        let currentJobList = [];
        querySnapshot.forEach(doc => {
            const { taskTitle, taskSubTitle, taskEstimate, taskDescription } = doc.data();

            currentJobList.push({
                key: doc.id,
                doc,
                taskTitle,
                taskSubTitle,
                taskEstimate,
                taskDescription,
                checked: true
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
       // this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
        this.authListener();
    }

    authListener = () => {
        fire.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({ user });

                // user.getIdTokenResult().then(idTokenResult => {
                //     console.log(idTokenResult.claims.admin);
                // })

            } else {
                this.setState({ user: null });
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

    findOutMore = (clickedJob) => {

        console.log(clickedJob);
        this.setState({ clickedJob: clickedJob })

    }

    handleChange = () => {

        this.setState({checked: !this.state.checked})

      
    }

    render() {

        return (

            <MDBRow className="d-flex justify-content-center">
                <MDBCol lg="6" md="8" sm="10">
                    {this.state.currentJobList.map(job =>
                        <MDBCard key={job.key} style={{ margin: '20px' }} id={job.doc.id}>
                            <MDBCardBody>

                          {/*  <input type="checkbox" className="custom-control-input" id="defaultUnchecked"  onChange={this.handleChange}/>
                                    <label className="custom-control-label" htmlFor="defaultUnchecked"></label>
                            */}
                                 
                                  {/*  Delete */}
                              {this.state.user ? (
                                    <div><a href="/#" className="close" data-dismiss="alert" aria-label="close"
                                        style={{ color: 'red' }} onClick={() => this.onDelete(job.doc.id)}>&times;</a>
                             </div>) : null} 

                                <MDBCardTitle><i className="fas fa-tasks"></i> {job.taskTitle}</MDBCardTitle>

                                <MDBCardText><i className="fas fa-book-reader"></i> <b>{job.taskSubTitle}</b></MDBCardText>
                                <MDBCardText><i className="fas fa-hourglass"></i> <b>{job.taskEstimate}</b></MDBCardText>
                                <MDBCardText><i className="fas fa-info-circle"></i> {job.taskDescription}</MDBCardText>
                                {/*<MDBNavLink to={`/job-description/${job.jobTitle}`}>
                                    <MDBBtn color="elegant" onClick={() => this.findOutMore(job)}>Find out more</MDBBtn>

                                </MDBNavLink> */}

                            </MDBCardBody>
                        </MDBCard>
                    )}
                </MDBCol>

            </MDBRow>

        );
    }
}
