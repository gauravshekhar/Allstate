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

(function()
{
	var RouteTable = 
	{
		'LoginPage'           : '#/login/',
		'DashboardPage'       : '#/dashboard/',
		'UserPartnersModal'   : '#/user-partners/',
		'Page'                : '#/page/(id/)'
	};

	Export('RouteTable', RouteTable);
})();

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

(function() 
{
	var Common = (function()
	{
		var self;
		var MasterVM = Import('MasterVM');
		var RouteTable = Import('RouteTable');
		var CurrentPage = Import('CurrentPage');
		var CurrentModal = Import('CurrentModal');
		
		var Common = function()
		{
			if(self)
			{
				return self;
			}
			else if(!(this instanceof Common))
			{
				return new Common();
			}

			self = this;
			self.init();
		};

		Common.prototype = 
		{
			init : function()
			{
				self.ajaxPool = [];
				self.activeCalls = 0;
				self.connection = true;
				self.connectionTimeout = null;
			},
			value : function(element, value, removeSpecialCharactersFlag)
			{
				if(value === null || value === undefined)
				{
					if($(element).attr('type') !== 'checkbox')
					{
						var val = $(element).val();

						if(val === $(element).attr('data-placeholder'))
						{
							val = '';
						}

						if(removeSpecialCharactersFlag)
						{
							val = self.removeSpecialCharacters(val);
						}

						return $.trim(val);
					}
					else
					{
						return element.checked;
					}
				}
				else
				{
					$(element).val(value);
					$(element).attr('value', value);
				}
			},
			formatUrl : function(addon)
			{
				return '/ors/' + addon;
			},
			formatUploadUrl : function(addon)
			{
				return '' + addon;
			},
			clearErrorsAndMessages : function(vm)
			{
				vm.message(null);
				vm.errors([]);
			},
			serializeForm : function(form)
			{
				var prettyForm = {};

				$(form).find('input,textarea,select').each(function()
				{
					prettyForm[$(this).attr('name')] = self.value(this);
				});

				return prettyForm;
			},
			setCurrentPage : function(viewModel, pageName)
			{
				return new CurrentPage(
				{
					page:viewModel, 
					pageName:pageName
				});
			},
			setCurrentModal : function(viewModel, modalName, node)
			{
				var currentModal, addFocus, $input, oneFadeDone;

				currentModal = new CurrentModal(
				{
					modal:viewModel, 
					modalName:modalName
				});

				addFocus = function() 
				{
					$input = $(node).find('input[type="text"]:first');
			
					if($input.length > 0)
					{
						self.focusEnd($input);
					}
				};

				oneFadeDone = false;

				if($('#modal-overlay').is(':visible') === false)
				{
					$(node + ',#modal-overlay,#logout-modal-overlay').fadeIn(300, function() 
					{
						if(oneFadeDone === false)
						{
							addFocus();
							oneFadeDone = true;
						}
					});
				}
				else
				{
					$(node + ',#modal-overlay,#logout-modal-overlay').show();
					addFocus();
				}

				return currentModal;
			},
			destroyPage : function(viewModel, pageName)
			{
				viewModel = null;
				MasterVM[pageName](null);
				MasterVM.currentPage(null);

				//console.log('page data killed');
			},
			destroyModal : function(viewModel, modalName, node, modal2modal)
			{
				viewModel = null;
				MasterVM[modalName](null);
				MasterVM.currentModal(null);				

				if(modal2modal === true)
				{
					$(node).hide();
				}
				else
				{
					$(node + ',#modal-overlay,#logout-modal-overlay').fadeOut(300);
				}

				//console.log('modal data killed');
			},
			showModal : function(urlHash, params)
			{
				$.each(RouteTable, function(key, value)
				{
					if('#/' + urlHash + '/' === value)
					{
						new (Import(key))(params);
						return false;
					}
				});
			},
			showLoading : function()
			{
				$('#loading-bg, #loading-img').show();
			},
			hideLoading : function()
			{
				$('#loading-bg, #loading-img').hide();
			},
			focusEnd : function($element)
			{
				var tempValue;

				$element.focus();
				tempValue = $element.val();
				$element.val('');
				$element.val(tempValue);
			},
			focusStart : function($element) 
			{
				return $element.each(function() 
				{
					if (this.setSelectionRange) 
					{
						this.focus();
						this.setSelectionRange(0, 0);
					} 
					else if (this.createTextRange) 
					{
						var range;

						range = this.createTextRange();
						range.collapse(true);
						range.moveEnd('character', 0);
						range.moveStart('character', 0);
						range.select();
					}
				});
			},
			setCookie : function(name, value, days)
			{
				var expires = '';

				if(days) 
				{
					var date = new Date();
					date.setTime(date.getTime() + (days*24*60*60*1000));
					expires = '; expires= '+date.toGMTString();
				} 

				document.cookie = name + '=' + value + expires + '; path=/';
			},
			getCookie : function(name)
			{
				var parts = document.cookie.split(name + '=');
				return (parts.length === 2) ? parts.pop().split(';').shift() : null;
			},
			deleteCookie : function(name)
			{
				document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
			},
			startConnectionTimer : function()
			{
				var img = new Image();

				var connectionTimer = function() 
				{
					self.connectionTimeout = setTimeout(function() {connectionCheck();}, 3000);
				};

				function connectionCheck()
				{
					img.onload = function() {self.hideConnectionError();};
					img.onerror = function() {self.connection = false;};
					img.src = 'https://datalinkevo.com/images/icons/refresh.png?cacheBreak=' + Math.floor((Math.random()*1000000)+1);		
					
					connectionTimer();
				}	

				$(window).blur(function()
				{
					clearTimeout(self.connectionTimeout);
				});

				$(window).focus(function()
				{
					clearTimeout(self.connectionTimeout);
					connectionTimer();
				});

				connectionTimer();	
			},
			hideConnectionError : function()
			{
				if(MasterVM.flashMessage.title() === 'No internet connection.')
				{
					$.each(self.ajaxPool, function() 
					{
						$.ajax(this);
					});

					$('#flash-message').hide();
					MasterVM.flashMessage.type(null);
					MasterVM.flashMessage.title(null);
					MasterVM.flashMessage.message(null);
					self.connection = true;
					self.ajaxPool = [];
				}
			},
			showConnectionError : function()
			{
				self.showLoading();
				self.showFlashMessage('error', 'No internet connection.', 'Unable to reach DataLink Evo. Please check your internet connection.', true);
			},
			validateConnection : function()
			{
				return self.connection;
			},
			isUserLoggedIn : function()
			{
				return (self.getCookie('DataLinkEvolution-Token')) ? true : false;
			},
			startActivityTimer : function()
			{
				if(self.isUserLoggedIn())
				{
					var activityFunction = function()
					{
						self.activityTimer = setTimeout(function() {self.logoutUser('modal');}, 500000);
					};

					$('body').on('click keypress', function() 
					{
						clearTimeout(self.activityTimer);
						activityFunction();
					});

					activityFunction();
				}
			},
			logoutUser : function(dispatch)
			{
				self.DELETE(self.formatUrl('login'), '', self.getTokenHeader(), 'application/json', self.logoutUserCallback, {dispatch:dispatch});
			},
			logoutUserCallback : function(errors, response, callbackData)
			{
				$('body').off('click keypress');
				clearTimeout(self.activityTimer);
				self.deleteCookie('DataLinkEvolution-Token');
				self.deleteCookie('DataLinkEvolution-Username');

				if(callbackData.dispatch && callbackData.dispatch === 'modal')
				{
					self.showModal('login-modal');
				}
				else
				{	
					self.setHash('login');
				}
			},
			showFlashMessage : function(type, title, message, persist)
			{
				MasterVM.flashMessage.type(type);
				MasterVM.flashMessage.title(title);
				MasterVM.flashMessage.message(message);
				
				$('#flash-message').fadeIn('slow', function() 
				{
					if(!persist)
					{
						$(this).delay(5000).fadeOut('slow', function() 
						{
							MasterVM.flashMessage.type(null);
							MasterVM.flashMessage.title(null);
							MasterVM.flashMessage.message(null);
						});
					}
				});
			},
			parseErrors : function(data)
			{
				var errors = [];

				if(data && data.responseText) 
				{
					var parsedErrors = JSON.parse(data.responseText);

					if(typeof parsedErrors.modelState !== 'undefined') 
					{
						for (var error in parsedErrors.modelState) 
						{
							for (var i = 0, il = parsedErrors.modelState[error].length; i < il; i++) 
							{
								errors.push(parsedErrors.modelState[error][i]);
							}
						}
					} 
					else 
					{
						errors.push(parsedErrors.message);
					}
				}
				else if(data.message)
				{
					errors.push(data.message);
				}

				return errors;
			},
			AJAX : function(location, method, data, contentType, callback, callbackData)
			{
				$.ajax(
				{
					url : location,
					method : method,
					contentType : contentType,
					type : 'json',
					data : data,
					dataType : 'json',
					complete : function(response)
					{
						var responseData = null;
						
						try
						{
							responseData = $.parseJSON(response.responseText);
						}
						catch(exception)
						{

						}

						if(response.status === 200)
						{
							callback(null, responseData || 'Success', callbackData);
						}
						else
						{
							callback(responseData || 'Error', null, callbackData);
						}

						self.paintPage();
					}
				});
			}, 
			POST : function(location, data, contentType, callback, callbackData)
			{
				self.AJAX(location, 'POST', data, contentType, callback, callbackData);
			},
			GET : function(location, data, contentType, callback, callbackData)
			{
				self.AJAX(location, 'GET', data, contentType, callback, callbackData);	
			},
			PUT : function(location, data, contentType, callback, callbackData)
			{
				self.AJAX(location, 'PUT', data, contentType, callback, callbackData);	
			},
			DELETE : function(location, data, contentType, callback, callbackData)
			{
				self.AJAX(location, 'DELETE', data, contentType, callback, callbackData);	
			},
			hidePage : function()
			{
				$('#main-content').addClass('hide');
			},
			initializeServiceCalls : function(number)
			{
				self.hidePage();
				self.showLoading();
				self.activeCalls = number;
			},
			paintPage : function()
			{
				if(self.activeCalls > 0)
				{
					self.activeCalls--;

					if(self.activeCalls <= 0)
					{
						$('#main-content').removeClass('hide');
						self.hideLoading();
					}
					else
					{
						self.showLoading();
					}	
				}
				else
				{
					$('#main-content').removeClass('hide');
					self.hideLoading();
				}
			},
			removeSpecialCharacters : function(text)
			{
				return text.replace(/[\\\(\)\[\]\*\$\+\%\^\.\|]/g, '');
			},
			removeWhiteSpace : function(text)
			{
				return $.trim(text);
			},
			sort : function(array, param)
			{
				var aNumSplit, bNumSplit, cmp1, cmp2, length;

				array.sort(function(a, b) 
				{
					a[param] = (a[param]) ? a[param] : "";
					b[param] = (b[param]) ? b[param] : "";

					aNumSplit = a[param].split(/(\d+)/);
					bNumSplit = b[param].split(/(\d+)/);
					length = Math.max(aNumSplit.length, bNumSplit.length);

					for(var i = 0; i < length; i++) 
					{
						if(aNumSplit[i] !== bNumSplit[i]) 
						{
							cmp1 = (isNaN(parseInt(aNumSplit[i], 10))) ? aNumSplit[i] : parseInt(aNumSplit[i], 10);
							cmp2 = (isNaN(parseInt(bNumSplit[i], 10))) ? bNumSplit[i] : parseInt(bNumSplit[i], 10);

							if(cmp1 === undefined || cmp2 === undefined)
							{
								return a.length - b.length;
							}
							else
							{
								if(typeof cmp1 === 'string')
								{
									cmp1 = cmp1.toLowerCase();
								}
								if(typeof cmp2 === 'string')
								{
									cmp2 = cmp2.toLowerCase();
								}

								return (cmp1 < cmp2) ? -1 : 1;
							}
						}
					}
					

					return 0;
				});

				return array;
			},
			prettyList : function(array, param, part1, part3)
			{
				var message = '';

				$.each(array, function(i) 
				{
					if(array[i+1])
					{
						message += (param) ? this[param] + ', ' : this + ', ';
					}
					else if(i === 0)
					{
						message += (param) ? this[param] : this;
					}
					else
					{
						message += (param) ? 'and ' + this[param] : 'and ' + this;
					}
				});

				if(part1)
				{
					message = part1 + ' ' + message;
				}
				
				if(part3)
				{
					if($.isArray(part3))
					{
						if(array.length === 1)
						{
							message += (' ' + part3[0]);
						}
						else
						{
							message += (' ' + part3[1]);
						}
					}
					else
					{
						message += (part3);
					}
				}

				return message;
			},
			prettySelect : function(array, event, resultId, overflowContainerId) 
			{
				if(array.length > 0)
				{
					var keyCode, $results, selectFirst, $next, $prev;
					
					$results = $('#' + resultId);

					selectFirst = function() 
					{
						$results.find('tr').removeClass('active');
						$results.find('tr:first').addClass('active');
					};
					
					if(event)
					{
						keyCode = parseInt(event.keyCode, 10);
					}
					else if($results.length > 0)
					{
						return selectFirst();
					}
					else
					{
						return false;
					}

					if(keyCode === 13)
					{
						$results.find('.active').click();
					}
					else if(keyCode !== 38 && keyCode !== 40)
					{
						selectFirst();
					}
					else if(keyCode === 40)
					{
						$next = $results.find('tr.active').next();
						
						if($next.length > 0)
						{
							$next.addClass('active');
							$results.find('tr.active:first').removeClass('active');
						}
						else
						{
							selectFirst();
						}
					}
					else if(keyCode === 38)
					{
						$prev = $results.find('tr.active').prev();

						if($prev.length > 0)
						{
							$prev.addClass('active');
							$results.find('tr.active:last').removeClass('active');
						}
						else
						{
							selectFirst();
						}	

						self.focusEnd($(event.target));						
					}

					if($('#' + overflowContainerId).length > 0)
					{
						self.checkOverflow($results.find('tr.active'), $('#' + overflowContainerId));
					}

					(function() 
					{
						$results.off('mouseenter');

						setTimeout(function() 
						{
							$results.on(
							{
								mouseenter : function()
								{
									$results.find('tr').removeClass('active');
									$(this).addClass('active');
								}
							}, 'tr');
						}, 200);
					})();
				}
			},
			prettyHighlight : function(value, wrapperId, innerTag)
			{
				var regex, $html, $oldText, $newText;

				$('#' + wrapperId).find(innerTag).each(function() 
				{
					$(this).find('span').contents().unwrap();
					$html = $(this).html();
					$oldText = $(this).text();
					$newText = $(this).text().replace(new RegExp(value, 'gi'), '<span class="blue">$&</span>');
					$(this).html($html.replace($oldText, $newText));
				});
			},
			stringify : function(object)
			{
				return JSON.stringify(object);
			},
			refreshPage : function()
			{
				document.location.reload(true);
			},
			setHash : function(hash)
			{
				window.location.hash = '#/' +hash+ '/';
			},
			validateHash : function(hash)
			{
				return (window.location.hash === '#/' +hash+ '/') ? true : false;
			},
			formatDate : function(dateString)
			{
				if(dateString)
				{
					var dateObject = new Date(dateString);
					return (dateObject.getMonth() + 1) + '/' + dateObject.getDate() + '/' + dateObject.getFullYear();
				}
				else
				{
					return null;
				}				
			},
			ctrlAClicked : function(input)
			{
				return (input.selectionEnd - input.selectionStart === input.value.length && input.value.length !== 0) ? true : false;
			},
			checkOverflow : function($element, $parent)
			{
				var scrollTop, parentHeight, elementHeight, offset, difference;

				scrollTop = $parent.scrollTop();
				parentHeight = $parent.height();
				elementHeight = $element.height();
				offset = $element.offset().top - $parent.offset().top;
				difference = parentHeight - offset;

				if(difference < elementHeight)
				{
					$parent.scrollTop(scrollTop - difference + elementHeight);
				}
				else if(difference > parentHeight)
				{
					$parent.scrollTop(scrollTop + offset);
				}
			},
			bindPlaceholders : function()
			{
				var addPlaceholder, keyUpEvent, clickEvent;

				addPlaceholder = function($element) 
				{
					$element.addClass('placeholder');
					$element.val($element.attr('data-placeholder'));
				};

				keyUpEvent = function(event)
				{
					var element = this;

					var keyUpTimer = setTimeout(function() 
					{
						var $element, placeholder;

						$element = $(element);
						placeholder = $element.attr('data-placeholder');

						if($element.val() === '')
						{
							addPlaceholder($element);
							self.focusStart($element);
						}
						else if($element.val() !== placeholder)
						{
							$element.removeClass('placeholder');
							$element.val($element.val().replace(placeholder, ''));
						}

						clearTimeout(keyUpTimer);
					}, 1);
				};

				clickEvent = function() 
				{
					var $element, placeholder;

					$element = $(this);
					placeholder = $element.attr('data-placeholder');

					if($element.val() === placeholder)
					{
						self.focusStart($element);
					}
				};

				self.waitForServiceCalls(function() 
				{
					$('[data-placeholder]').each(function() 
					{
						if($(this).val() === '')
						{
							$(this).off('keydown', keyUpEvent);
							$(this).off('click', clickEvent);

							$(this).on('keydown', keyUpEvent);
							$(this).on('click', clickEvent);

							addPlaceholder($(this));
							self.focusStart($(this));
						}
					});
				});
			},
			capitalize : function(string)
			{
				return string.replace(/\w\S*/g, function(txt)
				{	
					return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
				});
			},
			objToArray : function(object)
			{
				var array = [];

				$.each(object, function(key, value)
				{
					array.push(value);
				});

				return array;
			},
			arrayToSet : function(array)
			{
				var set = {};

				$.each(array, function()
				{
					set[this.id] = this;
				});

				return set;
			},
			removeDuplicates : function(masterArray, removalArray)
			{
				var set = self.arrayToSet(masterArray);

				$.each(removalArray, function()
				{
					delete set[this.id];
				});

				return self.objToArray(set);
			},
			uniqueArray : function(array)
			{
				var object = {};

				$.each(array, function()
				{
					object[this.id] = this;
				});

				return self.objToArray(object);
			},
			toggleTableButtons : function(data, element, groupObject)
			{
				if(element.target.checked === true)
				{
					groupObject[data.id] = data;
				}
				else
				{
					delete groupObject[data.id];
				}

				if($.isEmptyObject(groupObject))
				{
					$('#toolbar-btns').fadeOut(150);
				}
				else
				{
					$('#toolbar-btns').fadeIn(150);
				}
			},
			sortTable : function(sortMap, selectedTh, thWrapper, koObject)
			{
				$selectedTh = $(selectedTh);

				var removeSymbol = function(element)
				{
					return $.trim($(element).text().replace(/∨|∧/, ''));
				};

				if($selectedTh.text().match(/∧/) || !$selectedTh.hasClass('active'))
				{
					$(thWrapper).find('th').each(function()
					{
						$(this).text(removeSymbol(this));
						$(this).removeClass('active');
					});

					$label = $selectedTh.text();
					koObject(self.sort(koObject(), sortMap[$label]));
					$selectedTh.addClass('active');
					$selectedTh.text($label + ' ∨');
				}
				else
				{
					$label = removeSymbol(selectedTh);
					koObject(self.sort(koObject(), sortMap[$label]).reverse());
					$selectedTh.text($label + ' ∧');
				}
			},
			formatNum : function(value)
			{
				return value.replace(',', '');
			},
			determinePostLoginRoute : function()
			{
				var Cache, timeout, waitForServiceCall;

				timeout = null;
				Cache = Import('Cache');
				
				waitForServiceCall = function()
				{
					clearTimeout(timeout);

					if(Cache.user)
					{
						if(Cache.user.hasRole('AppersonAdmin'))
						{
							self.setHash('apperson-admin');
						}
						else
						{
							self.setHash('dashboard');
						}
					}
					else
					{
						timeout = setTimeout(function(){waitForServiceCall();}, 100);
					}
				};

				Cache._user.get(MasterVM);
				waitForServiceCall();
			},
			waitForServiceCalls : function(callback)
			{
				var timeout, waitFn;

				timeout = null;

				waitFn = function()
				{
					clearTimeout(timeout);

					if(self.activeCalls === 0)
					{
						callback();
					}
					else
					{
						timeout = setTimeout(function(){waitFn();}, 100);
					}
				};

				waitFn();
			},
			callRestServices : function(restArray)
			{
				if(restArray.length > 0)
				{
					var Cache = Import('Cache');
					
					self.initializeServiceCalls(restArray.length);

					$.each(restArray, function()
					{
						if(this.forceRefresh && this.forceRefresh === true)
						{
							Cache['_' + this.name].get(this.vm, this.forceRefresh);
						}
						else
						{
							Cache['_' + this.name].get(this.vm);
						}
					});
				}
			},
			validateExtension : function(fileName, desiredExtension)
			{
				var extension = fileName.split('.').pop();
				return (extension.toUpperCase() === desiredExtension.toUpperCase());
			}
		};

		return Common;
	})();

	Export('Common', Common);
}());

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
				var currentHash, checkHash, timeout;

				currentHash = window.location.hash;

				checkHash = function()
				{
					if(currentHash !== window.location.hash)
					{
						self.navigateToNewHash();
					}

					currentHash = window.location.hash;
					clearTimeout(timeout);
					timeout = setTimeout(checkHash, 100);
				};

				checkHash();
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

$(document).ready(function() 
{	
	Import('RouteConfig');
});

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
					self.selectedCheckboxes.push(data);
				}
				else
				{
					self.selectedCheckboxes($.grep(self.selectedCheckboxes(), function(value, index)
					{
						return (value === data) ? false : true;
					}));
				}

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

(function()
{
	var DashboardPage = (function()
	{
		var self;
		var Cache = Import('Cache');
		var Common = Import('Common');
		var MasterVM = Import('MasterVM');

		var DashboardPage = function()
		{
			self = this;
			self.init();
		};

		DashboardPage.prototype = 
		{
			init : function()
			{
				self.initKnockout();
				Common.setCurrentPage(self, 'DashboardPage');
				self.callRestServices();
				self.displayPartnersModal();
			},
			destroy : function()
			{
				Common.destroyPage(self, 'DashboardPage');
			},
			initKnockout : function()
			{
				self.currentPartner = ko.observable(null);
			},
			callRestServices : function()
			{
				Common.callRestServices(
				[
					{'name':'user', 'vm':MasterVM},
					{'name':'partners', 'vm':MasterVM},
					{'name':'announcements', 'vm':MasterVM}
				]);
			},
			moreInfo : function(data, event)
			{
				var $moreInfo = $('#dashboard-page').find('.more-info');
	
				if(self.currentPartner() !== null)
				{
					if(self.currentPartner() !== data)
					{
						$moreInfo.animate({left:-700}, 400, null, function()
						{
							self.currentPartner(data);
							$(this).css('left', 700);
							$moreInfo.animate({left:0}, 400);
						});	
					}
				}
				else
				{
					self.currentPartner(data);
					$moreInfo.animate({left:0}, 400);
				}
			},
			displayPartnersModal : function()
			{
				Common.waitForServiceCalls(function()
				{
					if(MasterVM.userPartners().length === 0)
					{
						Common.showModal('user-partners');
					}
				});
			}
		};

		return DashboardPage;
	})();

	Export('DashboardPage', DashboardPage);
})();(function()
{
	var FogotDetailsModal = (function(){});
	/*
	var FogotDetailsModal = (function()
	{
		var self;
		var Common = Import('Common');

		var ForgotDetailsModal = function()
		{
			self = this;
			self.init();
		};

		ForgotDetailsModal.prototype = 
		{
			init : function()
			{
				Common.setCurrentModal(self, 'ForgotDetailsModal', '#forgot-details');
				Common.paintPage();
			},
			destroy : function(modal2modal)
			{
				Common.destroyModal(self, 'ForgotDetailsModal', '#forgot-details', modal2modal);
			}
		};

		return ForgotDetailsModal;
	})();

	Export('ForgotDetailsModal', ForgotDetailsModal);
	*/
})();

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
				self.bindTheDOM();
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
			bindTheDOM : function()
			{
				$('#main-content').removeClass('hide');
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
					if(errors)
					{
						Common.hideLoading();

						$.each(errors, function()
						{
							self.errors.push(this);
						});
					}
					else
					{
						Common.setHash('dashboard');
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