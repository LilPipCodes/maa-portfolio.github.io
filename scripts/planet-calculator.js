function calculateCosmicAge() {
    const ageInput = document.getElementById('user-age').value;
    if (!ageInput || ageInput <= 0) return;

    const earthAge = parseFloat(ageInput);

    // Update baseline metric display
    document.getElementById('total-earth-years').textContent = earthAge.toFixed(0) + " Years";

    // Direct, exact orbital period conversions based on Earth year relative multipliers
    document.getElementById('age-mercury').textContent = (earthAge / 0.2408467).toFixed(2);
    document.getElementById('age-venus').textContent   = (earthAge / 0.61519726).toFixed(2);
    document.getElementById('age-mars').textContent    = (earthAge / 1.8808158).toFixed(2);
    document.getElementById('age-jupiter').textContent = (earthAge / 11.862615).toFixed(2);
    document.getElementById('age-saturn').textContent  = (earthAge / 29.447498).toFixed(2);
    document.getElementById('age-uranus').textContent  = (earthAge / 84.016846).toFixed(2);
    document.getElementById('age-neptune').textContent = (earthAge / 164.79132).toFixed(2);
    document.getElementById('age-pluto').textContent   = (earthAge / 248.0094).toFixed(3); // Extended to 3 decimals due to slow dilation shifts

    // Transition visual state visibility flags
    document.getElementById('terminal-empty-state').classList.add('d-none');
    document.getElementById('earth-baseline').classList.remove('d-none');
    document.getElementById('terminal-results').classList.remove('d-none');
}