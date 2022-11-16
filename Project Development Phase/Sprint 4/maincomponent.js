import React,{useEffect,useState} from "react";
import SignUp from "./components/signup/SignUp";
import Home from './components/home/Home'
import Login from './components/login/Login'; 
import {withRouter, Route, Switch,Redirect} from 'react-router-dom';
import "./App.css";
import Products from "./components/products/Products";
import Slide from 'react-reveal/Slide';
import Fade from 'react-reveal/Fade';
import Bounce from 'react-reveal/Bounce';
import Flip from 'react-reveal/Flip';
import Zoom from 'react-reveal/Zoom';
import Jump from 'react-reveal/Jump';
import LightSpeed from 'react-reveal/LightSpeed';
import HeadShake from 'react-reveal/HeadShake';

import Footer from "./components/footer/Footer"; 
import ContactUs from "./components/contactus/ContactUs";
import ScrollToTop from "./components/scrollTop/ScrollToTop";




function MainComponent(props) {

  const HomePage = () =>{
    return(
      <Home />
    )
  }
  

  const ProductsData = () =>{
    return(
      <Products />
    );
  }

  return ( 
        <>
          <ScrollToTop>
            <Switch>
              <Route exact path='/home' component={HomePage}/>
              <Route path='/contactus' component={ContactUs} />
              <Route path='/signup' component={SignUp} />
              <Route path='/login' component={Login} />
              <Route exact path='/products' component={ProductsData} />
              <Redirect to='/home' /> 
            </Switch> 
          </ScrollToTop>
          <Fade bottom>
            <Footer />
          </Fade>
       </>
  );
}

export default MainComponent;
