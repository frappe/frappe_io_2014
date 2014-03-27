# Building Client and Adding Assets

To add publicly accessible files (javascript, CSS, images, audio etc) for your web app, put them in the `public` folder of the repository. For example:

[https://github.com/frappe/website-chat/tree/master/website_chat/public](https://github.com/frappe/website-chat/tree/master/website_chat/public)

When you build the app using `frappe --build`, the public folder will be symlinked to the `assets` folder of your sites and be accessible via `/assets/website_chat/` for all the sites in your bench.

You can also minify and concatenate multiple JS and CSS files by adding a `build.json` file in the public folder.

Example: [https://github.com/frappe/erpnext/blob/develop/erpnext/public/build.json](https://github.com/frappe/erpnext/blob/develop/erpnext/public/build.json)

Note: To keep building continuously while developing, use `frappe --watch`