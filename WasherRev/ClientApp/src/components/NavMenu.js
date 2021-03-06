﻿import React from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import './NavMenu.css';


class NavMenu extends React.Component{

  adminPanel = () =>{
      if(this.props.isAdmin){
          return (
            <Nav>
              <LinkContainer to={'/users'} exact>
                <NavItem>
                  Uzytkownicy
                </NavItem>
              </LinkContainer>
              <LinkContainer to={'/building'} exact>
                <NavItem>
                  Zarządzanie budynkami
                </NavItem>
              </LinkContainer>
              <LinkContainer to={'/producer'} exact>
                <NavItem>
                  Zarządzanie producentami pralek
                </NavItem>
              </LinkContainer>
              <LinkContainer to={'/reservation'} exact>
                <NavItem>
                  Zarządzanie rezerwacjami użytkowników
                </NavItem>
              </LinkContainer>
              <LinkContainer to={'/washer'} exact>
                <NavItem>
                  Zarządzanie pralkami
                </NavItem>
              </LinkContainer>
              <LinkContainer to={'/room'} exact>
                <NavItem>
                  Zarządzanie pokojami
                </NavItem>
              </LinkContainer>
            </Nav>
          );
      }
      else{
        return(
          <Nav>
          <LinkContainer to={'/reservation'} exact>
            <NavItem>
              Rezerwacje
            </NavItem>
          </LinkContainer>
          <LinkContainer to={'/myReservation'} exact>
            <NavItem>
              Moje Rezerwacje
            </NavItem>
          </LinkContainer>
        </Nav>
        );

      }
  }

  render(){
    return(
      <Navbar inverse fixedTop fluid collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to={'/'}>System rezerwacji pralek</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
          {this.adminPanel()}
      </Navbar.Collapse>
    </Navbar>
    );
  }
}

const mapStateToProps = (state) =>{
  const user = state.user;
  var isAdmin = false;
  if(user){
      isAdmin = ( user.roleName === 'Admin' ) ? true : false;
  }
  return { isAdmin: isAdmin }
}

export default connect(mapStateToProps)(NavMenu);