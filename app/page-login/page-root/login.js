(function()
{
	var LoginPage = (function()
	{
		var self;
		var Cache = Import('Cache');
		var Common = Import('Common');
		var MasterVM = Import('MasterVM');

		var LoginPage = function()
		{
			self = this;
			self.init();
		};

		LoginPage.prototype = 
		{
			init : function()
			{
				self.initKnockout();
				Common.setCurrentPage(self, 'LoginPage');
			},
			destroy : function()
			{
				Common.destroyPage(self, 'LoginPage');
			},
			initKnockout : function()
			{
				self.message = ko.observable(null);
				self.errors = ko.observableArray([]);
				self.helpErrors = ko.observableArray([]);
			},
			authorizeLogin : 
			{
				call : function(form)
				{
					Common.clearErrorsAndMessages(self);
					self.formData = Common.serializeForm(form);

					self.requestData = Common.stringify(
					{
						username : self.formData.username,
						password : self.formData.password
					});

					if(self.formData.username && self.formData.password)
					{
						Common.showLoading();
						Common.POST(Common.formatUrl('login'), self.requestData, 'application/json', self.authorizeLogin.callback);
					}
					else
					{
						self.errors.push('Please enter a username and password.');
					}
				},
				callback : function(errors, response)
				{
					Common.hideLoading();
					
					if(errors)
					{
						$.each(errors, function()
						{
							self.errors.push(this);
						});
					}
					else
					{
						alert('Success');
					}
				}
			},
			sendEmail : 
			{
				call : function(form)
				{
					self.helpErrors([]);

					var requestData = {
						email : $(form).find('[name="email"]').val(),
						username : document.getElementById('request-username').checked,
						password : document.getElementById('request-password').checked
					};
		
					if(requestData.email && (requestData.username || requestData.password))
					{
						Common.showLoading();
						Common.POST(Common.formatUrl('forgot-details'), Common.stringify(requestData), 'application/json', self.sendEmail.callback);
					}
					else
					{
						self.helpErrors.push('Select a radio button and enter an email.');
					}
				},
				callback : function(errors, response)
				{
					Common.hideLoading();

					if(errors)
					{
						errors = JSON.parse(errors);

						$.each(errors, function()
						{
							self.helpErrors.push(this);
						});
					}
					else
					{
						alert('Success');
					}
				}
			},
			toggleHelpModule : function(data, event)
			{
				var $wrapper = $('.more-wrapper');

				if($wrapper.hasClass('hide'))
				{
					$wrapper.removeClass('hide');
					$wrapper.animate({top:20}, 500);
				}
				else
				{
					$wrapper.animate({top:-172}, 500, function()
					{
						$wrapper.addClass('hide');
					});
				}
			}
		};

		return LoginPage;
	})();

	Export('LoginPage', LoginPage);
})();