function CalendarDay(args) {
  this._$elem = args.$elem;
  this._dialog = args.dialog;
  this._id = args.id;
  this._now = args.now;
}

CalendarDay.CLASS_NAMES = {
  disabled: "disabled",
  enabled: "enabled"
};

CalendarDay.parseId = function(id) {
  const idData = id.split("_");
  return { date: idData[0], meridiem: idData[1] };
};

CalendarDay.prototype.init = function() {
  this._initEnabledState();
  this._initEvents();
};

CalendarDay.prototype._initEnabledState = function() {
  const parsedId = CalendarDay.parseId(this._id);
  const dateTime = moment(parsedId.date + constants[parsedId.meridiem]);
  if (this._now.isBefore(dateTime)) {
    this._$elem.addClass(CalendarDay.CLASS_NAMES.disabled);
  } else {
    this._$elem.addClass(CalendarDay.CLASS_NAMES.enabled);
  }
};

CalendarDay.prototype._initEvents = function() {
  if (this._$elem.hasClass(CalendarDay.CLASS_NAMES.enabled)) {
    this._$elem.bind("click", this._onClickPuzzle.bind(this));
  }
};

CalendarDay.prototype._onClickPuzzle = function() {
  this._dialog.open(this._id);
};
