import React from 'react';
import ReactDOM from 'react-dom';

 class App extends React.Component{
   constructor(props){
      super(props);
      this.state = {
         name: 'Galanarius',
         ind: [{
            pages: Array(5).fill(null),
         }],
      }
   }
 }

 class Page extends React.Component{
   constructor(props){
      super(props);
      this.state = {
         title: 'blank',
         id: -1,
      }
   }

   setHome(p){

   }
   
   setAbout(p){

   }

   setProfile(p){

   }

   setOperations(p){

   }

 }

 ReactDOM.render(
   <App />,
   document.getElementById('root')
 );