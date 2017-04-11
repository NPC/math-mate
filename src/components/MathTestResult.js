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
    'Practice more.',
    'You can do better!'
];

const getPrompt = (result) => {
    const prompts = result >= 0.8 ? goodPrompts : badPrompts;
    return prompts[Math.floor(Math.random() * prompts.length)];
};

const MathTestResult = (props) => (
    <div className="result">
        <h1>
            {getPrompt(props.correct / props.total)}
            <br/>
            Result: {props.correct} / {props.total}
        </h1>

        <hr />

        <h2>
            <a href="#" onClick={props.onTryAgain}>Try again!</a>
        </h2>
    </div>
);

export default MathTestResult;
