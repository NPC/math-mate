import React from 'react';

const goodPrompts = [
    'Good job!',
    'Well done!',
    'Congratulations!',
    'Nice work!'
];

const badPrompts = [
    'Please try harder.',
    'Maybe next time?',
    'Practice some more.',
    'You can do better!'
];

const getPrompt = result => {
    const prompts = result >= 0.8 ? goodPrompts : badPrompts;
    return prompts[Math.floor(Math.random() * prompts.length)];
};

const renderErrorList = errorList => errorList.length > 0 ? (
    <h2>
        Work on:
        <br/>
        {errorList.join(', ')}
    </h2>
) : '';

const MathTestResult = props => (
    <div className="result">
        <h1>
            {getPrompt(props.correct / props.total)}
            <br/>
            Result: {props.correct} / {props.total}
        </h1>

        <h2>
            <a href="#" onClick={props.onTryAgain}>Try again!</a>
        </h2>

        <hr />

        {renderErrorList(props.errorList)}
    </div>
);

export default MathTestResult;
