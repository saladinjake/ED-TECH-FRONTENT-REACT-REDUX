import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Styles } from "./styles/institutiontitle.js";

export class GovernmentTitle extends Component {
    state = {
        backgroundImage: 'forinstructor.png',
    }

    render() {
        return (
            <Styles>
                <section className="breadcrumb-area" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/${this.state.backgroundImage})` }}>
                    <Container>
                        <Row>
                            <Col md="12" className="text-left">
                                <div className="breadcrumb-box">
                                    <h2 className="breadcrumb-title">Questence <br />for Government</h2>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </Styles>
        )
    }
}