import React, {Component} from 'react';
import './itemDetails.css';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

const Field = ({item, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}

export {
    Field
}

export default class ItemDetails extends Component {

    gotService = new gotService();

    state = {
        item: null,
        itemLoaded: false,
		error: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        });
    }

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem();
        }
    }

    updateItem() {
        const {itemId, getData} = this.props;
        if (!itemId) {
            return;
        }

        this.setState({
            itemLoaded: false
        })

        getData(itemId)
            .then((item) => {
                this.setState({
                    item,
                    itemLoaded: true
                })
            })
    }

    render() {

        if (this.state.error) {
            return <ErrorMessage/>
        }

        if (!this.state.item) {
            return <span className="select-error">Please select a item</span>
        }

        if (!this.state.itemLoaded) {
            return <Spinner />;
        }
        const {item} = this.state;
        const {name} = item;

        return (
            <div className="item-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {item})
                        })
                    }
                </ul>
            </div>
        );
    }
}