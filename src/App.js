import React from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Home from './components/Home';
import Quizinstructions from './components/quiz/Quizinstructions';
import Play from './components/quiz/Play';
import QuizSummary from './components/quiz/QuizSummary';
import quizguru from './components/quizguru';


function App() {
  return (<div>
    <Router>
      <Route path="/" exact component={Home}/>
      <Route path="/play/instructions" exact component={Quizinstructions}/>
      <Route path="/play/Quiz" exact component={Play}/>
      <Route path="/play/quizSummary" exact component={QuizSummary}/>
      <Route path="/quizguru" exact component={quizguru}/>
      
      </Router>
      
 </div>
  );
}

export default App;
