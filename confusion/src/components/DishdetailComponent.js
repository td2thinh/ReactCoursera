import React, { Component } from 'react';
import {
    Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle
} from 'reactstrap';

class DishDetail extends Component {
    constructor(props) {
        super(props);
    }

    renderComments(comments) {
        if (comments != null) {
            return (
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
            );
        }
        else {
            return (<div></div>);
        }
    }
    renderDish(dish) {
        if (dish != null) {
            return (<Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>);
        }
        else {
            return (<div></div>);
        }
    }


    render() {
        const dish = this.props.dish;
        if (dish != null) {
            return (
                <div className="container">
                    <div className='row'>
                        <div className='col-12 col-md-5 m-1'>
                            {this.renderDish(dish)}
                        </div>
                        <div className='col-12 col-md-5 m-1'>
                            <h4 className='text-bold'>Comments</h4>
                            {this.renderComments(dish.comments)}
                        </div>
                    </div>
                </div>

            );
        }
        else {
            return (
                <div></div>
            );
        }
    }
}

export default DishDetail;