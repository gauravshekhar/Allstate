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
					response = {"id":"gshek","firstName":"Gaurav","lastName":"Shekhar","networkId":"gshek","accessExeiryDate":"Feb 9, 2014","createDate":"Feb 6, 2014","createdBy":"gnait","updateDate":"Feb 6, 2014","updatedBy":"gshek"};

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
					response = {"allPartners":[{"id":"VWG","partnerName":"Audi/VW VIP","displayName":"Audi/VW VIP","partnerLogo":"/images/partner/vw/vw-logo.gif","effectiveDate":"Feb 6, 2014","disableDate":"Feb 9, 2014","createdDate":"Feb 6, 2014","createdBy":"gnait"},{"id":"A54","partnerName":"AME Drivers Edge","displayName":"AME Drivers Edge","partnerLogo":"/images/partner/","effectiveDate":"Feb 6, 2014","disableDate":"Feb 9, 2014","createdDate":"Feb 6, 2014","createdBy":"gnait"},{"id":"A85","partnerName":"Answer Finl","displayName":"Answer Finl","partnerLogo":"/images/partner/","effectiveDate":"Feb 8, 2014","disableDate":"Feb 9, 2014","createdDate":"Feb 8, 2014","createdBy":"gnait"},{"id":"ATT","partnerName":"AT&T","displayName":"AT&T","partnerLogo":"/images/partner/","effectiveDate":"Feb 6, 2014","disableDate":"Feb 9, 2014","createdDate":"Feb 6, 2014","createdBy":"gnait"},{"id":"D15","partnerName":"Donlen Corp","displayName":"Donlen Corp","partnerLogo":"/images/partner/","effectiveDate":"Feb 6, 2014","disableDate":"Feb 9, 2014","createdDate":"Feb 6, 2014","createdBy":"gnait"},{"id":"ENC","partnerName":"Encompass","displayName":"Encompass","partnerLogo":"/images/partner/","effectiveDate":"Feb 8, 2014","disableDate":"Feb 9, 2014","createdDate":"Feb 8, 2014","createdBy":"gnait"},{"id":"A86","partnerName":"Auto Driveaway VTS  ","displayName":"Auto Driveaway VTS  ","partnerLogo":"/images/partner/","effectiveDate":"Feb 6, 2014","disableDate":"Feb 9, 2014","createdDate":"Feb 6, 2014","createdBy":"gnait"},{"id":"AUR","partnerName":"Auto Rescue","displayName":"Auto Rescue","partnerLogo":"/images/partner/","effectiveDate":"Feb 6, 2014","disableDate":"Feb 9, 2014","createdDate":"Feb 6, 2014","createdBy":"gnait"},{"id":"A84","partnerName":"Auto Security (FIMC)","displayName":"Auto Security (FIMC)","partnerLogo":"/images/partner/","effectiveDate":"Feb 8, 2014","disableDate":"Feb 9, 2014","createdDate":"Feb 8, 2014","createdBy":"gnait"},{"id":"T22","partnerName":"Auto Trader Classic ","displayName":"Auto Trader Classic ","partnerLogo":"/images/partner/","effectiveDate":"Feb 6, 2014","disableDate":"Feb 9, 2014","createdDate":"Feb 6, 2014","createdBy":"gnait"},{"id":"AVI","partnerName":"Avis/Budget","displayName":"Avis/Budget","partnerLogo":"/images/partner/","effectiveDate":"Feb 6, 2014","disableDate":"Feb 9, 2014","createdDate":"Feb 6, 2014","createdBy":"gnait"},{"id":"AXP","partnerName":"AXP-American Express","displayName":"AXP-American Express","partnerLogo":"/images/partner/","effectiveDate":"Feb 8, 2014","disableDate":"Feb 9, 2014","createdDate":"Feb 8, 2014","createdBy":"gnait"},{"id":"BW","partnerName":"Better World","displayName":"Better World","partnerLogo":"/images/partner/","effectiveDate":"Feb 6, 2014","disableDate":"Feb 9, 2014","createdDate":"Feb 6, 2014","createdBy":"gnait"},{"id":"BKO","partnerName":"BKO Runoff","displayName":"BKO Runoff","partnerLogo":"/images/partner/","effectiveDate":"Feb 6, 2014","disableDate":"Feb 9, 2014","createdDate":"Feb 6, 2014","createdBy":"gnait"},{"id":"B44","partnerName":"BMW","displayName":"BMW","partnerLogo":"/images/partner/","effectiveDate":"Feb 8, 2014","disableDate":"Feb 9, 2014","createdDate":"Feb 8, 2014","createdBy":"gnait"},{"id":"BMC","partnerName":"BMW Canada","displayName":"BMW Canada","partnerLogo":"/images/partner/","effectiveDate":"Feb 6, 2014","disableDate":"Feb 9, 2014","createdDate":"Feb 6, 2014","createdBy":"gnait"},{"id":"AAO","partnerName":"BP Amoco","displayName":"BP Amoco","partnerLogo":"/images/partner/","effectiveDate":"Feb 6, 2014","disableDate":"Feb 9, 2014","createdDate":"Feb 6, 2014","createdBy":"gnait"},{"id":"B46","partnerName":"Bridge/Firestone","displayName":"Bridge/Firestone","partnerLogo":"/images/partner/","effectiveDate":"Feb 8, 2014","disableDate":"Feb 9, 2014","createdDate":"Feb 8, 2014","createdBy":"gnait"},{"id":"BRL","partnerName":"BRL Runoff","displayName":"BRL Runoff","partnerLogo":"/images/partner/","effectiveDate":"Feb 8, 2014","disableDate":"Feb 9, 2014","createdDate":"Feb 8, 2014","createdBy":"gnait"},{"id":"b44","tagLine":"Sheer Driving Pleasure","partnerName":"BMW","displayName":"BMW-US","partnerLogo":"/images/partner/bmw/bmw-logo.gif","effectiveDate":"Feb 6, 2014","disableDate":"Feb 9, 2014","createdDate":"Feb 6, 2014","createdBy":"gnait"},{"id":"A74","tagLine":"Truth in Engineering","partnerName":"AUDI","displayName":"AUDI","partnerLogo":"/images/partner/audi/audi-logo.gif","effectiveDate":"Feb 6, 2014","disableDate":"Feb 9, 2014","createdDate":"Feb 6, 2014","createdBy":"gnait"},{"id":"G30","tagLine":"FindNewRoads","partnerName":"Chevy","displayName":"GM","partnerLogo":"/images/partner/chevy/chevy-logo.gif","effectiveDate":"Feb 8, 2014","disableDate":"Feb 9, 2014","createdDate":"Feb 8, 2014","createdBy":"gnait"}],"userPartners":[]};
					//response = {"allPartners":[{"id":"b44","tagLine":"Sheer Driving Pleasure","partnerName":"BMW","displayName":"BMW-US","partnerLogo":"/images/partner/bmw/bmw-logo.gif","effectiveDate":"Feb 6, 2014","disableDate":"Feb 9, 2014","createdDate":"Feb 6, 2014","createdBy":"gnait"},{"id":"A74","tagLine":"Truth in Engineering","partnerName":"AUDI","displayName":"AUDI","partnerLogo":"/images/partner/audi/audi-logo.gif","effectiveDate":"Feb 6, 2014","disableDate":"Feb 9, 2014","createdDate":"Feb 6, 2014","createdBy":"gnait"},{"id":"G30","tagLine":"FindNewRoads","partnerName":"Chevy","displayName":"GM","partnerLogo":"/images/partner/chevy/chevy-logo.gif","effectiveDate":"Feb 8, 2014","disableDate":"Feb 9, 2014","createdDate":"Feb 8, 2014","createdBy":"gnait"}],"userPartners":[{"id":"b44","tagLine":"Sheer Driving Pleasure","partnerName":"BMW","displayName":"BMW-US","partnerLogo":"/images/partner/bmw/bmw-logo.gif","effectiveDate":"Feb 6, 2014","disableDate":"Feb 9, 2014","createdDate":"Feb 6, 2014","createdBy":"gnait"},{"id":"A74","tagLine":"Truth in Engineering","partnerName":"AUDI","displayName":"AUDI","partnerLogo":"/images/partner/audi/audi-logo.gif","effectiveDate":"Feb 6, 2014","disableDate":"Feb 9, 2014","createdDate":"Feb 6, 2014","createdBy":"gnait"}]};
					//response = {"allPartners":[{"id":"b44","tagLine":"Sheer Driving Pleasure","partnerName":"BMW","displayName":"BMW-US","partnerLogo":"/images/partner/bmw/bmw-logo.gif","effectiveDate":"Feb 6, 2014","disableDate":"Feb 9, 2014","createdDate":"Feb 6, 2014","createdBy":"gnait"},{"id":"A74","tagLine":"Truth in Engineering","partnerName":"AUDI","displayName":"AUDI","partnerLogo":"/images/partner/audi/audi-logo.gif","effectiveDate":"Feb 6, 2014","disableDate":"Feb 9, 2014","createdDate":"Feb 6, 2014","createdBy":"gnait"},{"id":"G30","tagLine":"FindNewRoads","partnerName":"Chevy","displayName":"GM","partnerLogo":"/images/partner/chevy/chevy-logo.gif","effectiveDate":"Feb 8, 2014","disableDate":"Feb 9, 2014","createdDate":"Feb 8, 2014","createdBy":"gnait"}],"userPartners":[]};

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

