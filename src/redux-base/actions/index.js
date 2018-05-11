import axios from 'axios';
import {
  createRequestTypes,
} from '../../utils/reduxHelpers';

export const QUESTIONS_GET = createRequestTypes('QUESTIONS_GET');

export const getQuizData = payload => (
  (dispatch) => {
    dispatch({
      type: QUESTIONS_GET.REQUEST
    });
    return axios.get('https://opentdb.com/api.php?amount=10')
      .then((data) => {
        dispatch({
          type: QUESTIONS_GET.SUCCESS,
          data: data.data.results
        });
      }, (err) => {
        dispatch({
          type: QUESTIONS_GET.FAILURE
        });
      });
  }
);
