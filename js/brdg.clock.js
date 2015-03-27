(function($){
    $.brdgClock = function(el, radius, options){
        var base = this;
        base.$el = $(el);
        base.el = el;
        base.$el.data("brdgClock", base);
        
        base.init = function(){
            base.options = $.extend({},$.brdgClock.defaultOptions, options);
        };
        base.init();
    };
    
    $.brdgClock.defaultOptions = {
    };
    
    $.fn.brdgClock = function(options){
        return this.each(function(){
			
            (new $.brdgClock(this, options));
				var canvas = $(this)[0];
			  	if (canvas.getContext) {
				var c2d=canvas.getContext('2d');
				c2d.setTransform(1, 0, 0, 1, 0, 0);
				c2d.clearRect(0,0,80,80);
				c2d.restore();
				//Define gradients for 3D / shadow effect
				var grad1=c2d.createLinearGradient(0,0,80,80);
				grad1.addColorStop(0,"#fff");
				c2d.lineWidth=1;
				c2d.save();
				//Outer bezel
				c2d.strokeStyle=grad1;
				c2d.lineWidth=1;
				c2d.beginPath();
				c2d.arc(40,40,38,0,Math.PI*2,true);
				c2d.stroke();
				//Inner bezel
				c2d.restore();
				c2d.translate(40,40);
				var sec=0;
				c2d.strokeStyle="#fff";
				c2d.lineWidth=1;
				c2d.save();
				var hrs=parseInt($(this).attr('data-hrs'));
				var min=parseInt($(this).attr('data-min'));
				c2d.rotate(Math.PI/6*(hrs+(min/60)+(sec/3600)));
				c2d.beginPath();
				c2d.moveTo(0,0);
				c2d.lineTo(0,-22);
				c2d.stroke();
				c2d.restore();
				c2d.save();
				//Draw minute hand
				c2d.rotate(Math.PI/30*(min+(sec/60)));
				c2d.beginPath();
				c2d.moveTo(0,0);
				c2d.lineTo(0,-30);
				c2d.stroke();
				c2d.restore();
				c2d.save();
				c2d.restore();
			  }

        });
    };
    
})(jQuery);