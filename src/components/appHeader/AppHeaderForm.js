const AppHeaderForm = ({ setCountry }) => (
    <form
        className="app-header__select"
        onChange={({ target: { value } }) => setCountry(value)}
    >
        <input
            type="radio"
            id="Scotland"
            name="Country"
            value="Scotland"
            defaultChecked
        />
        <label className="app-header__country" htmlFor="Scotland">
            Scotland
        </label>

        <input type="radio" id="Denmark" name="Country" value="Denmark" />
        <label className="app-header__country" htmlFor="Denmark">
            Denmark
        </label>
    </form>
);

export default AppHeaderForm;
