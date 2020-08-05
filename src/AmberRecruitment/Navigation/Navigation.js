import React, {Component} from "react";
import {MDBNavbar, MDBNavbarBrand, MDBNavLink, MDBNavbarToggler, MDBCollapse} from "mdbreact";
import SignInLinks from "./SignInLinks";
import SignOutLinks from "./SignOutLinks";
import fire from "../Firebase/context";
import './style/navigation.css'

export default class Navigation extends Component {


    constructor(props) {

    
        super(props);
        this.state = {
            isOpen: false,
            modal: false,
            user: {}
            
        };
      
    }

    toggleCollapse = () => {
        this.setState({isOpen: !this.state.isOpen});
    }

    componentDidMount() {
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
                <MDBNavbar color="indigo" dark expand="md" className='bg-transparent'>
                    <MDBNavbarBrand><MDBNavLink to="/">
                        <strong className="white-text text-center">Amber<br/> Recruitment</strong>
                    </MDBNavLink>
                    </MDBNavbarBrand>
                    <MDBNavbarToggler onClick={this.toggleCollapse}/>
                    <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                        {this.state.user ? (<SignInLinks/>) : (<SignOutLinks/>)}
                      
                    </MDBCollapse>
                </MDBNavbar>

        );
    }
}
