import React from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Row, Col
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
class CommentForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false
        };
        this.toggle = this.toggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    handleSubmit = (values) => {
        this.toggle();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }



    render() {
        return (
            <div>
                <Button outline onClick={this.toggle}>
                    <h3>Submit Comment</h3>
                </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}><h3 className='font-weight-bold'>Submit Comment</h3></ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={this.handleSubmit}>
                            <Row className='form-group'>
                                <Label htmlFor="rating" >Rating</Label>
                                <Col>
                                    <Control.select model=".rating" id='rating' name='rating'
                                        className='form-control'
                                        validators={
                                            required
                                        }
                                    >
                                        <option value='1'>1</option>
                                        <option value='2'>2</option>
                                        <option value='3'>3</option>
                                        <option value='4'>4</option>
                                        <option value='5'>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="name">Your Name</Label>
                                <Col>
                                    <Control.text model=".name" id="name" name="name"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: 'Required ',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Label htmlFor="comment">Comment</Label>
                                <Col>
                                    <Control.textarea rows="6" model='.comment' id='comment' name='comment'
                                        className='form-control'
                                        validators={
                                            required
                                        }>
                                        <Errors
                                            className='text-danger'
                                            model=".comment"
                                            show="touched"
                                            messages={
                                                { required: 'Required' }
                                            } />
                                    </Control.textarea>
                                </Col>
                            </Row>
                            <Row className="form-group mt-2">
                                <Col>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div >
        )
    }
}

const RenderComments = ({ comments, addComment, dishId }) => {
    if (comments != null) {
        return (
            <div className='container'>
                <ul className="list-unstyled">
                    {comments.map((comment) => {
                        return (
                            <li key={comment.id}>
                                <p>{comment.comment}</p>
                                <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</p>
                            </li>
                        );
                    })}
                </ul>
                <CommentForm dishId={dishId} addComment={addComment} />
            </div>
        );
    }
    else {
        return (<div></div>);
    }
}
function RenderDish({ dish }) {
    if (dish != null) {
        return (<Card>
            <CardImg top src={baseUrl + dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>);
    }
    else {
        console.log('this is invoked');
        return (<div></div>);
    }
}


const DishDetail = (props) => {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null)

        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments}
                            addComment={props.addComment}
                            dishId={props.dish.id}
                        />
                    </div>
                </div>
            </div>
        );
}


export default DishDetail;