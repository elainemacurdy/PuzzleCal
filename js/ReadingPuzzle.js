function ReadingPuzzle() {
  Puzzle.apply(this, arguments);
  this._onGuessTo = undefined;
}
ReadingPuzzle.prototype = new Puzzle;

ReadingPuzzle.CLASS_NAMES = {
  base: "ReadingPuzzle",
  option: "ReadingPuzzle__option",
  options: "ReadingPuzzle__options",
  right: "ReadingPuzzle__right",
  word: "ReadingPuzzle__word",
  wrong: "ReadingPuzzle__wrong"
};
ReadingPuzzle.OPTIONS = ["ant", "car", "dog", "hat", "pony", "sun"];

ReadingPuzzle.prototype.render = function() {
  Puzzle.prototype.render.apply(this, arguments);
  this._renderContent();
};


ReadingPuzzle.prototype._checkSolution = function(guess) {
  if (guess === this._data.word) {
    $('.' + ReadingPuzzle.CLASS_NAMES.option, this._$elem).attr("disabled", true);
    this.onCorrect();
  } else {
    this.onIncorrect();
  }
};

ReadingPuzzle.prototype._getOptionButton = function(word) {
  return $("<button />")
    .addClass(ReadingPuzzle.CLASS_NAMES.option)
    .addClass((word === this._data.word) ? ReadingPuzzle.CLASS_NAMES.right : ReadingPuzzle.CLASS_NAMES.wrong)
    .css({ backgroundImage: "url(" + constants.READING[word] + ")" })
    .attr("disabled", this._isSolved)
    .val(word)
    .bind("click", this._onClickOption.bind(this));
};

ReadingPuzzle.prototype._getOptions = function(answer) {
  const answerIndex = ReadingPuzzle.OPTIONS.indexOf(answer);
  const wrongIndex1 = this._getRandomIndex([answerIndex], ReadingPuzzle.OPTIONS.length);
  const wrongIndex2 = this._getRandomIndex([answerIndex, wrongIndex1], ReadingPuzzle.OPTIONS.length);
  const orderedOptions = [
    ReadingPuzzle.OPTIONS[answerIndex],
    ReadingPuzzle.OPTIONS[wrongIndex1],
    ReadingPuzzle.OPTIONS[wrongIndex2]
  ];
  const options = [];
  while (orderedOptions.length) {
    const ran = this._getRandomIndex(options, orderedOptions.length);
    const option = orderedOptions.splice(ran, 1)[0];
    options.push(option);
  }
  return options;
};

ReadingPuzzle.prototype._getRandomIndex = function(usedIndeces, limit) {
  const tryIndex = Math.floor(Math.random() * limit);
  return (usedIndeces.indexOf(tryIndex) === -1) ? tryIndex : this._getRandomIndex(usedIndeces, limit);
};

ReadingPuzzle.prototype._onClickOption = function(event) {
  if (this._onGuessTo) {
    clearTimeout(this._onGuessTo);
    this._onGuessTo = undefined;
  }
  this.onGuess();
  const guess = event.currentTarget.value;
  this._onGuessTo = setTimeout(function() { this._checkSolution(guess); }.bind(this), 1500);
};

ReadingPuzzle.prototype._renderContent = function() {
  const wordOptions = this._getOptions(this._data.word);
  const $content = $('.' + Puzzle.CLASS_NAMES.content, this._$elem)
    .addClass(ReadingPuzzle.CLASS_NAMES.base);
  $content
    .append($("<div />")
      .addClass(ReadingPuzzle.CLASS_NAMES.word)
      .text(this._data.word)
    )
    .append($("<div />")
      .addClass(ReadingPuzzle.CLASS_NAMES.options)
      .append(this._getOptionButton(wordOptions.pop()))
      .append(this._getOptionButton(wordOptions.pop()))
      .append(this._getOptionButton(wordOptions.pop()))
    );
};
