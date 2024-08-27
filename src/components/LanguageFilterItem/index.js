// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {filterList, iSActive, upDateActiveFilterId} = props
  const {language, id} = filterList
  const buttonClassName = iSActive ? 'button-change-method' : 'button'
  const renderActiveButton = () => {
    upDateActiveFilterId(id)
  }
  return (
    <li className="filter-container">
      <button
        className={buttonClassName}
        type="button"
        onClick={renderActiveButton}
      >
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
