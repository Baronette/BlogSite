import React, { Component } from 'react';
import Home from './Home/Home';
import Layout from './Layout';
import { Route } from 'react-router-dom';
import ViewPost from './ViewPost/ViewPost';
import MostRecent from './MostRecent';
import AddPost from './AddPost';
import { AdminContextComponent } from './AdminContext';
import LoginForm from './LoginForm';

export default class App extends Component {
  render() {
    return (
      <div>
        <AdminContextComponent>
          <Layout>
            <Route exact path='/' component={Home} />
            <Route exact path='/viewpost/:id' component={ViewPost} />
            <Route exact path='/mostrecent' component={MostRecent} />
            <Route exact path='/addpost' component={AddPost} />
            <Route exact path='/admin' component={LoginForm}/>
          </Layout>
        </AdminContextComponent>
      </div >
    )
  }
}