import React, { useRef } from "react";
import "./teamList.scss";

const ViewTeamList = (teams, onTeamSelected) => {
    const { current } = useRef([]);
    const focusOnItem = (i, id) => {
        current.map(({ classList }) => classList.remove("team__item-selected"));
        current[i].classList.add("team__item-selected");
        current[i].focus();
        onTeamSelected(id);
    };
    return teams.map(({ id, logo_path, teamName }, i) => {
        const isLong = teamName?.length > 10 ? "team__item-name-long" : "";
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
                onBlur={() => {
                    current.map(({ classList }) =>
                        classList.remove("team__item-selected")
                    );
                }}
            >
                <img
                    className="team__item-img"
                    src={logo_path}
                    alt={teamName}
                />
                <h2 className={`team__item-name ${isLong}`}>{teamName}</h2>
            </li>
        );
    });
};
export default ViewTeamList;
