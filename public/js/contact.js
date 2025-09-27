
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".stat-number");

  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute("data-number"));
    let count = 0;

    const updateCount = () => {
      const increment = Math.ceil(target / 100); // adjust speed
      count += increment;

      if (count < target) {
        counter.innerText = count;
        requestAnimationFrame(updateCount);
      } else {
        counter.innerText = target;
      }
    };

    updateCount();
  });
});
