import React, { Fragment } from 'react';
import {Helmet} from 'react-helmet';
import {Link} from 'react-router-dom';


const Home = () =>(
    <Fragment>
        <Helmet><title> QuizeGuru - Home </title> </Helmet>
       <div id="home">
      
      
        <section>
            <div style={{textAlign:'center'}}>
                <span className="mdi mdi-cube-outline cube mdi-48px "></span>
            </div>
            <h1> QuizeGuru </h1>
           
            <div className="play-button-container">
            <ul>
               <Link className="play-button" to="/play/instructions">Play</Link> 
            </ul>
            </div>
            <div className="auth-container">
                <Link to="/login" className="auth-buttons" id="login-button">LogIN</Link>
                <a id="signup-button" href={"https://gurpreet-chawla.github.io/honey" }>BACK</a>
            </div>
           
        </section>
        </div>
        
        </Fragment>
    );
export default Home;