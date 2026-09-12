const editor = document.querySelector("#code-editor");
const lineNumbers = document.querySelector("#line-numbers");
const traceList = document.querySelector("#trace-list");
const outputBox = document.querySelector("#output-box");
const memoryMap = document.querySelector("#memory-map");
const inspectorText = document.querySelector("#inspector-text");
const inspectorType = document.querySelector("#inspector-type");
const statusChip = document.querySelector("#status-chip");
const currentLine = document.querySelector("#current-line");
const variableCount = document.querySelector("#variable-count");
const identityCount = document.querySelector("#identity-count");
const stepLabel = document.querySelector("#step-label");
const progressBar = document.querySelector("#progress-bar");

const defaultCode = editor.value;
let steps = [];
let cursor = -1;
let variables = {};
let output = [];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function formatValue(value) {
  if (typeof value === "string") return `"${value}"`;
  if (Array.isArray(value)) return `[${value.join(", ")}]`;
  return String(value);
}

function syncLineNumbers() {
  const lines = editor.value.split("\n");
  lineNumbers.innerHTML = lines
    .map((_, index) => `<div>${index + 1}</div>`)
    .join("");
}

function parseValue(raw, state) {
  const value = raw.trim();
  if (/^\[.*\]$/.test(value))
    return value
      .slice(1, -1)
      .split(",")
      .map((item) => Number(item.trim()))
      .filter(Number.isFinite);
  if (/^".*"$/.test(value) || /^'.*'$/.test(value)) return value.slice(1, -1);
  if (/^\d+$/.test(value)) return Number(value);
  if (Object.hasOwn(state, value)) return structuredClone(state[value]);
  return value;
}

function buildSteps(source) {
  const state = {};
  const result = [];
  const printed = [];
  const lines = source.split("\n");

  lines.forEach((raw, index) => {
    const text = raw.trim();
    if (!text || text.startsWith("#")) return;

    const assignment = text.match(/^([A-Za-z_]\w*)\s*=\s*(.+)$/);
    const update = text.match(/^([A-Za-z_]\w*)\[(\d+)\]\s*=\s*(.+)$/);
    const printStatement = text.match(/^print\((.+)\)$/);

    if (update && Array.isArray(state[update[1]])) {
      state[update[1]][Number(update[2])] = parseValue(update[3], state);
      result.push({
        line: index + 1,
        action: `Update ${update[1]}[${update[2]}]`,
        kind: "mutation",
        state: structuredClone(state),
        output: [...printed],
      });
      return;
    }

    if (assignment) {
      state[assignment[1]] = parseValue(assignment[2], state);
      result.push({
        line: index + 1,
        action: `Assign ${assignment[1]}`,
        kind: "assignment",
        state: structuredClone(state),
        output: [...printed],
      });
      return;
    }

    if (printStatement) {
      const value = parseValue(printStatement[1], state);
      printed.push(formatValue(value));
      result.push({
        line: index + 1,
        action: `Print ${formatValue(value)}`,
        kind: "output",
        state: structuredClone(state),
        output: [...printed],
      });
      return;
    }

    result.push({
      line: index + 1,
      action: `Read: ${text}`,
      kind: "statement",
      state: structuredClone(state),
      output: [...printed],
    });
  });

  return result;
}

function renderMemory(state) {
  const entries = Object.entries(state || {});
  variableCount.textContent = entries.length;
  identityCount.textContent = entries.length
    ? `${entries.length} tracked`
    : "-";
  if (!entries.length) {
    memoryMap.innerHTML =
      '<p class="empty-state">No variables at this step.</p>';
    return;
  }
  memoryMap.innerHTML = entries
    .map(
      ([name, value]) => `
        <article class="memory-node">
            <i class="memory-dot"></i>
            <span class="node-name">${escapeHtml(name)}</span>
            <strong class="node-value">${escapeHtml(formatValue(value))}</strong>
            <small class="node-id">id(${escapeHtml(name)}) • object reference</small>
        </article>
    `,
    )
    .join("");
}

function renderTrace() {
  if (!steps.length) {
    traceList.innerHTML =
      '<p class="empty-state">Run the program to generate a trace.</p>';
    return;
  }
  traceList.innerHTML = steps
    .map(
      (step, index) => `
        <button class="trace-item ${index === cursor ? "active" : ""}" data-step="${index}" type="button">
            <span class="number">L${step.line}</span>
            <span class="action">${escapeHtml(step.action)}</span>
            <span class="kind">${step.kind}</span>
        </button>
    `,
    )
    .join("");
  traceList.querySelectorAll("[data-step]").forEach((button) => {
    button.addEventListener("click", () => {
      cursor = Number(button.dataset.step);
      render();
    });
  });
}

function render() {
  const step = steps[cursor];
  renderTrace();
  stepLabel.textContent = steps.length
    ? `Step ${cursor + 1} of ${steps.length}`
    : "Step 0 of 0";
  progressBar.style.width = steps.length
    ? `${((cursor + 1) / steps.length) * 100}%`
    : "0%";
  outputBox.textContent = step?.output?.join("\n") || "No output yet.";
  currentLine.textContent = step ? `L${step.line}` : "-";
  inspectorType.textContent = step?.kind || "Waiting";
  inspectorText.textContent = step
    ? `${step.action}. The memory map shows the values available after this line.`
    : "Choose Run program or Next step to begin.";
  renderMemory(step?.state || {});
  lineNumbers
    .querySelectorAll("div")
    .forEach((line, index) =>
      line.classList.toggle("active", step && index === step.line - 1),
    );
  statusChip.textContent = step ? "Running" : "Ready";
}

function runProgram() {
  steps = buildSteps(editor.value);
  cursor = steps.length ? steps.length - 1 : -1;
  render();
}

function nextStep() {
  if (!steps.length) steps = buildSteps(editor.value);
  cursor = Math.min(cursor + 1, steps.length - 1);
  render();
}

function reset() {
  editor.value = defaultCode;
  steps = [];
  cursor = -1;
  syncLineNumbers();
  render();
}

document.querySelector("#run-button").addEventListener("click", runProgram);
document.querySelector("#step-button").addEventListener("click", nextStep);
document.querySelector("#reset-button").addEventListener("click", reset);
editor.addEventListener("input", syncLineNumbers);
editor.addEventListener("scroll", () => {
  lineNumbers.scrollTop = editor.scrollTop;
});
document.querySelector("#theme-button").addEventListener("click", (event) => {
  document.body.classList.toggle("dark");
  event.currentTarget.textContent = document.body.classList.contains("dark")
    ? "Light mode"
    : "Dark mode";
});

syncLineNumbers();
render();
