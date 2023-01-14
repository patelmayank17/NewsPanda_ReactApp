import React, { Component } from 'react'
import unkonwImg from './Images/news.jpg'

export default class NewsItem extends Component {

  render() {
    let { title, description, imgURL, newsURL, author, publishedAt, source } = this.props;
    return (
      <div className='my-3'>
        <div className="card">
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            position: 'absolute',
            right: '0'
          }} >

            <span className="badge rounded-pill bg-danger" > {source} </span>
          </div>
          <img src={imgURL ? imgURL : unkonwImg} className="card-img-top" height="200px" width="250px" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className='text-muted'> By {author ? author : 'Unknown'} on {new Date(publishedAt).toGMTString()} ago</small></p>
            <a href={newsURL} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read more</a>
          </div>
        </div>
      </div>
    )
  }
}
