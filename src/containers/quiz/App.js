import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Loader, Dimmer } from 'semantic-ui-react';
import { Row, Col } from 'react-flexbox-grid';
import {getQuizData} from '../../redux-base/actions';
import Questions from './Partials/Questions';
import QuizComplete from './Partials/QuizComplete';
import '../../App.css';

const mapStateToProps = state => ({
  loadingPage: state.main.loadingPage,
  questions: state.main.questions,
  answers: state.main.answers
});

const mapDispatchToProps = {
  getQuizData
}

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      isComplete: false,
      quizStarted: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.questions !== this.props.questions) {
      this.setState({
        quizStarted: true
      });
    }
  }

  shuffle = (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  handleQuizComplete = (correctAnswers, timeTaken) => {
    this.setState({
      correctAnswers,
      timeTaken,
      isComplete: true
    });
  }

  handleStartQuiz = () => {
    this.props.getQuizData();
  }

  handleRestartQuis = () => {
    this.setState({
      isComplete: false,
      quizStarted: false
    }, () => {
      this.props.getQuizData();
    });
  }

  render() {
    const {
      isComplete,
      quizStarted,
      timeTaken,
      correctAnswers
    } = this.state;
    const {
      loadingPage,
      questions
    } = this.props;
    const mappedQuestions = questions ? questions.map(item => ({
      question: item.question,
      choices: this.shuffle([...item.incorrect_answers, item.correct_answer]),
      answer: item.correct_answer
    })) : null
    return (
      <Row
        middle={ !questions ? 'xs': null }
        center="xs"
        style={ {height: '100%'} }
      >
        {loadingPage && <Dimmer active>
          <Loader>Loading</Loader>
        </Dimmer>}
        {!questions && <Col xs>
          <Button primary onClick={this.handleStartQuiz}>Start Quiz</Button>
        </Col>}
        {(!isComplete && quizStarted && questions && !loadingPage) &&
          <Questions
            questions={mappedQuestions}
            handleQuizComplete={this.handleQuizComplete}
          />
        }
        {isComplete &&
          <QuizComplete
            correctAnswers={correctAnswers}
            timeTaken={timeTaken}
            handleRestartQuis={this.handleRestartQuis}
          />}
      </Row>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
