import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'

const App = () => {
  const pagesize= 15;
  const apiKey = process.env.REACT_APP_NEWS_API ;
  const [progress, setprogress] = useState(0)
    return (
      <>
      <Router>
        <LoadingBar
        color='#f11946'
        progress={progress}
      />
        <Navbar />
        <Routes>
          <Route exact path='/' element={<News setprogress={setprogress} apiKey={apiKey} key='general' pagesize={pagesize} country='in' category='general' />} />
          <Route exact path='/business' element={<News setprogress={setprogress} apiKey={apiKey} key='business' pagesize={pagesize} country='in' category='business' />} />
          <Route exact path='/entertainment' element={<News setprogress={setprogress} apiKey={apiKey} key='entertainment' pagesize={pagesize} country='in' category='entertainment' />} />
          <Route exact path='/health' element={<News setprogress={setprogress} apiKey={apiKey} key='health' pagesize={pagesize} country='in' category='health' />} />
          <Route exact path='/science' element={<News setprogress={setprogress} apiKey={apiKey} key='science' pagesize={pagesize} country='in' category='science' />} />
          <Route exact path='/sports' element={<News setprogress={setprogress} apiKey={apiKey} key='sports' pagesize={pagesize} country='in' category='sports' />} />
          <Route exact path='/technology' element={<News setprogress={setprogress} apiKey={apiKey} key='technology' pagesize={pagesize} country='in' category='technology' />} />
        </Routes>
      </Router>
      </>
    )
}

export default App

