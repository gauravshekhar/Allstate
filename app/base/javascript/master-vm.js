(function() 
{
	var self;
	var RouteTable = Import('RouteTable');

	var MasterVM = (function() 
	{
		var MasterVM = function()
		{
			if(self)
			{
				return self;
			}
			else if(!(this instanceof MasterVM))
			{
				return new MasterVM();
			}

			self = this;
			self.init();
		};

		MasterVM.prototype =
		{
			init : function()
			{
				self.setPageAndModalBindings();
				self.setGlobalBindings();
				self.applyBindings();
			},
			setPageAndModalBindings : function()
			{
				self.currentPage = ko.observable(null);
				self.currentModal = ko.observable(null);

				$.each(RouteTable, function(key, value) 
				{
					self[key] = ko.observable(null);
				});
			},
			setGlobalBindings : function()
			{
				self.user = ko.observable(null);
				self.announcements = ko.observableArray([]);
				self.searchErrors = ko.observable(null);
				self.allPartners = ko.observableArray([]);
				self.userPartners = ko.observableArray([]);
			},
			applyBindings : function()
			{
				if(!ko.dataFor(document.body))
				{
					ko.applyBindings(self);
				}
			},
			firstLevelMenu : function(index, data, event)
			{
				var $container, $triangle;

				$triangle = $('#partner-triangle-' + data.id);
				$container = $('#partner-root-pages-' + data.id);

				if($container.is(':visible'))
				{
					$triangle.addClass('closed');
					$triangle.removeClass('open');
					$container.slideUp();
				}
				else
				{
					$triangle.removeClass('closed');
					$triangle.addClass('open');
					$container.slideDown();
				}
			},
			secondLevelMenu : function(index, data, event)
			{
				var $container, $triangle;

				$triangle = $('#child-triangle-' + data.primaryNavId);
				$container = $('#child-page-' + data.primaryNavId);

				if($container.is(':visible'))
				{
					$triangle.addClass('closed');
					$triangle.removeClass('open');
					$container.slideUp();
				}
				else
				{
					$triangle.removeClass('closed');
					$triangle.addClass('open');
					$container.slideDown();
				}
			},
			showPartnerModal : function()
			{
				Import('Common').showModal('user-partners');
			},
			sidebarSearch : function(form)
			{
				var Common, prettyForm;

				self.searchErrors(null);
				Common = Import('Common');
				prettyForm = Common.serializeForm(form);

				if(!prettyForm.query)
				{
					return self.searchErrors('Search criteria is required');
				}
			}
		};

		return MasterVM;
	})();

	Export('MasterVM', MasterVM);
})();

