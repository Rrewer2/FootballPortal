import { Link } from "react-router-dom";

const ViewSearchResults = ({ data }) => {
    const results = data.map(({ id, name }) => (
        <Link to={`/teams/${id}`} className="button button__secondary" key={id}>
            <p className="inner">{name}</p>
        </Link>
    ));

    const findedTeams = !data ? null : !data.length ? (
        <h2 className="search-error">
            The Team was not found. Check the name and try again
        </h2>
    ) : data.length === 1 ? (
        <h2 className="search-success">
            There is! Visit <span>{data[0].name}</span> page?
            {results}
        </h2>
    ) : (
        <article className="search-success">
            <h2>There are few teams with this selector:</h2>
            <div className="search-wrapper">{results}</div>
        </article>
    );

    return findedTeams;
};

export default ViewSearchResults;
