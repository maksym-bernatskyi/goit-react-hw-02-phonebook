import React, { Component } from 'react';
import styled from 'styled-components';
import { nanoid } from 'nanoid';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import Input from '../Input';

class Form extends Component {
    state = {
        name: '',
        number: '',
        id: '',
    };

    reset = () => {
        this.setState({
            name: '',
            number: '',
            id: '',
        });
    };

    handleSubmit = event => {
        if (this.state.number.length > 13)
        return alert('Please enter correct phone number');
        event.preventDefault();
        this.props.onSubmit(this.state);
        this.reset();
    };

    handleInputChange = event => {
        const { name, value } = event.currentTarget;
        this.setState({
            [name]: value,
            id: nanoid(),
        });
    };

    render() {
        return (
            <FormContainer onSubmit={this.handleSubmit}>
                <Input 
                    onChange={this.handleInputChange} 
                    title="Name" 
                    type="text" 
                    name="name" 
                    value={this.state.name} 
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    placeholder="Please enter the name" />
                <PhoneInput 
                    defaultCountry="UA"
                    onChange={number => this.setState({ number })}
                    region="Europe"
                    title="Number"
                    type="tel"
                    name="number"
                    value={this.state.number}
                    placeholder="Please enter phone number"
                    autoComplete="off"
                    international
                    className="inputPhone"
                    maxLength="16" />
                <ButtonSubmit onSubmit={this.handleSubmit}>Add contact</ButtonSubmit>
            </FormContainer>
        );
    };
};

export default Form;

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
    padding: 20px 0;
    border-radius: 10px;
    color: #fff;
    background-color: #000;
`;

const ButtonSubmit = styled.button.attrs(() => ({ type: 'submit' }))`
    position: relative;
    display: inline-block;
    padding: 5px 10px;
    border-radius: 10px;
    border: none;
    cursor: pointer;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 30px;
        border-radius: 5px;
        transition: all 1s ease;
    }
    &:hover:before {
        width: 100%;
    }
`;