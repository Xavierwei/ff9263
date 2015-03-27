(function($){
    $.textClock = function(el, timezone, options){
        var base = this;
        base.$el = $(el);
        base.el = el;
        base.$el.data("textClock", base);
        base.init = function(){
            if( typeof( timezone ) === "undefined" || timezone === null ) timezone = 8;
            base.timezone = timezone;
            base.options = $.extend({},$.textClock.defaultOptions, options);
        };
        base.init();
    };
    $.textClock.defaultOptions = {
        timezone: 8
    };
    $.fn.textClock = function(timezone, options){
        return this.each(function(){
            (new $.textClock(this, timezone, options));
			var now=new Date();
			var hours=now.getUTCHours();
			var minutes=now.getUTCMinutes();
			var seconds=now.getUTCSeconds();
			hours=hours+timezone;
			if(hours >= 24)
			hours = hours - 24;
			hours=fixTime(hours);
			minutes=fixTime(minutes);
			var the_date=hours+":"+minutes;
			$(this).html(the_date);
        });
    };
	function fixTime(num){
		if(num<10){
			num="0"+num;
		}
		return num;
	}
	
})(jQuery);


/*
  A function that determines whether BST is currently in effect in London,
  based on the date on the user's PC, but regardless of whether the user
  is in London, or somewhere else. BST runs between the last Sunday of
  March, and the last Sunday of October, with a varying date each year.
*/
function isBSTinEffect()
{
	var d = new Date();
	
	// Loop over the 31 days of March for the current year
	for(var i=31; i>0; i--)
	{
	var tmp = new Date(d.getFullYear(), 2, i);
	
	// If it's Sunday
	if(tmp.getDay() == 0)
	{
	// last Sunday of March
	lSoM = tmp;
	
	// And stop the loop
	break;
	}
	}
	
	// Loop over the 31 days of October for the current year
	for(var i=31; i>0; i--)
	{
	var tmp = new Date(d.getFullYear(), 9, i);
	
	// If it's Sunday
	if(tmp.getDay() == 0)
	{
	// last Sunday of October
	lSoO = tmp;
	
	// And stop the loop
	break;
	}
	}
	
	// 0 = DST off (GMT)
	// 1 = DST on  (BST)
	if(d < lSoM || d > lSoO) return 0;
	else return 1;
}
