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
				self.partners = null;
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
					//response = {"allPartners":[{"id":"b44","tagLine":"Sheer Driving Pleasure","partnerName":"BMW","displayName":"BMW-US","partnerLogo":"/images/partner/bmw/bmw-logo.gif","effectiveDate":"Feb 6, 2014","disableDate":"Feb 9, 2014","createdDate":"Feb 6, 2014","createdBy":"gnait"},{"id":"A74","tagLine":"Truth in Engineering","partnerName":"AUDI","displayName":"AUDI","partnerLogo":"/images/partner/audi/audi-logo.gif","effectiveDate":"Feb 6, 2014","disableDate":"Feb 9, 2014","createdDate":"Feb 6, 2014","createdBy":"gnait"},{"id":"G30","tagLine":"FindNewRoads","partnerName":"Chevy","displayName":"GM","partnerLogo":"/images/partner/chevy/chevy-logo.gif","effectiveDate":"Feb 8, 2014","disableDate":"Feb 9, 2014","createdDate":"Feb 8, 2014","createdBy":"gnait"}],"userPartners":[{"id":"b44","tagLine":"Sheer Driving Pleasure","partnerName":"BMW","displayName":"BMW-US","partnerLogo":"/images/partner/bmw/bmw-logo.gif","effectiveDate":"Feb 6, 2014","disableDate":"Feb 9, 2014","createdDate":"Feb 6, 2014","createdBy":"gnait"},{"id":"A74","tagLine":"Truth in Engineering","partnerName":"AUDI","displayName":"AUDI","partnerLogo":"/images/partner/audi/audi-logo.gif","effectiveDate":"Feb 6, 2014","disableDate":"Feb 9, 2014","createdDate":"Feb 6, 2014","createdBy":"gnait"}]};
					response = {"allPartners":[{"id":"b44","tagLine":"Sheer Driving Pleasure","partnerName":"BMW","displayName":"BMW-US","partnerLogo":"/images/partner/bmw/bmw-logo.gif","effectiveDate":"Feb 6, 2014","disableDate":"Feb 9, 2014","createdDate":"Feb 6, 2014","createdBy":"gnait"},{"id":"A74","tagLine":"Truth in Engineering","partnerName":"AUDI","displayName":"AUDI","partnerLogo":"/images/partner/audi/audi-logo.gif","effectiveDate":"Feb 6, 2014","disableDate":"Feb 9, 2014","createdDate":"Feb 6, 2014","createdBy":"gnait"},{"id":"G30","tagLine":"FindNewRoads","partnerName":"Chevy","displayName":"GM","partnerLogo":"/images/partner/chevy/chevy-logo.gif","effectiveDate":"Feb 8, 2014","disableDate":"Feb 9, 2014","createdDate":"Feb 8, 2014","createdBy":"gnait"}],"userPartners":[]};
					
					if(response)
					{
						response = self._partners.formatResponse(response);
						self.partners = response;
						self._partners.populateViewModel(callbackData.viewModel, response);
					}
				},
				formatResponse : function(response)
				{
					return response;
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

