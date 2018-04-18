import React, {Component} from "react";
import { Button, Grid, Row, Col, ProgressBar }  from 'react-bootstrap'

class DataGenerationPage extends Component {

    constructor(props, context) {
        super(props, context);

        this.handleClick = this.handleClick.bind(this);

        this.state = {
            progress: 0,
            label: ''
        };
    }

    generateRandomData() {
        const basePersons = [
            { name : 'John', values: ['tennis', 'basketball']},
            { name: 'Martin', values: ['tennis', 'football', 'dota']},
            { name: 'Judy', values: ['reading', 'coding', 'tennis']},
            { name: 'X-men', values: ['saving-the-world', 'reading']}
        ];
        const basePerson = basePersons[Math.floor((Math.random() * 10)) % basePersons.length];
        basePerson.name += Math.floor((Math.random() * 100));

        console.log(basePerson);

        return basePerson;
    }

    handleClick(event) {
        this.setState({
            progress: 0,
            label: ''
        });

        fetch('http://localhost:3000/save', {
                method: 'post',
                body: JSON.stringify(this.generateRandomData())
        })
        .then(response => response.json())
        .then((data) => {
            if(data.result === 'success') {

                setTimeout(() => {
                    while(this.state.progress < 100) {
                        this.setState({
                            progress: this.state.progress + 5
                        });
                    }
                }, 1000);

                setTimeout(() => {
                    this.setState({
                        label: 'Success'
                    });
                }, 1500)

            } else {
                setTimeout(() => {
                    this.setState({
                        label: 'Error'
                    });
                }, 1500)
            }
        });
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col sm={10} md={10}>
                        <Button bsStyle="primary" onClick={this.handleClick}>Generate Data</Button>
                        <p />
                        <ProgressBar active bsStyle="success" now={this.state.progress} label={this.state.label}/>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default DataGenerationPage;