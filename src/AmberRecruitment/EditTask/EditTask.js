import React from 'react';
import TaskList from '../TaskList/TaskList';
import { MDBCol, MDBBtn, MDBInput, MDBNavLink } from 'mdbreact';

export default function EditTask(props) {

    let test = props.pushedData;
    
    console.log(test);


    return (
        <MDBCol lg="6" id='edit-job' style={{margin: 'auto', marginTop: '40px'}}>
        <form>
            <p className="h5 text-center mb-4">Edit task</p>
            <div className="grey-text">
                <MDBInput  label="Type a task title" group type="text"
                    id='task-title-edit' validate error="wrong"
                    success="right" />
                <MDBInput label="Type a task subtitle" group type="text"
                    id="task-subtitle-edit" validate error="wrong" />
                <MDBInput label="Estimate" group type="text"
                    id="task-estimate-task" validate error="wrong" />
                <MDBInput label="Task details" group id='task-description-edit'
                    type="textarea" rows="5" />
                <p id="create-task-required-fields" />
            </div>
            <div className="text-center">
            <MDBNavLink to='tasks'>
            <MDBBtn>Cancel</MDBBtn>
            </MDBNavLink>
            <MDBBtn>Edit</MDBBtn>
                
            </div>
        </form>
</MDBCol> 
    )
}