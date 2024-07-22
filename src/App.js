import logo from './logo.svg';
import './App.css';


import React, { Component } from 'react'
import PostList from './Components/PostList';
import PostFrom from './Components/PostFrom';
import GetTask from './Components/GetTask';
import GetTask_func from './Components/GetTask_func';


class App extends Component {
  render() {
    return (
      <div className='App'>
       {/* <PostFrom/>
        <PostList/>  */}
        {/* <GetTask/> */}
        <GetTask_func/>
        
      </div>
    )
  }
}




export default App;
