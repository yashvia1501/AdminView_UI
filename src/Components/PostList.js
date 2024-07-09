import React, { Component } from 'react'
import axios from 'axios'
class PostList extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         posts:[],
         errormsg:''
      }
    }
    componentDidMount(){
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(response=>{
            console.log(response)
            this.setState({
                posts:response.data
            })
        })
        .catch(error=>{
            console.log(error)
            this.setState({errormsg:'error ret data'})
        })
    }
    
  render() {
    const{posts,errormsg}=this.state //destructuring
    console.log(posts,"posts");
    return (
      <div>
        List of Posts
        {
            posts.length? posts.map(post => <div key={post.id}>{post.title}</div>):null
        }
        {errormsg? <div>{errormsg}</div>:null}
      </div>
    )
  }
}

export default PostList
