(function() 
{
	var self;
	var RouteTable = Import('RouteTable');

	var MasterVM = (function() 
	{
		var MasterVM = function()
		{
			if(self)
			{
				return self;
			}
			else if(!(this instanceof MasterVM))
			{
				return new MasterVM();
			}

			self = this;
			self.init();
		};

		MasterVM.prototype =
		{
			init : function()
			{
				self.setPageAndModalBindings();
				self.setGlobalBindings();
				self.applyBindings();
			},
			setPageAndModalBindings : function()
			{
				self.currentPage = ko.observable(null);
				self.currentModal = ko.observable(null);

				$.each(RouteTable, function(key, value) 
				{
					self[key] = ko.observable(null);
				});
			},
			setGlobalBindings : function()
			{
				self.user = ko.observable(null);
			},
			applyBindings : function()
			{
				if(!ko.dataFor(document.body))
				{
					ko.applyBindings(self);
				}
			}
		};

		return MasterVM;
	})();

	Export('MasterVM', MasterVM);
})();

