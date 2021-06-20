import React from 'react'
import Cards from '../components/Cards'
import { Row, Col, CardDeck } from 'react-bootstrap'
<<<<<<< HEAD
import Searchbar from '../components/Searchbar'
=======
import './Homescreen.css'
>>>>>>> c46550cb84273e1cd18ab49957122ca8ca98da68

const HomeScreen = () => {
    return (
        <>
            <Searchbar />
            <CardDeck>
                <Row style={{ position: 'relative', left: '20%' }}>
                    <Col sm={12} md={6} lg={4} xl={3}>
                        <Cards name='Find a Med' body='sample text sample text sample text' />
                    </Col>
                    <Col sm={12} md={6} lg={4} xl={3}>
                        <Cards name='COVID Essentials' body='Already dead' />
                    </Col>
                    <Col sm={12} md={6} lg={4} xl={3}>
                        <Cards name='Blockchain' body='Ye to humse banega hi nhi' />
                    </Col>
                </Row>

            </CardDeck >
        </>
    )
}
export default HomeScreen