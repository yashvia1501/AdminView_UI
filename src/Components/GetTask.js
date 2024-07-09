import axios from 'axios';
import React, { Component } from 'react';

class GetTask extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         posts:[],
         errorMsg:''
      }
    }
 componentDidMount(){
    
    axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
    .then(response=>{
        this.setState({
            posts:response.data
        })
    })
    .catch(error=>{
        this.setState({
            errorMsg:"error occured"
        })

    }) 
 }
    
  render() {
    const{posts}=this.state
    return (
        <>
        <table className='table'>
      <thead>
       <th>NAME</th>
       <th>EMAIL</th>
       <th>ROLE</th>
      </thead>
      <tbody>
        {
          posts.length > 0 && posts.map(post=><tr key={post.id}>
            <td>{post.name}</td>
            <td>{post.email}</td>
            <td>{post.role}</td>
            </tr>)
            
        }
       
      </tbody>
      </table>
      </>
    )
    }
    
}
  


export default GetTask
