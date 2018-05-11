import {
  QUESTIONS_GET,
} from '../actions';

// --------------------------- Reducer function --------------------------

const initialState = {
  message: 'Hello',
  loadingPage: false,
  questions: null,
  answers: null
};

export default function translations(state = initialState, action = {}) {
  switch (action.type) {
    case QUESTIONS_GET.REQUEST:
      return {
        ...state,
        loadingPage: true,
      };
    case QUESTIONS_GET.SUCCESS:
      return {
        ...state,
        loadingPage: false,
        questions: action.data
      }
    default:
      return state;
  }
}
