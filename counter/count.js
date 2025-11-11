const endDate = new Date("22 oct, 2024 20:00:00").getTime();
const startDate = new Date().getTime();

let x = setInterval(function updateTimer() {
  const currDate = new Date().getTime();
  const distanceCovered = currDate - startDate;
  const distancePending = endDate - currDate;
  const totalDistance = endDate - startDate;
  const totalDistancePercentage = (distanceCovered / totalDistance) * 100;

  const days = Math.floor(distancePending / (24 * 60 * 60 * 1000));
  const hrs = Math.floor(
    (distancePending % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
  );
  const mins = Math.floor((distancePending % (60 * 60 * 1000)) / (60 * 1000));
  const secs = Math.floor((distancePending % (60 * 1000)) / 1000);

  document.getElementById("days").innerHTML = days;
  document.getElementById("hours").innerHTML = hrs;
  document.getElementById("minutes").innerHTML = mins;
  document.getElementById("seconds").innerHTML = secs;

  // progress bar
  const progressBar = document.querySelector(".progressElement");
  progressBar.style.width = totalDistancePercentage + "%";

  if (distancePending < 0) {
    clearInterval();
    document.getElementById("countDown").innerHTML = "EXPIRED";
    progressBar.style.width = "100";
  }
}, 1000);
