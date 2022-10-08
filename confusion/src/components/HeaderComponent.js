import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';

class Header extends Component {
    render() {
        return (
            <>
                <Navbar dark>
                    <div className="container">
                        <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
                    </div>
                </Navbar>
                <div className="p-5 mb-4 jumbotron">
                    <div className="container-fluid py-5">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1 className="display-5 fw-bold">Ristorante con Fusion</h1>
                                <p className="col-md-8 fs-4">We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
                            </div>
                        </div>

                    </div>
                </div>
            </>
        );
    }
}

export default Header;