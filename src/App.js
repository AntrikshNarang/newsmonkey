import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  pagesize= 15;
  apiKey = process.env.REACT_APP_NEWS_API ;
  state = {
    progress: 0,
  }
  setProgress = (progress) => {
    this.setState({progress:progress})
  }
  render() {
    return (
      <>
      <Router>
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
      />
        <Navbar />
        <Routes>
          {/* exact is used so that only the specified path is rendered, example for / , general as well as other categories will also render as it matches '/' + {category} while as exact ensures / exactly works for / and not for /about or anything else */}
          {/* key is a special prop used to tell react that  */}
          <Route exact path='/' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='general' pagesize={this.pagesize} country='in' category='general' />} />
          <Route exact path='/business' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='business' pagesize={this.pagesize} country='in' category='business' />} />
          <Route exact path='/entertainment' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='entertainment' pagesize={this.pagesize} country='in' category='entertainment' />} />
          <Route exact path='/health' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='health' pagesize={this.pagesize} country='in' category='health' />} />
          <Route exact path='/science' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='science' pagesize={this.pagesize} country='in' category='science' />} />
          <Route exact path='/sports' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='sports' pagesize={this.pagesize} country='in' category='sports' />} />
          <Route exact path='/technology' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='technology' pagesize={this.pagesize} country='in' category='technology' />} />
        </Routes>
      </Router>
      </>
    )
  }
}


