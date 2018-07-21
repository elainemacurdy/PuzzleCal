function Puzzle(args) {
  if (args) {
    this._$elem = args.$elem;
    this._data = args.data;
    this._id = args.id;
    this._isSolved = (localStorage.getItem(this._id) === "true");
  }
}

Puzzle.CLASS_NAMES = {
  base: "Puzzle",
  content: "Puzzle__content",
  solved: "Puzzle--solved",
  transitioning: "Puzzle--transitioning",
  unsolved: "Puzzle--unsolved"
};

Puzzle.prototype.render = function() {
  this._setStateClasses();
  this._$elem.addClass(Puzzle.CLASS_NAMES.base);
  this._$elem
    .append($("<div />")
      .addClass("Puzzle__content")
    );
  this._$elem
    .append($("<div />")
      .addClass("Puzzle__result")
      .append($("<div />").addClass("Puzzle__result-icon"))
    );
  this._$elem
    .append($("<iframe />")
      .addClass("Puzzle__video")
      .attr("allow", "autoplay; encrypted-media")
      .attr("allowfullscreen", true)
      .attr("frameborder", "0")
      .attr("height", "315")
      .attr("width", "560")
      .attr("src", this._data.video)
    );
};

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
  localStorage.setItem(this._id, "true");
  this._isSolved = true;
  this._setStateClasses({ isTransitioning: true });
  setTimeout(this._setStateClasses.bind(this), 4000);
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
  this._$elem.show();
};

Puzzle.prototype._destroy = function() {
  this._$elem.empty();
};

Puzzle.prototype._setStateClasses = function(args) {
  if ((args || {}).isTransitioning) {
    this._$elem.addClass(Puzzle.CLASS_NAMES.transitioning);
    this._$elem.removeClass(Puzzle.CLASS_NAMES.solved);
    this._$elem.removeClass(Puzzle.CLASS_NAMES.unsolved);
  } else if (this._isSolved) {
    this._$elem.addClass(Puzzle.CLASS_NAMES.solved);
    this._$elem.removeClass(Puzzle.CLASS_NAMES.transitioning);
    this._$elem.removeClass(Puzzle.CLASS_NAMES.unsolved);
  } else {
    this._$elem.addClass(Puzzle.CLASS_NAMES.unsolved);
    this._$elem.removeClass(Puzzle.CLASS_NAMES.transitioning);
    this._$elem.removeClass(Puzzle.CLASS_NAMES.solved);
  }
};
