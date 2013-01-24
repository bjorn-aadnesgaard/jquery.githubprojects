// https://github.com/bjorn-aadnesgaard/jquery.githubprojects
// Original source code from http://aboutcode.net/2010/11/11/list-github-projects-using-javascript.html
$.fn.githubprojects = function (options, callback) {
	getGitHubUser = function (username, callback) {
		$.getJSON("https://api.github.com/users/" + username + "/repos?callback=?", callback);
	}

	var settings = $.extend({
		username: '',
		sortBy: 'name',
		outerClass: 'project-github',
		itemClass: 'item',
		renderIcon: true,
		iconClass: 'icon', //
		renderButton: true,
		buttonClass: 'btn',
		descriptionLimit: 100,
		descriptionNoText: "No description available.",
		equalHeight: false,
		equalHeightClass: 'equal-height'
	}, options);

	this.html('<div class="spin">Querying GitHub for repositories...</div>');

	var target = this;
	getGitHubUser(settings.username, function (response) {
		var repos = response.data;

		//Check if request limit reached
		switch (response.meta.status) {
			case 403:
				target.html('<div class="alert alert-error">' + response.data.message + '</div>');

				break;
			default:
				sort(repos, settings.sortBy);
				var list = $('<div/>').addClass(settings.outerClass);
				$(repos).each(function () {
					if (!this.fork) {
						var desc = this.description.length > 0 ? this.description.substring(0, settings.descriptionLimit) : settings.descriptionNoText;

						list.append(
							'<div class="' + settings.itemClass + ((settings.equalHeight) ? " " + settings.equalHeightClass : "") + '">' +
								'<div class="title">' +
									'<h4>' +
										((settings.renderIcon) ? '<i class="' + settings.iconClass + '"></i>' : "") +
										'<a href="' + this.html_url + '">' + this.name + '</a>' +
									'</h4>' +
								'</div>' +
								'<div class="description">' +
									desc + ((this.description.length > desc.length) ? "..." : "") +
								'</div>' +
								((settings.renderButton) ? '<a href="' + this.html_url + '" class="' + settings.buttonClass + '">View Project</a>': "") +
							'</div>'
						);
					}
				});

				//Assign the html output
				target.html(list);

				if (settings.equalHeight) {
					//Ref http://stackoverflow.com/a/13227114/612113
					//Set the max height of each span
					var maxHeight = 0;
					target.find('.' + settings.equalHeightClass).each(function () {
						if ($(this).height() > maxHeight) {
							maxHeight = $(this).height();
						}
					});
					target.find('.' + settings.equalHeightClass).height(maxHeight);

					if (typeof callback == 'function') { // make sure the callback is a function
						callback.call(this); // brings the scope to the callback
					}
				}

				break;
		}
	});

	sort = function (repos, sortBy) {
		repos.sort(function (a, b) {
			switch (sortBy) {
				case 'name':
					return b.name - a.name;
				case 'watchers':
					return b.watchers - a.watchers;
				default:
					return b.name - a.name;
			}
		});
	}
}