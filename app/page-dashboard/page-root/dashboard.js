(function()
{
	var DashboardPage = (function()
	{
		var self;
		var Cache = Import('Cache');
		var Common = Import('Common');
		var MasterVM = Import('MasterVM');

		var DashboardPage = function()
		{
			self = this;
			self.init();
		};

		DashboardPage.prototype = 
		{
			init : function()
			{
				self.initKnockout();
				Common.setCurrentPage(self, 'DashboardPage');
			},
			destroy : function()
			{
				Common.destroyPage(self, 'DashboardPage');
			},
			initKnockout : function()
			{
				self.allPartners = ko.observableArray([]);
				self.userPartners = ko.observableArray([]);
			}
		};

		return DashboardPage;
	})();

	Export('DashboardPage', DashboardPage);
})();