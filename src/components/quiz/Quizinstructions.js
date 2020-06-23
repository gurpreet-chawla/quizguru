import React,{Fragment} from 'react';
import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet';

import instruction from '../../assets/img/instruction.png';


const Quizinstructions = () =>(
    <Fragment>
        <Helmet>
            <title> Quize Instruction </title>
        </Helmet>

        <div className="instructions">
            <h1>
                How to play the game
            </h1>
            <p>
                Ensure you read this guid from start to finish.
            </p>
            <ul className="browser-default" id="main-list">
                <li>The game has a duration of 3 minutes and ends as soon as your time elapses.</li>
                <li>Each game consist of 10 questions.</li>
                <li>
                    Every question contains 4 option.
                    <img src={instruction} alt="Quize app instruction example"/>

                </li>
                <li>
                    Select the option which best answer the question by clicking (or selecting ) it.
                    <img src={instruction} alt="Quize app instruction example"/>
                </li>

            </ul>
            <div className="instruction-link">
                <span className="left"><Link className="link-l" to="/"> No take me back </Link> </span>
                <span className="right"><Link className="link-r"to="/play/quiz"> Okay,Lets do this </Link> </span>
            </div>
        </div>
    </Fragment>
);
export default Quizinstructions;