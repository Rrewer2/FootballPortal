export default function transformGame({
    formations,
    scores,
    weather_report,
    time,
    standings,
    ...args
}) {
    return {
        localteam_formation: formations?.localteam_formation ?? "__",
        visitorteam_formation: formations?.visitorteam_formation ?? "__",
        localteam_score: scores?.localteam_score ?? "_",
        visitorteam_score: scores?.visitorteam_score ?? "_",
        ht_score: scores?.ht_score ?? "--",
        ft_score: scores?.ft_score ?? "_ - _",
        date: time?.starting_at.date ?? "_",
        temp: `${weather_report?.temperature_celcius?.temp ?? "-"} °C`,
        time: `${time?.minute ?? "00"}.00`,
        localteam_position: standings?.localteam_position ?? "_",
        visitorteam_position: standings?.visitorteam_position ?? "_",
        ...args,
    };
}
