/**
 * Debugging Guide
 * 1. Make the code more readable
 * 2. Pick up calculation errors
 * 3. Make these calculations robust such that the calculation does not give an incorrect result, it throws an error to the user if something has gone wrong (parameter used with an incorrect unit of measurement, etc)
 */

// Conversion factor
const KMH_TO_MS = 1000 / 3600;

// Given Parameters (with proper units)
const initialVelocityKmh = 10000; // velocity in km/h
const accelerationMs2 = 3; // acceleration
const timeSec = 3600; // time in seconds (1 hour)
const initialDistanceKm = 0; // distance in km
const initialFuelKg = 5000; // fuel in kg
const fuelBurnRateKgPerS = 0.5; // fuel burn rate in kg/s

// Function to ensure all inputs are numbers
const validateInputs = (...inputs) => {
  inputs.forEach((input) => {
    if (typeof input !== "number" || isNaN(input)) {
      throw new Error("Invalid input: All inputs must be numbers.");
    }
  });
};

// Convert initial velocity from km/h to m/s
const initialVelocityMs = initialVelocityKmh * KMH_TO_MS;

// Function to calculate new velocity
const calcNewVelocity = ({ initialVelocity, acceleration, time }) => {
  validateInputs(initialVelocity, acceleration, time);
  return initialVelocity + acceleration * time;
};

// Function to calculate new distance
const calcNewDistance = ({ initialDistance, velocity, time }) => {
  validateInputs(initialDistance, velocity, time);
  return initialDistance + (velocity * time) / 3600; // distance in km
};

// Function to calculate remaining fuel
const calcRemainingFuel = ({ initialFuel, burnRate, time }) => {
  validateInputs(initialFuel, burnRate, time);
  const remainingFuel = initialFuel - burnRate * time;
  return remainingFuel < 0 ? 0 : remainingFuel;
};

// Perform calculations
const newVelocityMs = calcNewVelocity({
  initialVelocity: initialVelocityMs,
  acceleration: accelerationMs2,
  time: timeSec,
});

// Convert new velocity from m/s back to km/h
const averageVelocityMs = (initialVelocityMs + newVelocityMs) / 2;

const newDistanceKm = calcNewDistance({
  initialDistance: initialDistanceKm,
  velocity: averageVelocityMs,
  time: timeSec,
});

const remainingFuelKg = calcRemainingFuel({
  initialFuel: initialFuelKg,
  burnRate: fuelBurnRateKgPerS,
  time: timeSec,
});

// Display results
console.log(`Corrected New Velocity: ${newVelocityKmh.toFixed(2)} km/h`);
console.log(`Corrected New Distance: ${newDistanceKm.toFixed(2)} km`);
console.log(`Corrected Remaining Fuel: ${remainingFuelKg.toFixed(2)} kg`);
