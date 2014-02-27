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
				self.announcements = null;
			},





			_announcements :
			{
				get : function(viewModel, forceRefresh)
				{
					if(!self.announcements || forceRefresh)
					{
						Common.GET(Common.formatUrl('announcements'), '', 'application/json', self._announcements.callback, {viewModel:viewModel});
					}
					else
					{
						Common.paintPage();
						self._announcements.populateViewModel(viewModel, self.user);
					}
				},
				callback : function(errors, response, callbackData)
				{
					response = [{"id":1,"type":"GM-Alert","title":"Setting a new standard for large SUV technology.","message":"oracle.sql.CLOB@df405a87","effectiveDate":"2014-02-23","expiryDate":"2014-02-19","isAlert":"N","isGlobalAnnouncement":"Y"},{"id":2,"type":"Chevy-Announcement","title":"Please review the new Benefits and Services for Audi.","message":"oracle.sql.CLOB@7b771b44","effectiveDate":"2014-02-13","expiryDate":"2014-02-20","isAlert":"N","isGlobalAnnouncement":"Y"},{"id":3,"type":"Audi-Announcement","title":"Please advise that on March 3rd the ORS Portal will be down between 1-3 CST.","message":"oracle.sql.CLOB@d0a3218a","effectiveDate":"2014-02-09","expiryDate":"2015-02-09","isAlert":"N","isGlobalAnnouncement":"N","groupName":"GMC-NG","partnerName":["Donlen Corp","Encompass","Auto Driveaway VTS"]},{"id":4,"type":"Cadillac-Announcement","title":"Cadi is Setting a new standard for large SUV technology advancements means letting you stay connecte","message":"oracle.sql.CLOB@5e11c3a5","effectiveDate":"2014-02-09","expiryDate":"2015-02-09","isAlert":"N","isGlobalAnnouncement":"N","groupName":"GMC-NG","partnerName":["Donlen Corp","Encompass","Auto Driveaway VTS"]}];
				
					if(response)
					{
						self.announcements = response;
						self._announcements.populateViewModel(callbackData.viewModel, response);
					}
				},
				populateViewModel : function(viewModel, response)
				{
					viewModel.announcements(response);
				}
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
					// WITH
					//response = {"allPartners":[{"id":"VWG","partnerName":"Audi/VW VIP","status":"I","announcements":[],"bookmarks":[]},{"id":"A54","partnerName":"AME Drivers Edge","status":"I","announcements":[],"bookmarks":[]},{"id":"A85","partnerName":"Answer Finl","status":"I","announcements":[],"bookmarks":[]},{"id":"ATT","partnerName":"AT&T","description":"The most convenient way to place an order is online. Simply log in with your wireless number and enter it below. If you have linked your wireless account to an AT&T Access ID, enter this User ID below.","status":"I","announcements":[],"bookmarks":[{"id":3,"name":"ATT-BKMARK"}]},{"id":"D15","partnerName":"Donlen Corp","description":"For more than 49 years, Donlen has been leading the fleet management industry, discovering new ways to help fleet managers and drivers work more efficiently. In the office or on the road, discover innovative ways to work with our proprietary fleet technology.","status":"I","announcements":[],"bookmarks":[]},{"id":"ENC","partnerName":"Encompass","description":"Youve worked hard to build a lifestyle for yourself and your family. A quality insurance policy from Encompass can help protect what you own. Encompass offers products with innovative coverage features. You can choose from a variety of options, including products that offer higher coverage limits. And for a simpler insurance experience, you can combine your home and auto coverages with the Encompass OneSM Policy.","status":"I","announcements":[],"bookmarks":[]},{"id":"A86","partnerName":"Auto Driveaway VTS","status":"I","announcements":[],"bookmarks":[]},{"id":"AUR","partnerName":"Auto Rescue","status":"I","announcements":[],"bookmarks":[]},{"id":"A84","partnerName":"Auto Security (FIMC)","status":"I","announcements":[],"bookmarks":[]},{"id":"T22","partnerName":"Auto Trader Classic","status":"I","announcements":[],"bookmarks":[]},{"id":"AVI","partnerName":"Avis/Budget","status":"I","announcements":[],"bookmarks":[]},{"id":"AXP","partnerName":"AXP-American Express","status":"I","announcements":[],"bookmarks":[]},{"id":"BW","partnerName":"Better World","description":"Better World Club is the most reliable and greenest alternative to AAA and other roadside assistance providers. More than 10 years ago, BWC pioneered the first and only nationwide roadside assistance program for bicycles. And since our founding in 2002, Better World Club has remained our nations only provider of eco-friendly roadside assistance: we offset the environmental impact of our fleet and have opposed the highway-centric lobbying of groups such as AAA, advocating instead for smarter city planning and more transportation funds for bicycle lanes, pedestrian pathways, and public transit systems ¿ all of which will better serve and sustain our US transportation system. ","status":"I","announcements":[],"bookmarks":[]},{"id":"BKO","partnerName":"BKO Runoff","status":"I","announcements":[],"bookmarks":[]},{"id":"B44","partnerName":"BMW","description":"An aura of excellence.\nSporting a TwinPower Turbo V8 engine combined with xDrive intelligent all-wheel drive, the 2013 650i xDrive Gran Coupe is all about power and dynamic acceleration. So, you can count on traction, agility and stability, whatever the weather and road surface conditions may be.","status":"I","announcements":[],"bookmarks":[{"id":2,"name":"AUDI-BKMARK"}]},{"id":"BMC","partnerName":"BMW Canada","description":"An aura of excellence.\nSporting a TwinPower Turbo V8 engine combined with xDrive intelligent all-wheel drive, the 2013 650i xDrive Gran Coupe is all about power and dynamic acceleration. So, you can count on traction, agility and stability, whatever the weather and road surface conditions may be.","status":"I","announcements":[],"bookmarks":[]},{"id":"AAO","partnerName":"BP Amoco","description":"Bps businesses are organized to deliver the energy products and services people around the world need right now. Our Upstream segment is responsible for our activities in oil and natural gas exploration, field development and production. Our Downstream segment is the product and service-led arm of BP, focused on fuels, lubricants and petrochemicals.","status":"I","announcements":[],"bookmarks":[]},{"id":"B46","partnerName":"Bridge/Firestone","status":"I","announcements":[],"bookmarks":[]},{"id":"BRL","partnerName":"BRL Runoff","status":"I","announcements":[],"bookmarks":[]},{"id":"A74","partnerName":"AUDI","description":"Truth is achieved by those with the courage to reimagine the possible. Those who defy convention and push performance to the limits. Engineer lighter, efficient vehicles. Innovate intelligent technology that anticipates drivers¿ needs. And design silhouettes that defy trends and the wind. This is the spirit that drives us. This is Truth in Engineering.","status":"I","announcements":[],"bookmarks":[{"id":1,"name":"AUDI-BKMARK"}]}],"userPartners":[{"id":"A74","partnerName":"AUDI","description":"Truth is achieved by those with the courage to reimagine the possible. Those who defy convention and push performance to the limits. Engineer lighter, efficient vehicles. Innovate intelligent technology that anticipates drivers¿ needs. And design silhouettes that defy trends and the wind. This is the spirit that drives us. This is Truth in Engineering.","status":"I","announcements":[],"bookmarks":[{"id":1,"name":"AUDI-BKMARK"}]},{"id":"ATT","partnerName":"AT&T","description":"The most convenient way to place an order is online. Simply log in with your wireless number and enter it below. If you have linked your wireless account to an AT&T Access ID, enter this User ID below.","status":"I","announcements":[],"bookmarks":[{"id":3,"name":"ATT-BKMARK"}]},{"id":"BW","partnerName":"Better World","description":"Better World Club is the most reliable and greenest alternative to AAA and other roadside assistance providers. More than 10 years ago, BWC pioneered the first and only nationwide roadside assistance program for bicycles. And since our founding in 2002, Better World Club has remained our nations only provider of eco-friendly roadside assistance: we offset the environmental impact of our fleet and have opposed the highway-centric lobbying of groups such as AAA, advocating instead for smarter city planning and more transportation funds for bicycle lanes, pedestrian pathways, and public transit systems ¿ all of which will better serve and sustain our US transportation system. ","status":"I","announcements":[],"bookmarks":[]},{"id":"D15","partnerName":"Donlen Corp","description":"For more than 49 years, Donlen has been leading the fleet management industry, discovering new ways to help fleet managers and drivers work more efficiently. In the office or on the road, discover innovative ways to work with our proprietary fleet technology.","status":"I","announcements":[],"bookmarks":[]}]};					
					
					// WITHOUT
					response = {"allPartners":[{"id":"VWG","partnerName":"Audi/VW VIP","status":"I","announcements":[],"bookmarks":[]},{"id":"A54","partnerName":"AME Drivers Edge","status":"I","announcements":[],"bookmarks":[]},{"id":"A85","partnerName":"Answer Finl","status":"I","announcements":[],"bookmarks":[]},{"id":"ATT","partnerName":"AT&T","description":"The most convenient way to place an order is online. Simply log in with your wireless number and enter it below. If you have linked your wireless account to an AT&T Access ID, enter this User ID below.","status":"I","announcements":[],"bookmarks":[{"id":3,"name":"ATT-BKMARK"}]},{"id":"D15","partnerName":"Donlen Corp","description":"For more than 49 years, Donlen has been leading the fleet management industry, discovering new ways to help fleet managers and drivers work more efficiently. In the office or on the road, discover innovative ways to work with our proprietary fleet technology.","status":"I","announcements":[],"bookmarks":[]},{"id":"ENC","partnerName":"Encompass","description":"Youve worked hard to build a lifestyle for yourself and your family. A quality insurance policy from Encompass can help protect what you own. Encompass offers products with innovative coverage features. You can choose from a variety of options, including products that offer higher coverage limits. And for a simpler insurance experience, you can combine your home and auto coverages with the Encompass OneSM Policy.","status":"I","announcements":[],"bookmarks":[]},{"id":"A86","partnerName":"Auto Driveaway VTS","status":"I","announcements":[],"bookmarks":[]},{"id":"AUR","partnerName":"Auto Rescue","status":"I","announcements":[],"bookmarks":[]},{"id":"A84","partnerName":"Auto Security (FIMC)","status":"I","announcements":[],"bookmarks":[]},{"id":"T22","partnerName":"Auto Trader Classic","status":"I","announcements":[],"bookmarks":[]},{"id":"AVI","partnerName":"Avis/Budget","status":"I","announcements":[],"bookmarks":[]},{"id":"AXP","partnerName":"AXP-American Express","status":"I","announcements":[],"bookmarks":[]},{"id":"BW","partnerName":"Better World","description":"Better World Club is the most reliable and greenest alternative to AAA and other roadside assistance providers. More than 10 years ago, BWC pioneered the first and only nationwide roadside assistance program for bicycles. And since our founding in 2002, Better World Club has remained our nations only provider of eco-friendly roadside assistance: we offset the environmental impact of our fleet and have opposed the highway-centric lobbying of groups such as AAA, advocating instead for smarter city planning and more transportation funds for bicycle lanes, pedestrian pathways, and public transit systems ¿ all of which will better serve and sustain our US transportation system. ","status":"I","announcements":[],"bookmarks":[]},{"id":"BKO","partnerName":"BKO Runoff","status":"I","announcements":[],"bookmarks":[]},{"id":"B44","partnerName":"BMW","description":"An aura of excellence.\nSporting a TwinPower Turbo V8 engine combined with xDrive intelligent all-wheel drive, the 2013 650i xDrive Gran Coupe is all about power and dynamic acceleration. So, you can count on traction, agility and stability, whatever the weather and road surface conditions may be.","status":"I","announcements":[],"bookmarks":[{"id":2,"name":"AUDI-BKMARK"}]},{"id":"BMC","partnerName":"BMW Canada","description":"An aura of excellence.\nSporting a TwinPower Turbo V8 engine combined with xDrive intelligent all-wheel drive, the 2013 650i xDrive Gran Coupe is all about power and dynamic acceleration. So, you can count on traction, agility and stability, whatever the weather and road surface conditions may be.","status":"I","announcements":[],"bookmarks":[]},{"id":"AAO","partnerName":"BP Amoco","description":"Bps businesses are organized to deliver the energy products and services people around the world need right now. Our Upstream segment is responsible for our activities in oil and natural gas exploration, field development and production. Our Downstream segment is the product and service-led arm of BP, focused on fuels, lubricants and petrochemicals.","status":"I","announcements":[],"bookmarks":[]},{"id":"B46","partnerName":"Bridge/Firestone","status":"I","announcements":[],"bookmarks":[]},{"id":"BRL","partnerName":"BRL Runoff","status":"I","announcements":[],"bookmarks":[]},{"id":"A74","partnerName":"AUDI","description":"Truth is achieved by those with the courage to reimagine the possible. Those who defy convention and push performance to the limits. Engineer lighter, efficient vehicles. Innovate intelligent technology that anticipates drivers¿ needs. And design silhouettes that defy trends and the wind. This is the spirit that drives us. This is Truth in Engineering.","status":"I","announcements":[],"bookmarks":[{"id":1,"name":"AUDI-BKMARK"}]}],"userPartners":[]};
					response.allPartners = Common.sort(response.allPartners, 'partnerName');

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

