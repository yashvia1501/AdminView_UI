import logo from './logo.svg';
import './App.css';


import React, { Component } from 'react'
import PostList from './Components/PostList';
import PostFrom from './Components/PostFrom';
import GetTask from './Components/GetTask';

class App extends Component {
  render() {
    return (
      <div className='App'>
        {/* <PostFrom/>
        <PostList/> */}
        <GetTask/>
      </div>
    )
  }
}




export default App;
