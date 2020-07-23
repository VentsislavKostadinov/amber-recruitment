import React, { Component } from 'react'
import { MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, } from 'mdbreact';
import fire from "../Firebase/context";

class JobList extends Component {
    constructor(props) {
        super(props);
        this.ref = fire.firestore().collection('jobs');
        this.unsubscribe = null;
        this.state = {
            boards: []
        };
    }

    onCollectionUpdate = (querySnapshot) => {
        const boards = [];
        querySnapshot.forEach((doc) => {
            const { jobTitle, jobDescription } = doc.data();
            boards.push({
                key: doc.id,
                doc,
                jobTitle,
                jobDescription
            });
        });
        this.setState({
            boards
        });
    }

    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    }

    render() {
        return (
            <MDBCol>
                {this.state.boards.map(board =>
                    <MDBCard key={board.key} style={{ margin: '20px' }}>
                        <MDBCardBody>
                            <MDBCardTitle >{board.jobTitle}</MDBCardTitle>
                            <MDBCardText>
                                {board.jobDescription}
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









