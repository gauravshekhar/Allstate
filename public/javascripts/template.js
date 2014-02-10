module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<!-- ko if: errors().length > 0--><div class="messages err"><ul data-bind="foreach: errors" class="errors"><li data-bind="text:$data"></li></ul></div><!-- /ko-->');
}
return buf.join("");
};module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div id="loading" class="hide"><img src="images/ajax-loader.gif"/></div><div id="modal-overlay"></div>');
}
return buf.join("");
};module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<!DOCTYPE html><html lang="en"><head><title>AllState</title><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><link rel="stylesheet" href="stylesheets/app.css" type="text/css"><link rel="shortcut icon" href="images/favicon.ico" type="image/x-icon"></head><body><div id="main-content" class="hide"><div id="header"><div class="logo-wrapper"><img src="images/logo.png"><div class="logo-title">Online Reference System </div></div><div class="right"><ul><li><a href="javascript:void(0)">Home</a></li><li>·</li><li><a href="javascript:void(0)">Announcements</a></li><li>·</li><li><a href="javascript:void(0)">Provider Lookup</a></li><li>·</li><li><a href="javascript:void(0)">Help</a></li></ul><div class="welcome">Welcome to the Allstate Roadside Services, Online Reference System (ORS)</div></div><div class="clear"></div></div><div id="page-content"><!-- ko if: currentPage && currentPage() !== \'LoginPage\'--><div id="sidebar"></div><!-- /ko--><!-- ko if: currentPage() === \'LoginPage\'--><!-- ko with: LoginPage--><div id="login-page" class="page"><div class="left"><div class="login-wrapper"><div class="wrapper"><form data-bind="submit:authorizeLogin.call"><!-- ko if: errors && errors().length > 0--><div class="messages err"><ul data-bind="foreach:errors"><li data-bind="text:$data"></li></ul></div><!-- /ko--><table><tbody><tr><td><label for="username">Username:</label></td><td><div><input id="username" name="username" type="text"></div></td></tr><tr><td><label for="password">Password:</label></td><td><div><input id="password" name="password" type="password"></div></td></tr><tr><td><a href="javascript:void(0)" data-bind="click:toggleHelpModule">Need Help?</a></td><td><button id="login-button" type="submit" class="btn-submit">Login</button><div class="clear"></div></td></tr></tbody></table></form></div></div><div class="more-wrapper hide"><div class="wrapper"><form data-bind="submit:sendEmail.call"><!-- ko if: helpErrors && helpErrors().length > 0--><div class="messages err"><ul data-bind="foreach:helpErrors"><li data-bind="text:$data"></li></ul></div><!-- /ko--><table><tbody><tr><td><label>Forgot:</label></td><td> <fieldset><input type="radio" id="request-username" name="type" value="username"><label class="radio-label">Username</label><input type="radio" id="request-password" name="type" value="password"><label class="radio-label">Password</label></fieldset></td></tr><tr><td><label for="email">Email:</label></td><td><div><input id="email" name="email" type="text"></div></td></tr><tr><td colspan="2"><button type="submit" class="btn-submit">Send Email</button><div class="clear"></div></td></tr></tbody></table></form></div></div></div><div class="divider"></div><div class="right"><img src="images/home.png"><div class="mission"><div class="title">Our Company</div><div>Allstate Roadside Services emerged from the acquisition by Allstate Corporation of the Partnership Marketing Group (PMG) in 2008, integrating them with Allstate Motor Club, one of the nation’s top motor clubs with 50 years of roadside expertise. </div></div><div class="mission"><div class="title">Our People</div><div>The Allstate Roadside Services commitment is supported by more than 2000 professionals. We attract the best and brightest in the roadside arena through our industry-focused training methodologies, opportunities for advancement, and personal recognition programs. </div></div><div class="mission"><div class="title">Our Partners</div><div>Our partnership focus helps us create customized solutions for numerous corporate clients with tens of millions of customers. We offer our partners innovative ways to build brand equity and increase customer loyalty through our differentiated service levels and exclusive program options. We proudly serve leading companies across a broad spectrum of industries, including vehicle manufacturers (OEMs), fleet and vehicle rental corporations, mobile/GPS providers, insurance companies, association and affinity groups, auto clubs, and credit card providers. </div></div></div><div class="clear"></div></div><!-- /ko--><!-- /ko--><!-- ko if: currentPage() === \'DashboardPage\'--><!-- ko with: DashboardPage--><!-- ko if: userPartners().length > 0--><div id="dashboard-page" class="page"></div><!-- /ko--><!-- /ko--><!-- /ko--></div><div id="modal-content"></div></div><div id="overlays"><div id="loading" class="hide"><img src="images/ajax-loader.gif"></div><div id="modal-overlay"></div></div><div id="scripts"><script src="javascripts/vendor.js"></script><script src="javascripts/app.js"></script></div></body></html>');
}
return buf.join("");
};module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="logo-wrapper"><img src="images/logo.png"/><div class="addon">Roadside Services</div><div class="logo-title">Online Reference System </div></div><div class="right"><ul><li><a href="javascript:void(0)">Home</a></li><li>·</li><li><a href="javascript:void(0)">Announcements</a></li><li>·</li><li><a href="javascript:void(0)">Provider Lookup</a></li><li>·</li><li><a href="javascript:void(0)">Help</a></li></ul><div class="welcome">Welcome to the Allstate Roadside Services, Online Reference System (ORS)</div></div><div class="clear"></div>');
}
return buf.join("");
};module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<!-- ko if: currentPage && currentPage() !== \'LoginPage\'--><div id="sidebar"></div><!-- /ko-->');
}
return buf.join("");
};module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<!-- ko if: currentModal() === \'UserPartnersModal\'--><!-- ko with: $root.UserPartnersModal--><div id="user-partners" role="dialog" aria-labelledby="dialog-title" class="modal"><a data-bind="click:destroyIconClick" class="close">Close</a><h1 id="dialog-title">Add Default Partners</h1><form data-bind="submit:submitPartners.call"><!-- ko if: errors().length > 0--><div class="messages err"><ul data-bind="foreach: errors" class="errors"><li data-bind="text:$data"></li></ul></div><!-- /ko--><div class="text-wrapper"><div>Please select up to 5 partners from the sections below. These selections will be added to your homepage for easy acces and to narrow the focus of your workflow.</div><div>At anytime you can change the partners by checking/unchecking the selctions again from the link labeled "My Settings" from the top right of the ORS website.</div></div><div class="radio-wrapper"><div class="title">Select <span class="strong">one </span><span>to </span><span class="strong">five </span><span>partners</span></div><div data-bind="foreach:allPartners" class="container"><div class="each"><input data-bind="click:$parent.checkboxClicked, attr:{id:partnerName}" type="checkbox"/><label data-bind="text:partnerName, attr:{for:partnerName}"></label></div></div><div class="clear"></div></div><div class="submit-wrapper"><button type="submit" class="btn-submit">Add Partners</button><div class="clear"></div></div></form></div><!-- /ko--><!-- /ko-->');
}
return buf.join("");
};module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<!-- ko if: currentPage() === \'DashboardPage\'--><!-- ko with: DashboardPage--><!-- ko if: userPartners().length > 0--><div id="dashboard-page" class="page"><div>FUCK FUCK FUCK</div></div><!-- /ko--><!-- /ko--><!-- /ko-->');
}
return buf.join("");
};module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
}
return buf.join("");
};module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<!-- ko if: currentPage() === \'LoginPage\'--><!-- ko with: LoginPage--><div id="login-page" class="page"><div class="left"><div class="login-wrapper"><div class="wrapper"><form data-bind="submit:authorizeLogin.call"><!-- ko if: errors && errors().length > 0--><div class="messages err"><ul data-bind="foreach:errors"><li data-bind="text:$data"></li></ul></div><!-- /ko--><table><tbody><tr><td><label for="username">Username:</label></td><td><div><input id="username" name="username" type="text"/></div></td></tr><tr><td><label for="password">Password:</label></td><td><div><input id="password" name="password" type="password"/></div></td></tr><tr><td><a href="javascript:void(0)" data-bind="click:toggleHelpModule">Need Help?</a></td><td><button id="login-button" type="submit" class="btn-submit">Login</button><div class="clear"></div></td></tr></tbody></table></form></div></div><div class="more-wrapper hide"><div class="wrapper"><form data-bind="submit:sendEmail.call"><!-- ko if: helpErrors && helpErrors().length > 0--><div class="messages err"><ul data-bind="foreach:helpErrors"><li data-bind="text:$data"></li></ul></div><!-- /ko--><table><tbody><tr><td><label>Forgot:</label></td><td> <fieldset><input type="radio" id="request-username" name="type" value="username"/><label class="radio-label">Username</label><input type="radio" id="request-password" name="type" value="password"/><label class="radio-label">Password</label></fieldset></td></tr><tr><td><label for="email">Email:</label></td><td><div><input id="email" name="email" type="text"/></div></td></tr><tr><td colspan="2"><button type="submit" class="btn-submit">Send Email</button><div class="clear"></div></td></tr></tbody></table></form></div></div></div><div class="divider"></div><div class="right"><img src="images/home.png"/><div class="mission"><div class="title">Our Company</div><div>Allstate Roadside Services emerged from the acquisition by Allstate Corporation of the Partnership Marketing Group (PMG) in 2008, integrating them with Allstate Motor Club, one of the nation’s top motor clubs with 50 years of roadside expertise. </div></div><div class="mission"><div class="title">Our People</div><div>The Allstate Roadside Services commitment is supported by more than 2000 professionals. We attract the best and brightest in the roadside arena through our industry-focused training methodologies, opportunities for advancement, and personal recognition programs. </div></div><div class="mission"><div class="title">Our Partners</div><div>Our partnership focus helps us create customized solutions for numerous corporate clients with tens of millions of customers. We offer our partners innovative ways to build brand equity and increase customer loyalty through our differentiated service levels and exclusive program options. We proudly serve leading companies across a broad spectrum of industries, including vehicle manufacturers (OEMs), fleet and vehicle rental corporations, mobile/GPS providers, insurance companies, association and affinity groups, auto clubs, and credit card providers. </div></div></div><div class="clear"></div></div><!-- /ko--><!-- /ko-->');
}
return buf.join("");
};