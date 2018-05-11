import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, Radio, Form } from 'semantic-ui-react';
import { Row, Col } from 'react-flexbox-grid';
import unescape from 'lodash.unescape';
import moment from 'moment';
import Choices from './Choices';
import '../../../App.css';

const mapStateToProps = state => ({
  loadingPage: state.main.loadingPage,
});

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      answers: this.addBlankAnswers(),
      startTime: moment()
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.questions !== this.props.questions) {
  //     console.log(nextProps.questions);
  //   }
  // }

  addBlankAnswers = () => {
    let answers = [];
    for(let i = 0; i<10; i++){
      answers = [...answers, ""];
    }
    return answers;
  }

  checkIfAllAnswers = () => {
    let allAnswered = true;
    this.state.answers.forEach(answer => {
      if (answer.length === 0){
        allAnswered = false;
      }
    });
    return allAnswered;
  }

  getCorrectAnswers = () => {
    let correctAnswers = 0;
    this.props.questions.forEach((question, index) => {
      if(question.answer === this.state.answers[index]){
        correctAnswers++;
      }
    });
    return correctAnswers;
  }

  handleAnswerChange = (value, id) => {
    let answers = this.state.answers;
    answers[id] = value;
    this.setState({
      answers
    });
  }

  handleSubmit = () => {
    const endTime = moment();
    const totalTime = endTime.diff(this.state.startTime, 'seconds');
    const correctAnswers = this.getCorrectAnswers();
    this.props.handleQuizComplete(correctAnswers, totalTime);
  }

  render() {
    const {
      loadingPage,
      questions
    } = this.props;
    return (
      <Row center="xs" style={ {height: '100%', width: '100%', marginTop: 50} }>
        <Col xs={ 8 }>
          <Card.Group>
            {questions.map((question, index) => (
              <Card className="questionCard" key={index}>
                <Card.Content>
                  <Card.Header>{unescape(question.question)}</Card.Header>
                  <Card.Description>
                    {/* <Form.Group inline>
                      {question.choices.map((choice, index1) => (
                        <Form.Field
                          control={Radio}
                          label={choice}
                          key={index1}
                          value={choice}
                          checked={ this.state.answers[index] == choice }
                          // id={index}
                          onChange={this.handleAnswerChange}
                        />
                      ))}
                    </Form.Group> */}
                    <Choices
                      choices={question.choices}
                      answers={this.state.answers}
                      questionIndex={index}
                      handleAnswerChange={this.handleAnswerChange}
                    />
                  </Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
          <Button
            primary
            style={{marginTop: 20,  marginBottom: 20}}
            disabled={!this.checkIfAllAnswers()}
            onClick={this.handleSubmit}
          >
            Submit
          </Button>
        </Col>
      </Row>
    );
  }
}

export default connect(mapStateToProps)(App);
