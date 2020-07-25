import React, { Component} from "react";
import fire from "../Firebase/context";
import {MDBContainer, MDBRow, MDBBtn} from 'mdbreact';
import showNotification from "../notifications";

export default class SignOut extends Component {

    logout = ()=> {

        fire.auth().signOut()
            .then(() => {
                showNotification('Successful logout', '')
            })
            .catch(err => {
                console.log(err);
            })

    }

    render() {

        return (
            <MDBContainer id= 'modal-singOut'>
                <MDBRow>
                    <MDBBtn onClick={this.logout}>Sign out</MDBBtn>
                </MDBRow>
            </MDBContainer>
        )
    }

}