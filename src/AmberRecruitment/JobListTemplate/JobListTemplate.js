import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import './style/JobListTemplate.css'

function JobListTemplate() {
    return (
        <MDBCol className= 'job-list-template'>
            <MDBCard>
                <MDBCardBody>
                    <MDBCardTitle>Tech Lead / .Net Developer .Net .NetCore, C# ASP.NET MVC</MDBCardTitle>
                    <MDBCardText>I am looking for a senior .NET developer with experience in leadership for a forward-thinking FinTech company based in the heart of Amsterdam. You will head up the Microsoft .NET team, shaping the way the team is built and they technologies they will be using.
                        They prioritise modern tech, so .NET Core, Azure and Blazor will all form a large part of their vision...</MDBCardText>
                    <MDBBtn href="#">Find out more</MDBBtn>
                </MDBCardBody>
            </MDBCard>
        </MDBCol>
    )
}

export default JobListTemplate;
