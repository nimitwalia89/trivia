import React, { Component } from 'react';
import { Button, Card, Radio, Form } from 'semantic-ui-react';

class Choices extends Component {

  handleAnswerChange = (e, {value}) => {
    this.props.handleAnswerChange(value, this.props.questionIndex);
  }

  render() {
    const {
      choices,
      answers,
      questionIndex
    } = this.props;
    return (
      <Form.Group inline>
        {choices.map((choice, index1) => (
          <Form.Field
            control={Radio}
            label={choice}
            key={index1}
            value={choice}
            checked={ answers[questionIndex] == choice }
            // id={index}
            onChange={this.handleAnswerChange}
          />
        ))}
      </Form.Group>
    );
  }
}

export default Choices;
