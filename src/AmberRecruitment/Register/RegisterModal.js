import React, {Component} from "react";
import {MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput, MDBModal, MDBModalHeader} from 'mdbreact';
import fire from "../Firebase/context";
import './style/RegisterModal.css';

import showNotification from "../notifications";

export default class RegisterModal extends Component {
    state = {
        modal: false,
        registerUserEmail: '',
        registerPassword: '',
        confirmPassword: ''
    }
    // Toggle modal button
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    handleRegisterUserEmail = (e) => {

        this.setState({
            registerUserEmail: e.target.value
        })
    }

    handleRegisterUserPassword = (e) => {
        this.setState({
            registerPassword: e.target.value
        })
    }

    handleConfirmRegisterPassword = (e) => {
        this.setState({
            confirmPassword: e.target.value
        })
    }

    handleSubmitRegister = (e) => {
        e.preventDefault();

        // Checks for empty values
        let {registerUserEmail, registerPassword, confirmPassword} = this.state;

        if (registerUserEmail === '' || registerPassword === '' || confirmPassword === '') {
            let errorRegister = document.getElementById('error-register');
            errorRegister.style.color = 'red';
            errorRegister.style.textAlign = 'center';
            errorRegister.textContent = 'All values are required';
            return;
        }

        // If passwords don't match
        if (registerPassword !== confirmPassword) {
            let wrongPasswords = document.getElementById('wrong-passwords');
            wrongPasswords.style.color = 'red';
            wrongPasswords.style.textAlign = 'center';
            wrongPasswords.textContent = 'Passwords not match';
            return;
        }


        fire.auth().createUserWithEmailAndPassword(registerUserEmail, registerPassword)
            .then(response => {
                console.log(response);

                showNotification('Successful sign up, ', registerUserEmail);

            })
            .catch(error => {
                console.log(error)
                let passwordLength = document.getElementById('passwords-length');
                passwordLength.style.color = 'red';
                passwordLength.style.textAlign = 'center';
                passwordLength.textContent = error;
            });
    }

    enterPressed = (e) => {
        if (e.key === 'Enter') {
            this.handleSubmitRegister(e);
        }
    }

    render() {
        return (
            <MDBContainer id='modal-register'>
                <MDBRow>
                    <MDBBtn onClick={this.toggle}>Register</MDBBtn>
                    <MDBModal isOpen={this.state.modal} toggle={this.toggle}><br/>
                        <MDBModalHeader toggle={this.toggle}>Register</MDBModalHeader>
                        <MDBCol>
                            <form>
                                <div className='text-left'>
                                    <MDBInput onChange={this.handleRegisterUserEmail} label="Type your email"
                                              id='registerUser' icon="envelope" group type="email"
                                              validate error="wrong"
                                              success="right" required/>
                                    <MDBInput onChange={this.handleRegisterUserPassword} label="Type your password"
                                              id='registerPassword' icon="lock" group
                                              type="password" validate required/>
                                    <MDBInput onChange={this.handleConfirmRegisterPassword} label="Confirm password"
                                              id='confirmPassword' icon="lock" group
                                              type="password" onKeyPress={this.enterPressed} validate required/>
                                    <p id='error-register'/>
                                    <p id='wrong-passwords'/>
                                    <p id='passwords-length'/>
                                    <p>Password should be at least 6 characters</p>
                                </div>
                                <div className="text-center">

                                    <MDBBtn onClick={this.handleSubmitRegister}>Register</MDBBtn>
                                </div>
                            </form>
                        </MDBCol>
                    </MDBModal>
                </MDBRow>
            </MDBContainer>
        );
    }
};
