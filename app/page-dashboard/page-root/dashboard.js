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
				self.currentPartner = ko.observable(null);
			},
			callRestServices : function()
			{
				Common.callRestServices(
				[
					{'name':'user', 'vm':MasterVM},
					{'name':'partners', 'vm':MasterVM}
				]);
			},
			moreInfo : function(data, event)
			{
				var $moreInfo = $('#dashboard-page').find('.more-info');
				console.log(data);
				if(self.currentPartner() !== null)
				{
					if(self.currentPartner() !== data)
					{
						$moreInfo.animate({left:-700}, 400, null, function()
						{
							self.currentPartner(data);
							$(this).css('left', 700);
							$moreInfo.animate({left:0}, 400);
						});	
					}
				}
				else
				{
					self.currentPartner(data);
					$moreInfo.animate({left:0}, 400);
				}
			},
			displayPartnersModal : function()
			{
				Common.waitForServiceCalls(function()
				{
					if(MasterVM.userPartners().length === 0)
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