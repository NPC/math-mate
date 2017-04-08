import React from 'react';

const MathTestResult = (props) => (
    <div class="result">
        <h1>Thank you!<br/>
            Result: {props.correct} correct (out of {props.total})
        </h1>

        <h2>
            <a href="#" onClick={props.onTryAgain}>
                Try again!
            </a>
        </h2>
    </div>
);

export default MathTestResult;
