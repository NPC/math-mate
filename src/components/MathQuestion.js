import React, { Component } from 'react';

class MathQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answer: ''
        };
    }

    componentDidMount(){
        this.answerInput.focus(); 
    }

    onChange(event) {
        this.setState({ answer: event.target.value });
    }

    onAnswer(e) {
        const answer = parseInt(this.state.answer);

        if(!isNaN(answer)) {
            this.props.onAnswer(answer);
        }

        e.preventDefault();
    }

    render() {
        const { question, prevAnswerHint } = this.props;

        return (
            <div className='math-question'>
                <form onSubmit={this.onAnswer.bind(this)}>
                    <span className='operand'>{question.operands[0]}</span>
                    <span className='operation'>{question.operation}</span>
                    <span className='operand'>{question.operands[1]}</span>
                    <span>=</span>
                    <input 
                        className='answer'
                        ref={(input) => { this.answerInput = input; }} 
                        type='text' 
                        value={this.state.answer} 
                        onChange={this.onChange.bind(this)} 
                    />
                    <input 
                        type='submit' 
                        className='answer-button' 
                        value='Answer'
                    />
                </form>

                <h2 className={prevAnswerHint.isCorrect ? 'correct' : 'wrong'}>
                    {prevAnswerHint.message}
                </h2>
            </div>
        );
    }
};

export default MathQuestion;