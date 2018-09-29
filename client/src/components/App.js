import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom"; //react router helprs fornav dom
import { connect } from "react-redux"; //interact with action createStore
import * as actions from "../actions"; //take all action creators assign to actions
//browserroter works on behavior
//route rule and compontents for user interaction w/ screen

import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";

const SurveyNew = () => <h2>SurveyNew</h2>;

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(App);
