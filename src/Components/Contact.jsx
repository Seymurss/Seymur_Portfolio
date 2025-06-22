import '../assets/Css/Contact.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, } from 'react-bootstrap';


function Contact(){
    return (
        <div className="Contact"> 

           <div className="line">
            <div className="leftbox">
                <p> GET IN TOUCH</p>
                <h5>Let's make your <br/> brand brilliant!</h5>
                <span>If you would like to work with us or just want to get in <br/>touch, we’d love to hear from you!</span>
                <h4>+994 55 949 16 33</h4>
                </div>
                <div className="rightbox">
                <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Row>
                        <Col md={6}>
                            <Form.Control type="text" placeholder="Name" />
                        </Col>
                        <Col md={6}>
                            <Form.Control type="text" placeholder="Surname" />
                        </Col>
                    </Row>
                </Form.Group>


                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control type="text" placeholder="Subject" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control as="textarea" rows={3} placeholder="Message" />
                    </Form.Group>

                    <Button variant="primary" type="submit" className='animated-hover-button'>
                        <span>SEND A MESSAGE </span>
                    </Button>
                </Form>
                </div>
           </div>

           <div className="rightbox">
                <form action="">
                    
                </form>
           </div>

        </div>
    )
}

export default Contact