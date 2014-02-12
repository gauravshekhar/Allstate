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
			displayMoreInfo : function(data, event)
			{
				var $container, $triangle;

				$triangle = $('#triangle-' + data.id);
				$container = $('#more-info-' + data.id);
			
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

