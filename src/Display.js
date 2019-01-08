import React, { Component } from 'react';
import Question from './Question.js'
import AnswerCard from './AnswerCard.js'
import './reset.css'
import './Display.scss'

class Display extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAllQuestions: true,
      displayAnswer: false,
      currentAnswerToDisplay: null,
    }
  }

  putInLocalStorage = (event) => {
    event.preventDefault();
    let intoStorage;
    if (localStorage.length === 0) {   
      intoStorage = {[this.state.currentAnswerToDisplay.id]: true}
      localStorage.setItem("correctAnswers", JSON.stringify(intoStorage))
    } else if (localStorage.length > 0) {    
      intoStorage = JSON.parse(localStorage.getItem("correctAnswers"))
      intoStorage[this.state.currentAnswerToDisplay.id] = true
      localStorage.setItem("correctAnswers", JSON.stringify(intoStorage))
    }
    this.props.setAnsweredQuestionsInState(intoStorage)
    this.setState({currentAnswerToDisplay: null, showAllQuestions: true, displayAnswer: false})
  }

  verifyAnswer = (event) => {
    let identifier = event.target.parentElement.id
    let selectedAnswer = this.props.questionBank.find((question) => {
      return question.id == identifier   
    })
    if (event.target.innerText !== selectedAnswer.correctAnswer) {
      alert('Incorrect.  Try again')
    } else {
      this.setState({displayAnswer: true, currentAnswerToDisplay: selectedAnswer, showAllQuestions: false})
      console.log('test', this.state.currentAnswerToDisplay)
    }
  }

  render() {
    if (this.state.showAllQuestions) {
      return (
        <main className="main-display">    
          {
            this.props.questionBank.map((question) => {
              return <Question 
                      questionInfo={question}
                      verifyAnswer={this.verifyAnswer}
                      key={question.id} />
            })
          }
        </main> 
      )
    } else if (this.state.showAllQuestions === false && this.state.displayAnswer === true) {
      return (
        <main className="main-display">
          <AnswerCard questionInfo={this.state.currentAnswerToDisplay} putInLocalStorage={this.putInLocalStorage} />
        </main>
      )
    } 
  } 
}

export default Display;