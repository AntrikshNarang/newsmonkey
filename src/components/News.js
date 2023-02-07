import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import propTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
    const [articles, setarticles] = useState([]);
    const [page, setpage] = useState(1);
    const [totalResults, settotalResults] = useState(0);

    const updateNews = async () => {
        props.setprogress(15)
        const url = `https://newsapi.org/v2/top-headlines?category=${props.category}&country=${props.country}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pagesize}`
        console.log('page in updateNews(): ' + page);
        let data = await fetch(url);
        let parsedData = await data.json()
        setarticles(parsedData.articles)
        settotalResults(parsedData.totalResults)
        props.setprogress(100)
    }

    //Will run only once
    useEffect(() => {
        document.title = `NewsMonkey - ${props.category[0].toUpperCase() + props.category.slice(1)}`
        updateNews();
        // eslint-disable-next-line
    }, [])

    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?category=${props.category}&country=${props.country}&apiKey=${props.apiKey}&page=${page + 1}&pagesize=${props.pagesize}`
        console.log('page: ' + page);
        setpage(page + 1) // since setpage is an async function, it takes time to set page before the url gets updated that's why url has page= {page + 1} in it
        let data = await fetch(url);
        let parsedData = await data.json()
        setarticles(articles.concat(parsedData.articles))
        settotalResults(parsedData.totalResults)
    };
    return (
        <>
            <div className='container my-3' style={{ overflow: 'hidden' }}>
                <h1 className='text-center' style={{ marginTop: '50px' }}>NewsMonkey - Latest {(props.category).slice(0, 1).toUpperCase() + (props.category).slice(1)} News</h1>
                <InfiniteScroll style={{ overflow: 'hidden !important' }}
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row">
                            {console.log(articles.length + ' articles length\nTotal results ' + totalResults)}
                            {articles.map((element) => {
                                return <div className="col-lg-4 col-md-6" key={element.url}>
                                    <NewsItem title={element.title} description={element.description ? element.description.slice(0, 90) + '...' : "Description not Available"} imgURL={element.urlToImage} newsURL={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </div>
        </>
    )
}

News.defaultProps = {
    country: 'in',
    pagesize: 8,
    category: 'technology'
}

News.propTypes = {
    country: propTypes.string,
    pagesize: propTypes.number,
    category: propTypes.string
}

export default News