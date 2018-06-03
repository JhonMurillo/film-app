import React, { Component } from 'react';
import './Film.css';
import FilmList from './Film.List'
import axios from 'axios'
import { Button, Alert, Jumbotron, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
class Film extends Component {
  base64 = ''
  state = {
    show: false,
    name: '',
    image: '',
    duration: '',
    description: '',
    base64: ''
  }

  handleChangeName = (event) => {
    this.setState({ name: event.target.value });
  }

  handleChangeDescription = (event) => {
    this.setState({ description: event.target.value });
  }

  handleChangeDuration = (event) => {
    this.setState({ duration: event.target.value });
  }
  handleChangeImage = (event) => {
    event.preventDefault()
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      this.base64 = reader.result
      this.setState({ base64: this.base64 });
    }
    reader.readAsDataURL(file);
    this.setState({ image: event.target.value });
  }

  handleDismiss = () => {
    this.setState({ show: false });
  }

  handleSubmit = (event) => {
    event.preventDefault()
    axios.post('http://localhost:5000/api/save/film', {
      name: this.state.name,
      duration: parseFloat(this.state.duration, 10),
      image: this.state.base64,
      description: this.state.description,
    }).then(res => {
      this.child.updateList()
      this.setState({
        show: true,
        name: '',
        image: '',
        duration: '',
        description: '',
        base64: ''
      })
      //setTimeout(function () { this.setState({ show: false }) }, 10000);
    })
  }

  render() {
    return (
      <div className="App">
        {
          this.state.show &&
          <Alert bsStyle="success" onDismiss={this.handleDismiss}>
            <p>
              Success Save
          </p>
            <p>
              <Button onClick={this.handleDismiss}>Closed</Button>
            </p>
          </Alert>
        }
        <Jumbotron>
          <form horizontal="true" onSubmit={this.handleSubmit}>
            <FormGroup controlId="formControlsText">
              <ControlLabel>Name Film:</ControlLabel>
              <FormControl type="text" required value={this.state.name} onChange={this.handleChangeName} placeholder="Name Film" />
            </FormGroup>

            <FormGroup controlId="duration">
              <ControlLabel>Duration Film:</ControlLabel>
              <FormControl type="number" required value={this.state.duration} onChange={this.handleChangeDuration} placeholder="Duration Film" />
            </FormGroup>

            <FormGroup controlId="formControlsTextarea">
              <ControlLabel>Description</ControlLabel>
              <FormControl componentClass="textarea" required value={this.state.description} onChange={this.handleChangeDescription} placeholder="Description" />
            </FormGroup>

            <FormGroup controlId="poster">
              <ControlLabel>Poster</ControlLabel>
              <FormControl type="file"  accept="image/x-png,image/gif,image/jpeg" required value={this.state.image} onChange={this.handleChangeImage} />
              <HelpBlock>Enter Poster image of the film Here!</HelpBlock>
            </FormGroup>
            <hr />
            <img src={this.state.base64} width="100px" height="100px" style={{ borderRadius: '10px' }} alt="image2" /><br />
            <hr />
            <Button bsStyle="primary" type="submit">Submit</Button>
          </form>
        </Jumbotron>
        <FilmList onRef={ref => (this.child = ref)}></FilmList>
      </div>
    );
  }
}

export default Film;
