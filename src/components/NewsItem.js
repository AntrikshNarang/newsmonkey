import React from 'react'

const NewsItem = (props) => {
    let { title, description, imgURL, newsURL, author, date, source } = props;
    return (
        <>
            <div className="card my-3" style={{ width: "18rem", margin: 'auto' }}>
                <div style={{ 'display': 'flex', justifyContent: 'flex-end', position: 'absolute', right: 0 }}>
                    <span className="badge rounded-pill bg-danger" style={{ zIndex: '1', position: 'relative', left: '90% !important' }}>{source}</span>
                </div>
                <img src={!imgURL ? 'https://nationworldnews.com/wp-content/uploads/2023/01/3-Tips-to-Save-Data-on-Your-Cell-Phone-While.jpg' : imgURL} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-muted">By {author ? author : 'Unknown'} on {new Date(date).toGMTString()}</small></p>
                    <a href={newsURL} className="btn btn-sm btn-outline-dark" target='_blank' rel='noreferrer'>Read More</a>
                </div>
            </div>
        </>
    )
}

export default NewsItem