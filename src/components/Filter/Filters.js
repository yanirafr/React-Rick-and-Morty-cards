import "./Filter.scss";
import PropTypes from "prop-types";

const Filters = (props) => {
  // Functions
  const handleFilter = (ev) => {
    props.sendFilter(ev.target.value);
  };
  const stopSubmit = (ev) => {
    ev.preventDefault();
  };

  // Return
  return (
    <section className="browse">
      <form className="browse__form" onSubmit={stopSubmit}>
        <label className="browse__form__label" htmlFor="userInput">
          Browse characters
        </label>
        <input
          type="text"
          name="userInput"
          id="userInput"
          className="browse__form__input"
          value={props.userInput}
          placeholder="Ex: Rick"
          onChange={handleFilter}
        />
      </form>
    </section>
  );
};

// Prop Types
Filters.propTypes = {
  sendFilter: PropTypes.func,
  userInput: PropTypes.string,
};

export default Filters;
