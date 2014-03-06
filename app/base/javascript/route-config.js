(function() 
{
	var RouteConfig = (function() 
	{
		var self;
		var Common = Import('Common');
		var RouteTable = Import('RouteTable');
		
		var RouteConfig = function()
		{
			if(self)
			{
				return self;
			}
			else if(!(this instanceof RouteConfig))
			{
				return new RouteConfig();
			}

			self = this;
			self.init();
		};

		RouteConfig.prototype = 
		{
			init : function()
			{
				self.initializeHashBinding();
				self.navigateToNewHash();
			},
			initializeHashBinding : function()
			{
				$(window).hashChange(function()
				{
					alert('changed');
					self.navigateToNewHash();
				});
			},
			navigateToNewHash : function()
			{
				var routeTable;

				routeTable = self.getRouteTable();
				self.validateHash(routeTable);
				Common.bindPlaceholders();
			},
			getRouteTable : function()
			{
				var routeTable = [];
				
				$.each(RouteTable, function(key, value) 
				{
					routeTable.push(
					{
						name : key,
						hash : value,
						regex : '^' + value.replace(/\(\w+\/\)/g, '([\\d|\\w]*/*)') + '$'
					});
				});

				return routeTable;
			},
			validateHash : function(routeTable)
			{
				var matchFound = false;

				$.each(routeTable, function() 
				{
					var matches = window.location.hash.match(this.regex);

					if(matches)
					{
						if(matches.length > 1)
						{
							matches.shift();

							$.each(matches, function(i, value) 
							{
								matches[i] = matches[i].replace('\/', '');
							});

							new (Import(this.name))(matches);
						}
						else
						{
							new (Import(this.name))();
						}

						matchFound = true;
					}
				});
				
				if(!matchFound)
				{
					// TODO: CREATE 404 PAGE 
					//console.log('THE REQUESTED PAGE IS INVALID');
					Common.setHash('login');
				}
			}
		};

		return RouteConfig;
	})();

	Export('RouteConfig', RouteConfig);
})();
