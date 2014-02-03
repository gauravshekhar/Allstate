(function() 
{
	var Cache = (function() 
	{
		var self;
		var Common = Import('Common');
		var MasterVM = Import('MasterVM');

		var Cache = function() 
		{
			if(self)
			{
				return self;
			}
			else if(!(this instanceof Cache))
			{
				return new Cache();
			}

			self = this;
			self.init();
		};


		Cache.prototype = 
		{
			init : function()
			{

			}
		};

		return Cache;
	})();

	Export('Cache', Cache);
})();

