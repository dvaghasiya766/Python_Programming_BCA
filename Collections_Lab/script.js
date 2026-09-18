const $ = (s) => document.querySelector(s),
  $$ = (s) => [...document.querySelectorAll(s)];
const progress = JSON.parse(
  localStorage.getItem("practicalCollectionsProgress") ||
    '{"topics":[],"completed":0,"skills":{}}',
);
const data = {
  list: {
    icon: "📋",
    color: "#3478f6",
    summary: "An ordered, mutable collection that may contain duplicates.",
    topics: [
      [
        "Fundamentals",
        "A list stores ordered values and can change after creation.",
        "numbers = [10, 20, 30]\nprint(numbers)\nprint(type(numbers))",
        "[10, 20, 30]\n<class 'list'>",
        "Lists are mutable objects.",
        "Create a shopping list.",
      ],
      [
        "Creation & conversion",
        "Use [] for literals and list() to convert an iterable.",
        'print(list(range(1, 6)))\nprint(list("Python"))',
        "[1, 2, 3, 4, 5]\n['P', 'y', 't', 'h', 'o', 'n']",
        "A string is read character by character.",
        "Build a list of 1 to 10.",
      ],
      [
        "Accessing & slicing",
        "Indexes access one item; slices return a new list.",
        "numbers = [10, 20, 30, 40, 50]\nprint(numbers[0], numbers[-1])\nprint(numbers[1:4])\nprint(numbers[::2])\nprint(numbers[::-1])",
        "10 50\n[20, 30, 40]\n[10, 30, 50]\n[50, 40, 30, 20, 10]",
        "Stop is excluded and -1 means the last item.",
        "Extract alternate playlist tracks.",
      ],
      [
        "Insert & remove",
        "append adds one final item; insert uses an index; extend adds many. remove uses a value; pop uses an index and returns it.",
        "items = [10, 20, 30]\nitems.append(40)\nitems.insert(1, 99)\nremoved = items.pop(2)\nprint(removed)\nprint(items)",
        "20\n[10, 99, 30, 40]",
        "All these methods mutate the same list.",
        "Remove a cancelled order and print it.",
      ],
      [
        "Modify, copy & sort",
        "Assignment changes an item or slice. = aliases; copy() creates a new outer list.",
        "a = [30, 10, 20]\nb = a.copy()\nb[0] = 99\nprint(sorted(a))\nprint(a)\nprint(b)",
        "[10, 20, 30]\n[30, 10, 20]\n[99, 10, 20]",
        "sorted returns a new list; sort changes the original.",
        "Copy a class list before editing it.",
      ],
      [
        "Nested, unpacking & iteration",
        "Nested lists use two indexes. Starred unpacking gathers remaining values into a list.",
        "matrix = [[1, 2], [3, 4]]\na, b, *rest = [1, 2, 3, 4]\nprint(matrix[0][1])\nprint(a, rest, type(rest))",
        "2\n1 [3, 4] <class 'list'>",
        "*rest is a new list even when the original is unpacked.",
        "Split leaders and remaining team members.",
      ],
      [
        "Map, filter, comprehension & input",
        "split makes strings; map converts them; filter keeps matching values; list materializes lazy map/filter results.",
        'text = "10 20 30"\nvalues = list(map(int, text.split()))\nprint([x * 2 for x in values])\nprint(list(filter(lambda x: x > 10, values)))',
        "[20, 40, 60]\n[20, 30]",
        "Comprehension and filter can both express filtering.",
        "Read marks, keep passing scores, and total them.",
      ],
      [
        "Aggregation & mutability",
        "sum, min and max aggregate values. reduce is useful for a custom cumulative rule.",
        "from functools import reduce\nvalues = [1, 2, 3, 4]\nprint(sum(values))\nprint(reduce(lambda a, b: a + b, values))",
        "10\n10",
        "append, pop, sort, and assignment mutate a list; reassignment is different.",
        "Calculate total sales.",
      ],
    ],
  },
  tuple: {
    icon: "📦",
    color: "#a75ae8",
    summary: "An ordered, immutable collection for fixed records.",
    topics: [
      [
        "Theory & creation",
        "Tuples keep ordered values but cannot replace their own items.",
        "point = (10, 20)\nprint(point[0], point[-1])\nprint((5,))",
        "10 20\n(5,)",
        "A one-item tuple needs a trailing comma.",
        "Store fixed coordinates.",
      ],
      [
        "Practical operations",
        "Tuples support slicing, membership, count, index, concatenation, repetition, and unpacking.",
        'days = ("Mon", "Tue", "Mon")\nprint(days.count("Mon"))\nprint(days + ("Wed",))',
        "2\n('Mon', 'Tue', 'Mon', 'Wed')",
        "These return results rather than changing the tuple.",
        "Unpack a student record.",
      ],
      [
        "Immutability edge case",
        "A tuple cannot replace a reference, but a nested list can change.",
        "data = ([1, 2], 10)\ndata[0].append(3)\nprint(data)",
        "([1, 2, 3], 10)",
        "The tuple still points to the same mutable list.",
        "Explain this result.",
      ],
    ],
  },
  set: {
    icon: "🔵",
    color: "#19ad8a",
    summary: "A mutable collection of unique, unordered values.",
    topics: [
      [
        "Theory & creation",
        "Sets keep unique values and have no positional indexes.",
        'skills = {"Python", "SQL", "Python"}\nprint(skills)',
        "{'Python', 'SQL'} (order may vary)",
        "Duplicates are removed.",
        "Create unique course tags.",
      ],
      [
        "Methods & membership",
        "add inserts one value; update inserts many; discard removes safely.",
        'skills = {"Python", "SQL"}\nskills.add("Git")\nskills.update(["HTML", "SQL"])\nprint("Git" in skills)',
        "True",
        "Membership is fast and order is not meaningful.",
        "Never write skills[0].",
      ],
      [
        "Set algebra",
        "& finds common values; | combines; - finds only-left values; ^ finds non-common values.",
        'a = {"Python", "SQL", "HTML"}\nb = {"Python", "JavaScript", "HTML"}\nprint(a & b)',
        "{'Python', 'HTML'} (order may vary)",
        "Displayed set order is not guaranteed.",
        "Find students in both clubs.",
      ],
    ],
  },
  dictionary: {
    icon: "🗂️",
    color: "#ed8d24",
    summary: "A mutable mapping of unique keys to values.",
    topics: [
      [
        "Theory & access",
        "A dictionary maps each key to a value; membership checks keys.",
        'student = {"name": "Dev", "age": 25}\nprint(student["name"])\nprint(student.get("age"))',
        "Dev\n25",
        "get is useful for optional keys.",
        "Store a student profile.",
      ],
      [
        "Add, update & remove",
        "Assignment adds a new key or updates an existing one; pop removes by key.",
        'student = {"name": "Dev", "age": 25}\nstudent["city"] = "Rajkot"\nstudent["age"] = 26\nprint(student)',
        "{'name': 'Dev', 'age': 26, 'city': 'Rajkot'}",
        "city is inserted and age is modified.",
        "Update employee information.",
      ],
      [
        "Iteration & nested data",
        "items supplies key-value pairs; nested dictionaries model records.",
        'students = {101: {"name": "Dev", "age": 25}}\nprint(students[101]["name"])',
        "Dev",
        "Access one key at every level.",
        "Print a nested student name.",
      ],
    ],
  },
};
const ops = [
  [
    "append()",
    "List",
    "INSERT",
    "list.append(value)",
    "Adds one item to the end.",
    "[1, 2, 3, 4]",
    "None",
    "Yes",
  ],
  [
    "extend()",
    "List",
    "INSERT",
    "list.extend(values)",
    "Adds every value from an iterable.",
    "[1, 2, 3, 4, 5]",
    "None",
    "Yes",
  ],
  [
    "pop()",
    "List",
    "REMOVE",
    "list.pop(index)",
    "Removes by index and returns it.",
    "20",
    "value",
    "Yes",
  ],
  [
    "sorted()",
    "List",
    "SORT",
    "sorted(values)",
    "Returns a new sorted list.",
    "[1, 2, 3]",
    "new list",
    "No",
  ],
  [
    "filter()",
    "List",
    "FILTER",
    "filter(fn, values)",
    "Returns a filter object.",
    "filter object",
    "filter object",
    "No",
  ],
  [
    "map()",
    "List",
    "MAP",
    "map(fn, values)",
    "Returns a map object.",
    "map object",
    "map object",
    "No",
  ],
  [
    "count()",
    "Tuple",
    "SEARCH",
    "data.count(value)",
    "Counts matching values.",
    "2",
    "integer",
    "No",
  ],
  [
    "add()",
    "Set",
    "INSERT",
    "items.add(value)",
    "Adds a unique value.",
    "{1, 2, 3}",
    "None",
    "Yes",
  ],
  [
    "discard()",
    "Set",
    "REMOVE",
    "items.discard(value)",
    "Removes safely when absent.",
    "{1, 3}",
    "None",
    "Yes",
  ],
  [
    "get()",
    "Dictionary",
    "ACCESS",
    "data.get(key)",
    "Reads a key safely.",
    "Dev",
    "value / None",
    "No",
  ],
  [
    "update()",
    "Dictionary",
    "MODIFY",
    "data.update(other)",
    "Adds or updates pairs.",
    "{...}",
    "None",
    "Yes",
  ],
];
function lesson(t, c) {
  return `<article class="lesson-card" style="--accent:${c}"><p class="eyebrow">${t[0]}</p><h2>${t[0]}</h2><p><b>Theory:</b> ${t[1]}</p><p><b>Why?</b> It helps you choose the right operation for the data problem.</p><h3>Syntax & practical implementation</h3><pre><code>${t[2]}</code></pre><button class="copy-code" data-code="${encodeURIComponent(t[2])}">Copy code</button><h3>Expected output</h3><pre class="output"><code>${t[3]}</code></pre><p><b>Why this output?</b> ${t[4]}</p><p><b>Common mistake:</b> Do not confuse a method name with its purpose—check whether it changes data or returns a new result.</p><div class="task"><b>Practical task:</b> ${t[5]}<br><small>Write and run your answer on your own computer.</small></div><button class="mark-topic" data-topic="${t[0]}">Mark complete</button></article>`;
}
function module(id) {
  let x = data[id];
  $("#" + id).innerHTML =
    `<div class="module-head" style="--tint:${x.color}22"><div class="module-icon">${x.icon}</div><div><p class="eyebrow">${id.toUpperCase()} PRACTICAL LAB</p><h1>${id[0].toUpperCase() + id.slice(1)}</h1><p>${x.summary}</p></div></div><div class="learning-path">THEORY → SYNTAX → PRACTICAL CODE → EXPECTED OUTPUT → PRACTICE</div><div class="lesson-grid">${x.topics.map((t) => lesson(t, x.color)).join("")}</div><section class="classwork"><p class="eyebrow">CLASSWORK</p><h2>Work independently</h2><p>${id === "list" ? "A teacher has marks = [45, 67, 32, 89, 76]. Replace the mark at index 2 with 55, print the final list, and explain your operation." : "Write a realistic " + id + " program using insert/access/remove/modify as appropriate. Print the expected output and run it in your lab."}</p><button class="hint-button">Show hint</button><button class="solution-button">Show solution idea</button><button class="mark-classwork">Mark complete</button><p class="reveal hint" hidden>Identify whether you need an index, a value, or a key before choosing the operation.</p><p class="reveal solution" hidden>Use a small practical program, print the result, then compare it with your expected output.</p></section>`;
}
function renderHome() {
  $("#homeCards").innerHTML = Object.entries(data)
    .map(
      ([id, x]) =>
        `<article class="structure-card" style="--accent:${x.color}"><div>${x.icon}</div><h3>${id[0].toUpperCase() + id.slice(1)}</h3><p>${x.summary}</p><code>Theory → code → output</code><button data-tab="${id}">Open lab →</button></article>`,
    )
    .join("");
}
function renderOps(f = "") {
  f = f.toLowerCase();
  let h = ops
    .filter((o) => o.join(" ").toLowerCase().includes(f))
    .map(
      (o) =>
        `<article class="operation-card"><span class="pill">${o[2]} · ${o[1]}</span><h2>${o[0]}</h2><p>${o[4]}</p><code>${o[3]}</code><p><b>Expected:</b> ${o[5]}<br><b>Returns:</b> ${o[6]} · <b>Mutates:</b> ${o[7]}</p></article>`,
    )
    .join("");
  $("#operationGrid").innerHTML = h || "<p>No matching operation.</p>";
}
function progressUI() {
  let n = new Set(progress.topics).size;
  $("#progressText").textContent = `${n} topics · ${progress.completed} tasks`;
  $("#progressBar").style.width =
    Math.min(100, n * 7 + progress.completed * 3) + "%";
  let skills = [
    "Insertion",
    "Access",
    "Removal",
    "Modification",
    "Searching",
    "Iteration",
    "Sorting",
    "Conversion",
    "Filtering",
    "Mapping",
    "Reduction",
    "Mutability",
  ];
  $("#skillProgress").innerHTML = skills
    .map(
      (s) =>
        `<div class="skill-item"><b>${s}</b>${progress.skills[s] || 0}%<div class="tiny-meter"><i style="width:${progress.skills[s] || 0}%"></i></div></div>`,
    )
    .join("");
}
let q = 0,
  mode = "list";
function practice() {
  let stories = {
    list: "A shopping cart needs a Laptop at the end.",
    tuple: "A location should stay fixed after creation.",
    set: "A club must keep each username only once.",
    dictionary: "A student profile needs a new city field.",
  };
  $("#practiceLevel").textContent = `Level ${(q % 8) + 1} — Practical`;
  $("#practiceQuestion").textContent =
    `Story: ${stories[mode]} Which operation would you choose? Write the Python code, then run it in your lab.`;
  $("#practiceCode").textContent =
    "Educational code checker: this checks for a relevant Python operation; it does not execute Python.";
  $("#codeAnswer").hidden = false;
  $("#checkCode").hidden = false;
  $("#practiceChoices").innerHTML = "";
  $("#practiceFeedback").textContent = "";
  $("#codeAnswer").value = "";
}
function init() {
  renderHome();
  Object.keys(data).forEach(module);
  renderOps();
  renderComparison();
  renderMutability();
  practice();
  renderQuiz();
  renderCheat();
  progressUI();
  document.addEventListener("click", (e) => {
    let tab = e.target.closest("[data-tab]");
    if (tab) {
      $$(".view").forEach((v) =>
        v.classList.toggle("active", v.id === tab.dataset.tab),
      );
      $$(".tab").forEach((b) => b.classList.toggle("active", b === tab));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    let c = e.target.closest(".copy-code");
    if (c) navigator.clipboard?.writeText(decodeURIComponent(c.dataset.code));
    if (e.target.closest(".mark-topic")) {
      progress.topics.push(e.target.closest(".mark-topic").dataset.topic);
      e.target.textContent = "✓ Completed";
      localStorage.setItem(
        "practicalCollectionsProgress",
        JSON.stringify(progress),
      );
      progressUI();
    }
    if (e.target.closest(".mark-classwork")) {
      progress.completed++;
      localStorage.setItem(
        "practicalCollectionsProgress",
        JSON.stringify(progress),
      );
      e.target.textContent = "✓ Completed";
      progressUI();
    }
    if (e.target.closest(".hint-button"))
      e.target.closest(".classwork").querySelector(".hint").hidden = false;
    if (e.target.closest(".solution-button"))
      e.target.closest(".classwork").querySelector(".solution").hidden = false;
    if (e.target.closest("#checkCode")) {
      let ok =
        /(append|insert|extend|pop|remove|\[|\.get|\.add|update|filter|map|for)/.test(
          $("#codeAnswer").value,
        );
      progress.skills["Insertion"] = Math.min(
        100,
        (progress.skills["Insertion"] || 0) + (ok ? 15 : 0),
      );
      $("#practiceFeedback").textContent = ok
        ? "✓ Good direction. Run it in your Python lab and compare output."
        : "Try naming a Python operation or writing a Python statement.";
      localStorage.setItem(
        "practicalCollectionsProgress",
        JSON.stringify(progress),
      );
      progressUI();
    }
    if (e.target.closest("#nextPractice")) {
      q++;
      practice();
    }
    let b = e.target.closest("[data-mode]");
    if (b) {
      mode = {
        predict: "list",
        fill: "tuple",
        debug: "set",
        write: "dictionary",
        trace: "list",
        transform: "list",
        classwork: "dictionary",
        challenge: "list",
      }[b.dataset.mode];
      $$("#practiceModes button").forEach((x) =>
        x.classList.toggle("active", x === b),
      );
      practice();
    }
  });
  $("#operationSearch").oninput = (e) => renderOps(e.target.value);
  $("#cheatSearch").oninput = (e) => renderCheat(e.target.value);
}
function renderComparison() {
  let rows = [
    ["Ordered", "Yes", "Yes", "No", "Insertion order"],
    ["Mutable", "Yes", "No", "Yes", "Yes"],
    ["Duplicates", "Allowed", "Allowed", "Removed", "Keys unique"],
    ["Access", "Index", "Index", "Membership", "Key"],
  ];
  $("#comparisonTable").innerHTML =
    "<thead><tr><th>Property</th><th>List</th><th>Tuple</th><th>Set</th><th>Dictionary</th></tr></thead><tbody>" +
    rows
      .map((r) => "<tr>" + r.map((x) => `<td>${x}</td>`).join("") + "</tr>")
      .join("") +
    "</tbody>";
}
function renderMutability() {
  $("#mutabilityGrid").innerHTML = [
    "List → Mutable",
    "Tuple → Immutable",
    "Set → Mutable",
    "Dictionary → Mutable",
  ]
    .map(
      (x) =>
        `<article class="concept-card"><h2>${x}</h2><p>Mutability describes whether the object can change after creation.</p></article>`,
    )
    .join("");
}
function renderQuiz() {
  $("#quizQuestion").textContent = "Which collection removes duplicates?";
  $("#quizChoices").innerHTML =
    '<button class="answer-choice">List</button><button class="answer-choice">Set</button><button class="answer-choice">Tuple</button>';
  $("#quizFeedback").textContent = "";
}
function renderCheat(f = "") {
  f = f.toLowerCase();
  $("#cheatGrid").innerHTML = ops
    .filter((o) => o.join(" ").toLowerCase().includes(f))
    .map(
      (o) =>
        `<article class="cheat-card"><h3>${o[0]}</h3><p>${o[4]}</p><code>${o[3]}</code><small>Expected: ${o[5]} · Returns: ${o[6]} · Mutates: ${o[7]}</small></article>`,
    )
    .join("");
}
init();
