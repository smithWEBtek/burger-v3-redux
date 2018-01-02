import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Name'
        }, value: ''
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        }, value: ''
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zipcode'
        }, value: ''
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        }, value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email'
        }, value: ''
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' }
          ]
        }, value: ''
      },
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault()
    this.setState({ loading: true })
    const order = this.state.orderForm;
    console.log('order: ', order);
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  }
  // deeply cloning state to mututate/update ///////////////////////////////////////////////////////
  inputChangedHandler = (event, inputIdentifier) => {
    // clone state (shallow)
    const updatedOrderForm = {
      ...this.state.orderForm
    };
    console.log('1 updatedOrderForm', updatedOrderForm)
    console.log('inputIdentifier', inputIdentifier)
    // clone the state.key...the key representing the formElement clicked
    // you have to clone the key and its whole structure, so you can update the particular piece you want
    // if you just used the key and set a value to it, the structure would be replaced by your updated value
    // before this, you don't know the name of the key, and even if you did, again you have to reference its deeper structure
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };
    console.log('2 updatedFormElement before', updatedFormElement)

    // set that key to the value obtained from event (user action in the form element)
    updatedFormElement.value = event.target.value
    console.log('3 updatedFormElement after', updatedFormElement)

    // mutate the cloned part of state, (inputIdentifier is the KEY), updatedFormElement is the VALUE
    // but the VALUE is an object structured/cloned from our state structure, not just a piece of data
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    console.log('4 updatedOrderForm after update', updatedOrderForm)

    // replace the whole state, structure intact, unchanged data intact, but updating our targeted KEY with VALUE (...including its related structure)
    // SUMMARY: when you set something equal to a value, that something will lose its structure, unless you have cloned the structure and created your new value using that cloned structure. 
    this.setState({ orderForm: updatedOrderForm })
  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }

    let form = (
      <div>
        <form>
          {formElementsArray.map(formElement => {
            return (
              <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
            )
          })}
        </form>
        <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
      </div>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data </h4>
        {form}
      </div>
    )
  }

}

export default ContactData;
