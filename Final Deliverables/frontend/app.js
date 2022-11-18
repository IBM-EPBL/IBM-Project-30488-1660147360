@import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');
*{ 
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  font-family: 'Montserrat', sans-serif;
  font-family: 'Poppins', sans-serif;
  font-family: 'Sora', sans-serif;
  scroll-behavior: smooth;
}
body{
  background-color: #e7e7e7 !important;
  margin: 0 !important;
}
/* .row-header{
  margin:0px auto;
  padding:0px auto;
} */

.row-content {
  margin:0px auto;
  padding: 50px 0px 50px 0px;
  border-bottom: 1px ridge;
  min-height:400px;
}

.footer{
  background-color: #D1C4E9;
  margin:0px auto;
  padding: 20px 0px 20px 0px;
}
.jumbotron {
  margin: 0px !important;
  position: relative !important;
  padding:70px 30px 70px 30px;
  margin:0px auto;
  background: #9575CD ;
  color:floralwhite;
}

address{
  font-size:80%;
  margin:0px;
  color:#0f0f0f;
}

/* .navbar-dark {
  background-color: #512DA8;
} */

.page-enter{
  opacity: 0.01;
  transform: translateX(-100%);
}
.page-enter-active{
  opacity: 1;
  transform: translateX(0%);
  transition: all 300ms ease-in;
}
.page-exit{
  opacity: 1;
  transform: translateX(0%);
}
.page-exit-active{
  opacity: 0.01;
  transform: translateX(100%);
  transition: all 300ms ease-out;
}
.hover-underline-animation {
  display: inline-block;
  position: relative; 
  font-size: 35px;
  color: #ffffff;
}

.hover-underline-animation:after {
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #ffffff;
  transform-origin: bottom right;
  transition: transform 0.40s ease-out;
}

.hover-underline-animation:hover:after {
  transform: scaleX(1);
  transform-origin: bottom left;
}


.fifth{
  outline: none;
  border:1px solid #777a7c !important;
  height:2.5rem !important;
  color: #f8f8f8;
  position: relative;
  overflow: hidden; 
  border-radius: 50px !important;
  z-index: 1;
  -webkit-transition: color 550ms ease-in-out;
  transition: color 550ms ease-in-out;
}
.fifth:after {
  content: '';
  position: absolute;
  display: block;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  transform: translateX(-50%);
  width: 0;
  height: 100%;
  background: #8e44ad;
  z-index: -1;
  transition: width 550ms ease-in-out;
  transition: width 550ms ease-in-out;
}
.fifth:hover {
  border: none !important;
color: #fff;
}
.fifth:hover:after {
width: 120%;
}
:root{
  --mainDark: #343a40;
  --mainGrey: rgba(109,109,109);
  --mainLightGrey: rgba(172,172,172);
  --mainWhite: #fff;
  --mainBlue: #007bff;
}
.titleText{
  font-family: 'Lobster', cursive;
}

.footerText {
  display: inline-block;
  position: relative;  
  color: #ffffff;
}

.footerText:after {
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #ffffff;
  transform-origin: bottom right;
  transition: transform 0.40s ease-out;
}

.footerText:hover:after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
