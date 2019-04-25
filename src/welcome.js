import React, { Component } from 'react'
import { HashRouter, Route } from 'react-router-dom';
import Login from './login';
import Registration from './registration';
import Footer from './footer';

export default class welcome extends Component {
  constructor() {
    super()
    this.state = {
    }
  }

  render() {
    return (
      <div>
        <HashRouter>
            <div>
                <Route exact path="/" component={Registration} />
                <Route path="/login" component={Login} />
            </div>
        </HashRouter>
        <Footer />
      </div>
    )
  }
}
