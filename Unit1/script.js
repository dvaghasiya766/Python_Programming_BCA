const identifierInput = document.querySelector("#identifier-input");
const checkIdentifierButton = document.querySelector("#check-identifier");
const resultPanel = document.querySelector("#identifier-result");
const resultTitle = document.querySelector("#result-title");
const resultMessage = document.querySelector("#result-message");

const pythonKeywords = new Set([
  "False",
  "None",
  "True",
  "and",
  "as",
  "assert",
  "async",
  "await",
  "break",
  "case",
  "class",
  "continue",
  "def",
  "del",
  "elif",
  "else",
  "except",
  "finally",
  "for",
  "from",
  "global",
  "if",
  "import",
  "in",
  "is",
  "lambda",
  "match",
  "nonlocal",
  "not",
  "or",
  "pass",
  "raise",
  "return",
  "try",
  "while",
  "with",
  "yield",
]);

const ruleElements = {
  start: document.querySelector("#rule-start"),
  characters: document.querySelector("#rule-characters"),
  keyword: document.querySelector("#rule-keyword"),
  readable: document.querySelector("#rule-readable"),
};

function updateRule(ruleElement, passed) {
  ruleElement.classList.toggle("passed", passed);
  ruleElement.classList.toggle("failed", !passed);
  ruleElement.querySelector(".check-icon").textContent = passed ? "✓" : "×";
}

function checkIdentifier() {
  const value = identifierInput.value.trim();
  const startsCorrectly = /^[A-Za-z_]/.test(value);
  const charactersCorrect = /^[A-Za-z_][A-Za-z0-9_]*$/.test(value);
  const isKeyword = pythonKeywords.has(value);
  const isReadable = value.length >= 3 && !/^[_\d]+$/.test(value);
  const isValid =
    value.length > 0 && startsCorrectly && charactersCorrect && !isKeyword;

  updateRule(ruleElements.start, startsCorrectly);
  updateRule(ruleElements.characters, charactersCorrect);
  updateRule(ruleElements.keyword, value.length > 0 && !isKeyword);
  updateRule(ruleElements.readable, isReadable);

  resultPanel.classList.toggle("valid-result", isValid);
  resultPanel.classList.toggle("invalid-result", !isValid);
  resultTitle.textContent = isValid
    ? "Valid identifier"
    : "Fix this identifier";
  resultMessage.textContent = isValid
    ? `${value} can be used as a Python variable name.`
    : value.length === 0
      ? "Enter a name to check it against the rules."
      : `${value} cannot be used as a Python variable name yet.`;
}

checkIdentifierButton.addEventListener("click", checkIdentifier);
identifierInput.addEventListener("input", checkIdentifier);

document.querySelectorAll("[data-identifier]").forEach((button) => {
  button.addEventListener("click", () => {
    identifierInput.value = button.dataset.identifier;
    checkIdentifier();
    identifierInput.focus();
  });
});

checkIdentifier();

const objectType = document.querySelector("#object-type");
const mutateObjectButton = document.querySelector("#mutate-object");
const objectBefore = document.querySelector("#object-before");
const objectAfter = document.querySelector("#object-after");
const identityResult = document.querySelector("#identity-result");
const identityTitle = document.querySelector("#identity-title");
const identityMessage = document.querySelector("#identity-message");
const mutationCode = document.querySelector("#mutation-code code");
const mutabilityResult = document.querySelector("#mutability-result");
const mutabilityTitle = document.querySelector("#mutability-title");
const mutabilityMessage = document.querySelector("#mutability-message");

const objectExamples = {
  list: {
    before: "[1, 2, 3]",
    after: "[1, 99, 3]",
    mutable: true,
    name: "list",
    code: "numbers = [1, 2, 3]\nprint(id(numbers))\nnumbers[1] = 99\nprint(id(numbers))  # same id",
    message: "The existing list is updated at index 1.",
    identity: "same",
    idName: "numbers",
  },
  dict: {
    before: '{"name": "Asha"}',
    after: '{"name": "Ravi"}',
    mutable: true,
    name: "dictionary",
    code: 'student = {"name": "Asha"}\nprint(id(student))\nstudent["name"] = "Ravi"\nprint(id(student))  # same id',
    message: "The existing dictionary value is updated by its key.",
    identity: "same",
    idName: "student",
  },
  set: {
    before: "{1, 2, 3}",
    after: "{1, 2, 3, 99}",
    mutable: true,
    name: "set",
    code: "numbers = {1, 2, 3}\nprint(id(numbers))\nnumbers.add(99)\nprint(id(numbers))  # same id",
    message: "The existing set is updated by adding a new element.",
    identity: "same",
    idName: "numbers",
  },
  string: {
    before: '"Python"',
    after: "TypeError",
    mutable: false,
    name: "string",
    code: 'word = "Python"\nprint(id(word))\nword[0] = "p"  # TypeError\nword = "python"\nprint(id(word))  # different id',
    message:
      "A string cannot be changed by index; create a new string instead.",
    identity: "different",
    idName: "word",
  },
  integer: {
    before: "10",
    after: "10 (unchanged)",
    mutable: false,
    name: "integer",
    code: "score = 10\nprint(id(score))\nscore += 1  # new integer\nprint(id(score))  # different id",
    message:
      "The original integer is not changed; score is rebound to a new value.",
    identity: "different",
    idName: "score",
  },
  tuple: {
    before: "(1, 2, 3)",
    after: "TypeError",
    mutable: false,
    name: "tuple",
    code: "numbers = (1, 2, 3)\nprint(id(numbers))\nnumbers[1] = 99  # TypeError\nnumbers = (1, 99, 3)\nprint(id(numbers))  # different id",
    message: "A tuple cannot be changed by index; create a new tuple instead.",
    identity: "different",
    idName: "numbers",
  },
};

function updateMutabilitySimulation() {
  const selectedObject = objectExamples[objectType.value];
  objectBefore.textContent = selectedObject.before;
  objectAfter.textContent = selectedObject.after;
  const sameIdentity = selectedObject.identity === "same";
  identityResult.classList.toggle("same-identity", sameIdentity);
  identityResult.classList.toggle("different-identity", !sameIdentity);
  identityTitle.textContent = sameIdentity
    ? "Same id: existing object updated"
    : "Different id: a new object is created";
  identityMessage.textContent = sameIdentity
    ? `id(${selectedObject.idName}) before == id(${selectedObject.idName}) after`
    : `id(${selectedObject.idName}) before != id(${selectedObject.idName}) after`;
  mutationCode.textContent = selectedObject.code;
  mutabilityResult.classList.toggle("valid-result", selectedObject.mutable);
  mutabilityResult.classList.toggle("invalid-result", !selectedObject.mutable);
  mutabilityTitle.textContent = selectedObject.mutable
    ? "Mutable object"
    : "Immutable object";
  mutabilityMessage.textContent = selectedObject.message;
}

objectType.addEventListener("change", updateMutabilitySimulation);
mutateObjectButton.addEventListener("click", updateMutabilitySimulation);
updateMutabilitySimulation();
