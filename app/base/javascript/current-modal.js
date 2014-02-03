(function() 
{
	var CurrentModal = (function() 
	{
		var MasterVM = Import('MasterVM');
		
		var CurrentModal = function(data) 
		{
			this.init(data);
			this.set(data);

		};

		CurrentModal.prototype = 
		{
			init : function(data)
			{
				var modalName = MasterVM.currentModal();

				if(modalName && modalName !== data.modalName)
				{
					MasterVM[modalName]().destroy(true);
					MasterVM[modalName](null);
					MasterVM.currentModal(null);
				}
			},
			set : function(data)
			{
				MasterVM[data.modalName](data.modal);
				MasterVM.currentModal(data.modalName);
			}
		};

		return CurrentModal;
	})();

	Export('CurrentModal', CurrentModal);
})();

