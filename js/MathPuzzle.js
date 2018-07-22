function MathPuzzle() {
  Puzzle.apply(this, arguments);
  this._onGuessTo = undefined;
}
MathPuzzle.prototype = new Puzzle;

MathPuzzle.CLASS_NAMES = {
  base: "MathPuzzle",
  equals: "MathPuzzle__equals",
  problem: "MathPuzzle__problem",
  solution: "MathPuzzle__solution"
};

MathPuzzle.prototype.render = function() {
  Puzzle.prototype.render.apply(this, arguments);
  this._renderContent();
};


MathPuzzle.prototype._checkSolution = function(guess) {
  if (guess !== "") {
    if (guess === this._data.solution) {
      document.activeElement.blur();
      $('input', this._$elem)
        .attr("disabled", true)
        .blur();
      this.onCorrect();
    } else {
      this.onIncorrect();
    }
  }
};

MathPuzzle.prototype._onChangeInput = function(event) {
  if (this._onGuessTo) {
    clearTimeout(this._onGuessTo);
    this._onGuessTo = undefined;
  }
  this.onGuess();
  const guess = event.currentTarget.value;
  this._onGuessTo = setTimeout(function() { this._checkSolution(guess); }.bind(this), 1500);
};

MathPuzzle.prototype._renderContent = function() {
  const $content = $('.' + Puzzle.CLASS_NAMES.content, this._$elem)
    .addClass(MathPuzzle.CLASS_NAMES.base);
  $content
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
        .attr("disabled", this._isSolved)
        .val((this._isSolved) ? this._data.solution : '')
        .bind("input", this._onChangeInput.bind(this))
      )
    );
};
