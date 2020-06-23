import React,{Component, Fragment} from 'react';
import{Helmet} from 'react-helmet';
import questions from '../../questions.json';
import isEmpty from '../../utils/is-empty';
import M from 'materialize-css';

import correctNotification from '../../assets/audio/right-answer.mpeg';
import wrongNotification from '../../assets/audio/Wrong-answer.mp3';
import buttonSound from '../../assets/audio/next.mpeg';

import classnames from 'classnames';
class Play extends Component{

    constructor (props){
        super(props);
        this.state={
        questions,
        currentQuestion:{},
        nextQuestion:{},
        previousQuestion:{},
        answer:'',
        numberOfQuestions:0,
        numberOfAnsweredQuestions:0,
        currentQuestionIndex:0,
        score:0,
        correctAnswers:0,
        wrongAnswers:0,
        hints:5,
        fiftyFifty:2,
        usedfiftyFifty:false,
        nextButtonDisabled:false,
        previousButtonDisable:true,
        time:{}
        };

        this.interval = null


       
    }

    componentDidMount () {
        const { questions,currentQuestion,nextQuestion,previousQuestion}=this.state;
        this.displayQuestions(questions,currentQuestion,nextQuestion,previousQuestion)
        this.startTimer();
    }
   
    displayQuestions=(questions = this.state.questions,currentQuestion,nextQuestion,previousQuestion) => {
        let {currentQuestionIndex}= this.state;
        if (!isEmpty(this.state.questions)) {
            questions=this.state.questions;
            currentQuestion=questions[currentQuestionIndex];
            nextQuestion=questions[currentQuestionIndex + 1];
            previousQuestion=questions[currentQuestionIndex - 1];
            const answer = currentQuestion.answer;
            this.setState({
                currentQuestion,
                nextQuestion,
                previousQuestion,
                numberOfQuestions:questions.length,
                answer
            },()=>{
                this.handleDisableButton();
            });
          }
      };

      handleOptionClick=(e)=> {
            if(e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()){
                setTimeout(()=>{
                    document.getElementById('correct-sound').play();
                },1);
                
                this.correctAnswer();
            }else{
                setTimeout(()=>{
                    document.getElementById('wrong-sound').play();
                },1);
                
                this.wrongAnswer();
            }
      }

      handleNextButtonClick=()=>{
         if (this.state.nextQuestion !== undefined){
             this.setState(prevState=>({
                 currentQuestionIndex:prevState.currentQuestionIndex + 1
             }),() => {
                 this.displayQuestions(this.state.state,this.state.currentQuestion, this.state.nextQuestion,this.state.previousQuestion)
             });
         }
      };

      handlePreviousButtonClick=()=>{
        if (this.state.previousQuestion !== undefined){
            this.setState(prevState=>({
                currentQuestionIndex:prevState.currentQuestionIndex - 1
            }),() => {
                this.displayQuestions(this.state.state,this.state.currentQuestion, this.state.nextQuestion,this.state.previousQuestion)
            });
        }
     };

     handleQuitButtonClick= () => {
        this.playButtonSound();
        window.confirm('Are you sure you want to quit ?');
        if(window.confirm('Are you sure you want to quit ?')){
            this.props.history.push('/');
        }
     };

      handleButtonClick=(e)=>{
            switch(e.target.id){
                case 'next-button':
                    this.handleNextButtonClick();
                    break;
                case 'previous-button':
                this.handlePreviousButtonClick();
                break;

                case 'quit-button':
                this.handleQuitButtonClick();
                break;

                default:
                    break;
            
                    
            }
        
      };

      playButtonSound=()=>{
          document.getElementById('button-sound').play();
      };

      correctAnswer = () =>{
          M.toast({
              html:'correct Answer',
              classes:'toast-valid',
              displayLength:1500
          });
          this.setState(prevState => ({
                score: prevState.score+1,
                correctAnswers:prevState.correctAnswers+1,
                currentQuestionIndex:prevState.currentQuestionIndex +1,
                numberOfAnsweredQuestion:prevState.numberOfAnsweredQuestions + 1
          }), () => {
            if(this.state.nextQuestion===undefined){
                this.endGame();
            }else{
                this.displayQuestions(this.state.questions,this.state.currentQuestion,this.state.nextQuestion,this.state.previousQuestion);
            }
          });
      }
      wrongAnswer = () =>{
          navigator.vibrate(1000);
        M.toast({
            html:'wrong Answer',
            classes:'toast-invalid',
            displayLength:1500
        });
        this.setState(prevState => ({
           wrongAnswers: prevState.wrongAnswer +1,
            currentQuestionIndex:prevState.currentQuestionIndex + 1,
            numberOfAnsweredQuestions:prevState.numberOfAnsweredQuestions + 1

        }), () => {
            if(this.state.nextQuestion===undefined){
                this.endGame();
            }else{
                this.displayQuestions(this.state.questions,this.state.currentQuestion,this.state.nextQuestion,this.state.previousQuestion);
            }
           
        });
    }

    startTimer = () => {
        const countDownTime = Date.now() + 180000;
        this.interval = setInterval(() =>{
            const now = new Date();
            const distance  = countDownTime - now;

            const minutes = Math.floor((distance % (1000*60*60))/(1000*60));
            const seconds = Math.floor((distance % (1000*60))/1000);

            if (distance < 0) {
                clearInterval(this.interval);
                this.setState({
                    time:{
                        minutes: 0,
                        seconds:0
                    }
                },() => {
                   this.endGame();
                });
            }else{
                this.setState({
                    time:{
                        minutes,
                        seconds
                    }
                });
            }
        },1000);
    }


    handleDisableButton=()=>{
        if(this.state.previousQuestion=== undefined || this.state.currentQuestionIndex===0){
            this.setState({
                previousButtonDisable:true
            });

        }else{
            this.setState({
                previousButtonDisable:false
            });


        }

        if(this.state.nextQuestion=== undefined || this.state.currentQuestionIndex+1===this.state.numberOfQuestions){
            this.setState({
                nextButtonDisable:true
            });

        }else{
            this.setState({
                nextButtonDisable:false
            });


        }
    };

    endGame=()=>{
        alert('Quiz has ended!');
        const { state } = this;
        const playerStats = {
            score:state.score,
            numberOfQuestions:state.numberOfQuestions,
            numberOfAnsweredQuestions:state.correctAnswers + state.wrongAnswers,
            correctAnswers:state.correctAnswers,
            wrongAnswers:state.wrongAnswers,

        };
        console.log(playerStats);
        setTimeout(()=>{
            this.props.history.push('/play/QuizSummary',playerStats);
        },1000)
    }
    
    
    render(){

        const { currentQuestion,
            currentQuestionIndex,
            numberOfQuestions,
             time
            } = this.state;
        return(
            <Fragment>
            <Helmet><title> Quiz Page</title></Helmet>
            <Fragment>
        <audio  id="correct-sound" src={correctNotification}></audio>
        <audio id="wrong-sound" src={wrongNotification}></audio>
        <audio id="button-sound" src={buttonSound}></audio>
            </Fragment>
            <div className="questions"> 
            <h2>Free Quiz Mode</h2>
                <div className="lifeline-container">
                    <p>
                        <span className="mdi mdi-set-center mdi-24px lifeline-icon"></span><span className="lifeline">2</span>
                    </p>
                    <p>
                        <span className="mdi mdi-lightbulb-on-outline mdi-24px lifeline-icon"></span><span className="lifeline">5</span>
                    </p>
                </div>
                <div>
                   <p>
        <span className="left" style= {{float:'left'}}>{currentQuestionIndex + 1} of {numberOfQuestions}</span>
                <span className="right" style= {{float:'right'}}>{time.minutes}:{time.seconds}<span className="mdi mdi-clock-outline mdi-24px"></span></span>
                   </p> 
                </div>
            <h5>{currentQuestion.question }</h5>
            <div className="option-container">
                <p onClick={this.handleOptionClick}className="option">{currentQuestion.optionA}</p>
                <p onClick={this.handleOptionClick}className="option">{currentQuestion.optionB}</p>
            </div>
            <div className="option-container">
                <p onClick={this.handleOptionClick}className="option">{currentQuestion.optionC}</p>
                <p onClick={this.handleOptionClick}className="option">{currentQuestion.optionD}</p>
            </div>
            <div className="button-container">
                <button 
                    className={classnames('',{'disable':this.state.previousButtonDisabled})}
                    id="previous-button" onClick={ this.handleButtonClick}>
                    Previous
                </button>
                <button 
                    className={classnames('',{'disable': this.state.nextButtonDisabled})}
                    id="next-button" onClick={ this.handleButtonClick}>
                    Next
                </button>
                <button id="quit-button" onClick={ this.handleButtonClick}>Out</button>
            </div>

             </div>  
            </Fragment>
            
        );
    }
}

export default Play;