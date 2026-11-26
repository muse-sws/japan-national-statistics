// Japan in Figures — small SVG chart builders.
//
// No chart library is used: each chart is plain SVG drawn from the numbers
// in data.js, so the first load stays small and every figure on a chart is
// a figure the page's table also prints.

const SVG_NS = 'http://www.w3.org/2000/svg';

function svgElement(tag, attributes, text) {
  const element = document.createElementNS(SVG_NS, tag);
  for (const [key, value] of Object.entries(attributes)) element.setAttribute(key, value);
  if (text !== undefined) element.textContent = text;
  return element;
}

function niceTicks(min, max, count) {
  const span = max - min || 1;
  const step = span / count;
  const magnitude = 10 ** Math.floor(Math.log10(step));
  const normalised = step / magnitude;
  const nice = normalised < 1.5 ? 1 : normalised < 3.5 ? 2 : normalised < 7.5 ? 5 : 10;
  const size = nice * magnitude;
  const start = Math.floor(min / size) * size;
  const ticks = [];
  for (let value = start; value <= max + size * 0.001; value += size) ticks.push(value);
  return ticks;
}

function axes(svg, width, height, padding, yTicks, formatValue) {
  const grid = svgElement('g', { class: 'chart-grid' });
  for (const tick of yTicks) {
    const y = padding.top + (1 - (tick - yTicks.min) / (yTicks.max - yTicks.min)) * (height - padding.top - padding.bottom);
    grid.appendChild(svgElement('line', {
      x1: padding.left, x2: width - padding.right, y1: y, y2: y, class: 'grid-line',
    }));
    grid.appendChild(svgElement('text', {
      x: padding.left - 8, y: y + 4, class: 'axis-label', 'text-anchor': 'end',
    }, formatValue(tick)));
  }
  svg.appendChild(grid);
}

// A line chart with labelled points. `series` is { years, values }.
export function lineChart(container, series, options = {}) {
  const width = 720;
  const height = 320;
  const padding = { top: 30, right: 16, bottom: 34, left: 64 };
  const values = series.values;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const pad = (max - min) * 0.12 || 1;
  const low = min - pad;
  const high = max + pad;
  const ticks = niceTicks(low, high, 4);
  const tickRange = { min: ticks[0], max: ticks[ticks.length - 1] };
  const formatValue = options.formatValue ?? ((v) => String(Math.round(v)));

  const svg = svgElement('svg', {
    viewBox: `0 0 ${width} ${height}`, role: 'img',
    'aria-label': options.label ?? 'Line chart',
  });
  axes(svg, width, height, padding, Object.assign(ticks, tickRange), formatValue);

  const x = (i) => padding.left + (i / (series.years.length - 1)) * (width - padding.left - padding.right);
  const y = (v) => padding.top + (1 - (v - tickRange.min) / (tickRange.max - tickRange.min)) * (height - padding.top - padding.bottom);

  const line = svgElement('path', {
    d: values.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' '),
    class: 'chart-line', fill: 'none',
  });
  svg.appendChild(line);

  values.forEach((value, i) => {
    svg.appendChild(svgElement('circle', { cx: x(i), cy: y(value), r: 4.5, class: 'chart-point' }));
    svg.appendChild(svgElement('text', {
      x: x(i), y: y(value) - 10, class: 'point-label', 'text-anchor': 'middle',
    }, options.formatPoint ? options.formatPoint(value) : formatValue(value)));
    svg.appendChild(svgElement('text', {
      x: x(i), y: height - 10, class: 'axis-label', 'text-anchor': 'middle',
    }, String(series.years[i])));
  });

  container.replaceChildren(svg);
}

// A bar chart. `series` is { years, values }.
export function barChart(container, series, options = {}) {
  const width = 720;
  const height = 320;
  const padding = { top: 30, right: 16, bottom: 34, left: 64 };
  const values = series.values;
  const max = Math.max(...values);
  const min = Math.min(0, ...values);
  const ticks = niceTicks(min, max, 4);
  const tickRange = { min: ticks[0], max: ticks[ticks.length - 1] };
  const formatValue = options.formatValue ?? ((v) => String(Math.round(v)));

  const svg = svgElement('svg', {
    viewBox: `0 0 ${width} ${height}`, role: 'img',
    'aria-label': options.label ?? 'Bar chart',
  });
  axes(svg, width, height, padding, Object.assign(ticks, tickRange), formatValue);

  const slot = (width - padding.left - padding.right) / values.length;
  const y = (v) => padding.top + (1 - (v - tickRange.min) / (tickRange.max - tickRange.min)) * (height - padding.top - padding.bottom);
  const zeroY = y(0);

  values.forEach((value, i) => {
    const barX = padding.left + i * slot + slot * 0.18;
    const barWidth = slot * 0.64;
    const top = Math.min(y(value), zeroY);
    const barHeight = Math.abs(zeroY - y(value));
    svg.appendChild(svgElement('rect', {
      x: barX, y: top, width: barWidth, height: Math.max(barHeight, 1.5),
      class: value < 0 ? 'chart-bar-negative' : 'chart-bar', rx: 3,
    }));
    svg.appendChild(svgElement('text', {
      x: barX + barWidth / 2, y: top - 6, class: 'point-label', 'text-anchor': 'middle',
    }, options.formatPoint ? options.formatPoint(value) : formatValue(value)));
    svg.appendChild(svgElement('text', {
      x: barX + barWidth / 2, y: height - 10, class: 'axis-label', 'text-anchor': 'middle',
    }, String(series.years[i])));
  });

  container.replaceChildren(svg);
}

// A donut chart for shares. `segments` is [{ label, value, colour }].
export function donutChart(container, segments, options = {}) {
  const width = 360;
  const height = 360;
  const centre = 180;
  const radius = 130;
  const thickness = 46;
  const total = segments.reduce((sum, s) => sum + s.value, 0);
  const svg = svgElement('svg', {
    viewBox: `0 0 ${width} ${height}`, role: 'img',
    'aria-label': options.label ?? 'Donut chart',
  });

  let angle = -Math.PI / 2;
  for (const segment of segments) {
    const sweep = (segment.value / total) * Math.PI * 2;
    const large = sweep > Math.PI ? 1 : 0;
    const x1 = centre + radius * Math.cos(angle);
    const y1 = centre + radius * Math.sin(angle);
    const x2 = centre + radius * Math.cos(angle + sweep);
    const y2 = centre + radius * Math.sin(angle + sweep);
    const inner1 = centre + (radius - thickness) * Math.cos(angle + sweep);
    const inner2 = centre + (radius - thickness) * Math.sin(angle + sweep);
    const inner3 = centre + (radius - thickness) * Math.cos(angle);
    const inner4 = centre + (radius - thickness) * Math.sin(angle);
    svg.appendChild(svgElement('path', {
      d: `M${x1.toFixed(1)},${y1.toFixed(1)} A${radius},${radius} 0 ${large} 1 ${x2.toFixed(1)},${y2.toFixed(1)} L${inner1.toFixed(1)},${inner2.toFixed(1)} A${radius - thickness},${radius - thickness} 0 ${large} 0 ${inner3.toFixed(1)},${inner4.toFixed(1)} Z`,
      fill: segment.colour,
    }));
    const midAngle = angle + sweep / 2;
    const labelRadius = radius - thickness / 2;
    svg.appendChild(svgElement('text', {
      x: centre + labelRadius * Math.cos(midAngle),
      y: centre + labelRadius * Math.sin(midAngle) + 5,
      class: 'donut-label', 'text-anchor': 'middle',
    }, `${segment.value.toFixed(1)}%`));
    angle += sweep;
  }

  svg.appendChild(svgElement('text', {
    x: centre, y: centre - 8, class: 'donut-centre', 'text-anchor': 'middle',
  }, options.centreTop ?? ''));
  svg.appendChild(svgElement('text', {
    x: centre, y: centre + 16, class: 'donut-centre-small', 'text-anchor': 'middle',
  }, options.centreBottom ?? ''));

  container.replaceChildren(svg);
}
