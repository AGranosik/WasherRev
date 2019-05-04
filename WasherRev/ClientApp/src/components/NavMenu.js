import React from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import './NavMenu.css';


class NavMenu extends React.Component{

  adminPanel = () =>{
      if(this.props.isAdmin){
          return (
            <LinkContainer to={'/users'} exact>
            <NavItem>
              <Glyphicon glyph='user' /> Uzytkownicy
            </NavItem>
          </LinkContainer>
          );
      }
      else{
          return <div>no admin panel</div>
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
        <Nav>
          <LinkContainer to={'/'} exact>
            <NavItem>
              <Glyphicon glyph='home' /> Home
            </NavItem>
          </LinkContainer>
          {this.adminPanel()}
        </Nav>
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