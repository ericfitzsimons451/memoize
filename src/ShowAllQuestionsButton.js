import React from 'react';
import './main.scss'

function ShowAllQuestionsButton(props) {
  return(
    <div>
      <button type="button" className="show-all-questions-button" onClick={props.showAllQuestions}>Reset All Questions</button>
    </div>  
  )
}

export default ShowAllQuestionsButton;
