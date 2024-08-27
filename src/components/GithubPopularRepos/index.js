import {Component} from 'react'
import Loader from 'react-loader-spinner'
import RepositoryItem from '../RepositoryItem'
import LanguageFilterItem from '../LanguageFilterItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]
const apiStatusConstants = {
  inProgress: 'IN_PROGRESS',
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

// Write your code here

class GithubPopularRepos extends Component {
  state = {
    repoList: [],
    activeFilterId: languageFiltersData[0].id,
    apiStatus: apiStatusConstants.initial
  }

  componentDidMount() {
    this.getRepositoryItems()
  }

  upDateActiveFilterId = activeFilterId => {
    this.setState({activeFilterId}, this.getRepositoryItems)
  }

  getRepositoryItems = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {activeFilterId} = this.state
    const response = await fetch(`https://apis.ccbp.in/popular-repos?language=${activeFilterId}`)
    const data = await response.json()
    console.log(response)
    if (response.ok === true) {
      const updatedRepoList = data.popular_repos.map(each => ({
        id: each.id,
        name: each.name,
        avatarUrl: each.avatar_url,
        forksCount: each.forks_count,
        issuesCount: each.issues_count,
        starsCount: each.stars_count,
      }))
      this.setState({
        repoList: updatedRepoList,
        apiStatus: apiStatusConstants.success,
      })
    }

    else if (response.status === 401) {
      this.setState({
        apiStatus : apiStatusConstants.failure
      })
    }
  }

  renderRepositoryItem = () => {
    const {repoList} = this.state
    return (
      <ul className="repo-list">
        {repoList.map(eachRepo => (
          <RepositoryItem repoDetails={eachRepo} key={eachRepo.id} />
        ))}
      </ul>
    )
  }

  renderLanguageFilterItem = () => {
    const {activeFilterId} = this.state

    return (
      <ul className="filter-card">
        {languageFiltersData.map(eachFilter => (
          <LanguageFilterItem
            key={eachFilter.id}
            filterList={eachFilter}
            iSActive={activeFilterId === eachFilter.id}
            upDateActiveFilterId={this.upDateActiveFilterId}
          />
        ))}
      </ul>
    )
  }

  renderLoaderSpinner = () => (
    <div className="loader-card">
      <Loader type="ThreeDots" color="#0284c7" width={80} height={80} />
    </div>
  )

  renderFailure = () => (
    <div className="failure-card">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-img"
      />
      <p className="failure-name">Something Went Wrong</p>
    </div>
  )

  renderSuccesandFailureandLoaderData = () => {
     const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRepositoryItem()
      case apiStatusConstants.failure:
        return this.renderFailure()
      default:
        return this.renderLoaderSpinner()
    }
  }

  render() {
    return (
      <div className="bg-container">
        <h1 className="main-heading">Popular</h1>
        {this.renderLanguageFilterItem()}
        {this.renderSuccesandFailureandLoaderData()}
      </div>
    )
  }
}
export default GithubPopularRepos
