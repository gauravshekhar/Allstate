(function()
{
	var self;
	var Cache = Import('Cache');
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
				self.callGlobalViewModel();
				self.initKnockout();
				Common.setCurrentModal(self, 'UserPartnersModal', '#user-partners');
				self.bindTheDOM();
				self.bindJQuerySorting();
			},
			destroy : function(modal2modal)
			{
				Common.destroyModal(self, 'UserPartnersModal', '#user-partners', modal2modal);
			},
			callGlobalViewModel : function()
			{
				self.allPartners = MasterVM.allPartners;
				self.userPartners = MasterVM.userPartners;
			},
			initKnockout : function()
			{
				self.errors = ko.observableArray([]);
				self.selectedCheckboxes = ko.observableArray(self.userPartners());
			},
			bindTheDOM : function()
			{
				var $root;

				$root = $('#user-partners');

				$.each(self.selectedCheckboxes(), function()
				{
					$root.find('#'+this.id).prop('checked', true);
				});

			},
			bindJQuerySorting : function()
			{
				$('#sort-wrapper').sortable();
				$('#sort-wrapper').on('sortstart', function(event, ui)
				{
					ui.item.addClass('active');
				});
				$('#sort-wrapper').on('sortstop', function(event, ui)
				{
					ui.item.removeClass('active');

					var ids, id;
					
					ids = {};

					$('#sort-wrapper').find('li').each(function(i)
					{
						id = $(this).attr('data-id');

						if(id)
						{
							ids[id] = i;
						}
					});
					
					$.each(self.selectedCheckboxes(), function()
					{
						this.index = ids[this.id];
					});

					self.selectedCheckboxes().sort(function(a,b)
					{
						return a.index - b.index;
					});

					self.userPartners(self.selectedCheckboxes());
				});
			},
			destroyIconClick : function()
			{
				self.errors([]);
				
				if(self.userPartners().length === 0 || self.userPartners().length > 5)
				{
					self.errors.push('Please select one to five partners');
				}
				else
				{
					self.submitPartners.call();
				}
			},
			checkboxClicked : function(data, event)
			{
				if(event.target.checked)
				{
					data.menuItems = ko.observableArray([]);
					self.selectedCheckboxes().push(data);
				}
				else
				{
					$.each(self.selectedCheckboxes(), function(i)
					{
						if(data.id === this.id)
						{
							self.selectedCheckboxes().splice(i, 1);
							return false;
						}
					});
				}

				self.selectedCheckboxes(self.selectedCheckboxes());
				self.userPartners(self.selectedCheckboxes());

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

						var partners = [];

						$('#sort-wrapper').find('li').each(function(i)
						{
							partners.push(
							{
								index : i,
								id : $(this).attr('data-id')
							});
						});

						self.requestData = {partners:partners};

						Common.POST(Common.formatUrl('partners'), Common.stringify(self.requestData), 'application/json', self.submitPartners.callback);
					}
				},
				callback : function(errors, response)
				{
					if(response)
					{
						Common.callRestServices(
						[
							{'name':'partners', 'vm':MasterVM, 'forceRefresh':true}
						]);

						Common.waitForServiceCalls(function()
						{
							Common.hideLoading();
							self.destroy();
						});					
					}
					else
					{
						Common.hideLoading();

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

