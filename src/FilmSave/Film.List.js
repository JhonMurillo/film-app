import React, { Component } from 'react';
import { Grid, Row, Col, Modal, Button, Media, FormGroup, FormControl, Alert, Jumbotron } from 'react-bootstrap';
import './film-list.css'
import axios from 'axios'
import moment from 'moment'

class FilmList extends Component {
  body = {
    FilmList: []
  }

  state = {
    show: false,
    film: {},
    commentText: '',
    author: '',
    date_created: ''
  }

  handleChangeComment = (event) => {
    this.setState({
      commentText: event.target.value
    });
  }

  handleChangeAuthor = (event) => {
    this.setState({
      author: event.target.value
    });
  }

  handleClose = () => {
    this.setState({ show: false });
  }

  handleShow = (e, filme) => {
    this.setState({
      show: true,
      film: filme
    });
  }
  componentDidMount() {
    this.props.onRef(this)
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.error(err));
  }

  callApi = async () => {
    const response = await fetch('http://localhost:5000/api/films');
    this.body.FilmList = await response.json();
    if (response.status !== 200) throw Error(this.body.message);
    return this.body.FilmList;
  }

  updateList() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.error(err));
  }

  handleSubmit = (event) => {
    event.preventDefault()

    if (this.state.film.comments === null || this.state.film.comments === undefined) {
      this.state.film.comments = []
    }
    
    const comment  = {
      date_created: moment().format('MMMM/DD/YYYY, h:mm:ss a'),
      author : this.state.author,
      commentText : this.state.commentText
    }
    console.log(comment)
    this.state.film.comments.push(comment)
    axios.post('http://localhost:5000/api/save/comment', {
      _id: this.state.film._id,
      comments: this.state.film.comments
    }).then(res => {
      this.setState({
        commentText: '',
        author: '',
        date_created: ''
      })
      //setTimeout(function () { this.setState({ show: false }) }, 10000);
    })
  }
  render() {
    return (
      <div>
        <h1>List Of The Films</h1>

        {
          this.body.message &&
          <Alert bsStyle="danger">
            <strong>{this.body.message}</strong>
          </Alert>
        }

        {
          this.body.FilmList.length === 0 &&
          <Alert bsStyle="warning">
            <strong>No Films </strong>
          </Alert>
        }

        <Grid>
          <Row className="show-grid">
            {this.body.FilmList.map(film => {
              return (<Col key={film._id} sm={6} md={3} style={{ margin: 10 }}>
                <img onClick={(e) => this.handleShow(e, film)} src={film.image} width="300px" height="300px" style={{ borderRadius: '10px' }} alt={film.name} /><br />
                <label>{film.name}</label><br />
                <Button onClick={(e) => this.handleShow(e, film)} bsStyle="primary">
                  View Comments
                </Button>
              </Col>)
            })
            }
          </Row>
        </Grid>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.film.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Media>
              <Media.Left>
                <img width={64} height={64} src={this.state.film.image} alt="thumbnail" />
              </Media.Left>
              <Media.Body>
                <Media.Heading>Duration {this.state.film.duration} Mins</Media.Heading>
                <p>
                  {this.state.film.description}
                </p>
              </Media.Body>
            </Media>

            <hr />

            <h4>Comments</h4>
            <div className="comments">
              {
                this.state.film.comments !== undefined &&
                this.state.film.comments.map((comment, index) => {
                  return (<div key={index}>
                    <FormGroup>
                      <FormControl componentClass="textarea" value={comment.commentText} disabled="true" />
                    </FormGroup>
                    <label className="author">{comment.author} - {comment.date_created}</label>
                    <hr />
                  </div>)
                })
              }
              {
                this.state.film.comments !== undefined &&
                this.state.film.comments.length === 0 &&
                <Alert bsStyle="warning">
                  <strong>{this.state.film.name}{' '}</strong> No Comments
                </Alert>
              }
            </div>
            <hr />

            <h4>Add Comments</h4>

            <Jumbotron>
              <form horizontal="true" onSubmit={this.handleSubmit}>

                <FormGroup controlId="formControlsTextarea">
                  <FormControl componentClass="textarea" required value={this.state.commentText} onChange={this.handleChangeComment} placeholder="Comment" />
                </FormGroup>

                <FormGroup controlId="formControlsText">
                  <FormControl type="text" required value={this.state.author} onChange={this.handleChangeAuthor} placeholder="Author" />
                </FormGroup>

                <hr />
                <Button bsStyle="primary" type="submit">Add</Button>
              </form>
            </Jumbotron>

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default FilmList;
