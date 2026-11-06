const mobileNavToggle = document.getElementById("mobileNavToggle");
const sidebar = document.querySelector(".sidebar");
const artistContextButton = document.getElementById("artistContextButton");
const artistContextPanel = document.getElementById("artistContextPanel");

function setMobileNav(open, { moveFocus = false } = {}) {
  if (!mobileNavToggle || !sidebar) return;

  sidebar.classList.toggle("is-mobile-open", open);
  document.body.classList.toggle("is-nav-open", open);
  mobileNavToggle.setAttribute("aria-expanded", String(open));
  mobileNavToggle.setAttribute("aria-label", open ? "주요 메뉴 닫기" : "주요 메뉴 열기");

  const iconPath = mobileNavToggle.querySelector("path");
  if (iconPath) {
    iconPath.setAttribute("d", open ? "m7 7 10 10M17 7 7 17" : "M5 7h14M5 12h14M5 17h14");
  }

  if (open && moveFocus) {
    window.requestAnimationFrame(() => {
      sidebar.querySelector(".nav-item:not(.is-disabled)")?.focus();
    });
  }

  if (!open && moveFocus) {
    mobileNavToggle.focus();
  }
}

mobileNavToggle?.addEventListener("click", () => {
  const open = mobileNavToggle.getAttribute("aria-expanded") !== "true";
  setMobileNav(open, { moveFocus: open });
});

sidebar?.querySelectorAll(".nav-item[href]").forEach((link) => {
  link.addEventListener("click", () => {
    if (window.matchMedia("(max-width: 767px)").matches) {
      setMobileNav(false);
    }
  });
});

artistContextButton?.addEventListener("click", () => {
  const open = artistContextButton.getAttribute("aria-expanded") !== "true";
  artistContextButton.setAttribute("aria-expanded", String(open));
  if (artistContextPanel) artistContextPanel.hidden = !open;
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  if (artistContextButton?.getAttribute("aria-expanded") === "true") {
    artistContextButton.setAttribute("aria-expanded", "false");
    if (artistContextPanel) artistContextPanel.hidden = true;
    artistContextButton.focus();
    return;
  }

  if (mobileNavToggle?.getAttribute("aria-expanded") === "true") {
    setMobileNav(false, { moveFocus: true });
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth >= 768 && mobileNavToggle?.getAttribute("aria-expanded") === "true") {
    setMobileNav(false);
  }
});

const colors = {
  blue: "#1393FD",
  teal: "#278F63",
  purple: "#9D6ADE",
  amber: "#B7790D",
  grid: "#E5EAF0",
  text: "#5E6978",
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
let visibleSeries = new Set(series.map((item) => item.key));

const svg = document.getElementById("trendChart");
const legend = document.getElementById("legend");
const trendDataHead = document.getElementById("trendDataHead");
const trendDataBody = document.getElementById("trendDataBody");
const trendChartSummary = document.getElementById("trendChartSummary");
const statusAnnouncer = document.getElementById("statusAnnouncer");
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

function announce(message) {
  if (!statusAnnouncer) return;
  statusAnnouncer.textContent = "";
  window.requestAnimationFrame(() => {
    statusAnnouncer.textContent = message;
  });
}

function scrollAndFocus(target) {
  if (!target) return;
  target.scrollIntoView({
    behavior: reducedMotionQuery.matches ? "auto" : "smooth",
    block: "center"
  });

  window.setTimeout(() => {
    target.focus({ preventScroll: true });
  }, reducedMotionQuery.matches ? 0 : 250);
}

function renderChartDataTable(data) {
  if (!trendDataBody || !trendDataHead) return;

  const activeSeries = series.filter((item) => visibleSeries.has(item.key));

  trendDataHead.innerHTML = `
    <th scope="col">기간</th>
    ${activeSeries.map((item) => `<th scope="col" class="cell-number">${item.label}</th>`).join("")}
  `;

  trendDataBody.innerHTML = data.map((row) => `
    <tr>
      <th scope="row">${row.label}</th>
      ${activeSeries.map((item) => `<td class="cell-number">${(row[item.key] * 1000).toLocaleString("ko-KR")}</td>`).join("")}
    </tr>
  `).join("");

  if (trendChartSummary) {
    const platformText = activeSeries.length === series.length
      ? "모든 플랫폼"
      : activeSeries.map((item) => item.label).join(", ");

    trendChartSummary.textContent = granularity === "day"
      ? `9월 18일 신곡 발매 직후 선택한 ${platformText}에서 스트리밍 변화가 나타납니다. 정확한 값은 데이터 표에서 확인할 수 있습니다.`
      : `주간 보기에서 선택한 ${platformText}의 스트리밍 변화를 비교합니다. 정확한 값은 데이터 표에서 확인할 수 있습니다.`;
  }
}

function svgEl(name, attrs = {}) {
  const el = document.createElementNS("http://www.w3.org/2000/svg", name);
  Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
  return el;
}

function renderLegend() {
  legend.innerHTML = "";
  series.filter((item) => visibleSeries.has(item.key)).forEach((item) => {
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
      class: "chart-event-line",
      "data-insight-target": "release"
    }));

    const releaseBox = svgEl("rect", {
      x: releaseX - 35,
      y: 7,
      width: 70,
      height: 28,
      rx: 7,
      class: "chart-highlight-box",
      "data-insight-target": "release"
    });
    svg.appendChild(releaseBox);

    const releaseText = svgEl("text", {
      x: releaseX,
      y: 25,
      "text-anchor": "middle",
      class: "chart-highlight-label",
      "data-insight-target": "release"
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

  series.filter((item) => visibleSeries.has(item.key)).forEach((item) => {
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
  renderChartDataTable(data);
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

    hit.addEventListener("mouseleave", scheduleTooltipHide);
  });
}

const platformFilter = document.getElementById("platformFilter");
const platformFilterSummary = document.getElementById("platformFilterSummary");
const platformCheckboxes = [...document.querySelectorAll("[data-platform-key]")];
const platformApply = document.getElementById("platformApply");
const platformDraftReset = document.getElementById("platformDraftReset");
const platformFilterReset = document.getElementById("platformFilterReset");
const platformFilterError = document.getElementById("platformFilterError");
const chartFilterSummary = document.getElementById("chartFilterSummary");
const platformFilterChips = document.getElementById("platformFilterChips");

function syncPlatformDraftToApplied() {
  platformCheckboxes.forEach((checkbox) => {
    checkbox.checked = visibleSeries.has(checkbox.dataset.platformKey);
  });
  platformFilterError.hidden = true;
}

function renderPlatformFilterState() {
  const active = series.filter((item) => visibleSeries.has(item.key));
  const isDefault = active.length === series.length;

  platformFilterSummary.textContent = isDefault ? "플랫폼 전체" : `플랫폼 ${active.length}개`;
  chartFilterSummary.hidden = isDefault;
  platformFilterChips.innerHTML = "";

  if (!isDefault) {
    active.forEach((item) => {
      const chip = document.createElement("span");
      chip.className = "filter-chip";
      chip.innerHTML = `<span>${item.label}</span><button type="button" data-remove-platform="${item.key}" aria-label="${item.label} 플랫폼 필터 제거"><svg class="ui-icon ui-icon--sm" viewBox="0 0 24 24" aria-hidden="true"><path d="m7 7 10 10M17 7 7 17"/></svg></button>`;
      platformFilterChips.appendChild(chip);
    });
  }
}

function applyVisibleSeries(nextKeys, announcement) {
  visibleSeries = new Set(nextKeys);
  renderLegend();
  renderChart();
  renderPlatformFilterState();
  syncPlatformDraftToApplied();
  if (announcement) announce(announcement);
}

platformFilter?.addEventListener("toggle", () => {
  if (platformFilter.open) {
    syncPlatformDraftToApplied();
  } else {
    syncPlatformDraftToApplied();
  }
});

platformApply?.addEventListener("click", () => {
  const next = platformCheckboxes
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.dataset.platformKey);

  if (next.length === 0) {
    platformFilterError.hidden = false;
    return;
  }

  applyVisibleSeries(next, `플랫폼 ${next.length}개를 차트에 적용했습니다.`);
  platformFilter.open = false;
});

platformDraftReset?.addEventListener("click", () => {
  platformCheckboxes.forEach((checkbox) => {
    checkbox.checked = true;
  });
  platformFilterError.hidden = true;
});

platformFilterReset?.addEventListener("click", () => {
  applyVisibleSeries(series.map((item) => item.key), "플랫폼 필터를 초기화했습니다.");
});

platformFilterChips?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-remove-platform]");
  if (!button) return;

  const key = button.dataset.removePlatform;
  const next = [...visibleSeries].filter((item) => item !== key);

  if (next.length === 0) {
    applyVisibleSeries(series.map((item) => item.key), "플랫폼 필터를 초기화했습니다.");
    return;
  }

  applyVisibleSeries(next, "플랫폼 필터를 변경했습니다.");
});

const segmentedButtons = [...document.querySelectorAll(".segmented button")];

function selectGranularity(button) {
  segmentedButtons.forEach((item) => {
    const selected = item === button;
    item.classList.toggle("is-selected", selected);
    item.setAttribute("aria-pressed", String(selected));
  });

  granularity = button.dataset.granularity;
  renderChart();
  announce(`${button.textContent.trim()} 보기로 변경했습니다.`);
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
let tooltipHideTimer;

function cancelTooltipHide() {
  window.clearTimeout(tooltipHideTimer);
}

function scheduleTooltipHide() {
  window.clearTimeout(tooltipHideTimer);
  tooltipHideTimer = window.setTimeout(() => {
    tooltip.classList.remove("is-visible");
  }, 120);
}

function showInfoTooltip(button) {
  cancelTooltipHide();
  tooltip.textContent = button.dataset.tip;
  tooltip.classList.add("is-visible");
  const rect = button.getBoundingClientRect();
  tooltip.style.left = `${rect.left + rect.width / 2}px`;
  tooltip.style.top = `${rect.top - 8}px`;
}

function hideInfoTooltip() {
  window.clearTimeout(tooltipHideTimer);
  tooltip.classList.remove("is-visible");
}

tooltip.addEventListener("mouseenter", cancelTooltipHide);
tooltip.addEventListener("mouseleave", scheduleTooltipHide);

document.querySelectorAll(".info").forEach((button) => {
  button.addEventListener("mouseenter", () => showInfoTooltip(button));
  button.addEventListener("mouseleave", scheduleTooltipHide);
  button.addEventListener("focus", () => showInfoTooltip(button));
  button.addEventListener("blur", hideInfoTooltip);
  button.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      hideInfoTooltip();
    }
  });
});


const insightItems = [...document.querySelectorAll(".insight-item[data-link-target]")];

function clearInsightLinks() {
  insightItems.forEach((item) => item.classList.remove("is-active"));
  document.querySelectorAll("[data-insight-target].is-linked-highlight")
    .forEach((item) => item.classList.remove("is-linked-highlight"));
  document.querySelectorAll(".data-table tr.is-insight-highlight")
    .forEach((item) => item.classList.remove("is-insight-highlight"));
}

function activateInsight(item) {
  clearInsightLinks();
  item.classList.add("is-active");

  const target = item.dataset.linkTarget;

  if (target === "release") {
    if (granularity !== "day") {
      const dayButton = segmentedButtons.find((button) => button.dataset.granularity === "day");
      if (dayButton) selectGranularity(dayButton);
    }

    document.querySelectorAll('[data-insight-target="release"]')
      .forEach((node) => node.classList.add("is-linked-highlight"));

    scrollAndFocus(document.getElementById("musicTitle"));
    announce("발매 전후 스트리밍 근거를 강조했습니다.");
    return;
  }

  if (target === "late-summer") {
    const row = document.getElementById("track-late-summer");
    if (row) {
      row.classList.add("is-insight-highlight");
      scrollAndFocus(row);
      announce("늦은 여름 곡의 근거 행을 강조했습니다.");
    }
    return;
  }

  if (target === "trend") {
    scrollAndFocus(document.getElementById("musicTitle"));
    announce("관련 스트리밍 추이 차트로 이동했습니다.");
  }
}

insightItems.forEach((item) => {
  item.addEventListener("click", () => activateInsight(item));
});

document.getElementById("summaryEvidenceButton")?.addEventListener("click", () => {
  if (insightItems[0]) activateInsight(insightItems[0]);
});

const mainContent = document.getElementById("mainContent");
const periodSelect = document.getElementById("periodSelect");
const comparisonSelect = document.getElementById("comparisonSelect");
const dateRangeControl = document.getElementById("dateRangeControl");
const dateRangeSummary = document.getElementById("dateRangeSummary");
const dateStart = document.getElementById("dateStart");
const dateEnd = document.getElementById("dateEnd");
const dateApplyButton = document.getElementById("dateApplyButton");
const dateCancelButton = document.getElementById("dateCancelButton");
const dateRangeError = document.getElementById("dateRangeError");
const queryContextSummary = document.getElementById("queryContextSummary");
const queryResetButton = document.getElementById("queryResetButton");

const queryPresets = {
  "90": { label: "최근 3개월", start: "2026-08-01", end: "2026-10-31", comparisonLabel: "이전 3개월 대비" },
  "30": { label: "최근 30일", start: "2026-10-02", end: "2026-10-31", comparisonLabel: "이전 30일 대비" }
};

const defaultQuery = {
  period: "90",
  start: queryPresets["90"].start,
  end: queryPresets["90"].end,
  comparison: "previous"
};

let appliedQuery = { ...defaultQuery };

function formatDateKo(value) {
  const [year, month, day] = value.split("-").map(Number);
  return `${year}. ${month}. ${day}.`;
}

function sameAsDefaultQuery() {
  return appliedQuery.period === defaultQuery.period
    && appliedQuery.start === defaultQuery.start
    && appliedQuery.end === defaultQuery.end
    && appliedQuery.comparison === defaultQuery.comparison;
}

function renderQueryState() {
  periodSelect.value = appliedQuery.period;
  comparisonSelect.value = appliedQuery.comparison;
  dateStart.value = appliedQuery.start;
  dateEnd.value = appliedQuery.end;
  dateRangeSummary.textContent = `${formatDateKo(appliedQuery.start)} – ${formatDateKo(appliedQuery.end)}`;

  const periodLabel = appliedQuery.period === "custom"
    ? "사용자 지정"
    : queryPresets[appliedQuery.period].label;
  const comparisonText = appliedQuery.comparison === "previous"
    ? "이전 동일 기간과 비교"
    : "비교 없음";

  queryContextSummary.textContent = `${periodLabel} · ${comparisonText}`;
  queryResetButton.hidden = sameAsDefaultQuery();
  mainContent.classList.toggle("comparison-off", appliedQuery.comparison === "none");

  const comparisonLabel = appliedQuery.period === "custom"
    ? "이전 동일 기간 대비"
    : queryPresets[appliedQuery.period].comparisonLabel;

  document.querySelectorAll("[data-period-comparison-label]").forEach((node) => {
    node.textContent = comparisonLabel;
  });
}

periodSelect.addEventListener("change", () => {
  const value = periodSelect.value;

  if (value === "custom") {
    dateStart.value = appliedQuery.start;
    dateEnd.value = appliedQuery.end;
    dateRangeControl.open = true;
    announce("사용자 지정 날짜를 선택하세요. 날짜 적용 전까지 기존 조회 조건이 유지됩니다.");
    return;
  }

  const preset = queryPresets[value];
  appliedQuery = {
    ...appliedQuery,
    period: value,
    start: preset.start,
    end: preset.end
  };
  renderQueryState();
  announce(`조회 기간을 ${preset.label}로 변경했습니다. 적용 기간은 ${formatDateKo(preset.start)}부터 ${formatDateKo(preset.end)}까지입니다.`);
});

dateRangeControl.addEventListener("toggle", () => {
  if (!dateRangeControl.open && periodSelect.value === "custom" && appliedQuery.period !== "custom") {
    dateRangeError.hidden = true;
    renderQueryState();
  }
});

comparisonSelect.addEventListener("change", () => {
  appliedQuery = { ...appliedQuery, comparison: comparisonSelect.value };
  renderQueryState();
  announce(comparisonSelect.value === "none"
    ? "비교 기준을 사용하지 않습니다."
    : "이전 동일 기간과 비교합니다.");
});

dateApplyButton.addEventListener("click", () => {
  const start = dateStart.value;
  const end = dateEnd.value;

  if (!start || !end) {
    dateRangeError.textContent = "시작일과 종료일을 모두 입력하세요.";
    dateRangeError.hidden = false;
    return;
  }

  if (start > end) {
    dateRangeError.textContent = "종료일은 시작일보다 빠를 수 없습니다.";
    dateRangeError.hidden = false;
    return;
  }

  dateRangeError.hidden = true;
  appliedQuery = {
    ...appliedQuery,
    period: "custom",
    start,
    end
  };
  renderQueryState();
  dateRangeControl.open = false;
  announce(`사용자 지정 기간을 ${formatDateKo(start)}부터 ${formatDateKo(end)}까지로 적용했습니다.`);
});

dateCancelButton.addEventListener("click", () => {
  dateRangeError.hidden = true;
  renderQueryState();
  dateRangeControl.open = false;
});

queryResetButton.addEventListener("click", () => {
  appliedQuery = { ...defaultQuery };
  renderQueryState();
  announce("조회 조건을 초기화했습니다.");
});

const trackSearchInput = document.getElementById("trackSearchInput");
const trackSearchClear = document.getElementById("trackSearchClear");
const trackSearchCount = document.getElementById("trackSearchCount");
const trackSearchStatus = document.getElementById("trackSearchStatus");
const trackSearchEmpty = document.getElementById("trackSearchEmpty");
const trackRows = [...document.querySelectorAll(".resource-table tbody tr[data-track-name]")];

function updateTrackSearch() {
  const query = trackSearchInput.value.trim().toLocaleLowerCase("ko-KR");
  let visibleCount = 0;

  trackRows.forEach((row) => {
    const name = row.dataset.trackName.toLocaleLowerCase("ko-KR");
    const matches = !query || name.includes(query);
    row.hidden = !matches;
    if (matches) visibleCount += 1;
  });

  trackSearchClear.hidden = query.length === 0;
  trackSearchEmpty.hidden = visibleCount !== 0;
  trackSearchCount.textContent = `${visibleCount}곡`;

  if (query) {
    trackSearchStatus.textContent = visibleCount === 0
      ? "검색어와 일치하는 곡이 없습니다."
      : `${visibleCount}개의 곡을 찾았습니다.`;
  } else {
    trackSearchStatus.textContent = "곡명 검색을 초기화했습니다.";
  }
}

trackSearchInput.addEventListener("input", updateTrackSearch);
trackSearchClear.addEventListener("click", () => {
  trackSearchInput.value = "";
  updateTrackSearch();
  trackSearchInput.focus();
});

renderQueryState();
renderPlatformFilterState();
syncPlatformDraftToApplied();
updateTrackSearch();

renderLegend();
renderChart();
