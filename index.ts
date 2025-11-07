const NUMBER_OF_CHARGEPOINTS = 20 as const
const CHARGING_POWER_IN_KW = 11 as const
const ENERGY_NEED_PER_KM_IN_KWH = 0.18 as const
/** we simulate one non-leap year in 15 minute steps */
const TICKS = 365 * 24 * 4
/** Record<hour, probability 0-1> */
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
/** [km, probability 0-1] */
const CHARGING_DEMAND_OPTIONS: [number, number | null][] = [
    [0.3431, null],
    [0.049, 5.0],
    [0.098, 10.0],
    [0.1176, 20.0],
    [0.0882, 30.0],
    [0.1176, 50.0],
    [0.1078, 100.0],
    [0.049, 200.0],
    [0.0294, 300.0],
] as const

const chargePoints: { remainingChargingTimeInTicks: number }[] = Array.from(
    { length: NUMBER_OF_CHARGEPOINTS },
    () => ({ remainingChargingTimeInTicks: 0 }),
)

const doesCarArrive = (hour: number): boolean => {
    const arrivalProbability = ARRIVAL_PROBABILITIES[hour]
    if (arrivalProbability === undefined) {
        throw new Error(`No arrival probability defined for hour ${hour}`)
    }
    return Math.random() < arrivalProbability
}

const pickRandomChargingDemandInKm = (): number | null => {
    const random = Math.random()

    let total = 0
    for (const [chance, distance] of CHARGING_DEMAND_OPTIONS) {
        total += chance
        if (random < total) return distance
    }

    // There's a 0.03 % chance that none of the provided options is chosen.
    // Because that's negligible, we just return null in that case.
    return null
}

let totalKiloWattHoursConsumed = 0
let actualMaxPowerDemandInKW = 0
for (let tick = 0; tick < TICKS; tick++) {
    const currentHour = Math.floor((tick % (24 * 4)) / 4)

    for (const chargePoint of chargePoints) {
        if (chargePoint.remainingChargingTimeInTicks > 0) {
            chargePoint.remainingChargingTimeInTicks -= 1
            continue
        }

        if (!doesCarArrive(currentHour)) {
            continue
        }

        const chargingDemandInKm = pickRandomChargingDemandInKm()
        if (chargingDemandInKm === null) {
            continue
        }

        const demandedEnergyInKWH = chargingDemandInKm * ENERGY_NEED_PER_KM_IN_KWH
        totalKiloWattHoursConsumed += demandedEnergyInKWH
        chargePoint.remainingChargingTimeInTicks = demandedEnergyInKWH / CHARGING_POWER_IN_KW / 4
    }

    const chargePointsInUse = chargePoints.filter(
        (cp) => cp.remainingChargingTimeInTicks > 0,
    ).length
    const currentPowerDemandInKW = chargePointsInUse * CHARGING_POWER_IN_KW
    if (currentPowerDemandInKW > actualMaxPowerDemandInKW) {
        actualMaxPowerDemandInKW = currentPowerDemandInKW
    }
}

const theoreticalMaxPowerDemandInKW = NUMBER_OF_CHARGEPOINTS * CHARGING_POWER_IN_KW
const concurrencyFactor = actualMaxPowerDemandInKW / theoreticalMaxPowerDemandInKW

console.table({
    "Total energy consumed in kWh": { value: totalKiloWattHoursConsumed },
    "Theoretical maximum power demand": { value: theoreticalMaxPowerDemandInKW },
    "Actual maximum power demand": { value: actualMaxPowerDemandInKW, expected: "77-121 kW" },
    "Concurrency factor": { value: concurrencyFactor * 100, expected: "35-55%" },
})
