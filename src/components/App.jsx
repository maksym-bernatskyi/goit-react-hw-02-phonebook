import React, { Component } from 'react';
import styled from 'styled-components';
import Container from './Container';
import Form from './Form';
import ContactList from './ContactList';
import Filter from './Filter';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  handleFormSubmit = data => {
    const checkName = this.state.contacts.find(element => element.name === data.name);
    checkName === undefined ? this.setState(prevState => ({ contacts: [data, ...prevState.contscts] })) : alert(`${data.name} is already in contacts.`);
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId)
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const visibleFilter = contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLocaleLowerCase()));

  return (
    <Container>
      <Title>Phonebook</Title>
      <Form onSubmit={this.handleFormSubmit} />
      <Filter value={filter} onChange={this.changeFilter} />
      <ContactList data={visibleFilter} onDelete={this.deleteContact} />
    </Container>
    );
  }
}

export default App;

const Title = styled.h1`
  font-size: 24px;
`;