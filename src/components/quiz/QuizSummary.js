import React, { Component,Fragment } from 'react';
import {Helmet} from 'react-helmet';
import {Link} from 'react-router-dom';

class QuizSummary extends Component {
    constructor(props){
        super(props);
        this.state={
            score:0,
            numberOfQuestions:0,
            numberOfAnswers:0,
            correctAnswers:0,
            wrongAnswers:0,

        };
    }

    componentDidMount () {
        const { state } = this.props.location;
        this.setState(
            {
                score:(state.score/ state.numberOfQuestions)*100,
                numberOfQuestions:state.numberOfQuestions,
                numberOfAnsweredQuestions:state.numberOfAnsweredQuestions,
                correctAnswers:state.correctAnswers,
                wrongAnswers:state.wrongAnswers,
    
            }
        );
    }
    render(){
        const {state} = this.props.location;
        let stats,remark;
        const userScore = this.state.score;

        if (userScore<=30){
            remark='You need more practice!';
        }else if(userScore > 30 && userScore<= 50){
            remark='Better Lck Next Time';
        } else if(userScore <= 70 && userScore > 50){
            remark='You can do better';
        }else if(userScore >= 71 && userScore<= 84){
            remark='you did great';
        }else{
            remark='you are a genius';
        }
        if (state !==undefined){
            stats=(
                <Fragment>
                    <div className="container">
                    
                <div>
                    <span className="mdi mdi-check-circle-outline success-icon mdi-48px" id="check-icon"></span>
                </div>
                <h1>Quiz Has Ended</h1>
                
                    <h4>{remark}</h4>
                    <h2>Your Score:{this.state.score.toFixed(0)}&#37;</h2>
            <div className="stat-poin">
                    <span className="stat-left">Total number of question :</span>
            <span className="right">{this.state.numberOfQuestions}</span><br/>

            <span className="stat-left">Number of attempted question :</span>
            <span className="right">{this.state.numberOfAnsweredQuestions}</span><br/>

            <span className="stat-left">Number of correct answers :</span>
            <span className="right">{this.state.correctAnswers}</span><br/>

            <span className="stat-left">Number of wrong answers :</span>
            <span className="right">{this.state.wrongAnswers}</span><br/>

            <span className="stat-left">Total number of question :</span>
            <span className="right">{this.state.numberOfQuestions}</span><br/>
            </div>

                

                <section>
                    <ul>
                        <li className="back">
                            <Link to="/">Back to Home</Link>
                        </li>
                        <li className="back">
                            <Link to="/play/quiz">Play Again</Link>
                        </li>
                    </ul>
                </section>
                </div>
                </Fragment>
            );
        }else{
            stats=(
            <section>
            <h1 className="no-stats"> No statistic Available </h1>
           
            <ul>
            <li>
                <Link to="/">Back to Home</Link>
            </li>
            <li>
                <Link to="/play/quiz">Play Again</Link>
            </li>
        </ul>
        </section>
            );
        }
        return(
            <Fragment>
                <Helmet> <title> Quiz App-Summary</title></Helmet>
                {stats}
            </Fragment>
        );
    }
}

export default QuizSummary;