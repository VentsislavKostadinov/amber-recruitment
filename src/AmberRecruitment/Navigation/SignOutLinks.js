import React from "react";
import {MDBNavbarNav, MDBNavItem, MDBNavLink} from "mdbreact";
import LoginModal from "../Login/LoginModal";
import RegisterModal from "../Register/RegisterModal";

const SignOutLinks = () => {

    return (
        <>
            <MDBNavbarNav  className = 'ml-auto'>
                <MDBNavItem>
                    <MDBNavLink to="/">Home</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                    <MDBNavLink to="/jobs">Job list</MDBNavLink>
                </MDBNavItem>
            </MDBNavbarNav>
            <MDBNavbarNav right>
                <LoginModal/>
                <RegisterModal/>
            </MDBNavbarNav>
        </>
    )
}

export default SignOutLinks;