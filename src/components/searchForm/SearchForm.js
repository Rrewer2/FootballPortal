import { useState } from "react";
import { useFormik } from "formik";
import SearchResults from "./SearchResults";
import withErrorBoundary from "../errorBoundary/ErrorBoundary";
import "./searchForm.scss";

const SearchForm = () => {
    const [name, setTeam] = useState(null);

    const { handleReset, handleSubmit, handleChange, values, errors } =
        useFormik({
            initialValues: {
                name: "Team name",
            },
            validate: ({ name }) => {
                if (!name) return { name: "This field is required" };

                if (name.length < 3)
                    return { name: "Must be 3 characters or more" };
            },
            onSubmit: ({ name }) => setTeam(name),
        });

    return (
        <article className="search" onBlur={() => handleReset()}>
            <h2 className="search-title">Find a Team by name:</h2>
            <form className="search-form" onSubmit={handleSubmit}>
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
                <h2 className="search-error" name="name">
                    {errors.name}
                </h2>
            ) : null}
            {!name ? null : SearchResults(name)}
        </article>
    );
};

export default withErrorBoundary(SearchForm);
