import React from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle
} from 'reactstrap';



const RenderComments = ({ comments }) => {
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
function RenderDish({ dish }) {
    if (dish != null) {
        console.log('this is invoked');
        return (<Card>
            <CardImg top src={dish.image} alt={dish.name} />
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
    const dish = props.dish;
    if (dish != null) {
        return (
            <div className="container">
                <div className='row'>
                    <div className='col-12 col-md-5 m-1'>
                        <RenderDish dish={dish} />
                    </div>
                    <div className='col-12 col-md-5 m-1'>
                        <h4 className='text-bold'>Comments</h4>
                        <RenderComments comments={dish.comments} />
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


export default DishDetail;