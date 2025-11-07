const NUMBER_OF_CHARGEPOINTS = 20
const CHARGING_POWER_IN_KW = 11
const KWH_PER_100_KM = 18

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
}

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
]

// [34.31, null],
//   [4.90, 5.0],
//   [9.80, 10.0],
//   [11.76, 20.0],
//   [8.82, 30.0],
//   [11.76, 50.0],
//   [10.78, 100.0],
//   [4.90, 200.0],
//   [2.94, 300.0]

const getRandomChargingDemandInKm = (): number | null => {
    const random = Math.random()

    let total = 0
    for (const [chance, distance] of CHARGING_DEMAND_OPTIONS) {
        total += chance
        if (random < total) return distance
    }

    // There's a 0.03 % chance of a car demanding charge for an undefined amount of kms. I decided to make that 0.
    return 0
}

// simulate one year in 15 minute steps
const TICKS = 365 * 24 * 4

// results
let totalKiloWattHoursConsumed = 0
const theoreticalMaxKiloWatts = NUMBER_OF_CHARGEPOINTS * CHARGING_POWER_IN_KW
const actualMaxKiloWatts = 0 // should be around 77-121 kW
const concurrencyFactor = 0 // should be between 35-55%

type ChargePoint = {
    remainingChargingTimeInTicks: number
}

const chargePoints: ChargePoint[] = Array.from({ length: NUMBER_OF_CHARGEPOINTS }, () => ({
    remainingChargingTimeInTicks: 0,
}))

for (let day = 0; day < 365; day++) {
    for (let hour = 0; hour < 24; hour++) {
        for (let step = 0; step < 4; step++) {
            for (const chargePoint of chargePoints) {
                // If already charging, decrease remaining charging time and continue
                if (chargePoint.remainingChargingTimeInTicks > 0) {
                    chargePoint.remainingChargingTimeInTicks -= 1
                    continue
                }

                const currentArrivalProbability = ARRIVAL_PROBABILITIES[hour]
                if (Math.random() >= currentArrivalProbability) {
                    // No car arrives
                    continue
                }

                const chargingDemandInKm = getRandomChargingDemandInKm()
                if (!chargingDemandInKm) {
                    // No charging needed
                    continue
                }

                const demandedEnergyInKWH = (chargingDemandInKm / 100) * KWH_PER_100_KM

                totalKiloWattHoursConsumed += demandedEnergyInKWH

                chargePoint.remainingChargingTimeInTicks =
                    demandedEnergyInKWH / CHARGING_POWER_IN_KW / 4
            }
        }
    }
}

// for (let tick = 0; tick < TICKS; tick++) {
//     const currentHour = Math.floor((tick % (24 * 4)) / 4)
// }

console.log("Total energy consumed in kWh:", totalKiloWattHoursConsumed)
console.table({
    "Total energy consumed in kWh": totalKiloWattHoursConsumed,
    "Theoretical maximum power demand": theoreticalMaxKiloWatts,
    "Actual maximum power demand": actualMaxKiloWatts,
    "Concurrency factor": concurrencyFactor,
})
