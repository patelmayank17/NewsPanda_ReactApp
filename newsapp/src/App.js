import './App.css'
import React, { Component } from 'react'
import NavBar from './components/NavBar'
import News from './components/News'
import {
  HashRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import LoadingBar from 'react-top-loading-bar'


export default class App extends Component {
  pageSize = 15
  api_key = process.env.REACT_APP_NEWS_API
  state = { progress: 0 }

  setProgress = (progress) => {
    this.setState({ progress: progress })
  }

  render() {
    return (
      <Router>
        <div className="App">

          <NavBar />

          <LoadingBar color='#f11946' height={3} progress={this.state.progress} />
          <Routes>
            <Route path="/" exact element={<News key="general" setProgress={this.setProgress} pageSize={this.pageSize} country="in" category="general" api_key={this.api_key} />} />
            <Route path="/business" exact element={<News key="business" setProgress={this.setProgress} pageSize={this.pageSize} country="in" category="business" api_key={this.api_key} />} />
            <Route path="/entertainment" exact element={<News key="entertainment" setProgress={this.setProgress} pageSize={this.pageSize} country="in" category="entertainment" api_key={this.api_key} />} />
            <Route path="/health" exact element={<News key="health" setProgress={this.setProgress} pageSize={this.pageSize} country="in" category="health" api_key={this.api_key} />} />
            <Route path="/science" exact element={<News key="science" setProgress={this.setProgress} pageSize={this.pageSize} country="in" category="science" api_key={this.api_key} />} />
            <Route path="/sports" exact element={<News key="sports" setProgress={this.setProgress} pageSize={this.pageSize} country="in" category="sports" api_key={this.api_key} />} />
            <Route path="/technology" exact element={<News key="technology" setProgress={this.setProgress} pageSize={this.pageSize} country="in" category="technology" api_key={this.api_key} />} />
          </Routes>
        </div>
      </Router>
    )
  }
}

