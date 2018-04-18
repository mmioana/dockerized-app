import React, {Component} from "react";
import { Button, Grid, Row, Col, ListGroup, ListGroupItem }  from 'react-bootstrap'

class AggregationPage extends Component {

    constructor(props, context) {
        super(props, context);

        this.handleClick = this.handleClick.bind(this);

        this.state = {
            duration: 0,
            people: []
        };
    }

    handleClick() {
        fetch('http://localhost:3000/duration', {
            method: 'get',
            headers: new Headers({
                "Accept": 'application/json'
            })
        })
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                this.setState({
                    duration : data.duration,
                    people : data.people
                });
            });
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col sm={10} md={10}>
                        <Button bsStyle="primary" onClick={this.handleClick}>Get Time</Button>
                        <div>Aggregation duration: {this.state.duration} ms</div>
                        <ListGroup>
                            { this.state.people.map((human) => {
                                return (<ListGroupItem header={human.username}>
                                    {human.values.join(' ')}
                                </ListGroupItem>);
                            }) }
                        </ListGroup>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default AggregationPage;