import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ContactForm.scss';

export default class ContactForm extends Component {
    state = {
        name: '',
        number: ''
    };

    static propTypes = {
        onAddContact: PropTypes.func,
    };

    static defaultProps = {};

    handleChange = e => {
        const { name, value } = e.target;
            this.setState({
                [name]: value,
            });
    };

    handleSubmit = e => {
        const { name, number } = this.state;
        e.preventDefault();

        this.props.onAddContact(name, number);
        this.setState({
            name: '',
            number: ''
            });
    }; 
    
    render() {
        const { name, number } = this.state;
        return (
            <div>
                <form
                    className="Form"
                    onSubmit={this.handleSubmit} >
                    <label
                        htmlFor="name"
                        className="Label">Name</label>
                <input
                    type="text"
                    value={name}
                    id="name"
                    className="Input"
                    onChange={this.handleChange}
                    name="name"
                    placeholder="John Smith"
                    />
            
                    <label
                        htmlFor="number"
                        className="Label">Number</label>
                <input
                    type="tel"
                    value={number}
                    id="number"
                    className="Input"
                    onChange={this.handleChange}
                    name="number"
                    placeholder="+38(067)777-77-77"
                    />
                    
                    <button
                        type="submit"
                        className="ContactFormButton">
                      Add contact
                    </button>
                 </form>
            </div>
        );
    }
}