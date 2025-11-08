import { ARRIVAL_PROBABILITIES } from "./data"

type ArrivalProbabilityListProps = {
    multiplier: number
}

const ArrivalProbabilityList = ({ multiplier }: ArrivalProbabilityListProps) => {
    return (
        <table className="text-sm tabular-nums">
            <tbody>
                {Object.entries(ARRIVAL_PROBABILITIES).map(([hour, probability]) => (
                    <tr key={hour}>
                        <td className="w-full">
                            {hour.padStart(2, "0")}:00 –{" "}
                            {(parseInt(hour) + 1).toString().padStart(2, "0")}:00
                        </td>
                        <td className="text-right">
                            <span className="font-medium">
                                {(probability * 100 * multiplier).toFixed(2)}
                            </span>
                            %
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default ArrivalProbabilityList
