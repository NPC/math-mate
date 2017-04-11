import React, { Component } from 'react';
import MathQuestion from './MathQuestion';
import MathTestResult from './MathTestResult';

class MathTest extends Component {
    constructor(props) {
        super(props);

        // Operations to allow
        this.operations = [
            //'+', 
            //'-', 
            '*', 
            '/'
        ];

        this.state = this.getInitialState();
    }

    rndOperation() {
        return this.operations[Math.floor(Math.random() * this.operations.length)];
    }

    // Generand random operand, except for the specified value
    rndOperand(notValue) {
        let val;

        do {
            val = Math.floor(Math.random() * 10 + 1);
        } while(val === notValue);

        return val;
    }

    getOperands(operation) {
        let operands = [];
        
        operands.push(this.rndOperand());
        
        operands.push(this.rndOperand(operation === '*' ? undefined : operands[0]));

        if(operation === '-')
            operands.sort().reverse();

        if(operation === '/')
            operands[0] *= operands[1];

        return operands;
    }

    getInitialState() {
        return {
            currentQuestion: 1,
            totalQuestions: this.props.total || 10,
            correctAnswers: 0,
            prevAnswerHint: {
                isCorrect: true,
                message: ''
            },
            question: this.getNextQuestion()
        };
    }

    onAnswerQuestion(answer) {
        let isCorrect = false;
        let correctAnswer = this.getCorrectAnswer();
        
        isCorrect = answer === correctAnswer;

        this.setState({
            ...this.state,
            currentQuestion: ++this.state.currentQuestion,
            correctAnswers: this.state.correctAnswers + (isCorrect ? 1 : 0),
            prevAnswerHint: {
                isCorrect,
                message: isCorrect ? 'Well done!' : ('Nope, it was ' + correctAnswer)
            },
            question: this.getNextQuestion()
        });
    }

    getNextQuestion() {
        let operation = this.rndOperation();
        
        return {
            operands: this.getOperands(operation),
            operation
        };
    }

    getCorrectAnswer() {
        let correctAnswer;
        let { operands, operation } = this.state.question;

        switch(operation) {
            case '+':
                correctAnswer = operands[0] + operands[1];
                break;
            case '-':
                correctAnswer = operands[0] - operands[1];
                break;
            case '*':
                correctAnswer = operands[0] * operands[1];
                break;
            case '/':
                correctAnswer = operands[0] / operands[1];
                break;
            default:
        }

        return correctAnswer;
    }

    tryAgain() {
        this.setState(this.getInitialState());
    }

    showQuestionOrResult() {
        if(this.state.currentQuestion <= this.state.totalQuestions) {
            return <div>
                <div className="stats">
                    Question {this.state.currentQuestion} of {this.state.totalQuestions}
                    <br/>
                    (Correct answers: {this.state.correctAnswers})
                </div>

                <MathQuestion 
                    key={this.state.currentQuestion}
                    question={this.state.question}
                    onAnswer={this.onAnswerQuestion.bind(this)}
                    prevAnswerHint={this.state.prevAnswerHint}
                />
            </div>;
        } else {
            return <MathTestResult 
                correct={this.state.correctAnswers}
                total={this.state.totalQuestions}
                onTryAgain={this.tryAgain.bind(this)}
            />;
        }
    }

    render () {
        return <div className='math-test'>
            {this.showQuestionOrResult()}
        </div>;
    }
};

export default MathTest;