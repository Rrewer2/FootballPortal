import LayoutComponent from "../../services/LayoutComponent";
import ViewSearchResults from "./ViewSearchResults";

const SearchResults = (name) => (
    <LayoutComponent
        Component={ViewSearchResults}
        funcName="getTeamInfoByName"
        param={name}
    />
);

// const ViewSearchResults = (name) => {
//     const randomTeamLayout = LayoutComponent({
//         Component: ViewSearchForm,
//         funcName: "getTeamInfoByName",
//         param: name,
//     });

//     const { process } = randomTeamLayout.props;
//     const isLoading = process === "loading";
//     console.log(process, isLoading);
//     return randomTeamLayout;
// };

export default SearchResults;
