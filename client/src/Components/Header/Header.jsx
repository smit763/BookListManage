import React from "react";
import { Navbar, Nav, Button, Container, Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { BsPlus, BsBoxArrowRight } from 'react-icons/bs';

const Header = ({ user }) => {
    const navigate = useNavigate();
    const location  = useLocation();
    const userData = useSelector(state => state.authData)

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const handleAddBooks = () => {
        if(location.pathname === "/"){
            navigate("/add-book");
        }else{
            navigate("/");
        }
    };

    return (
        <Navbar expand="sm" className="navbar-main sticky-top bg-white shadow-sm">
            <Container>
            <Navbar.Brand href="/" className="navbar-brand">
                <span className="d-none d-sm-block">Books</span> 
                <span className="d-block d-sm-none" style={{ fontSize: '14px' }}>Books</span> 
            </Navbar.Brand>
                <Navbar.Collapse className="d-flex justify-content-end d-none d-sm-flex">
                    <Nav className="d-flex align-items-center">
                        <span className="navbar-user-name">
                            {userData?.data?.data?.name || "User"}
                        </span>
                        <Button
                            variant="primary"
                            onClick={handleAddBooks}
                            className="ms-3 add-books-btn"
                        >
                            {location.pathname === "/" ? "Add Books" : "View Books"}
                        </Button>
                        <Button
                            variant="danger"
                            onClick={handleLogout}
                            className="ms-3 add-books-btn"
                        >
                            Sign Out
                        </Button>
                    </Nav>
                </Navbar.Collapse>        
                <Nav className="ms-auto d-block d-sm-none">
                    <Button
                        variant="primary"
                        onClick={handleAddBooks}
                        className="ms-3 add-books-btn"
                    >
                        {location.pathname === "/" ? "Add Books" : "View Books"}
                    </Button>
    
                    <Button
                        variant="danger"
                        onClick={handleLogout}
                        className="ms-3 add-books-btn"
                    >
                        <BsBoxArrowRight size={20} />
                    </Button>
                </Nav>
            </Container>
        </Navbar>  
    );
};

export default Header;
