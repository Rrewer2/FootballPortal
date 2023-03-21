import React, { useRef } from "react";

const ViewTeamList = ({ data, args }) => {
    const { onTeamSelected } = args;
    const { current } = useRef([]);

    const focusOnItem = (i, id) => {
        current.map(({ classList }) => classList.remove("team__item_selected"));
        current[i].classList.add("team__item_selected");
        current[i].focus();
        onTeamSelected(id);
    };

    const teams = data.map(({ id, logo_path, teamName, founded }, i) => {
        const fontSize = teamName.length > 11 ? "18px" : "22px";
        return (
            <li
                key={id}
                className="team__item"
                tabIndex={0}
                ref={(el) => (current[i] = el)}
                onClick={() => {
                    focusOnItem(i, id);
                }}
                onKeyDown={({ key }) => {
                    if (key === "Enter") {
                        focusOnItem(i, id);
                    }
                }}
            >
                <img src={logo_path} alt={teamName} />
                <div style={{ fontSize: fontSize }} className="team__name">
                    {teamName}
                </div>
                <div className="team__name">founded: {founded}</div>
            </li>
        );
    });
    return <ul className="team__grid">{teams}</ul>;
};
export default ViewTeamList;
