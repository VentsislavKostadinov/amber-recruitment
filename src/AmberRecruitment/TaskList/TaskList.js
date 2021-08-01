import React, { Component } from "react";
import { MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBNavLink, MDBInput, MDBContainer, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter } from "mdbreact";
import EditTask from "../EditTask/EditTask";
import fire from "../Firebase/context";
import showNotification from "../notifications";

export default class TaskList extends Component {
    constructor(props) {
        super(props);
        this.ref = fire.firestore().collection("jobs");
        this.unsubscribe = null;

        this.state = {
            currentJobList: [],
            user: {},
            clickedJob: '',
            pushedData: [],
            showEditModal: false
        };
    }

    onCollectionUpdate = (querySnapshot) => {
        let currentJobList = [];
        querySnapshot.forEach((doc) => {
            const { taskTitle, taskSubTitle, taskEstimate, taskDescription } =
                doc.data();

            currentJobList.push({
                key: doc.id,
                doc,
                taskTitle,
                taskSubTitle,
                taskEstimate,
                taskDescription,
                checked: true,
            });
        });
        this.setState({
            currentJobList,
        });
    };
    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
        this.authListener();
    }

    componentWillMount() {
        // this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
        this.authListener();
    }

    authListener = () => {
        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user });

                // user.getIdTokenResult().then(idTokenResult => {
                //     console.log(idTokenResult.claims.admin);
                // })
            } else {
                this.setState({ user: null });
            }
        });
    };

    onDelete = (id) => {
        fire
            .firestore()
            .collection("jobs")
            .doc(id)
            .delete()
            .then(() => {
                console.log("Document successfully added!");
                showNotification("Successfully deleted", "");
            })
            .catch((error) => {
                console.log("Error removing ", error.message);
            });
    };

    findOutMore = (clickedTask) => {

        let clickedJob = this.state.clickedJob;
        clickedJob = clickedTask
        this.setState({ clickedJob: clickedJob });
        console.log(clickedJob);

        let pushedData = this.state.pushedData;
        pushedData.push(clickedTask)
        console.log(pushedData);


    };

    toggle = () => {
        this.setState({ showEditModal: !this.state.showEditModal })
    }

    handleChange = (e) => {
        console.log(e.target.value);

        this.setState({ checked: !this.state.checked });
        console.log(!this.state.checked);
    };

    render() {
        return (
            <MDBRow className="d-flex justify-content-center">
                <MDBCol lg="6" md="8" sm="10">
                    {this.state.currentJobList.map((job) => (
                        <MDBCard key={job.key} style={{ margin: "20px" }} id={job.doc.id}>
                            <MDBCardBody>
                                <MDBCardTitle>
                                    <i className="fas fa-tasks"></i> {job.taskTitle}
                                </MDBCardTitle>
                                <MDBCardText>
                                    <i className="fas fa-book-reader"></i>{" "}
                                    <b>{job.taskSubTitle}</b>
                                </MDBCardText>
                                <MDBCardText>
                                    <i className="fas fa-hourglass"></i> <b>{job.taskEstimate}</b>
                                </MDBCardText>
                                <MDBCardText>
                                    <i className="fas fa-info-circle"></i> {job.taskDescription}
                                </MDBCardText>

                                {this.state.user ? (
                                    <div>
                                        <MDBContainer id='modal-edit'>
                                            <MDBRow>
                                                <MDBBtn color="info" onClick={() => this.findOutMore(job)} onClick={this.toggle}>Edit</MDBBtn>
                                                <MDBBtn color="green" onClick={() => this.onDelete(job.doc.id)}>Complete</MDBBtn>
                                                <MDBModal isOpen={this.state.showEditModal} toggle={this.toggle}><br />
                                                    <MDBModalHeader toggle={this.toggle}>Edit task</MDBModalHeader>
                                                    <MDBCol lg="12" id='edit-task'>
                                                        <form>
                                                          
                                                            <div className="grey-text">
                                                                <MDBInput  label="Type a task title" group type="text" value={job.taskTitle}
                                                                    id='task-title' validate error="wrong"
                                                                    success="right" />
                                                                <MDBInput  label="Type a task subtitle" group type="text" value={job.taskSubTitle}
                                                                    id="task-subtitle" validate error="wrong" />
                                                                <MDBInput  label="Estimate" group type="text" value={job.taskEstimate}
                                                                    id="task-estimate" validate error="wrong" />
                                                                <MDBInput  label="Task details" group id='task-description' value={job.taskDescription}
                                                                    type="textarea" rows="5" />
                                                                <p id="create-task-required-fields" />
                                                            </div>
                                                            <div className="text-center">
                                                                <MDBBtn>Edit</MDBBtn>

                                                            </div>
                                                        </form>
                                                    </MDBCol>
                                                </MDBModal>


                                            </MDBRow>
                                        </MDBContainer>
                                        
                                    </div>
                                ) : null}

                            </MDBCardBody>
                        </MDBCard>
                    ))
                    }
                </MDBCol>
            </MDBRow >
        );
    }
}
