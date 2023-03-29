const AppHeaderForm = ({ onCountrySelected }) => (
    <form className="app-header__select" onChange={onCountrySelected}>
        <input
            type="radio"
            id="Scotland"
            name="selectedCountry"
            value="Scotland"
            defaultChecked
        />
        <label className="app-header__country" htmlFor="Scotland">
            Scotland
        </label>

        <input
            type="radio"
            id="Denmark"
            name="selectedCountry"
            value="Denmark"
        />
        <label className="app-header__country" htmlFor="Denmark">
            Denmark
        </label>
    </form>
);

export default AppHeaderForm;
