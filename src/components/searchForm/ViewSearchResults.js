import { Link } from "react-router-dom";

const ViewSearchResults = ({ data }) => {
    const results = (
        <div className="team__search-wrapper">
            {data.map(({ id, name }) => (
                <div key={id}>
                    <Link
                        to={`/teams/${id}`}
                        className="button button__secondary"
                    >
                        <div className="inner">{name}</div>
                    </Link>
                </div>
            ))}
        </div>
    );
    const findedTeams = !data ? null : !data.length ? (
        <p className="team__search-error">
            The Team was not found. Check the name and try again
        </p>
    ) : data.length === 1 ? (
        <div className="team__search-success">
            There is! Visit <span>{data[0].name}</span> page?
            {results}
        </div>
    ) : (
        <div className="team__search-success">
            There are few teams with this selector:
            {results}
        </div>
    );

    return findedTeams;
};

export default ViewSearchResults;
