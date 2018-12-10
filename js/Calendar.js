function Calendar(args) {
  this._days = {};
  this._dialog = args.dialog;
  this._now = args.now;
  this._range = args.range;
  this._numDays = this._range.to.diff(this._range.from, "days");
}

Calendar.prototype.init = function() {
  $(".Calendar").addClass(`Calendar--${Math.min(7, this._numDays + 1  )}-cols`);
  this._populateDayHeaders();
  this._populateDays();
  this._populate();
  this._dialog.init();
};

Calendar.prototype._getAdjustedDateTime = function(baseDate, addDays, meridiem) {
  return moment(baseDate)
    .add(addDays, "days")
    .set('hour', meridiem.h)
    .set('minute', meridiem.m);
};

Calendar.prototype._getDayNode = function(date) {
  const id = date.format("YYYY-MM-DD_A");
  return $("<div />")
    .addClass("Calendar__day")
    .data("date-id", id)
    .append($("<button />")
      .addClass("puzzleButton")
    )
};

Calendar.prototype._populateDays = function () {
  const $calendar = $(".Calendar");
  const firstMorningTime = this._getAdjustedDateTime(this._range.from, 0, constants.AM);
  if (this._range.from.isAfter(firstMorningTime)) {
    $calendar.append($("<div />"));
  }
  for (var i = 0; i <= this._numDays; i++) {
    const morning = this._getAdjustedDateTime(this._range.from, i, constants.AM);
    if (morning.isAfter(this._range.from)) {
      $calendar.append(this._getDayNode(morning));
    }
  }
  for (var i = 0; i <= this._numDays; i++) {
    const evening = this._getAdjustedDateTime(this._range.from, i, constants.PM);
    if (evening.isBefore(this._range.to)) {
      $calendar.append(this._getDayNode(evening));
    }
  }
};

Calendar.prototype._populateDayHeaders = function() {
  const $calendar = $(".Calendar");
  for (var i = 0; i <= this._numDays; i++) {
    const date = moment(this._range.from).add(i, "days");
    $calendar.append($("<div />")
      .addClass("Calendar__header")
      .append(date.format("dddd"))
    );
  }
};

Calendar.prototype._populate = function() {
  const $days = $(".Calendar__day");
  for (var i = 0; i < $days.length; i++) {
    const $day = $($days[i]);
    const id = $day.data("date-id");
    const parsedId = CalendarDay.parseId(id);
    if (!this._days[parsedId.date]) {
      this._days[parsedId.date] = {};
    }
    this._days[parsedId.date][parsedId.meridiem] = new CalendarDay({
      $elem: $day,
      dialog: this._dialog,
      id: id,
      now: this._now
    });
    this._days[parsedId.date][parsedId.meridiem].init();
  }
};
