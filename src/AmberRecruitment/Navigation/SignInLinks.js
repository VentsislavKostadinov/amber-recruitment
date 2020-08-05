import React, {Component} from "react";
import {MDBNavbarNav, MDBNavItem, MDBNavLink} from "mdbreact";
import SignOut from "../SignOut/SignOut";
import fire from "../Firebase/context";


export default class SignInLinks extends Component {
  
    constructor(props) {
       
       
        super(props);

        this.state = {
            user: {}
        }
    }

    componentDidMount() {
        this.authListener();

    }
    componentWillUnmount() {
        this.authListener();
    }


    authListener = () => {
        let userDetails = document.querySelector('.user-info');

        fire.auth().onAuthStateChanged(user => {
            if (user) {

                this.setState({user});
                let userInformation = `Welcome, ${user.email}`;
                userDetails.innerHTML = userInformation;

            } else {
                this.setState({user: null});

            }
        })
    }

    render() {
        return (
            <>
                <MDBNavbarNav className='ml-auto'>
                    <MDBNavItem>
                        <MDBNavLink to="/find-a-job">Find a job</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBNavLink to="/jobs">Job list</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBNavLink to="/create-a-job">Create a job</MDBNavLink>
                    </MDBNavItem>
                </MDBNavbarNav>
                <MDBNavbarNav right>
                    <MDBNavItem className='user-info' style={{color: 'white', lineHeight: '3.5'}}/>
                    <MDBNavItem>
                        <SignOut/>
                    </MDBNavItem>
                </MDBNavbarNav>
            </>
        )
    }
}
