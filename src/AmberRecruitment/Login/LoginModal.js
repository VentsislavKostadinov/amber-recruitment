import React, {Component} from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBModal, MDBModalHeader} from 'mdbreact';
import fire from "../Firebase/context";

import './style/LoginModal.css';

import showNotification from "../notifications";

    export default class LoginModal extends Component {

        constructor(props) {
            super(props);
            this.state = {
                modal: false,
                userEmail: '',
                userPassword: '',

            }
        }

        // Toggle modal button
        toggle = () => {
            this.setState({
                modal: !this.state.modal
            });
        }

        handleUserEmail = (e) => {

            this.setState({
                userEmail: e.target.value
            })
        }

        handleUserPassword = (e) => {
            this.setState({
                userPassword: e.target.value
            })
        }


        handleSubmit = (e) => {
            e.preventDefault();

            // Checks for empty values
            const {userEmail, userPassword} = this.state;

            if (userEmail === '' || userPassword === '') {
                let errorLogin = document.getElementById('error-login');
                errorLogin.style.color = 'red';
                errorLogin.style.textAlign = 'center';
                errorLogin.textContent = 'All values are required';
                return;
            }

            let wrongPassword = document.getElementById('wrong-login-password');

           fire.auth().signInWithEmailAndPassword(userEmail, userPassword)
                .then((response) => {
                    console.log(response);

                    // get uid of the user
                    //console.log(response.user.uid);

                    showNotification('Successful login, ', userEmail)

                })
                .catch(error => {
                    wrongPassword.style.color = 'red';
                    wrongPassword.textContent = error.message;
                })
        }

        enterPressed = (e) => {
            if (e.key === 'Enter') {
                this.handleSubmit(e);
            }
        }

        render() {

            return (
                <MDBContainer id='modal-login'>
                    <MDBRow>
                        <MDBBtn onClick={this.toggle}>Sign in</MDBBtn>
                        <MDBModal isOpen={this.state.modal} toggle={this.toggle}><br/>
                            <MDBModalHeader toggle={this.toggle}>Sign in</MDBModalHeader>
                            <MDBCol>
                                <form>
                                    <div className='text-left'>
                                        <MDBInput onChange={this.handleUserEmail} label="Type your email"
                                                  id='signInUser'
                                                  icon="envelope" group type="email"
                                                  validate error="wrong"
                                                  success="right"/>
                                        <MDBInput onChange={this.handleUserPassword} label="Type your password"
                                                  id='signInPassword' icon="lock" group
                                                  type="password" onKeyPress={this.enterPressed} validate/>
                                        <p id='error-login'/>
                                        <p id='wrong-login-password'/>
                                    </div>
                                    <div className="text-center">
                                        <MDBBtn onClick={this.handleSubmit}>Login</MDBBtn>
                                    </div>
                                </form>
                            </MDBCol>
                        </MDBModal>
                    </MDBRow>
                </MDBContainer>
            );
        }
    }

