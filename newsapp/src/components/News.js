import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
import pandalogo from './Images/pand.png'

export default class News extends Component {

    static defaultProps = {
        coutry: 'in',
        category: 'general',
        pageSize: 6,
        setProgress: 0,
    }

    static propsTypes = {
        country: PropTypes.string,
        category: PropTypes.string,
        api_key: PropTypes.string,
        pageSize: PropTypes.number,
    }

    captalizeStr = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    constructor(props) {
        super(props)
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0,
            setProgress: 0
        }
        document.title = `${this.captalizeStr(this.props.category)} - NewsPanda`
    }

        async componentDidMount() {
        this.props.setProgress(10)
        const url = `https://gnews.io/api/v4/top-headlines?topic=${this.props.category}&token=${this.props.api_key}&lang=en&country=${this.props.country}&max=20`
        this.setState({ loading: true })
        let data = await fetch(url)
        this.props.setProgress(30)
        let parsedData = await data.json()
        this.props.setProgress(70)
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalArticles,
            loading: false
        })
        this.props.setProgress(100)
        console.log(parsedData)
        console.log("DidMount" + this.state.page)
    }

    fetchMoreData = async () => {
        const url = `https://gnews.io/api/v4/top-headlines?topic=${this.props.category}&token=${this.props.api_key}&lang=en&country=${this.props.country}&max=20`
        this.setState({ page: this.state.page + 1 })
        let data = await fetch(url)
        let parsedData = await data.json()
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalArticles
        })
        console.log(parsedData)
        console.log("fetchmore" + this.state.page)
    }

    render() {
        return (
            <>
                <h1 className='img-fluid text-center' style={{ margin: '15px 0px', marginTop: '80px' }} >
                    <img className='' src={pandalogo} alt="panda" width="120px" height="80px" />
                    Top {this.captalizeStr(this.props.category)} Headlines</h1>

                {this.state.loading && <Spinner />}

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className='row'>
                            {this.state.articles.map((element, index) => {
                                return <div className='col-md-4 my-2' key={index}>
                                    <NewsItem title={element.title.slice(0, 45)} description={element.description ? element.description.slice(0, 88) : " "} imgURL={element.image} newsURL={element.url} author={element.author} publishedAt={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </>
        )
    }
}