exports.config =
	plugins:
		static_jade:
			extension: ".static.jade"

	modules:
		wrapper : false
		definition : false

	files:
		javascripts:
			joinTo:
				'javascripts/app.js': /^app/
				'javascripts/vendor.js': /^vendor/

			order:
				before: [
					'vendor/scripts/stringify.js',
					'vendor/scripts/jquery.js',
					'vendor/scripts/knockout.js',

					'app/base/javascript/import-export.js',
					'app/base/javascript/route-table.js',
					'app/base/javascript/master-vm.js',
					'app/base/javascript/current-page.js',
					'app/base/javascript/current-modal.js',
					'app/base/javascript/common.js',
					'app/base/javascript/route-config.js',
					'app/base/javascript/cache.js'
				]

				after: [
					'app/global/base/javascript/main.js'
				]

		stylesheets:
			joinTo:
				'stylesheets/app.css': /^(app|vendor)/
				'test/stylesheets/test.css': /^test/
			order:
				before: []
				after: []

		templates:
			joinTo: 'javascripts/template.js'
