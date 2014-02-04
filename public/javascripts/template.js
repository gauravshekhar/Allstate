module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
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
buf.push('<!DOCTYPE html><html lang="en"><head><title>AllState</title><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><link rel="stylesheet" href="stylesheets/app.css" type="text/css"><link rel="shortcut icon" href="images/favicon.ico" type="image/x-icon"></head><body><div id="main-content" class="hide"><div id="header"><div class="logo-wrapper"><img src="images/logo.png"><div class="logo-title">Online Reference System </div></div><div class="right"><ul><li><a href="javascript:void(0)">Home</a></li><li>·</li><li><a href="javascript:void(0)">Announcements</a></li><li>·</li><li><a href="javascript:void(0)">Provider Lookup</a></li><li>·</li><li><a href="javascript:void(0)">Help</a></li></ul><div class="welcome">Welcome to the Allstate Roadside Services, Online Reference System (ORS)</div></div><div class="clear"></div></div><div id="page-content"><!-- ko if: currentPage && currentPage() !== \'LoginPage\'--><div id="sidebar"></div><!-- /ko--><!-- ko if: currentPage && currentPage() === \'LoginPage\'--><!-- ko with: LoginPage--><div id="login-page" class="page"><div class="left"><div class="login-wrapper"><div class="wrapper"><form data-bind="submit:authorizeLogin.call"><!-- ko if: errors && errors().length > 0--><div class="messages err"><ul data-bind="foreach:errors"><li data-bind="text:$data"></li></ul></div><!-- /ko--><table><tbody><tr><td><label for="username">Username:</label></td><td><div><input id="username" name="username" type="text"></div></td></tr><tr><td><label for="password">Password:</label></td><td><div><input id="password" name="password" type="password"></div></td></tr><tr><td><a href="javascript:void(0)" data-bind="click:toggleHelpModule">Need Help?</a></td><td><button id="login-button" type="submit" class="btn-submit">Login</button><div class="clear"></div></td></tr></tbody></table></form></div></div><div class="more-wrapper hide"><div class="wrapper"><form data-bind="submit:sendEmail.call"><!-- ko if: helpErrors && helpErrors().length > 0--><div class="messages err"><ul data-bind="foreach:helpErrors"><li data-bind="text:$data"></li></ul></div><!-- /ko--><table><tbody><tr><td><label>Forgot:</label></td><td> <fieldset><input type="radio" id="request-username" name="type" value="username"><label class="radio-label">Username</label><input type="radio" id="request-password" name="type" value="password"><label class="radio-label">Password</label></fieldset></td></tr><tr><td><label for="email">Email:</label></td><td><div><input id="email" name="email" type="text"></div></td></tr><tr><td colspan="2"><button type="submit" class="btn-submit">Send Email</button><div class="clear"></div></td></tr></tbody></table></form></div></div></div><div class="divider"></div><div class="right"><img src="images/home.png"><div class="mission"><div class="title">Our Purpose</div><div>We are the Good Hands: We help customers realize their hopes and dreams by providing the best products and services to protect them from life\'s uncertainties and prepare them for the future. </div></div><div class="mission"><div class="title">Our Strategic Vision</div><div>Deliver substantially more value than the competition by reinventing protection and retirement to improve customers\' lives. </div></div><div class="mission"><div class="title">Our Corporate Goal</div><div>Create long-term value by serving our stakeholders, taking appropriate risks and leveraging our capabilities and strategic assets.</div></div></div><div class="clear"></div></div><!-- /ko--><!-- /ko--></div></div><div id="overlays"><div id="loading" class="hide"><img src="images/ajax-loader.gif"></div><div id="modal-overlay"></div></div><div id="scripts"><script src="javascripts/vendor.js"></script><script src="javascripts/app.js"></script></div></body></html>');
}
return buf.join("");
};module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="logo-wrapper"><img src="images/logo.png"/><div class="logo-title">Online Reference System </div></div><div class="right"><ul><li><a href="javascript:void(0)">Home</a></li><li>·</li><li><a href="javascript:void(0)">Announcements</a></li><li>·</li><li><a href="javascript:void(0)">Provider Lookup</a></li><li>·</li><li><a href="javascript:void(0)">Help</a></li></ul><div class="welcome">Welcome to the Allstate Roadside Services, Online Reference System (ORS)</div></div><div class="clear"></div>');
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
}
return buf.join("");
};module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<!-- ko if: currentPage() === \'LoginPage\'--><!-- ko with: LoginPage--><div id="login-page" class="page"><div class="left"><div class="login-wrapper"><div class="wrapper"><form data-bind="submit:authorizeLogin.call"><!-- ko if: errors && errors().length > 0--><div class="messages err"><ul data-bind="foreach:errors"><li data-bind="text:$data"></li></ul></div><!-- /ko--><table><tbody><tr><td><label for="username">Username:</label></td><td><div><input id="username" name="username" type="text"/></div></td></tr><tr><td><label for="password">Password:</label></td><td><div><input id="password" name="password" type="password"/></div></td></tr><tr><td><a href="javascript:void(0)" data-bind="click:toggleHelpModule">Need Help?</a></td><td><button id="login-button" type="submit" class="btn-submit">Login</button><div class="clear"></div></td></tr></tbody></table></form></div></div><div class="more-wrapper hide"><div class="wrapper"><form data-bind="submit:sendEmail.call"><!-- ko if: helpErrors && helpErrors().length > 0--><div class="messages err"><ul data-bind="foreach:helpErrors"><li data-bind="text:$data"></li></ul></div><!-- /ko--><table><tbody><tr><td><label>Forgot:</label></td><td> <fieldset><input type="radio" id="request-username" name="type" value="username"/><label class="radio-label">Username</label><input type="radio" id="request-password" name="type" value="password"/><label class="radio-label">Password</label></fieldset></td></tr><tr><td><label for="email">Email:</label></td><td><div><input id="email" name="email" type="text"/></div></td></tr><tr><td colspan="2"><button type="submit" class="btn-submit">Send Email</button><div class="clear"></div></td></tr></tbody></table></form></div></div></div><div class="divider"></div><div class="right"><img src="images/home.png"/><div class="mission"><div class="title">Our Purpose</div><div>We are the Good Hands: We help customers realize their hopes and dreams by providing the best products and services to protect them from life\'s uncertainties and prepare them for the future. </div></div><div class="mission"><div class="title">Our Strategic Vision</div><div>Deliver substantially more value than the competition by reinventing protection and retirement to improve customers\' lives. </div></div><div class="mission"><div class="title">Our Corporate Goal</div><div>Create long-term value by serving our stakeholders, taking appropriate risks and leveraging our capabilities and strategic assets.</div></div></div><div class="clear"></div></div><!-- /ko--><!-- /ko-->');
}
return buf.join("");
};