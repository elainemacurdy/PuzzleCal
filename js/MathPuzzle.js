function MathPuzzle(args) {
  this._$elem = undefined;
  this._data = args.data;
  this._onCorrect = args.onCorrect;
  this._onGuess = args.onGuess;
  this._onGuessTo = undefined;
  this._onIncorrect = args.onIncorrect;
}

MathPuzzle.CLASS_NAMES = {
  base: "MathPuzzle",
  correct: "MathPuzzle--correct",
  equals: "MathPuzzle__equals",
  incorrect: "MathPuzzle--incorrect",
  problem: "MathPuzzle__problem",
  solution: "MathPuzzle__solution"
};

MathPuzzle.prototype.addClass = function(className) {
  this._$elem.addClass(className);
};

MathPuzzle.prototype.destroy = function() {
  this._$elem.remove();
};

MathPuzzle.prototype.render = function() {
  this._$elem = $("<div />").addClass(MathPuzzle.CLASS_NAMES.base);
  this._$elem
    .append($("<div />")
      .addClass(MathPuzzle.CLASS_NAMES.problem)
      .append(this._data.problem)
    )
    .append($("<div />")
      .addClass(MathPuzzle.CLASS_NAMES.equals)
      .append("=")
    )
    .append($("<div />")
      .addClass(MathPuzzle.CLASS_NAMES.solution)
      .append($("<input />")
        .attr("type", "number")
        .attr("placeholder", "?")
        .bind("input", this._onChangeInput.bind(this))
      )
    );
  return this._$elem;
};

MathPuzzle.prototype.toggleClass = function(className) {
  this._$elem.toggleClass(className);
};

MathPuzzle.prototype._checkSolution = function(guess) {
  if (guess !== "") {
    if (guess === this._data.solution) {
      this._onCorrect();
    } else {
      this._onIncorrect();
    }
  }
};

MathPuzzle.prototype._onChangeInput = function(event) {
  if (this._onGuessTo) {
    clearTimeout(this._onGuessTo);
    this._onGuessTo = undefined;
  }
  this._onGuess();
  this._$elem.removeClass([MathPuzzle.CLASS_NAMES.correct, MathPuzzle.CLASS_NAMES.incorrect]);
  const guess = event.currentTarget.value;
  this._onGuessTo = setTimeout(function() { this._checkSolution(guess); }.bind(this), 1500);
};
