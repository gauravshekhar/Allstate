(function() 
{
	var normalModules = {};
	var instanceModules = {};
	var instanceArray = ['Cache', 'Common', 'MasterVM', 'RouteConfig', 'Zendesk'];

	window.Import = function(stringName) 
	{
		if(normalModules[stringName])
		{
			return normalModules[stringName];
		}
		else if(instanceModules[stringName])
		{
			return instanceModules[stringName]();
		}
		else
		{
			console.log(arguments.callee.caller.toString());
			throw 'There was an error with your Javascript import. Could not find ' + stringName;
		}
	};

	window.Export = function(stringName, module)
	{
		if($.inArray(stringName, instanceArray) === -1)
		{
			normalModules[stringName] = module;
		}
		else
		{
			instanceModules[stringName] = module;
		}
	};
})();

