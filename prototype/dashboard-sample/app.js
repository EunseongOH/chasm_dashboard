const colors = {
  blue: "#1393FD",
  teal: "#2EAD75",
  purple: "#9D6ADE",
  amber: "#D99A13",
  grid: "#E5EAF0",
  text: "#7C8796",
  textStrong: "#46515F",
  event: "#AAB4C0",
};

const dailyData = [
  { label: "8/1", spotify: 74, youtube: 34, apple: 24, melon: 29 },
  { label: "8/8", spotify: 77, youtube: 35, apple: 25, melon: 30 },
  { label: "8/15", spotify: 82, youtube: 36, apple: 25, melon: 31 },
  { label: "8/22", spotify: 80, youtube: 37, apple: 26, melon: 30 },
  { label: "8/29", spotify: 86, youtube: 39, apple: 27, melon: 32 },
  { label: "9/5", spotify: 90, youtube: 40, apple: 28, melon: 33 },
  { label: "9/12", spotify: 96, youtube: 42, apple: 29, melon: 35 },
  { label: "9/18", spotify: 132, youtube: 58, apple: 39, melon: 44 },
  { label: "9/26", spotify: 119, youtube: 55, apple: 36, melon: 41 },
  { label: "10/4", spotify: 112, youtube: 53, apple: 35, melon: 40 },
  { label: "10/12", spotify: 121, youtube: 57, apple: 37, melon: 43 },
  { label: "10/21", spotify: 116, youtube: 61, apple: 36, melon: 42 },
  { label: "10/31", spotify: 110, youtube: 59, apple: 35, melon: 40 },
];

const weeklyData = [
  { label: "8월 1주", spotify: 76, youtube: 34, apple: 24, melon: 29 },
  { label: "8월 3주", spotify: 81, youtube: 36, apple: 26, melon: 31 },
  { label: "9월 1주", spotify: 89, youtube: 40, apple: 28, melon: 33 },
  { label: "9월 3주", spotify: 128, youtube: 56, apple: 38, melon: 43 },
  { label: "10월 1주", spotify: 114, youtube: 54, apple: 35, melon: 40 },
  { label: "10월 3주", spotify: 119, youtube: 60, apple: 36, melon: 42 },
  { label: "10월 5주", spotify: 110, youtube: 59, apple: 35, melon: 40 },
];

const series = [
  { key: "spotify", label: "Spotify", color: colors.blue },
  { key: "youtube", label: "YouTube Music", color: colors.teal },
  { key: "apple", label: "Apple Music", color: colors.purple },
  { key: "melon", label: "Melon", color: colors.amber },
];

let granularity = "day";

const svg = document.getElementById("trendChart");
const legend = document.getElementById("legend");

function svgEl(name, attrs = {}) {
  const el = document.createElementNS("http://www.w3.org/2000/svg", name);
  Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
  return el;
}

function renderLegend() {
  legend.innerHTML = "";
  series.forEach((item) => {
    const node = document.createElement("span");
    node.className = "legend-item";
    node.innerHTML = `<span class="legend-line" style="--legend-color:${item.color}"></span><span>${item.label}</span>`;
    legend.appendChild(node);
  });
}

function renderChart() {
  const data = granularity === "day" ? dailyData : weeklyData;
  svg.innerHTML = "";

  const width = 820;
  const height = 330;
  const margin = { top: 42, right: 36, bottom: 40, left: 48 };
  const plotW = width - margin.left - margin.right;
  const plotH = height - margin.top - margin.bottom;
  const yMax = 150;
  const yTicks = [0, 30, 60, 90, 120, 150];

  const x = (index) => margin.left + (index / (data.length - 1)) * plotW;
  const y = (value) => margin.top + plotH - (value / yMax) * plotH;

  yTicks.forEach((tick) => {
    const gy = y(tick);
    svg.appendChild(svgEl("line", {
      x1: margin.left,
      y1: gy,
      x2: width - margin.right,
      y2: gy,
      class: "chart-grid"
    }));

    const text = svgEl("text", {
      x: margin.left - 10,
      y: gy + 4,
      "text-anchor": "end",
      class: "chart-axis-text"
    });
    text.textContent = tick === 0 ? "0" : `${tick}K`;
    svg.appendChild(text);
  });

  data.forEach((row, index) => {
    if (granularity === "day" && index % 2 !== 0 && index !== data.length - 1) return;
    const text = svgEl("text", {
      x: x(index),
      y: height - 14,
      "text-anchor": "middle",
      class: "chart-axis-text"
    });
    text.textContent = row.label;
    svg.appendChild(text);
  });

  if (granularity === "day") {
    const releaseIndex = data.findIndex((d) => d.label === "9/18");
    const releaseX = x(releaseIndex);

    svg.appendChild(svgEl("line", {
      x1: releaseX,
      y1: margin.top - 6,
      x2: releaseX,
      y2: margin.top + plotH,
      class: "chart-event-line"
    }));

    const releaseBox = svgEl("rect", {
      x: releaseX - 35,
      y: 7,
      width: 70,
      height: 28,
      rx: 7,
      class: "chart-highlight-box"
    });
    svg.appendChild(releaseBox);

    const releaseText = svgEl("text", {
      x: releaseX,
      y: 25,
      "text-anchor": "middle",
      class: "chart-highlight-label"
    });
    releaseText.textContent = "신곡 발매 9/18";
    svg.appendChild(releaseText);

    const concertIndex = data.findIndex((d) => d.label === "10/12");
    const concertX = x(concertIndex);

    svg.appendChild(svgEl("line", {
      x1: concertX,
      y1: margin.top - 6,
      x2: concertX,
      y2: margin.top + plotH,
      class: "chart-event-line"
    }));

    const concertBox = svgEl("rect", {
      x: concertX - 29,
      y: 11,
      width: 58,
      height: 24,
      rx: 6,
      class: "chart-event-box"
    });
    svg.appendChild(concertBox);

    const concertText = svgEl("text", {
      x: concertX,
      y: 27,
      "text-anchor": "middle",
      class: "chart-event-label"
    });
    concertText.textContent = "공연 10/12";
    svg.appendChild(concertText);
  }

  series.forEach((item) => {
    const points = data.map((row, index) => `${x(index)},${y(row[item.key])}`).join(" ");
    const path = svgEl("polyline", {
      points,
      class: "chart-series",
      stroke: item.color
    });
    svg.appendChild(path);

    data.forEach((row, index) => {
      const point = svgEl("circle", {
        cx: x(index),
        cy: y(row[item.key]),
        r: 8,
        fill: "transparent",
        "data-series": item.label,
        "data-value": row[item.key],
        "data-label": row.label,
        "data-color": item.color,
        class: "chart-hit"
      });
      svg.appendChild(point);
    });
  });

  attachChartTooltips();
}

function attachChartTooltips() {
  const tooltip = document.getElementById("tooltip");
  const hits = svg.querySelectorAll(".chart-hit");

  hits.forEach((hit) => {
    hit.addEventListener("mouseenter", (event) => {
      const { series, value, label, color } = event.target.dataset;
      tooltip.innerHTML = `<strong style="color:${color}">${series}</strong><br>${label} · ${Number(value).toLocaleString("ko-KR")}K 재생`;
      tooltip.classList.add("is-visible");
    });

    hit.addEventListener("mousemove", (event) => {
      tooltip.style.left = `${event.clientX}px`;
      tooltip.style.top = `${event.clientY - 12}px`;
    });

    hit.addEventListener("mouseleave", () => {
      tooltip.classList.remove("is-visible");
    });
  });
}

const segmentedButtons = [...document.querySelectorAll(".segmented button")];

function selectGranularity(button) {
  segmentedButtons.forEach((item) => {
    const selected = item === button;
    item.classList.toggle("is-selected", selected);
    item.setAttribute("aria-pressed", String(selected));
  });

  granularity = button.dataset.granularity;
  renderChart();
}

segmentedButtons.forEach((button, index) => {
  button.addEventListener("click", () => selectGranularity(button));

  button.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;

    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (index + direction + segmentedButtons.length) % segmentedButtons.length;
    segmentedButtons[nextIndex].focus();
  });
});

const tooltip = document.getElementById("tooltip");

function showInfoTooltip(button) {
  tooltip.textContent = button.dataset.tip;
  tooltip.classList.add("is-visible");
  const rect = button.getBoundingClientRect();
  tooltip.style.left = `${rect.left + rect.width / 2}px`;
  tooltip.style.top = `${rect.top - 8}px`;
}

function hideInfoTooltip() {
  tooltip.classList.remove("is-visible");
}

document.querySelectorAll(".info").forEach((button) => {
  button.addEventListener("mouseenter", () => showInfoTooltip(button));
  button.addEventListener("mouseleave", hideInfoTooltip);
  button.addEventListener("focus", () => showInfoTooltip(button));
  button.addEventListener("blur", hideInfoTooltip);
  button.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      hideInfoTooltip();
      button.blur();
    }
  });
});

document.getElementById("periodSelect").addEventListener("change", (event) => {
  const is30 = event.target.value === "30";
  document.querySelector(".date-control").textContent = is30
    ? "2026. 10. 2. – 10. 31."
    : "2026. 8. 1. – 10. 31.";
});

renderLegend();
renderChart();
