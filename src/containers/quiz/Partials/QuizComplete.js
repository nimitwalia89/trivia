import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { Row, Col } from 'react-flexbox-grid';
class QuizComplete extends Component {


  handleClick = () => {
    this.props.handleRestartQuis();
  }

  totalTime(sec) {
      let hr = Math.floor(sec / 3600);
      let min = Math.floor((sec - (hr * 3600))/60);
      sec -= ((hr * 3600) + (min * 60));
      sec += ''; min += '';
      while (min.length < 2) {min = '0' + min;}
      while (sec.length < 2) {sec = '0' + sec;}
      hr = (hr) ? hr+':' : '';
      return hr + min + ':' + sec;
  }

  render() {
    const {
      correctAnswers,
      timeTaken
    } = this.props;
    return (
      <Row middle="xs" center="xs" style={ {height: '100%', width: '100%'} }>
        <Col xs={ 8 }>
          <h1>Quiz completed!</h1>
          <h5>Total Score: {this.props.correctAnswers} / 10</h5>
          <h5>Time Taken: {this.totalTime(this.props.timeTaken)}</h5>
          <Button primary onClick={this.handleClick}>Restart Quiz</Button>
        </Col>
      </Row>
    );
  }
}

export default QuizComplete;
