# jquery.githubprojects

A simple jQuery plugin for rendering a list of Github projects for a specified user.

## Installation

	<script src="/path/to/jquery.githubprojects.js"></script>

## Usage

Place a div with the ID __github-projects__ in your markup.

	<div id="github-projects"></div>

Call the plugin

	$('#github-projects').githubprojects({
		username: 'bjorn-aadnesgaard'
	});
## Notes

Github limits anonymous API requests to 60 per hour by IP. When the limit is reached, an error will display with the following markup and error message:

	<div class="alert alert-error">API Rate Limit Exceeded for 0.0.0.0 (User IP)</div>

A future version will eliminate the request limit error by caching results.

## Rendered HTML Sample with Default Options

	<div class="project-github">
		<div class="item">
			<div class="title">
				<h4>
					<i class="icon"></i>
					<a href="https://github.com/bjorn-aadnesgaard/jquery.githubprojects">
						jquery.githubprojects
					</a>
				</h4>
			</div>
			<div class="description">
				Renders html markup with a list of Github projects for a specified user.
			</div>
			<a href="https://github.com/bjorn-aadnesgaard/jquery.githubprojects" class="btn">
				View Project
			</a>
		</div>
	</div>

## Options

### username (string)

The github account username.

	username: 'bjorn-aadnesgaard'

### sortBy (string)

Sort command for the returned projects. Supported commands are ___name___, ___watchers___.  
_The default value is **name**._

	sortBy: 'name'

### outerClass (string)

The outer element class name.  
_The default value is **project-github**._

	outerClass: 'project-github'

### itemClass (string)

The item element class name.  
_The default value is **item**._

	itemClass: 'item'

### renderIcon (boolean)

Renders the icon markup.  
_The default value is **true**._

	renderIcon: true

### iconClass (string)

The icon element class name.  
_The default value is **icon**._

	iconClass: 'icon'

### renderButton (boolean)

Renders the button markup.  
_The default value is **true**._

	renderButton: true

### buttonClass (string)

The button element class name.  
_The default value is **btn**._

	buttonClass: 'btn'

### descriptionLimit (integer)

Character limit for the description. Truncated text will display ___...___ suffix.  
_The default value is **100**._
	
	descriptionLimit: 100

### descriptionNoText (string)

Default description text if a project description is empty.   
_The default value is **No description available**._
	
	descriptionNoText : "No description available."

### equalHeight (boolean)

When true, each item will render with the height value set to that of the item with the greatest value. Set to true for consistent display when used in a column layout.  
_The default value is **false**._
	
	equalHeight: false

### equalHeightClass (string)

The class added to the item element when equalHeight is true.  
_The default value is **equal-height**._

	equalHeightClass: 'equal-height'

## Future

+ Add caching to prevent error message on request limit.
+ Improve markup output with custom wrapper tags.
+ Add samples.

## Thanks

The original source was found on Andrew Davey's blog at http://aboutcode.net/2010/11/11/list-github-projects-using-javascript.html.