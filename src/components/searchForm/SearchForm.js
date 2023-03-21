import { useState } from "react";
import { useFormik } from "formik";
import SearchResults from "./SearchResults";
import "./searchForm.scss";

const SearchForm = () => {
    const [name, setTeam] = useState(null);

    const { handleSubmit, handleChange, values, errors } = useFormik({
        initialValues: {
            name: "",
        },
        validate: ({ name }) => {
            if (!name) return { name: "This field is required" };

            if (name.length < 3)
                return { name: "Must be 3 characters or more" };
        },
        onSubmit: ({ name }) => {
            setTeam(name);
        },
    });
    let result = null;
    if (name) {
        result = SearchResults(name);
    }

    return (
        <div className="team__search-form">
            <h2 className="team__search-label">Find a Team by name:</h2>
            <form className="team__search-wrapper" onSubmit={handleSubmit}>
                <input
                    id="name"
                    name="name"
                    type="text"
                    onChange={handleChange}
                    value={values.name}
                />
                <button
                    className="button button__main"
                    type="submit"
                    // disabled={process === "loading"}
                >
                    <div className="inner">find</div>
                </button>
            </form>
            {name && errors.name ? (
                <div className="team__search-error" name="name">
                    {errors.name}
                </div>
            ) : null}
            {result}
        </div>
    );
};

export default SearchForm;
