import React, {Component} from 'react';
import './charDetails.css';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

export default class CharDetails extends Component {

    gotService = new gotService();

    state = {
        char: null,
        charLoaded: false,
		error: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        });
    }

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    updateChar() {
        const {charId} = this.props;
        if (!charId) {
            return;
        }

        this.setState({
            charLoaded: false
        })

        this.gotService.getCharacter(charId)
            .then((char) => {
                this.setState({
                    char,
                    charLoaded: true
                })
            })
    }

    render() {

        if (this.state.error) {
            return <ErrorMessage/>
        }

        if (!this.state.char) {
            return <span className="select-error">Please select a character</span>
        }

        if (!this.state.charLoaded) {
            return <Spinner />;
        }

        const {name, gender, born, died, culture} = this.state.char;

        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Gender</span>
                        <span>{gender}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Born</span>
                        <span>{born}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Died</span>
                        <span>{died}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Culture</span>
                        <span>{culture}</span>
                    </li>
                </ul>
            </div>
        );
    }
}