function Puzzle(args) {
  this._$elem = args.$elem;
  this._$result = undefined;
  this._id = args.id;
  this._puzzle = undefined;
}

Puzzle.prototype.hide = function() {
  this._$elem.hide();
  this._destroy();
};

Puzzle.prototype.onCorrect = function() {
  const ran = Math.floor(Math.random() * 6);
  $(".Puzzle__result-icon", this._$elem)
    .css({
      backgroundImage: "url('" + constants.CORRECT[ran] + "')"
    });
  this._onSolve();
};

Puzzle.prototype.onGuess = function() {
  $(".Puzzle__result-icon", this._$elem).css({ backgroundImage: 'none' });
};

Puzzle.prototype.onIncorrect = function() {
  const ran = Math.floor(Math.random() * 6);
  $(".Puzzle__result-icon", this._$elem)
    .css({
      backgroundImage: "url('" + constants.INCORRECT[ran] + "')"
    });
};

Puzzle.prototype.show = function() {
  this._render();
  this._$elem.show();
};

Puzzle.prototype._destroy = function() {
  this._puzzle.destroy();
};

Puzzle.prototype._onSolve = function() {
  // set localstorage, show movie
  localStorage.setItem(this._id, "true");
  this._puzzle.toggleClass(["solved", "unsolved"]);

};

Puzzle.prototype._render = function() {
  if (puzzles[this._id].type === "math") {
    this._puzzle = new MathPuzzle({
      data: puzzles[this._id],
      onCorrect: this.onCorrect.bind(this),
      onGuess: this.onGuess.bind(this),
      onIncorrect: this.onIncorrect.bind(this)
    });
  } else {
    // this._puzzle = new ReadingPuzzle();
  }
  this._$elem.append(this._puzzle.render().addClass("Puzzle"));
  this._$elem
    .append($("<div />")
      .addClass("Puzzle__result")
      .append($("<div />").addClass("Puzzle__result-icon"))
    );
  this._setSolvedState();
};

Puzzle.prototype._setSolvedState = function() {
  if (localStorage.getItem(this._id) === "true") {
    this._puzzle.addClass("solved");
  } else {
    this._puzzle.addClass("unsolved");
  }
};

/*
 https://www.youtube.com/watch?v=PIb6AZdTr-A - Girls Just Wanna Have Fun
 https://www.youtube.com/watch?v=Cv6tuzHUuuk - Walk Like An Egyptian
 https://www.youtube.com/watch?v=Iwuy4hHO3YQ - Video Killed the Radio Star
 https://www.youtube.com/watch?v=vtHTjjkJjVM - Dark Crystal
 https://www.youtube.com/watch?v=m2uTFF_3MaA - Yellow Submarine
 https://www.youtube.com/watch?v=HrnoR9cBP3o - Spoonful of Sugar
 https://www.youtube.com/watch?v=08NlhjpVFsU - Bear Necessities
 https://www.youtube.com/watch?v=LJTRZI2HThU - Sound of Music
 */
