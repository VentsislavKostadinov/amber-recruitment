import React, {Component} from "react";
import {MDBNavbarNav, MDBNavItem, MDBNavLink} from "mdbreact";
import SignOut from "../SignOut/SignOut";
import Navigation from "./Navigation";


export default class SignInLinks extends Component {

    componentDidMount() {
        new Navigation().authListener();  // Call the function from another class
    }
    render() {
        return (
                <>
                <MDBNavbarNav className='ml-auto'>
                    <MDBNavItem>
                        <MDBNavLink to="/tasks">Task list</MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBNavLink to="/create-a-task">Create a task</MDBNavLink>
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
