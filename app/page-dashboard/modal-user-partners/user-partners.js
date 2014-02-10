(function()
{
	var self;
	var Common = Import('Common');
	var MasterVM = Import('MasterVM');

	var UserPartnersModal = (function()
	{
		var UserPartnersModal = function()
		{
			self = this;
			self.init();
		};


		UserPartnersModal.prototype =
		{
			init : function()
			{
				self.initKnockout();
				self.callPageViewModel();
				Common.setCurrentModal(self, 'UserPartnersModal', '#user-partners');
			},
			destroy : function(modal2modal)
			{
				Common.destroyModal(self, 'UserPartnersModal', '#user-partners', modal2modal);
			},
			initKnockout : function()
			{
				self.errors = ko.observableArray([]);
				self.selectedCheckboxes = ko.observableArray([]);
			},
			destroyIconClick : function()
			{
				if(self.selectedCheckboxes().length === 0 || self.selectedCheckboxes().length > 5)
				{
					self.errors.push('Please select one to five partners');
				}
				else
				{
					self.destroy();
				}
			},
			callPageViewModel : function()
			{
				self.allPartners = MasterVM.DashboardPage().allPartners;
				self.userPartners = MasterVM.DashboardPage().userPartners;
			},
			checkboxClicked : function(data, event)
			{
				if(event.target.checked)
				{
					self.selectedCheckboxes.push(data);
				}
				else
				{
					self.selectedCheckboxes($.grep(self.selectedCheckboxes(), function(value, index)
					{
						return (value === data) ? false : true;
					}));
				}

				return true;
			},
			submitPartners : 
			{
				call : function()
				{
					self.errors([]);

					if(self.selectedCheckboxes().length === 0 || self.selectedCheckboxes().length > 5)
					{
						self.errors.push('Please select one to five partners');
					}
					else
					{
						Common.showLoading();
						self.requestData = Common.stringify(self.selectedCheckboxes());
						Common.POST(Common.formatUrl('partners'), self.requestData, 'application/json', self.submitPartners.callback);
					}
				},
				callback : function(errors, response)
				{
					Common.hideLoading();

					if(response)
					{
						self.userPartners(self.selectedCheckboxes());
						self.destroy();
					}
					else
					{
						$.each(errors, function()
						{
							self.errors.push(this);
						});
					}
				}	
			}
		};

		return UserPartnersModal;
	})();

	Export('UserPartnersModal', UserPartnersModal);
})();

