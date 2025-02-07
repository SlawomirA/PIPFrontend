import React, { useState } from "react";
import {
    MDBNavbar,
    MDBContainer,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBNavbarBrand,
    MDBCollapse,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

export default function App() {
    const [openNavColorSecond, setOpenNavColorSecond] = useState(false);

    return (
        <MDBNavbar expand="lg" dark bgColor="dark">
            <MDBContainer fluid>
                <MDBNavbarBrand href="/">Assignment 3</MDBNavbarBrand>
                <MDBNavbarToggler
                    type="button"
                    data-target="#navbarColor02"
                    aria-controls="navbarColor02"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    onClick={() => setOpenNavColorSecond(!openNavColorSecond)}
                >
                    <MDBIcon icon="bars" fas />
                </MDBNavbarToggler>
                <MDBCollapse open={openNavColorSecond} navbar id="navbarColor02">
                    <MDBNavbarNav className="me-auto mb-2 mb-lg-0">
                        <MDBNavbarItem>
                            <MDBNavbarLink href="/">Home</MDBNavbarLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <MDBNavbarLink href="/add">Add points</MDBNavbarLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <MDBNavbarLink href="/predict">Predictions & Training</MDBNavbarLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <MDBNavbarLink href="/generate">Generate data points</MDBNavbarLink>
                        </MDBNavbarItem>
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    );
}
