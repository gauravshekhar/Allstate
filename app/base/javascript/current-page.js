(function() 
{
	var CurrentPage = (function() 
	{
		var MasterVM = Import('MasterVM');

		var CurrentPage = function(data) 
		{
			this.init(data);
			this.set(data);
		};

		CurrentPage.prototype = 
		{
			init : function(data)
			{
				var pageName = MasterVM.currentPage();
				var modalName = MasterVM.currentModal();

				if(pageName && pageName !== data.pageName)
				{
					MasterVM[pageName]().destroy();
					MasterVM[pageName](null);
					MasterVM.currentPage(null);
				}

				if(MasterVM[modalName])
				{
					MasterVM[modalName]().destroy();
					MasterVM[modalName](null);
					MasterVM.currentModal(null);
				}
			},
			set : function(data)
			{
				MasterVM[data.pageName](data.page);
				MasterVM.currentPage(data.pageName);
			}
		};

		return CurrentPage;
	})();

	Export('CurrentPage', CurrentPage);
})();

