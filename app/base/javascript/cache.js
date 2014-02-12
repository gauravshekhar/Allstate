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
				self.user = null;
				self.partners = null;
			},





			_user : 
			{
				get : function(viewModel, forceRefresh)
				{
					if(!self.user || forceRefresh)
					{
						Common.GET(Common.formatUrl('user'), '', 'application/json', self._user.callback, {viewModel:viewModel});
					}
					else
					{
						Common.paintPage();
						self._user.populateViewModel(viewModel, self.user);
					}
				},
				callback : function(errors, response, callbackData)
				{
					//response = {"id":"gshek","firstName":"Gaurav","lastName":"Shekhar","networkId":"gshek","accessExeiryDate":"Feb 9, 2014","createDate":"Feb 6, 2014","createdBy":"gnait","updateDate":"Feb 6, 2014","updatedBy":"gshek"};

					if(response)
					{
						self.user = response;
						self._user.populateViewModel(callbackData.viewModel, response);
					}
				},
				populateViewModel : function(viewModel, response)
				{
					viewModel.user(response);
				}
			},





			_partners :
			{
				get : function(viewModel, forceRefresh)
				{
					if(!self.partners || forceRefresh)
					{
						Common.GET(Common.formatUrl('partners'), '', 'application/json', self._partners.callback, {viewModel:viewModel});
					}
					else
					{
						Common.paintPage();
						self._partners.populateViewModel(viewModel, self.partners);
					}
				},
				callback : function(error, response, callbackData)
				{
					//response = {"allPartners":[{"id":"VWG","partnerName":"Audi/VW VIP","status":"I"},{"id":"A54","partnerName":"AME Drivers Edge","status":"I"},{"id":"A85","partnerName":"Answer Finl","status":"I"},{"id":"ATT","partnerName":"AT&T","status":"I"},{"id":"D15","partnerName":"Donlen Corp","status":"I"},{"id":"ENC","partnerName":"Encompass","status":"I"},{"id":"A86","partnerName":"Auto Driveaway VTS","status":"I"},{"id":"AUR","partnerName":"Auto Rescue","status":"I"},{"id":"A84","partnerName":"Auto Security (FIMC)","status":"I"},{"id":"T22","partnerName":"Auto Trader Classic","status":"I"},{"id":"AVI","partnerName":"Avis/Budget","status":"I"},{"id":"AXP","partnerName":"AXP-American Express","status":"I"},{"id":"BW","partnerName":"Better World","status":"I"},{"id":"BKO","partnerName":"BKO Runoff","status":"I"},{"id":"B44","partnerName":"BMW","status":"I"},{"id":"BMC","partnerName":"BMW Canada","status":"I"},{"id":"AAO","partnerName":"BP Amoco","status":"I"},{"id":"B46","partnerName":"Bridge/Firestone","status":"I"},{"id":"BRL","partnerName":"BRL Runoff","status":"I"},{"id":"A74","tagLine":"Truth in Engineering","partnerName":"AUDI","status":"I"}],"userPartners":[]};
					//response = {"allPartners":[{"id":"VWG","partnerName":"Audi/VW VIP","displayName":"Audi/VW VIP"},{"id":"A54","partnerName":"AME Drivers Edge","displayName":"AME Drivers Edge"},{"id":"A85","partnerName":"Answer Finl","displayName":"Answer Finl"},{"id":"ATT","partnerName":"AT&T","displayName":"AT&T"},{"id":"D15","partnerName":"Donlen Corp","displayName":"Donlen Corp"},{"id":"ENC","partnerName":"Encompass","displayName":"Encompass"},{"id":"A86","partnerName":"Auto Driveaway VTS","displayName":"Auto Driveaway VTS"},{"id":"AUR","partnerName":"Auto Rescue","displayName":"Auto Rescue"},{"id":"A84","partnerName":"Auto Security (FIMC)","displayName":"Auto Security (FIMC)"},{"id":"T22","partnerName":"Auto Trader Classic","displayName":"Auto Trader Classic"},{"id":"AVI","partnerName":"Avis/Budget","displayName":"Avis/Budget"},{"id":"AXP","partnerName":"AXP-American Express","displayName":"AXP-American Express"},{"id":"BW","partnerName":"Better World","displayName":"Better World"},{"id":"BKO","partnerName":"BKO Runoff","displayName":"BKO Runoff"},{"id":"B44","partnerName":"BMW","displayName":"BMW"},{"id":"BMC","partnerName":"BMW Canada","displayName":"BMW Canada"},{"id":"AAO","partnerName":"BP Amoco","displayName":"BP Amoco"},{"id":"B46","partnerName":"Bridge/Firestone","displayName":"Bridge/Firestone"},{"id":"BRL","partnerName":"BRL Runoff","displayName":"BRL Runoff"},{"id":"A74","tagLine":"Truth in Engineering","partnerName":"AUDI","displayName":"AUDI"}],"userPartners":[{"id":"A74","tagLine":"Truth in Engineering","partnerName":"AUDI","displayName":"AUDI"}, {"id":"ATT","partnerName":"AT&T","displayName":"AT&T"}, {"id":"B44","partnerName":"BMW","displayName":"BMW"}, {"id":"BW","partnerName":"Better World","displayName":"Better World"}, {"id":"BRL","partnerName":"BRL Runoff","displayName":"BRL Runoff"}]};

					if(response)
					{
						self.partners = response;
						self._partners.populateViewModel(callbackData.viewModel, response);
					}
				},
				populateViewModel : function(viewModel, response)
				{
					viewModel.allPartners(response.allPartners);
					viewModel.userPartners(response.userPartners);
				}
			}
		};

		return Cache;
	})();

	Export('Cache', Cache);
})();

