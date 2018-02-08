import React, { Component } from 'react';
import Navbar from './Navbar.jsx';
import Critters from './Critters.jsx';
import AddCritter from './AddCritter.jsx';
import axios from 'axios';

/*

  Main.jsx is our main parent component for our app. For this tiny application, we will keep all our our state in Main.jsx. Our state should keep track of whether we are wanting to see our dog, cat, or snake critters and the critter data itself! Now we want to add a form that will allow us to create new critters.

  Make a functional component that will render out our form elements. This component should allow users to enter a name and an image url. The critter's type should be the same as the current view. The form component should render only if viewing 'dogs', 'cats', or 'dragons'.

  Take a stab at building out this app! You're given a very simple AddCritter.jsx to start with!

*/

export default class Main extends Component {

  constructor() {
    super();
    this.state = {
      critters: [],
      type: ''
    }
    this.selectCritters = this.selectCritters.bind(this);
    this.createCritter = this.createCritter.bind(this);
  }

  selectCritters(critterName) {
    axios.get(`/api/${critterName}`)
      .then(res => res.data)
      .then(critters => {
        this.setState({
          critters,
          type: critterName.slice(0, -1) //critterName is plural and I need the type to be singular...
        })
      })
  }

  createCritter(evt) {
    //prevent the default behavior of the form (the form submit event will prompt sending a request AND reloading the page)
    evt.preventDefault();
    //the evt.target here is the button we clicked, but to get the data, we want its parent, the form element
    const form = evt.target.parentNode

    //once we have the form, we can get the values of its named inputs.
    //In our AddCritter's JSX, each input has a 'name' attribute. that name determines how we can grab the value from that input.
    const critter = {
      name: form.name.value,
      image: form.image.value,
      type: this.state.type
    };

    //after using it, I want to clear the inputs! This is just nice for the user :)
    form.name.value = '';
    form.image.value = '';

    //if there isn't a type (we aren't viewing any critters), we don't want to create the newCritter
    if (!this.state.type) return;

    //send a post request to our backend api to create the new critter!
    axios.post('/api/critters', critter)
      .then(res => res.data)
      .then(newCritter => {
        this.setState({
          //once we create the new critter, add it to the list of critters currently being viewed in our state
          critters: [newCritter, ...this.state.critters]
        })
      })
  }

  render() {
    return (
      <div>
        <div id="header">
          <h1>Gallery of Cute</h1>
        </div>
        <Navbar selectCritters={this.selectCritters} />
        <AddCritter createCritter={this.createCritter} />
        <Critters critters={this.state.critters} />
      </div>
    )
  }
}

