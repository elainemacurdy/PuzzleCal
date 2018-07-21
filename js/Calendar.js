function Calendar(args) {
  this._days = {};
  this._dialog = args.dialog;
  this._now = args.now;
}

Calendar.prototype.init = function() {
  this._populate();
  this._dialog.init();
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
