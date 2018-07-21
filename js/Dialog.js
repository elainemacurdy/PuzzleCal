function Dialog($elem) {
  this._$elem = $elem;
  this._currentPuzzle = undefined;
}

Dialog.prototype.init = function() {
  $(".Dialog__closeButton", this._$elem).bind("click", this.close.bind(this));
};

Dialog.prototype.close = function() {
  this._$elem.removeClass("Dialog--open");
  this._currentPuzzle.hide();
  this._currentPuzzle = undefined;
};

Dialog.prototype.open = function(id) {
  this._$elem.addClass("Dialog--open");
  this._currentPuzzle = this._findPuzzle(id);
  this._currentPuzzle.show();
};

Dialog.prototype._findPuzzle = function(dateId) {
  const $elem = $(".Dialog__puzzle[data-date-id=" + dateId + "]", this._$elem);
  return new Puzzle({ $elem: $elem, id: dateId });
};
