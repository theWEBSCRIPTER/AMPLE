document.addEventListener("DOMContentLoaded", function () {

	// This function takse array of urls
	// And returns array of output
	async function loadFromURL(files, callback) {
		// console.log(files)
		try {
			await Promise.all(
				files.map(file =>
					fetch(file)
						.then(response => response.text())
						.then(f => {
							return callback(f); // Return the value from the callback function
						})
				)
			)//.then(() => console.log("OK"));
		} catch (error) {
			console.error(error);
		}
	}

	// This function takes css code as input
	// and adds them to the header element;
	function addCSS(css) {
		let cssEl = d.createElement("style")
		cssEl.innerHTML = css;
		document.head.appendChild(cssEl)
	}

	// This function takes js code as input
	// and adds them as script tags;
	function addJS(js) {
		let cssEl = d.createElement("script")
		cssEl.innerHTML = js;
		document.body.appendChild(cssEl)
	}


	// This function is responsible for loading required files,
	// and sending them to their related function
	async function main() {
		// Load App Stylesheets
		await loadFromURL(
			['/Assets/css/responsive.css'],
			(file) => {
				addCSS(file)
			}
		);

		// Load main html
		// load after css so displays properly
		await loadFromURL(
			['/Assets/Components/main.html'],
			(mainSection) => {
				document.body.innerHTML = mainSection
			}
		);
		$(".loader").remove()
		await loadFromURL(
			['/Assets/js/app.js'],
			(file) => {
				addJS(file)
			}
		);
		// Load Menu Bar
		await loadFromURL(
			['/Assets/Components/menu.html'],
			(sectionHTML) => {
				$(".menubar").innerHTML += sectionHTML
			}
		);
	}

	main();
	// Register a Service Worker
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('/service_worker.js').then((e) => {
			console.log('Service Worker registered successfully',e);
		}).catch(error => {
			console.error('Failed to register Service Worker:', error);
		});
	}


})