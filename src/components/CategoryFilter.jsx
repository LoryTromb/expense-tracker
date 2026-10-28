import { ALL_CATEGORIES, CATEGORIES } from '../utils/expenses.js'

// Dropdown that picks which category is displayed.
// Props: value is the selected category ('All' or one of CATEGORIES);
// onChange(category) reports a new selection to App.
// State: none, the selection is owned by App.
function CategoryFilter({ value, onChange }) {
  return (
    <label className="category-filter">
      Show
      <select
        data-cy="filter"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {[ALL_CATEGORIES, ...CATEGORIES].map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  )
}

export default CategoryFilter
