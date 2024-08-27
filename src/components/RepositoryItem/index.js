// Write your code here

import './index.css'

const RepositoryItem = props => {
  const {repoDetails} = props
  const {avatarUrl, name, starsCount, forksCount, issuesCount} = repoDetails
  return (
    <li className="repo-container">
      <img src={avatarUrl} alt={avatarUrl} className="logo" />
      <h1 className="heading">{name}</h1>
      <ul className="list">
        <div className="repo-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="img"
          />
          <p className="repo-name">{starsCount} stars</p>
        </div>
        <div className="repo-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="img"
          />
          <p className="repo-name">{forksCount} forks</p>
        </div>
        <div className="repo-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
            className="img"
          />
          <p className="repo-name">{issuesCount} open issues</p>
        </div>
      </ul>
    </li>
  )
}
export default RepositoryItem
