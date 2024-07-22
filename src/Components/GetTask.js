import axios from 'axios';
import React, { Component } from 'react';

class GetTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      originalPost: [],
      posts: [],
      errorMsg: '',
      term: '',
      name: '',
      email: '',
      role: '',
      editrole: '',
      tempData: {},
    };
  }

  componentDidMount() {
    axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
      .then(response => {
        this.setState({
          posts: response.data,
          originalPost: response.data,
        });
      })
      .catch(error => {
        this.setState({
          errorMsg: "error occurred"
        });
      });
  }

  onInputChange = (event) => {
    const searchData = this.state.originalPost.filter((item) =>
      item.name.toLowerCase().includes(event.target.value.toLowerCase()) ||
      item.email.toLowerCase().includes(event.target.value.toLowerCase()) ||
      item.role.toLowerCase().includes(event.target.value.toLowerCase())
    );
    this.setState({
      posts: searchData
    });
  };

  DeleteHandler = (value) => {
    this.setState({
      posts: this.state.posts.filter((post) => post.id !== value)
    });
  };

  InputData = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submitHandler = () => {
    const obj = {
      name: this.state.name,
      email: this.state.email,
      role: this.state.role,
      id: Date.now(), // Example: Generate a unique ID (you may need a better method)
    };
    this.setState({
      posts: [obj, ...this.state.posts],
      name: '',
      email: '',
      role: '',
    });
  };

  onEdit = (value) => {
    const tempData = this.state.posts.find(post => post.id === value);
    this.setState({
      editrole: value,
      tempData: { ...tempData }
    });
  };

  editData = (e, field) => {
    this.setState(prevState => ({
      tempData: {
        ...prevState.tempData,
        [field]: e.target.value
      }
    }));
  };

  handleSave = () => {
    const updatedPosts = this.state.posts.map(post =>
      post.id === this.state.tempData.id ? this.state.tempData : post
    );
    this.setState({
      posts: updatedPosts,
      editrole: ''
    });
  };

  render() {
    const { posts } = this.state;

    return (
      <>
        <div className='enterNew'>
          <input type="text" name="name" value={this.state.name} onChange={this.InputData} placeholder='NAME' />
          <input type="text" name="email" value={this.state.email} onChange={this.InputData} placeholder='Email' />
          <input type="text" name="role" value={this.state.role} onChange={this.InputData} placeholder='Role' />

          {/* search bar */}
          <input type='text' onChange={this.onInputChange} placeholder='search ' />
        </div>
        <button type="submit" onClick={this.submitHandler}>Submit</button> <br />

        <table className='table'>
          <thead>
            <tr>
              <th></th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ROLE</th>
              <th className='action'>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              posts.map(post =>
                <tr key={post.id}>
                  <td><input type='checkbox' /></td>
                  {
                    this.state.editrole === post.id ?
                      <>
                        <td><input type='text' value={this.state.tempData.name} onChange={(e) => this.editData(e, "name")} /></td>
                        <td><input type='text' value={this.state.tempData.email} onChange={(e) => this.editData(e, "email")} /></td>
                        <td><input type='text' value={this.state.tempData.role} onChange={(e) => this.editData(e, "role")} /></td>
                        <td><button onClick={this.handleSave}>Save</button></td>
                      </>
                      :
                      <>
                        <td>{post.name}</td>
                        <td>{post.email}</td>
                        <td>{post.role}</td>
                        <td><button onClick={() => this.onEdit(post.id)}>Edit</button></td>
                      </>
                  }
                  <td><button name="Delete" onClick={() => this.DeleteHandler(post.id)}>Delete</button></td>
                </tr>
              )
            }
          </tbody>
        </table>
        <button>Delete selected</button>
      </>
    );
  }
}

export default GetTask;
