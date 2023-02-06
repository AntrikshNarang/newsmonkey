import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import propTypes from 'prop-types'

export class News extends Component {

    static defaultProps = {
        country: 'in',
        pagesize: 8,
        category: 'technology'
    }

    static propTypes = {
        country: propTypes.string,
        pagesize: propTypes.number,
        category: propTypes.string
    }


    //Use of Contructor and Super in Class Based Component

    // In class-based React components, the constructor method is a special method that is called when an instance of the component is created. It's used to initialize the component's state and bind this to the instance of the component.
    // In the code snippet you provided, the constructor method is used to initialize the state of the component with an empty array articles and a loading property set to false.
    // The super method is called at the beginning of the constructor method to ensure that this is correctly set up and to inherit any behavior from the parent class

    // Class-based React components mein, constructor method ek aisi special method hai jo component ke instance banate waqt call hoti hai. Iska use component ke state ko initialize karne aur this ko component ke instance ke saath bind karne ke liye hota hai.
    // Code snippet mein, constructor method se component ke state ko initialize kiya gaya hai empty array articles aur loading property false set kar ke.
    // super method constructor method ke starting mein call hota hai taaki this correctly set ho jaye aur parent class se koi bhi behavior inherit ho jaye

    //constructor runs first then render then componentDidMount
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
        }
        document.title=`NewsMonkey - ${this.props.category[0].toUpperCase() + this.props.category.slice(1)}`
    }

    //articles = [{name: harry,age:18},{name:jason,age:19},{name:bitty,age:23}]
    //constructor(){
    //     super();
    //     this.state = {
    //         articles: this.articles,      //signifies articles of this class is equal to aritcles from above
    // }

    //ComponentDidMount is a lifecycle method which runs after the render function is finished

    updateNews = async () => {
        const url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=c7453a9c2aaf431ea15553c6fa3f6708&page=${this.state.page}&pagesize=${this.props.pagesize}`
        this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({ loading: false })
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults })
    }
    
    async componentDidMount() {
        this.updateNews();
    }

    handleNextClick = async () => {
        this.setState({ page: this.state.page + 1 });
        this.updateNews();
    }
    handlePrevClick = async () => {
        this.setState({ page: this.state.page - 1 });
        this.updateNews();
    }

    render() {
        return (
            <>
                <div className='container my-3'>
                    <h1 className='text-center'>Latest {(this.props.category).slice(0,1).toUpperCase() + (this.props.category).slice(1)} News</h1>
                    {/* {this.state.loading && <Spinner />} */}
                    {/* Removed Spinner because Infinite Scroll is being Implemented */}

                    {!this.state.loading && <div className="row">
                        {this.state.articles.map((element) => {
                            return <div className="col-lg-4 col-md-6" key={element.url}>
                                <NewsItem title={element.title} description={element.description ? element.description.slice(0, 90) + '...' : "Description not Available"} imgURL={element.urlToImage} newsURL={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                            </div>
                        })}
                    </div>}
                </div>
                <div className="container my-3 d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} className="btn btn-dark mx-2" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pagesize)} className="btn btn-dark mx-2" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </>
        )
    }
}

export default News