const ARRIVAL_PROBABILITIES: Record<number, number> = {
    0: 0.0094,
    1: 0.0094,
    2: 0.0094,
    3: 0.0094,
    4: 0.0094,
    5: 0.0094,
    6: 0.0094,
    7: 0.0094,
    8: 0.0283,
    9: 0.0283,
    10: 0.0566,
    11: 0.0566,
    12: 0.0566,
    13: 0.0755,
    14: 0.0755,
    15: 0.0755,
    16: 0.1038,
    17: 0.1038,
    18: 0.1038,
    19: 0.0472,
    20: 0.0472,
    21: 0.0472,
    22: 0.0094,
    23: 0.0094,
} as const

type ArrivalProbabilitiesProps = {
    multiplier: number
}

const ArrivalProbabilities = ({ multiplier }: ArrivalProbabilitiesProps) => {
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

export default ArrivalProbabilities
