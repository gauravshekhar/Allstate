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
				/*
				var abc = [{"pageDescription":"<p>This is a template for Audi Benefits and Services description.This is a template for Audi Benefits and Services description.This is a template for Audi Benefits and Services description.This is a template for Audi Benefits and Services description.This is a template for Audi Benefits and Services description.</p>","pageId":"2014010133732","pageTitle":"Claims","categories":[{"id":"1","title":"Claims","paragraphs":[{"id":"1","title":"","text":"<p>Unlimited Services while under Roadside Coverage.&nbsp;</p>\n<p>Exception - 5 Claim limits for Fuel/Fluid Delivery per year.</p>\n<p>&nbsp;</p>\n<p>Pay-Per-Use does not have a claims limit.</p>\n<p>&nbsp;</p>","images":[],"pageDocuments":[]},{"id":"2","title":"VIP Claims","text":"<p>Unlimited Services while under Roadside Coverage.&nbsp;</p>\n<p>Pay-Per-Use does not have a claims limit.</p>\n<p>&nbsp;</p>","images":[],"pageDocuments":[]}]}]},{"pageDescription":"<p>This is a template for Audi Benefits and Services description.This is a template for Audi Benefits and Services description.This is a template for Audi Benefits and Services description.This is a template for Audi Benefits and Services description.This is a template for Audi Benefits and Services description.</p>","pageId":"201409144649","pageTitle":"Concierge Service","categories":[{"id":"1","title":"","paragraphs":[{"id":"1","title":"Concierge Service","text":"<p>Concierge Service is available for Audi/VW VIP and ALL Audi vehicles owner's.</p>\n<p>Audi CSR will offer to warm transfer the customer to a vendor (Audi Travel Services) that will arrange for taxi/limousine, airline/rail, or hotel reservations for the customer.&nbsp; To identify the situations when to use the Concierge service, see the Concierge Service section.</p>\n<p>Replacement vehicle will be handled by the Audi Roadside Assistance CSR.&nbsp; See Replacement vehicle for more details.</p>\n<p>If the disablement is due to a mechanical breakdown, Audi Travel Services pays up front for arrangements and pass the bill onto ARS.</p>\n<p>If the disablement is due to an accident, Audi Travel Services (or Audi CSR for Rental Car) sets up the service and the Customer pays for the service directly.</p>","images":[],"pageDocuments":[]},{"id":"2","title":"VIP Concierge Service","text":"<p>Concierge Service is available for Audi/VW VIP vehicle owners ONLY.</p>\n<p>Audi CSR will offer to warm transfer the customer to a vendor (Audi Travel Services) that will arrange for taxi/limousine, airline/rail, or hotel reservations for the customer.&nbsp; To identify the situations when to use the Concierge service, see the Concierge Service section.</p>\n<p>&nbsp;</p>\n<p>Audi Travel Services pays up front for arrangements and pass the bill onto ARS.</p>\n<p>Replacement vehicle will be handled by the Audi Roadside Assistance CSR.&nbsp; See Replacement vehicle for more details.</p>\n<p>&nbsp;</p>","images":[],"pageDocuments":[]},{"id":"3","title":"Audi eTron Concierge Service","text":"<p>Concierge Service is available for Audi/VW VIP vehicle owner's ONLY.</p>\n<p>Audi CSR will offer to warm transfer the customer to a vendor (Audi Travel Services) that will arrange for taxi/limousine, airline/rail, or hotel reservations for the Customer.&nbsp; To identify the situations when to use the Concierge service, see the Concierge Service section in ORS-Audi.</p>\n<p>Audi Travel Services pays up front for arrangements and pass the bill onto ARS.</p>\n<p>Replacement vehicle will be handled by the Audi Roadside Assistance CSR.&nbsp; See Replacement vehicle for more details.</p>","images":[],"pageDocuments":[]}]}]},{"pageDescription":"<p>This is a template for Audi Benefits and Services description.This is a template for Audi Benefits and Services description.This is a template for Audi Benefits and Services description.This is a template for Audi Benefits and Services description.This is a template for Audi Benefits and Services description.</p>","pageId":"20140983940521","pageTitle":"Jump Start","categories":[{"id":"","title":"","paragraphs":[{"id":"","title":"Jump Start","text":"<p>A Jump Start of an Audi vehicle is covered by the Roadside Coverage.</p>\n<p>When the CSR determines the vehicle needs a jump start or the Customer requests a Jump Start, the CSR will have a Service Provider attempt to jump-start the vehicle battery.&nbsp;</p>\n<p>If unsuccessful, then towing arrangements are to be made to the nearest Dealership (follow towing parameters referenced above).</p>","images":[],"pageDocuments":[]},{"id":"","title":"VIP Jump Start","text":"<p>A Jump Start of an Audi vehicle is covered by the Roadside Coverage.</p>\n<p>When the CSR determines the vehicle needs a jump start or the Customer requests a Jump Start, the the CSR will have a Service Provider attempt to jump-start the vehicle battery.&nbsp;</p>\n<p>If unsuccessful, then towing arrangements are to be made to the nearest Dealership (follow towing parameters referenced above).</p>","images":[],"pageDocuments":[]},{"id":"","title":"Jump Start R8 Models Only","text":"<p><strong>R8 Models ONLY</strong></p>\n<ul>\n<li>ONLY the Audi Assist Provider can attempt to Jump Start the R8 and R8 Spyder.</li>\n<li>If the Audi Assist is unavailable or unable to jump start the R8, then the CSR should ALWAYS have the R8 transported to the nearest Dealership (follow the R8 model towing parameters referenced above).</li>\n</ul>\n<p>&nbsp;</p>","images":[],"pageDocuments":[]},{"id":"","title":"VIP Jump Start R8 Models Only","text":"<p><strong>R8 Models ONLY</strong></p>\n<ul>\n<li>ONLY the Audi Assist Provider can attempt to Jump Start the R8 and R8 Spyder.</li>\n<li>If the Audi Assist is unavailable or unable to jump start the R8, then the CSR should ALWAYS have the R8 transported to the nearest Dealership (follow the R8 model towing parameters referenced above).</li>\n</ul>\n<p>&nbsp;</p>","images":[],"pageDocuments":[]},{"id":"","title":"Jump Start Audi eTron","text":"<p>TOW ONLY</p>\n<p>Tow ONLY to the local Audi eTron Service Center.&nbsp; See 2012 eTron Towing Procedure for location and drop off instructions.</p>\n<p>The Batteries (12V battery and HV battery) are NEVER to be jumped on the Audi eTron.</p>","images":[],"pageDocuments":[]}]}]},{"pageDescription":"<p>This is a template for Audi Benefits and Services description.This is a template for Audi Benefits and Services description.This is a template for Audi Benefits and Services description.This is a template for Audi Benefits and Services description.This is a template for Audi Benefits and Services description.</p>","pageId":"2014017125836","pageTitle":"Reimbursements","categories":[{"id":"","title":"Customer Reimbursements","paragraphs":[{"id":"","title":"","text":"<p>After exhausting <strong>ALL</strong> dispatch options, a Pre-Authorized Reimbursement is available to the Customer.</p>\n<p>&nbsp;</p>\n<p><strong>NOTE: ONLY</strong> the Customer can submit for Reimbursement Consideration through the following process.&nbsp; If the Dealership is calling to request reimbursement, they must follow their process through Audi and <strong>NOT</strong> submit for reimbursement consideration through the following process.&nbsp;</p>\n<p>&nbsp;&nbsp;</p>\n<p>Instruct the Customer to Mail:</p>\n<ul>\n<li>Original receipt which should include: \n<ul>\n<li>Date of service </li>\n<li>Service provider's name, address and phone number, </li>\n<li>Type of service rendered </li>\n</ul>\n</li>\n<li>Customer's information \n<ul>\n<li>Name </li>\n<li>Mailing Address, City State Zip </li>\n<li>Telephone Number </li>\n<li>Full VIN </li>\n</ul>\n</li>\n<li>Pre Authorization Number \n<ul>\n<li>Use the VIN as the Pre-authorization number </li>\n<li>For \"No VIN\" situations, provide the Customer the PMG ID Number from MMA.&nbsp;&nbsp;</li>\n</ul>\n</li>\n</ul>\n<p>Ask them to send this to following address for reimbursement consideration:&nbsp;</p>\n<p>Audi Roadside Assistance</p>\n<p>Attn: Claims Department&nbsp;</p>\n<p>PO Box 3094</p>\n<p>Arlington Heights, IL 60006-3094</p>\n<p>&nbsp;</p>\n<p><span style=\"text-decoration: underline;\">Reimbursement limits</span></p>\n<p>Towing - $200 reimbursement limit for those that are within their Roadside Coverage.</p>\n<p>Tire change - $200 reimbursement limit for those that are within their Roadside Coverage.</p>\n<p>Jump Start - $200 reimbursement limit for those that are within their Roadside Coverage.</p>\n<p>Delivery of fuel&nbsp; - $200 reimbursement limit for those that are within their Roadside Coverage.</p>\n<p>Winch&nbsp; - $200 reimbursement limit for those that are within their Roadside Coverage.</p>\n<p>Lock-out&nbsp; - $200 reimbursement limit for those that are within their Roadside Coverage.</p>\n<p>&nbsp;</p>\n<p>Reimbursement limits are based on benefit limitations referenced above.</p>\n<p>&nbsp;</p>"}]}]},{"pageDescription":"<p>This is a template for Audi Benefits and Services description.This is a template for Audi Benefits and Services description.This is a template for Audi Benefits and Services description.This is a template for Audi Benefits and Services description.This is a template for Audi Benefits and Services description.</p>","pageId":"201401013313","pageTitle":"Coverage Vehicle","categories":[{"id":"1","title":"","paragraphs":[{"id":"1","title":"Coverage Vehicle","text":"<p>The Plan covers the vehicle&nbsp; (Light Duty Cars and SUV's) on file, no matter who is driving.</p>\n<p>&nbsp;</p>","images":[],"pageDocuments":[]},{"id":"2","title":"VIP Coverage Vehicle","text":"<p>The Plan covers the vehicle&nbsp; (Light Duty Cars and SUV's) on file, no matter who is driving.</p>\n<p>&nbsp;</p>","images":[],"pageDocuments":[]}]}]},{"pageDescription":"<p>This is a template for Audi Benefits and Services description.This is a template for Audi Benefits and Services description.This is a template for Audi Benefits and Services description.This is a template for Audi Benefits and Services description.This is a template for Audi Benefits and Services description.</p>","pageId":"2014099547251","pageTitle":"Fuel/Fluid Delivery","categories":[{"id":"1","title":"","paragraphs":[{"id":"","title":"","text":"<p>Fuel Delivery and the cost of an Emergency Supply of fuel is covered under the Audi Roadside Coverage.</p>\n<p>If the Audi vehicle runs out of fuel, Audi Roadside Assistance will have a Service Provider deliver enough fuel to allow the Customer to drive to the nearest gas station.</p>\n<p>If the vehicle has a TDI (Clean Diesel) engine, then the CSR must confirm that the Service Provider is delivering Clean Diesel fuel (also known as: Ultra Low Sulfur diesel).</p>\n<p>Delivery of up to 3 gallons of fuel.</p>\n<p>If fuel cannot be delivered, then the vehicle can be transported to the nearest gas station.</p>\n<p>Steps to take:&nbsp;</p>\n<ol>\n<li>Go on the Internet &ndash; Google Maps.</li>\n<li>Search for the Disablement Pick-Up Address.</li>\n<li>Find the nearest gas station to the disablement.&nbsp; After locating the Disablement Pick-Up address on the map, enter 'gas station' as the search.&nbsp; Gas stations near the Disablement Pick-Up location will appear.</li>\n<li>Call the gas station to ensure that they are open (when applicable, confirm they have Clean Diesel).</li>\n<li>Go back to the Disablement screen</li>\n<li>Remove the Service - Fuel Delivery</li>\n<li>Select and add the Service - Tow</li>\n<li>Select 'Gas Station' as the Disablement Drop-Off location in MMA.</li>\n<li>Enter the gas station name and address as the Disablement Drop-Off location in MMA.</li>\n</ol>\n<p>IMPORTANT: The Customer will have a limit of ONLY 5 occurrences of fuel/fluid delivery per year.&nbsp; The number of occurrences will be displayed in the Benefit Details screen.&nbsp; Once the Customer has used all 5 fuel/fluid delivery occurrences within a year, then the Customer will be charged a PPU for the service.&nbsp; NOTE: CSR should inform the Customer at the time of the 5th occurrence that the next occurrence will be at the Customer's expense.</p>","images":[],"pageDocuments":[]},{"id":"2","title":"VIP Fuel/Fluid Delivery","text":"<p>Fuel Delivery and the cost of an Emergency Supply of fuel is covered under the Audi Roadside Coverage.</p>\n<p>&nbsp;</p>\n<p>If the Audi vehicle runs out of fuel, Audi Roadside Assistance will have a Service Provider deliver enough fuel to allow the Customer to drive to the nearest gas station.</p>\n<p>If the vehicle has a TDI (Clean Diesel) engine, then the CSR must confirm that the Service Provider is delivering Clean Diesel fuel (also known as: Ultra Low Sulfur diesel).</p>\n<p>&nbsp;</p>\n<p>Delivery of up to 3 gallons of fuel.</p>\n<p>&nbsp;</p>\n<p>If fuel can not be delivered, then the vehicle will be transported to the nearest gas station.</p>\n<p>&nbsp;</p>\n<p>Steps to take:&nbsp;</p>\n<ol>\n<li>Go on the Internet &ndash; Google Maps.</li>\n<li>Search for the Disablement Pick-Up Address.</li>\n<li>Find the nearest gas station to the disablement.&nbsp; After locating the Disablement Pick-Up address on the map, enter 'gas station' as the search.&nbsp; Gas stations near the Disablement Pick-Up location will appear.</li>\n<li>Call the gas station to ensure that they are open (when applicable, confirm they have Clean Diesel).</li>\n<li>Go back to the Disablement screen.</li>\n<li>Remove the Service - Fuel Delivery.</li>\n<li>Select and add the Service - Tow.</li>\n<li>Select 'Gas Station' as the Disablement Drop-Off location in MMA.</li>\n<li>Enter the gas station name and address as the Disablement Drop-Off location in MMA.</li>\n</ol>\n<p>&nbsp;</p>","images":[],"pageDocuments":[]},{"id":"3","title":"AdBlue Delivery","text":"<p>The Audi Assist providers are the ONLY Service Provider that can deliver AdBlue to the vehicle.</p>\n<p>If the Audi Assist provider is unavailable to deliver AdBlue, then the CSR will have the vehicle transported to the Nearest Dealership (follow towing parameters referenced above).<br />&nbsp;</p>\n<p>F.Y.I. - Customers will receive warning messages at certain intervals inside the vehicle that the AdBlue is getting low.</p>","images":[],"pageDocuments":[]},{"id":"4","title":"VIP AdBlue Delivery","text":"<p>The Audi Assist providers are the ONLY Service Provider that can deliver AdBlue to the vehicle.</p>\n<p>If the Audi Assist provider is unavailable to deliver AdBlue, then the CSR will have the vehicle transported to the Nearest Dealership (follow towing parameters referenced above).</p>\n<p>&nbsp;</p>\n<p>F.Y.I. - Customers will receive warning messages at certain intervals inside the vehicle that the AdBlue is getting low.</p>\n<p>&nbsp;</p>","images":[],"pageDocuments":[]},{"id":"5","title":"Discharged HV Battery (Out of \"Electric\" Fuel) ","text":"<p>TOW ONLY</p>\n<p>Tow ONLY to the local Audi eTron Service Center.&nbsp; See 2012 eTron Towing Procedure for location and drop off instructions.</p>","images":[],"pageDocuments":[]}]}]},{"pageDescription":"<p>This is a template for Audi Benefits and Services description.This is a template for Audi Benefits and Services description.This is a template for Audi Benefits and Services description.This is a template for Audi Benefits and Services description.This is a template for Audi Benefits and Services description.</p>","pageId":"201409124225","pageTitle":"Lockout","categories":[{"id":"","title":"","paragraphs":[{"id":"","title":"Lockout","text":"<p>The attempt to do lockout service to the vehicle is covered under the Roadside Coverage.</p>","images":[],"pageDocuments":[]},{"id":"","title":"VIP Lockout","text":"<p>The attempt to do lockout service to the vehicle is covered under the Roadside Coverage.</p>\n<p>&nbsp;</p>\n<p><strong>R8 Models Only</strong> - Initially offer to have the vehicle transported.&nbsp; If the Customer prefers a Lockout, then send a Service Provider to perform a Lockout.</p>\n<p>&nbsp;</p>\n<p><span style=\"text-decoration: underline;\">Keys locked in the vehicle</span></p>\n<p>Should an Audi customer lock their keys in their vehicle, Roadside Assistance will make arrangements for lockout assistance.</p>\n<p>&nbsp;</p>\n<p>If the Lockout is unsuccessful, then the vehicle can be towed to the Nearest Dealership.&nbsp; The tow to the Dealership is covered as part of the Roadside Coverage.</p>\n<p>&nbsp;</p>\n<p><span style=\"text-decoration: underline;\">Key are Missing/Lost</span></p>\n<p>Should an Audi customer contact stating that their keys are missing or lost, the Roadside Assistance CSR will advise the customer to contact their Dealership to have a new key made.</p>\n<p>If the Customer is in an unsafe location, then the vehicle will need to be transported to the Nearest Dealership.&nbsp; If the Customer wants to be towed home, this is covered based on towing mileage parameters referenced above.</p>\n<p>See the Audi Keys section for more detail about the keys.</p>","images":[],"pageDocuments":[]},{"id":"","title":"Keys locked in the vehicle All Models (excluding A8/S8/R8) ","text":"<p>Should an Audi customer lock their keys in their vehicle, Roadside Assistance will make arrangements to send a lockout service to attempt to open the vehicle.</p>\n<p>If the Lockout is unsuccessful, then the vehicle can be towed to the Nearest Dealership.&nbsp; The tow to the Dealership is now covered as part of the Roadside Coverage.&nbsp; The CSR may need to have a Supervisor override the PPU that appears (until MMA system is modified).</p>\n<p>&nbsp;</p>","images":[],"pageDocuments":[]},{"id":"","title":"Keys locked in the vehicle - A8 and S8 models only","text":"<p>Should an Audi customer lock their keys in their vehicle, Roadside Assistance will make arrangements to send a lockout service to attempt to open the vehicle.</p>\n<p>If the Lockout is unsuccessful, then the vehicle can be towed to the Nearest Dealership.&nbsp; The tow to the Dealership is covered as part of the Roadside Coverage.</p>","images":[],"pageDocuments":[]},{"id":"","title":"Keys locked in the vehicle - R8 models only","text":"<p>Should an Audi customer lock their keys in their vehicle, initially offer to have the vehicle transported to the Dealership.&nbsp;</p>\n<p>If the Customer prefers a Lockout, then send a Service Provider to perform a Lockout.&nbsp;</p>\n<p>If the Lockout is unsuccessful, then the vehicle can be towed to the Nearest Dealership.&nbsp; The tow to the Dealership is covered as part of the Roadside Coverage.</p>","images":[],"pageDocuments":[]},{"id":"","title":"Audi eTron Lockout","text":"<ol>\n<li>The CSR contacts the Audi eTron Provider for that area listed on the 2012 eTron Towing Procedure page to attempt to perform a Lockout on the vehicle.</li>\n<li>If the Lockout attempt is unsuccessful, then the Audi eTron needs to be towed to the local Audi eTron Service Center.</li>\n</ol>\n<ul>\n<li>Lockout TOWS are the exception to the Flatbed rule.&nbsp; Since the Provider can NOT place the Audi eTron into Neutral (unable to gain entry into the vehicle),&nbsp; the use of &ldquo;skates&rdquo; is mandatory.</li>\n<li>Tow ONLY to the local Audi eTron Service Center.&nbsp; See 2012 eTron Towing Procedure for location and drop off instructions.</li>\n</ul>","images":[],"pageDocuments":[]}]}]}];
				var json = {"title":"Concierge Service","categories":[{"id":"1","title":"","paragraphs":[{"id":"1","title":"Concierge Service","text":"<p>Concierge Service is available for Audi/VW VIP and ALL Audi vehicles owner's.</p>\n<p>Audi CSR will offer to warm transfer the customer to a vendor (Audi Travel Services) that will arrange for taxi/limousine, airline/rail, or hotel reservations for the customer.&nbsp; To identify the situations when to use the Concierge service, see the Concierge Service section.</p>\n<p>Replacement vehicle will be handled by the Audi Roadside Assistance CSR.&nbsp; See Replacement vehicle for more details.</p>\n<p>If the disablement is due to a mechanical breakdown, Audi Travel Services pays up front for arrangements and pass the bill onto ARS.</p>\n<p>If the disablement is due to an accident, Audi Travel Services (or Audi CSR for Rental Car) sets up the service and the Customer pays for the service directly.</p>","images":[],"pageDocuments":[]},{"id":"2","title":"VIP Concierge Service","text":"<p>Concierge Service is available for Audi/VW VIP vehicle owners ONLY.</p>\n<p>Audi CSR will offer to warm transfer the customer to a vendor (Audi Travel Services) that will arrange for taxi/limousine, airline/rail, or hotel reservations for the customer.&nbsp; To identify the situations when to use the Concierge service, see the Concierge Service section.</p>\n<p>&nbsp;</p>\n<p>Audi Travel Services pays up front for arrangements and pass the bill onto ARS.</p>\n<p>Replacement vehicle will be handled by the Audi Roadside Assistance CSR.&nbsp; See Replacement vehicle for more details.</p>\n<p>&nbsp;</p>","images":[],"pageDocuments":[]},{"id":"3","title":"Audi eTron Concierge Service","text":"<p>Concierge Service is available for Audi/VW VIP vehicle owner's ONLY.</p>\n<p>Audi CSR will offer to warm transfer the customer to a vendor (Audi Travel Services) that will arrange for taxi/limousine, airline/rail, or hotel reservations for the Customer.&nbsp; To identify the situations when to use the Concierge service, see the Concierge Service section in ORS-Audi.</p>\n<p>Audi Travel Services pays up front for arrangements and pass the bill onto ARS.</p>\n<p>Replacement vehicle will be handled by the Audi Roadside Assistance CSR.&nbsp; See Replacement vehicle for more details.</p>","images":[],"pageDocuments":[]}]}]};
				*/
				
				self.stubs = false;
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
					if(self.stubs)
					{
						response = [{"id":1,"type":"GM-Alert","title":"Setting a new standard for large SUV technology.","message":"oracle.sql.CLOB@df405a87","effectiveDate":"2014-02-23","expiryDate":"2014-02-19","isAlert":"N","isGlobalAnnouncement":"Y"},{"id":2,"type":"Chevy-Announcement","title":"Please review the new Benefits and Services for Audi.","message":"oracle.sql.CLOB@7b771b44","effectiveDate":"2014-02-13","expiryDate":"2014-02-20","isAlert":"N","isGlobalAnnouncement":"Y"},{"id":3,"type":"Audi-Announcement","title":"Please advise that on March 3rd the ORS Portal will be down between 1-3 CST.","message":"oracle.sql.CLOB@d0a3218a","effectiveDate":"2014-02-09","expiryDate":"2015-02-09","isAlert":"N","isGlobalAnnouncement":"N","groupName":"GMC-NG","partnerName":["Donlen Corp","Encompass","Auto Driveaway VTS"]},{"id":4,"type":"Cadillac-Announcement","title":"Cadi is Setting a new standard for large SUV technology advancements means letting you stay connecte","message":"oracle.sql.CLOB@5e11c3a5","effectiveDate":"2014-02-09","expiryDate":"2015-02-09","isAlert":"N","isGlobalAnnouncement":"N","groupName":"GMC-NG","partnerName":["Donlen Corp","Encompass","Auto Driveaway VTS"]}];
					}
				
					self.announcements = response;
					self._announcements.populateViewModel(callbackData.viewModel, response);
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
					if(self.stubs)
					{
						response = {"id":"gshek","firstName":"Gaurav","lastName":"Shekhar","networkId":"gshek","accessExeiryDate":"Feb 9, 2014","createDate":"Feb 6, 2014","createdBy":"gnait","updateDate":"Feb 6, 2014","updatedBy":"gshek"};
					}

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
					if(self.stubs)
					{
						// WITH
						//response = {"allPartners":[{"id":"VWG","partnerName":"Audi/VW VIP","status":"I","announcements":[],"bookmarks":[]},{"id":"A54","partnerName":"AME Drivers Edge","status":"I","announcements":[],"bookmarks":[]},{"id":"A85","partnerName":"Answer Finl","status":"I","announcements":[],"bookmarks":[]},{"id":"ATT","partnerName":"AT&T","description":"The most convenient way to place an order is online. Simply log in with your wireless number and enter it below. If you have linked your wireless account to an AT&T Access ID, enter this User ID below.","status":"I","announcements":[],"bookmarks":[{"id":3,"name":"ATT-BKMARK"}]},{"id":"D15","partnerName":"Donlen Corp","description":"For more than 49 years, Donlen has been leading the fleet management industry, discovering new ways to help fleet managers and drivers work more efficiently. In the office or on the road, discover innovative ways to work with our proprietary fleet technology.","status":"I","announcements":[],"bookmarks":[]},{"id":"ENC","partnerName":"Encompass","description":"Youve worked hard to build a lifestyle for yourself and your family. A quality insurance policy from Encompass can help protect what you own. Encompass offers products with innovative coverage features. You can choose from a variety of options, including products that offer higher coverage limits. And for a simpler insurance experience, you can combine your home and auto coverages with the Encompass OneSM Policy.","status":"I","announcements":[],"bookmarks":[]},{"id":"A86","partnerName":"Auto Driveaway VTS","status":"I","announcements":[],"bookmarks":[]},{"id":"AUR","partnerName":"Auto Rescue","status":"I","announcements":[],"bookmarks":[]},{"id":"A84","partnerName":"Auto Security (FIMC)","status":"I","announcements":[],"bookmarks":[]},{"id":"T22","partnerName":"Auto Trader Classic","status":"I","announcements":[],"bookmarks":[]},{"id":"AVI","partnerName":"Avis/Budget","status":"I","announcements":[],"bookmarks":[]},{"id":"AXP","partnerName":"AXP-American Express","status":"I","announcements":[],"bookmarks":[]},{"id":"BW","partnerName":"Better World","description":"Better World Club is the most reliable and greenest alternative to AAA and other roadside assistance providers. More than 10 years ago, BWC pioneered the first and only nationwide roadside assistance program for bicycles. And since our founding in 2002, Better World Club has remained our nations only provider of eco-friendly roadside assistance: we offset the environmental impact of our fleet and have opposed the highway-centric lobbying of groups such as AAA, advocating instead for smarter city planning and more transportation funds for bicycle lanes, pedestrian pathways, and public transit systems ¿ all of which will better serve and sustain our US transportation system. ","status":"I","announcements":[],"bookmarks":[]},{"id":"BKO","partnerName":"BKO Runoff","status":"I","announcements":[],"bookmarks":[]},{"id":"B44","partnerName":"BMW","description":"An aura of excellence.\nSporting a TwinPower Turbo V8 engine combined with xDrive intelligent all-wheel drive, the 2013 650i xDrive Gran Coupe is all about power and dynamic acceleration. So, you can count on traction, agility and stability, whatever the weather and road surface conditions may be.","status":"I","announcements":[],"bookmarks":[{"id":2,"name":"AUDI-BKMARK"}]},{"id":"BMC","partnerName":"BMW Canada","description":"An aura of excellence.\nSporting a TwinPower Turbo V8 engine combined with xDrive intelligent all-wheel drive, the 2013 650i xDrive Gran Coupe is all about power and dynamic acceleration. So, you can count on traction, agility and stability, whatever the weather and road surface conditions may be.","status":"I","announcements":[],"bookmarks":[]},{"id":"AAO","partnerName":"BP Amoco","description":"Bps businesses are organized to deliver the energy products and services people around the world need right now. Our Upstream segment is responsible for our activities in oil and natural gas exploration, field development and production. Our Downstream segment is the product and service-led arm of BP, focused on fuels, lubricants and petrochemicals.","status":"I","announcements":[],"bookmarks":[]},{"id":"B46","partnerName":"Bridge/Firestone","status":"I","announcements":[],"bookmarks":[]},{"id":"BRL","partnerName":"BRL Runoff","status":"I","announcements":[],"bookmarks":[]},{"id":"A74","partnerName":"AUDI","description":"Truth is achieved by those with the courage to reimagine the possible. Those who defy convention and push performance to the limits. Engineer lighter, efficient vehicles. Innovate intelligent technology that anticipates drivers¿ needs. And design silhouettes that defy trends and the wind. This is the spirit that drives us. This is Truth in Engineering.","status":"I","announcements":[],"bookmarks":[{"id":1,"name":"AUDI-BKMARK"}]}],"userPartners":[{"id":"A74","partnerName":"AUDI","description":"Truth is achieved by those with the courage to reimagine the possible. Those who defy convention and push performance to the limits. Engineer lighter, efficient vehicles. Innovate intelligent technology that anticipates drivers¿ needs. And design silhouettes that defy trends and the wind. This is the spirit that drives us. This is Truth in Engineering.","status":"I","announcements":[],"bookmarks":[{"id":1,"name":"AUDI-BKMARK"}]},{"id":"ATT","partnerName":"AT&T","description":"The most convenient way to place an order is online. Simply log in with your wireless number and enter it below. If you have linked your wireless account to an AT&T Access ID, enter this User ID below.","status":"I","announcements":[],"bookmarks":[{"id":3,"name":"ATT-BKMARK"}]},{"id":"BW","partnerName":"Better World","description":"Better World Club is the most reliable and greenest alternative to AAA and other roadside assistance providers. More than 10 years ago, BWC pioneered the first and only nationwide roadside assistance program for bicycles. And since our founding in 2002, Better World Club has remained our nations only provider of eco-friendly roadside assistance: we offset the environmental impact of our fleet and have opposed the highway-centric lobbying of groups such as AAA, advocating instead for smarter city planning and more transportation funds for bicycle lanes, pedestrian pathways, and public transit systems ¿ all of which will better serve and sustain our US transportation system. ","status":"I","announcements":[],"bookmarks":[]},{"id":"D15","partnerName":"Donlen Corp","description":"For more than 49 years, Donlen has been leading the fleet management industry, discovering new ways to help fleet managers and drivers work more efficiently. In the office or on the road, discover innovative ways to work with our proprietary fleet technology.","status":"I","announcements":[],"bookmarks":[]}]};					
						
						// WITHOUT
						response = {"allPartners":[{"id":"VWG","partnerName":"Audi/VW VIP","status":"I","index":0,"announcements":[{"id":3,"type":"Audi-Announcement","title":"Audi is Setting a new standard for large SUV technology advancements means letting you stay connecte","message":"oracle.sql.CLOB@32ce73b8","effectiveDate":"2014-02-09","expiryDate":"2015-02-09","isAlert":"N","isGlobalAnnouncement":"N"},{"id":4,"type":"Cadillac-Announcement","title":"Cadi is Setting a new standard for large SUV technology advancements means letting you stay connecte","message":"oracle.sql.CLOB@fb991846","effectiveDate":"2014-02-09","expiryDate":"2015-02-09","isAlert":"N","isGlobalAnnouncement":"N"}],"bookmarks":[]},{"id":"A54","partnerName":"AME Drivers Edge","status":"I","index":0,"announcements":[{"id":3,"type":"Audi-Announcement","title":"Audi is Setting a new standard for large SUV technology advancements means letting you stay connecte","message":"oracle.sql.CLOB@d16a4f2d","effectiveDate":"2014-02-09","expiryDate":"2015-02-09","isAlert":"N","isGlobalAnnouncement":"N"},{"id":4,"type":"Cadillac-Announcement","title":"Cadi is Setting a new standard for large SUV technology advancements means letting you stay connecte","message":"oracle.sql.CLOB@3fbde99f","effectiveDate":"2014-02-09","expiryDate":"2015-02-09","isAlert":"N","isGlobalAnnouncement":"N"}],"bookmarks":[]},{"id":"A85","partnerName":"Answer Finl","status":"I","index":0,"announcements":[],"bookmarks":[]},{"id":"ATT","partnerName":"AT&T","description":"The most convenient way to place an order is online. Simply log in with your wireless number and enter it below. If you have linked your wireless account to an AT&T Access ID, enter this User ID below.","status":"I","index":0,"announcements":[],"bookmarks":[{"id":3,"name":"ATT-BKMARK"}]},{"id":"D15","partnerName":"Donlen Corp","description":"For more than 49 years, Donlen has been leading the fleet management industry, discovering new ways to help fleet managers and drivers work more efficiently. In the office or on the road, discover innovative ways to work with our proprietary fleet technology.","status":"I","index":0,"announcements":[],"bookmarks":[]},{"id":"ENC","partnerName":"Encompass","description":"Youve worked hard to build a lifestyle for yourself and your family. A quality insurance policy from Encompass can help protect what you own. Encompass offers products with innovative coverage features. You can choose from a variety of options, including products that offer higher coverage limits. And for a simpler insurance experience, you can combine your home and auto coverages with the Encompass OneSM Policy.","status":"I","index":0,"announcements":[],"bookmarks":[]},{"id":"A86","partnerName":"Auto Driveaway VTS","status":"I","index":0,"announcements":[],"bookmarks":[]},{"id":"AUR","partnerName":"Auto Rescue","status":"I","index":0,"announcements":[],"bookmarks":[]},{"id":"A84","partnerName":"Auto Security (FIMC)","status":"I","index":0,"announcements":[],"bookmarks":[]},{"id":"T22","partnerName":"Auto Trader Classic","status":"I","index":0,"announcements":[],"bookmarks":[]},{"id":"AVI","partnerName":"Avis/Budget","status":"I","index":0,"announcements":[],"bookmarks":[]},{"id":"AXP","partnerName":"AXP-American Express","status":"I","index":0,"announcements":[],"bookmarks":[]},{"id":"BW","partnerName":"Better World","description":"Better World Club is the most reliable and greenest alternative to AAA and other roadside assistance providers. More than 10 years ago, BWC pioneered the first and only nationwide roadside assistance program for bicycles. And since our founding in 2002, Better World Club has remained our nations only provider of eco-friendly roadside assistance: we offset the environmental impact of our fleet and have opposed the highway-centric lobbying of groups such as AAA, advocating instead for smarter city planning and more transportation funds for bicycle lanes, pedestrian pathways, and public transit systems Â¿ all of which will better serve and sustain our US transportation system. ","status":"I","index":0,"announcements":[],"bookmarks":[]},{"id":"BKO","partnerName":"BKO Runoff","status":"I","index":0,"announcements":[],"bookmarks":[]},{"id":"B44","partnerName":"BMW","description":"An aura of excellence.\nSporting a TwinPower Turbo V8 engine combined with xDrive intelligent all-wheel drive, the 2013 650i xDrive Gran Coupe is all about power and dynamic acceleration. So, you can count on traction, agility and stability, whatever the weather and road surface conditions may be.","status":"I","index":0,"announcements":[{"id":3,"type":"Audi-Announcement","title":"Audi is Setting a new standard for large SUV technology advancements means letting you stay connecte","message":"oracle.sql.CLOB@6244acc1","effectiveDate":"2014-02-09","expiryDate":"2015-02-09","isAlert":"N","isGlobalAnnouncement":"N"},{"id":4,"type":"Cadillac-Announcement","title":"Cadi is Setting a new standard for large SUV technology advancements means letting you stay connecte","message":"oracle.sql.CLOB@4d0e6942","effectiveDate":"2014-02-09","expiryDate":"2015-02-09","isAlert":"N","isGlobalAnnouncement":"N"}],"bookmarks":[{"id":2,"name":"AUDI-BKMARK"}]},{"id":"BMC","partnerName":"BMW Canada","description":"An aura of excellence.\nSporting a TwinPower Turbo V8 engine combined with xDrive intelligent all-wheel drive, the 2013 650i xDrive Gran Coupe is all about power and dynamic acceleration. So, you can count on traction, agility and stability, whatever the weather and road surface conditions may be.","status":"I","index":0,"announcements":[],"bookmarks":[]},{"id":"AAO","partnerName":"BP Amoco","description":"Bps businesses are organized to deliver the energy products and services people around the world need right now. Our Upstream segment is responsible for our activities in oil and natural gas exploration, field development and production. Our Downstream segment is the product and service-led arm of BP, focused on fuels, lubricants and petrochemicals.","status":"I","index":0,"announcements":[],"bookmarks":[]},{"id":"B46","partnerName":"Bridge/Firestone","status":"I","index":0,"announcements":[],"bookmarks":[]},{"id":"BRL","partnerName":"BRL Runoff","status":"I","index":0,"announcements":[],"bookmarks":[]},{"id":"A74","partnerName":"AUDI","description":"Truth is achieved by those with the courage to reimagine the possible. Those who defy convention and push performance to the limits. Engineer lighter, efficient vehicles. Innovate intelligent technology that anticipates driversÂ¿ needs. And design silhouettes that defy trends and the wind. This is the spirit that drives us. This is Truth in Engineering.","status":"I","index":0,"announcements":[],"bookmarks":[{"id":1,"name":"AUDI-BKMARK"}]},{"id":"AARP","partnerName":"AARP","description":"FindNewAARP","status":"I","index":0,"announcements":[],"bookmarks":[],"childPartners":[{"id":"AARch2","partnerName":"AARP","description":"FindNewAARP","status":"I","index":0,"announcements":[],"childBookmarks":[]},{"id":"AARch1","partnerName":"AARP","description":"FindNewAARP","status":"I","index":0,"announcements":[],"childBookmarks":[]},{"id":"AARch3","partnerName":"AARP","description":"FindNewAARP","status":"I","index":0,"announcements":[],"childBookmarks":[]}]},{"id":"ETL","partnerName":"Esurance- Tow and Labor","description":"Esurance- Tow and Labor","status":"I","index":0,"announcements":[],"bookmarks":[]}],"userPartners":[]};
					}

					response.allPartners = Common.sort(response.allPartners, 'partnerName');

					$.each(response.userPartners, function(i)
					{
						var eachThis = this;

						eachThis.menuItems = ko.observableArray([]);

						Common.GET(Common.formatUrl('menu?partnerId=' + this.id), '', 'application/json', function(errors, response)
						{
							if(self.stubs)
							{
								response = [{"pageId":"20140983940521","partnerId":"A74","primaryNavId":"11","primaryNavName":"Benefits and Services","secondaryNavName":"Jump Start","secondaryNavId":"123"},{"pageId":"2014099547251","partnerId":"A74","primaryNavId":"11","primaryNavName":"Benefits and Services","secondaryNavName":"Fuel/Fluid Delivery","secondaryNavId":"125"},{"pageId":"201409124225","partnerId":"A74","primaryNavId":"11","primaryNavName":"Benefits and Services","secondaryNavName":"Lockout","secondaryNavId":"126"},{"pageId":"201401013313","partnerId":"A74","primaryNavId":"11","primaryNavName":"Benefits and Services","secondaryNavName":"Coverage Vehicle","secondaryNavId":"129"},{"pageId":"2014010133732","partnerId":"A74","primaryNavId":"11","primaryNavName":"Benefits and Services","secondaryNavName":"Claims","secondaryNavId":"130"},{"pageId":"20140169622","partnerId":"A74","primaryNavId":"14","primaryNavName":"Vehicle Information","secondaryNavName":"Vehicle Information - TOC page","secondaryNavId":"170"},{"pageId":"2014016104550","partnerId":"A74","primaryNavId":"14","primaryNavName":"Vehicle Information","secondaryNavName":"Out of Network","secondaryNavId":"181"},{"pageId":"2014022105855","partnerId":"A74","primaryNavId":"14","primaryNavName":"Vehicle Information","secondaryNavName":"Pay Per Use","secondaryNavId":"186"},{"pageId":"201402411648","partnerId":"A74","primaryNavId":"14","primaryNavName":"Vehicle Information","secondaryNavName":"Digital Dispatch","secondaryNavId":"187"},{"pageId":"201402216955","partnerId":"A74","primaryNavId":"14","primaryNavName":"Vehicle Information","secondaryNavName":"Overmileage","secondaryNavId":"189"},{"pageId":"201402413836","partnerId":"A74","primaryNavId":"14","primaryNavName":"Vehicle Information","secondaryNavName":"Damage Complaints","secondaryNavId":"201"},{"pageId":"201402413859","partnerId":"A74","primaryNavId":"14","primaryNavName":"Vehicle Information","secondaryNavName":"Rental Car Policy","secondaryNavId":"202"},{"pageId":"201409144649","partnerId":"A74","primaryNavId":"11","primaryNavName":"Benefits and Services","secondaryNavName":"Concierge Service","secondaryNavId":"132"},{"pageId":"2014212122620","partnerId":"A74","primaryNavId":"11","primaryNavName":"Benefits and Services","secondaryNavName":"Benefits and Services ","secondaryNavId":"11"},{"pageId":"2014021114343","partnerId":"A74","primaryNavId":"14","primaryNavName":"Vehicle Information","secondaryNavName":"Roadside Coverage","secondaryNavId":"303"},{"pageId":"2014022164115","partnerId":"A74","primaryNavId":"14","primaryNavName":"Vehicle Information","secondaryNavName":"Phone Numbers and LCD Phone Readout","secondaryNavId":"305"},{"pageId":"2014017125836","partnerId":"A74","primaryNavId":"11","primaryNavName":"Benefits and Services","secondaryNavName":"Reimbursements","secondaryNavId":"133"}];
							}

							if(response)
							{
								eachThis.menuItems(self._partners.formatResponse(response));
							}
						});
					});

					response.userPartners.sort(function(a,b)
					{
						return a.index - b.index;
					});

					self.partners = response;
					self._partners.populateViewModel(callbackData.viewModel, response);
				},
				formatResponse : function(response)
				{
					var formatedResponse, menuObject, primaryNavIds;

					menuObject = {};
					primaryNavIds = [];
					formattedResponse = [];

					$.each(response, function()
					{
						if(!menuObject[this.primaryNavId])
						{
							primaryNavIds.push(this.primaryNavId);

							menuObject[this.primaryNavId] = 
							{
								name : this.primaryNavName,
								primaryNavId : this.primaryNavId,
								children : ko.observableArray([]),
								pageId : 0
							};
						}
					});

					$.each(response, function()
					{
						if(this.primaryNavId !== this.secondaryNavId)
						{
							menuObject[this.primaryNavId].children.push(this);
						}
						else
						{
							menuObject[this.primaryNavId].pageId = this.pageId;
						}
					});

					$.each(menuObject, function(key, value)
					{
						formattedResponse.push(value);
					});
			
					return formattedResponse;
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

