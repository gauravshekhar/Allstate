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
				self.callRestServices();
				self.displayPartnersModal();
			},
			destroy : function()
			{
				Common.destroyPage(self, 'DashboardPage');
			},
			initKnockout : function()
			{
				self.allPartners = ko.observableArray([]);
				self.userPartners = ko.observableArray([]);
			},
			callRestServices : function()
			{
				Common.callRestServices(
				[
					{'name':'partners', 'vm':self}
				]);
			},
			displayPartnersModal : function()
			{
				Common.waitForServiceCalls(function()
				{
					if(self.userPartners().length === 0)
					{
						Common.showModal('user-partners');
					}
				});
			}
		};

		return DashboardPage;
	})();

	Export('DashboardPage', DashboardPage);
})();