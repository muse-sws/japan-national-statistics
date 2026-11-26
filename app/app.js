// Japan in Figures — page wiring: charts, ranges, tabs, tables.
//
// Every control on the site is wired here, and every control does what it
// says: range buttons re-draw the chart from the same data, tabs show one
// section at a time, table headers sort, and the filter narrows the rows.

import {
  YEARS, POPULATION, GDP_USD, GDP_PER_CAPITA, UNEMPLOYMENT, CPI_INFLATION,
  TRADE, EXPORTS_SHARE_GDP, AGE_STRUCTURE_2024, FERTILITY, LIFE_EXPECTANCY,
  PREFECTURES_2020,
} from './data.js';
import { lineChart, barChart, donutChart } from './charts.js';

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function formatMillions(value) {
  return `${(value / 1e6).toFixed(1)}m`;
}

function formatBillions(value) {
  return `$${(value / 1e12).toFixed(2)}tn`;
}

function formatDollars(value) {
  return `$${Math.round(value).toLocaleString('en-US')}`;
}

// Slice a { years, values } series to a year range, keeping the pairing.
function sliceSeries(series, from, to) {
  const rows = series.years.map((year, i) => ({ year, value: series.values[i] }))
    .filter((row) => row.year >= from && row.year <= to);
  return { years: rows.map((r) => r.year), values: rows.map((r) => r.value) };
}

const populationSeries = { years: YEARS, values: POPULATION };
const gdpSeries = { years: YEARS, values: GDP_USD };
const unemploymentSeries = { years: YEARS, values: UNEMPLOYMENT };
const cpiSeries = { years: YEARS, values: CPI_INFLATION };
const exportsSeries = { years: TRADE.years, values: TRADE.exports };
const importsSeries = { years: TRADE.years, values: TRADE.imports };

// --- Charts ---------------------------------------------------------------

function drawChart(kind, element, series, options) {
  if (kind === 'line') lineChart(element, series, options);
  else barChart(element, series, options);
}

// Range buttons: each group has data-chart, data-kind and data-series, and
// its buttons carry data-from / data-to. Clicking re-draws that chart.
function wireRangeGroups() {
  const seriesByName = {
    population: populationSeries,
    gdp: gdpSeries,
    unemployment: unemploymentSeries,
    cpi: cpiSeries,
    exports: exportsSeries,
    imports: importsSeries,
  };
  const formatters = {
    population: { formatValue: (v) => `${(v / 1e6).toFixed(0)}m`, formatPoint: formatMillions },
    gdp: { formatValue: (v) => `$${(v / 1e12).toFixed(1)}tn`, formatPoint: formatBillions },
    unemployment: { formatValue: (v) => `${v.toFixed(1)}%`, formatPoint: (v) => `${v.toFixed(1)}%` },
    cpi: { formatValue: (v) => `${v.toFixed(1)}%`, formatPoint: (v) => `${v.toFixed(2)}%` },
    exports: { formatValue: (v) => `$${(v / 1e9).toFixed(0)}bn`, formatPoint: (v) => `$${(v / 1e9).toFixed(0)}bn` },
    imports: { formatValue: (v) => `$${(v / 1e9).toFixed(0)}bn`, formatPoint: (v) => `$${(v / 1e9).toFixed(0)}bn` },
  };

  $$('[data-range-group]').forEach((group) => {
    const chartId = group.dataset.chart;
    const chart = document.getElementById(chartId);
    if (!chart) return;
    const seriesName = group.dataset.series;
    const kind = group.dataset.kind ?? 'line';
    const redraw = (from, to) => {
      drawChart(kind, chart, sliceSeries(seriesByName[seriesName], from, to), {
        ...formatters[seriesName],
        label: `${seriesName} chart, ${from} to ${to}`,
      });
    };
    $$('button', group).forEach((button) => {
      button.addEventListener('click', () => {
        $$('button', group).forEach((b) => b.setAttribute('aria-pressed', 'false'));
        button.setAttribute('aria-pressed', 'true');
        redraw(Number(button.dataset.from), Number(button.dataset.to));
      });
    });
    const active = $('button[aria-pressed="true"]', group) ?? $('button', group);
    if (active) redraw(Number(active.dataset.from), Number(active.dataset.to));
  });
}

// Chart-type toggle (bars / lines) on the economy page.
function wireChartToggle() {
  const toggle = $('[data-chart-toggle]');
  if (!toggle) return;
  const chart = document.getElementById(toggle.dataset.chart);
  const draw = (kind) => {
    drawChart(kind, chart, gdpSeries, {
      formatValue: (v) => `$${(v / 1e12).toFixed(1)}tn`,
      formatPoint: formatBillions,
      label: `Nominal GDP, ${kind} chart`,
    });
  };
  $$('button', toggle).forEach((button) => {
    button.addEventListener('click', () => {
      $$('button', toggle).forEach((b) => b.setAttribute('aria-pressed', 'false'));
      button.setAttribute('aria-pressed', 'true');
      draw(button.dataset.kind);
    });
  });
  draw('bar');
}

// Static charts that need no controls.
function drawStaticCharts() {
  const gdpPerCapita = $('#gdp-per-capita-chart');
  if (gdpPerCapita) {
    lineChart(gdpPerCapita, GDP_PER_CAPITA, {
      formatValue: formatDollars,
      formatPoint: formatDollars,
      label: 'GDP per capita, 2019 to 2024',
    });
  }
  const ageDonut = $('#age-donut');
  if (ageDonut) {
    donutChart(ageDonut, AGE_STRUCTURE_2024, {
      label: 'Age structure of the population, 2024',
      centreTop: '124.0m',
      centreBottom: 'people, 2024',
    });
  }
  const fertility = $('#fertility-chart');
  if (fertility) {
    lineChart(fertility, FERTILITY, {
      formatValue: (v) => v.toFixed(2),
      formatPoint: (v) => v.toFixed(2),
      label: 'Total fertility rate, 2019 to 2024',
    });
  }
  const life = $('#life-chart');
  if (life) {
    lineChart(life, LIFE_EXPECTANCY, {
      formatValue: (v) => `${v.toFixed(1)} yrs`,
      formatPoint: (v) => v.toFixed(1),
      label: 'Life expectancy at birth, 2019 to 2024',
    });
  }
  const tradeBalance = $('#trade-chart');
  if (tradeBalance) {
    lineChart(tradeBalance, exportsSeries, {
      formatValue: (v) => `$${(v / 1e9).toFixed(0)}bn`,
      formatPoint: (v) => `$${(v / 1e9).toFixed(0)}bn`,
      label: 'Exports of goods and services, 2019 to 2024',
    });
  }
}

// --- Tabs -----------------------------------------------------------------

function wireTabs() {
  $$('[data-tabs]').forEach((tabs) => {
    const buttons = $$('[role="tab"]', tabs);
    const panels = $$('[role="tabpanel"]', tabs);
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        buttons.forEach((b) => b.setAttribute('aria-selected', b === button ? 'true' : 'false'));
        panels.forEach((panel) => {
          panel.hidden = panel.id !== button.getAttribute('aria-controls');
        });
      });
    });
  });
}

// --- Tables -----------------------------------------------------------------

// Click a sortable table's header to sort by that column; click again to
// reverse. Numbers sort numerically, text alphabetically.
function wireSortableTables() {
  $$('table[data-sortable]').forEach((table) => {
    const headers = $$('th[data-sort]', table);
    headers.forEach((header) => {
      header.addEventListener('click', () => {
        const column = Number(header.dataset.sort);
        const numeric = header.dataset.type === 'number';
        const ascending = header.getAttribute('aria-sort') !== 'ascending';
        const body = table.tBodies[0];
        const rows = [...body.rows];
        rows.sort((a, b) => {
          const left = a.cells[column].textContent.trim();
          const right = b.cells[column].textContent.trim();
          const compare = numeric
            ? Number(left.replace(/[^0-9.-]/g, '')) - Number(right.replace(/[^0-9.-]/g, ''))
            : left.localeCompare(right);
          return ascending ? compare : -compare;
        });
        rows.forEach((row) => body.appendChild(row));
        headers.forEach((h) => h.removeAttribute('aria-sort'));
        header.setAttribute('aria-sort', ascending ? 'ascending' : 'descending');
      });
    });
  });
}

// The regions filter narrows the prefecture table as you type.
function wireFilter() {
  const input = $('#prefecture-filter');
  const table = $('#prefecture-table');
  if (!input || !table) return;
  const count = $('#prefecture-count');
  input.addEventListener('input', () => {
    const needle = input.value.trim().toLowerCase();
    let visible = 0;
    [...table.tBodies[0].rows].forEach((row) => {
      const match = row.textContent.toLowerCase().includes(needle);
      row.hidden = !match;
      if (match) visible += 1;
    });
    if (count) count.textContent = `${visible} of ${PREFECTURES_2020.length} prefectures shown`;
  });
}

// --- Navigation -------------------------------------------------------------

function wireNav() {
  const toggle = $('#nav-toggle');
  const nav = $('#site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }
  const here = location.pathname.split('/').pop() || 'index.html';
  $$('#site-nav a').forEach((link) => {
    if (link.getAttribute('href') === here) link.setAttribute('aria-current', 'page');
  });
  const year = $('#footer-year');
  if (year) year.textContent = String(new Date().getFullYear());
}

wireNav();
wireRangeGroups();
wireChartToggle();
drawStaticCharts();
wireTabs();
wireSortableTables();
wireFilter();
