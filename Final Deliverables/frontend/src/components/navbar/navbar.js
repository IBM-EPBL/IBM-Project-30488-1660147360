import React, { useState, useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  Jumbotron,
  Nav,
  NavbarToggler,
  Collapse,
  NavItem,
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  FormGroup,
  Label,
  UncontrolledDropdown,
  Input,
  NavbarText,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledPopover,
  PopoverHeader,
  PopoverBody,
} from "reactstrap";
import { Button } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Link, NavLink, useHistory } from "react-router-dom";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import Badge from "@material-ui/core/Badge";
import "./style.css";
import axios from "axios";
function NavBar(props) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdown, setIsDropdown] = useState(false);
  const [error, setError] = useState("");
  const currentUser = localStorage.getItem("email");
  const history = useHistory();
  //logout
  const handleLogout = async () => {
    setError("");
    try {
      localStorage.removeItem("email");
      localStorage.removeItem("shopname");
      history.push("/login");
    } catch {
      setError("Failed to Log out");
    }
  };
  const [count, setCount] = useState(0);


  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };
  const toggleDropdown = () => {
    setIsNavOpen(!isDropdown);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const shopname = localStorage.getItem("shopname");
  return (
    <>
      <Navbar
        dark
        expand="md"
        className="fixed-top"
        style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.8))' }}
      >
        <div className="container">
          <NavbarBrand className="mr-auto" href="/home">
            <h3>
              <span className="d-none d-sm-inline hover-underline-animation titleText">
                {localStorage.getItem("shopname") ? localStorage.getItem("shopname")+' Inventory' : 'Inventory'}
              </span>
            </h3>
          </NavbarBrand>
          <NavbarToggler onClick={toggleNav}></NavbarToggler>
          <Collapse className="justify-content-end" isOpen={isNavOpen} navbar>
            <Nav navbar className="mr-auto">
              <NavItem className="navItem">
                <Tooltip title="Home">
                  <NavLink className="nav-link" to="/home">
                    &nbsp; <span className="fa fa-home fa-lg"></span> Home&nbsp;
                  </NavLink>
                </Tooltip>
              </NavItem>
              <NavItem className="navItem">
                <Tooltip title="About Us">
                  <NavLink className="nav-link" to="/products">
                    &nbsp; <FormatListBulletedIcon /> Products &nbsp;
                  </NavLink>
                </Tooltip>
              </NavItem>
              <NavItem className="navItem">
                <Tooltip title="Contact Us">
                  <NavLink className="nav-link" to="/contactUs">
                    &nbsp;<span className="fa fa-address-card fa-lg"></span>{" "}
                    Contact Us&nbsp;
                  </NavLink>
                </Tooltip>
              </NavItem>

              <NavItem className={currentUser ? "d-none" : "d-block"}>
                <Tooltip title="Sign Up">
                  <Link className="text-decoration-none" to="/signup">
                    <Button
                      variant="outlined"
                      className="fifth text-darken ml-2"
                      style={{ color: "white", marginLeft: "5px" }}
                    >
                      &nbsp;&nbsp;
                      <span
                        className="fa fa-sign-in"
                        style={{ fontSize: "1.2rem", marginRight: "7px" }}
                      >
                        {" "}
                      </span>{" "}
                      Sign Up&nbsp;&nbsp;
                    </Button>
                  </Link>
                </Tooltip>
              </NavItem>
              {currentUser && <NavItem className="navItem">
                <Tooltip title="logout">
                  <div className="nav-link" style={{cursor:'pointer'}} onClick={handleLogout}>
                    &nbsp;<span className="fa fa-sign-out"></span>{" "}
                    Logout&nbsp;
                  </div>
                </Tooltip>
              </NavItem>}

              <NavbarText>
                <div className="m-1"></div>
              </NavbarText>
            </Nav>
          </Collapse>
        </div>
      </Navbar>
    </>
  );
}
export default NavBar;
