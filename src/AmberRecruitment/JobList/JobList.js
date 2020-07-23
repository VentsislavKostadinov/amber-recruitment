/* import React, { Component } from 'react'
import { MDBCol } from 'mdbreact';
import fire from "../Firebase/context";
import CreateJob from "../CreateJob/CreateJob";

let jobList = document.querySelector('.job-list');
let currentId;

export default class JobList extends Component {

    constructor(props) {
        super(props);
    }
  
    handleJobList = (data) => {
     
        if(data.length) {
      
            data.forEach(doc => {
                 
                let currentJobs = doc.data();
                
               
                jobList = `<div>
                <p>${currentJobs.jobTitle}</p>
                <p>${currentJobs.jobDescription}</p>
                </div>`


                //console.log(jobsData);
              //  currentId = doc.id; // get current uid
            
            
            });
        }
     

    }

    render() {

      let showJobs = fire.firestore().collection('jobs').onSnapshot(snapshot => {
        this.handleJobList(snapshot.docs);

    })

        return (
            <MDBCol className='job-list'>
                {showJobs}
             
            </MDBCol>
        )
    }

} */


import React, { Component } from 'react'
import { MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, } from 'mdbreact';
import fire from "../Firebase/context";
import CreateJob from "../CreateJob/CreateJob";

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









