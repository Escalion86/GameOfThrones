import React, {Component} from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import CharacterPage from '../characterPage';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import gotService from '../../services/gotService';

export default class App extends Component {

    gotService = new gotService();

    state = {
        showRandomChar: true,
        error: false
    }

    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        });
    }

    toggleRandomChar = () => {
        this.setState((state) => {
            return {
                showRandomChar: !state.showRandomChar
            }
        });
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }

        const char = this.state.showRandomChar ? <RandomChar/> : null;

        return (
            <> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {char}
                            <Button
                                color="info"
                                onClick={this.toggleRandomChar}
                            >
                                toggleRandomChar
                            </Button>
                        </Col>
                    </Row>
                    <CharacterPage /> 
                    <Row>
                        <Col md="6">
                            <ItemList 
                                onCharSelected={this.onCharSelected}
                                getData={this.gotService.getAllBooks}
                                renderItem={({name}) => name} />
                        </Col>    
                        <Col md="6">
                            <CharDetails charId={this.state.selectedChar} />
                        </Col>  
                    </Row>
                    <Row>
                        <Col md="6">
                            <ItemList 
                                onCharSelected={this.onCharSelected}
                                getData={this.gotService.getAllHouses}
                                renderItem={({name}) => name} />
                        </Col>    
                        <Col md="6">
                            <CharDetails charId={this.state.selectedChar} />
                        </Col>  
                    </Row>
                </Container>
            </>
        );
    }
};