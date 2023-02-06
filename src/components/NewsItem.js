import React, { Component } from 'react'

export class NewsItem extends Component {
    //Since the constructor is for newsitem it will run the number of times, news item is loaded/requested by the news component
    // constructor(){
    //     super();
    //     console.log('Hey There i am a Constructor');
    // }
    render() {
        let {title,description,imgURL,newsURL,author,date,source} = this.props;
        return (
            <>
                <div className="card my-3" style={{width: "18rem",margin: 'auto'}}>
                    <img src={!imgURL?'https://nationworldnews.com/wp-content/uploads/2023/01/3-Tips-to-Save-Data-on-Your-Cell-Phone-While.jpg':imgURL} className="card-img-top" alt="..."/>
                        <div className="card-body">
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{zIndex:'1'}}>{source}</span>
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{description}</p>
                            <p className="card-text"><small className="text-muted">By {author?author:'Unknown'} on {new Date(date).toGMTString()}</small></p>
                            <a href={newsURL} className="btn btn-sm btn-outline-dark" target='_blank' rel='noreferrer'>Read More</a>
                        </div>
                </div>
            </>
        )
    }
}

export default NewsItem