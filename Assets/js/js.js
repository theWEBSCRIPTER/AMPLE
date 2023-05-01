// [...$$('button'),...$$('li.menu_item'),...$$('input')].forEach(a=>{
// 	a.dataset.disabled = (a.getAttribute('disabled') !== null)
// 	a.setAttribute('disabled','true')
// })



(()=>{

})()



/*

function newProject() {
	window.open(location.href, '_blank')
}
var Project = {
	html: "<!DOCTYPE html>\n<html>\n<head>\n\t<title>Document</title>\n\t<meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n</head>\n<body>\n\t<h1>Cool Website</h1>\n</body>\n</html>",
	"css": "body{\n\tmargin: 0;\n}",
	js: "",
	htmlCursor: {
		ch: 1,
		line: 7
	},
	cssCursor: {
		ch: 1,
		line: 7
	},
	jsCursor: {
		ch: 0,
		line: 0
	}
}
var mainEditor = null;
var el = $('.expandable')

function c(e) {
	event.preventDefault()
	event.target.click()
}
var exp_btn = $('#exp_btn')
var find_btn = $('#find_btn')
show_explorer = function () {
	$$('.sidebar button').forEach(b => { b.classList.remove('active') })
	if (el.classList.contains('find')) {
		el.classList.add('active')
		exp_btn.classList.add('active')
	} else {
		el.classList.toggle('active')
	}
	el.classList.add('explorer')
	el.classList.remove('find')
	$('.view.files .libs').style.height = 'calc(100% - ' + $('.view.files .libs').offsetTop + 'px)'
	if($('.addbox').classList.contains('active')){toggleLibSearch()}
}
show_find = function () {
	$$('.sidebar button').forEach(b => { b.classList.remove('active') })
	if (el.classList.contains('explorer')) {
		el.classList.add('active')
		find_btn.classList.add('active')
	} else {
		el.classList.toggle('active')
	}
	el.classList.add('find')
	el.classList.remove('explorer')
}
function toggleLibSearch(){
	if($('.addbox').classList.contains('active')){
		$('.addbox').classList.remove('active')
		$('.libs ul.active_list').classList.add('active')
		$('#toggleLibSearch').innerHTML = "Add"
	}else{
		$('.addbox').classList.add('active')
		$('.libs ul.active_list').classList.remove('active')
		$('#toggleLibSearch').innerHTML = "Done"
	}
}




$$('.menu_item .menu_label').forEach(item => {
	item.addEventListener('click', () => {
		if (item.parentElement.childElementCount > 0) {
			item.parentElement.parentElement.classList.toggle('active')
		}
	});
});


var message_delay;
function message(text) {
	$$('.message').forEach((m) => { m.remove() })
	m = d.body.appendChild(d.createElement('div'))
	m.classList = 'message'
	m.innerHTML = text;

	clearTimeout(message_delay);
	message_delay = setTimeout(() => {
		$$('.message').forEach((m) => { m.remove() })
	}, 1000);

}


// Context Menu
sec = $('.code')
menu = $('.context_menu')
ch = $('.context_menu .ch')
sec.addEventListener('contextmenu', e => {
	menu.focus();
	const x = e.clientX
	const y = e.clientY
	$$('style').forEach(style => { style.remove() })
	style = d.body.appendChild(d.createElement('style')).textContent = '*{cursor:default !important;}'
	menu.classList = 'context_menu'
	setTimeout(() => {
		menu.classList = 'context_menu active'
	}, 50)
	menu.style.top = y + 'px'
	menu.style.left = x + 'px'
	if (window.innerWidth - x < 250) {
		menu.style.left = x - 250 + 'px'
		if (x - menu.offsetWidth < 250) {
			menu.style.left = window.innerWidth - 250 + 'px'
		}
	}
	if (window.innerHeight - y < 277) {
		menu.style.top = y - 277 + 'px'
		if (y < 277) {
			menu.style.top = window.innerHeight - 277 + 'px'
		}
	}
	sec.addEventListener('click', () => {
		menu.removeAttribute("style", '')
		menu.classList = 'context_menu';
		$$('style').forEach(style => { style.remove() })
	})
})
sec.addEventListener('contextmenu', e => {
	e.preventDefault()
});
$$('.context_menu li').forEach(li => {
	if (!li.classList.contains('par')) {
		li.addEventListener('click', () => {
			hidemenu();
			mainEditor.focus()
		});
	}
});


$('.openinnewtab').removeAttribute('disabled')
$('.openinnewtab').setAttribute('onclick', 'newTab()')
$('.openinnewtab').removeAttribute('class')
$$('ul.ch li').forEach(ch => {
	if (!ch.classList.contains('par') && ch.getAttribute('disabled') == null) {
		ch.addEventListener('click', () => {
			ch.parentElement.parentElement.classList.remove('active')
			$('#menu').classList.remove('active')
			if (ch.parentElement.parentElement.classList.contains('editor_menu')) {
				mainEditor.focus()
			}
		});
	} else {
		ch.onclick = ""
	}
});

$$('.menu_item').forEach(item => {
	item.addEventListener('mouseenter', () => {
		$$('.menu_item').forEach(nitem => { nitem.classList.remove('active') })
		item.classList.add('active')
	})
});

var s1 = Split(['.code_area', '.result_area'], {
	gutterSize: 5,
	sizes: [50, 50],
	minSize: [200, 200],
	dirction: "horizontal"
});

var TabEl = $('.tabs');
var sortable = new Sortable(TabEl, {
	animation: 150,
	onChoose: function (evt) {
		evt.item.click()
		$$('#ripple').forEach((ri) => { ri.remove() })
	},
	onChange: function () {
		tabs = $$('.tab')
		for (let i = 0; i < tabs.length; i++) {
			tabs[i].style = '--i:' + i
		}
	},
	onEnd: function () {
		//mainEditor.focus()
	},
});

//*====  Ripple  ====//
$$('button').forEach(r => {
	r.addEventListener('mousedown', (e) => {
		d.addEventListener('mouseup', remove)
		$$('#ripple').forEach((ri) => { ri.remove() })
		let ripple = d.createElement('span')
		ripple.id = 'ripple'
		ripple.style.left = `${e.offsetX - r.offsetWidth * 1.5}px`
		ripple.style.top = `${e.offsetY - r.offsetWidth * 1.5}px`
		ripple.style.width = `${r.offsetWidth * 3}px`
		ripple.style.height = `${r.offsetWidth * 3}px`
		r.appendChild(ripple)

		function hide() {
			ripple.style.opacity = '.5'
			ripple.style.animation = 'fadeOut .3s ease-out'
		}
		function remove() {
			hide();
			setTimeout(() => {
				ripple.remove()
			}, 300)
		}
	})
})

section = $('.code_area')
tabs = $('.tabs')
window.addEventListener('mousedown', e => {
	if (e.target != menu &&
		e.target.parentElement != menu) {
		hidemenu()
	}
})
hidemenu = () => {
	menu.removeAttribute("style", '')
	menu.classList = 'context_menu';
	$$('style').forEach(style => { style.remove() })
}

function newTab() {
	let nw = window.open('', '_blank')

	frame = nw.document;
	html = Project.html;
	css = Project.css;
	js = Project.js;
	style = frame.createElement('style')
	script = frame.createElement('script')
	style.textContent = `${css}`;
	script.textContent = `${js}`
	script.defer = ''

	frame.write(html)
	if (mainEditor.getValue().trim().length < 1 || frame.head == null || frame.body == null) {
		frame.write("<head></head><body></body>")
	}
	frame.head.appendChild(style)
	setTimeout(() => {
		frame.body.appendChild(script)
	}, 300)
}

var pi;
window.addEventListener('blur', () => {
	hidemenu()
	// $('.code').style = 'pointer-events: none !important'
	pi = setInterval(() => {
		// $('.code').style = 'pointer-events: none !important'
	}, 1000);

	// $('#menu').classList = ''
})

const ind = $('#indicator')
frameBox = $('.result_area')
var indDelay;
gutter = $('.gutter')
gutter.addEventListener('mousedown', () => {
	d.addEventListener('mousemove', move)
	d.addEventListener('mouseup', up)
	function move() {
		ind.innerHTML = frameBox.offsetWidth + 'px &times ' + frameBox.offsetHeight + 'px'
		ind.style.display = 'block'
		if(mainEditor)resizeEditors()
		clearTimeout(indDelay);
		indDelay = setTimeout(hideInd, 1000);
	}
	function up() {
		d.removeEventListener('mousemove', move)
		d.removeEventListener('mouseup', up)
		if(mainEditor)mainEditor.focus()
	}
});
function hideInd() {
	ind.style = ''
}
tabs = $$('.tab')
for (let i = 0; i < tabs.length; i++) {
	tabs[i].style = '--i:' + i
}
$('.setbtn').addEventListener('click', () => {
	$('.settings').classList.toggle('active')
})
function cmd(cmd) {
	if (CodeMirror.commands[cmd]) {
		CodeMirror.commands[cmd](mainEditor);
	} else {
		message(`No Command Found Named with ${cmd}`)
	}
	mainEditor.focus()
}
function find() {
	var text = mainEditor.getValue().replaceAll('<','&lt;').replaceAll('>','&gt;'),
	search = $('#findBox').value.replaceAll('<','&lt;').replaceAll('>','&gt;').trim(), result = [];
	if(!$('#find_case').checked){ search = search.toLowerCase()}
	$('.results .count').innerHTML = ""
	$$('.results .r').forEach(rs=>rs.remove())
	if(text.trim() === "" || search.trim() === ""){return}
	var lines = text.split('\n')
	for(let i = 0 ; i < lines.length; i++){
		var ln = lines[i]
		if(!$('#find_case').checked){ ln = lines[i].toLowerCase()}
		if(ln.includes(search)){
			var founds = ln.substr(ln.indexOf(search)).split(search).length;
			result.push([i+1,founds-1])
		}
	}
	if(result.length > 0){
		$('.results .count').innerHTML = result.length +" Results found"
		result.forEach(r=>{
			var col = ""
			if(r[1] > 1){col = r[1]+" Results"}
			else{
				col = "Col "+lines[r[0]-1].indexOf(search)
				if(!$('#find_case').checked){
					col = "Col "+lines[r[0]-1].toLowerCase().indexOf(search.toLowerCase())
				}
			}
			$('.results').innerHTML += 
			`<div class="r" onclick="goToCursor(this.dataset.line,0)" data-line="${r[0]-1}">
				<div class="title">Line ${r[0]}, ${col}</div>
				<div class="res">
					<p>${$('#find_case').checked ? lines[r[0]-1].replaceAll(search,'<span class="found">'+search+'</span>') : lines[r[0]-1].toLowerCase().replaceAll(search.toLowerCase(),'<span class="found">'+search.toLowerCase()+'</span>')}</p>
				</div>
			</div>`
		})
	}else{
		$('.results .count').innerHTML = "No Results found"
	}
};

function saveProjectAs() {
	console.log('Save As Coming Soon! Stay Tuned.')
}
function exportAs() {
	message('Exporting')
	des = `<!--\nSaved from AMPLE\n${Date().toLocaleString()}\n-->`;
	html = Project.html;
	css = `<style>\n${Project.css}\n</style>`;
	js = `<script>\n ${Project.js}\n</script>`;

	var blob = new Blob([`\n${des}\n\n${html}\n\n${css}\n\n${js}`], { type: "text/html;charset=utf-8" });
	saveAs(blob, "index.html");
};


$('.code_area').addEventListener('focus', () => {
	$$('.editor_menu').forEach(m => m.style.display = 'flex')
	$$('.result_menu').forEach(m => m.style.display = 'none')
})
$('.code_area').addEventListener('click', () => {
	$$('.editor_menu').forEach(m => m.style.display = 'flex')
	$$('.result_menu').forEach(m => m.style.display = 'none')
})
window.addEventListener('beforeunload', () => {
	$('iframe').remove();
	if (!is_saved) {
		// event.returnValue = ""
	}
})
document.addEventListener('DOMContentLoaded', () => {
	var is_server = (window.location.host !== "")
	is_server ? storage = localStorage : storage = sessionStorage
	if (storage.getItem('Project') == null) {
		$('#restore').setAttribute('disabled', '')
	}
	is_saved = true
	// $$('.tab').forEach(tab => { tab.title = 'Ctrl+Space to Toggle' });
	$('.loader').remove()
	d.body.style = ''


	var scripts = [
		'cm/lib/codemirror.js',
		'js/colorpicker/codemirror-colorpicker.js',
		'js/codemirror-plugin-master/example/emmet.js',
		'cm/mode/xml/xml.js',
		'cm/mode/htmlmixed/htmlmixed.js',
		'cm/mode/css/css.js',
		'cm/mode/javascript/javascript.js',
		'cm/addon/display/fullscreen.js',
		'cm/keymap/sublime.js',
		'cm/addon/fold/foldcode.js',
		'cm/addon/fold/foldgutter.js',
		'cm/addon/fold/brace-fold.js',
		'cm/addon/fold/xml-fold.js',
		'cm/addon/fold/indent-fold.js',
		'cm/addon/fold/markdown-fold.js',
		'cm/addon/fold/comment-fold.js',
		'cm/addon/selection/active-line.js',
		'cm/addon/edit/closebrackets.js',
		'cm/addon/edit/closetag.js',
		'cm/addon/edit/matchtags.js',
		'cm/addon/edit/matchbrackets.js',
		'cm/addon/search/match-highlighter.js',
		'cm/addon/scroll/annotatescrollbar.js',
		'cm/addon/scroll/simplescrollbars.js',
		'cm/addon/search/matchesonscrollbar.js',
		'cm/addon/dialog/dialog.js',
		'cm/addon/search/jump-to-line.js',
		'cm/addon/search/search.js',
		'cm/addon/search/searchcursor.js',
		'cm/addon/comment/comment.js',
		'cm/addon/hint/show-hint.js',
		'cm/addon/hint/anyword-hint.js',
		'cm/addon/hint/xml-hint.js',
		'cm/addon/hint/html-hint.js',
		'cm/addon/hint/css-hint.js',
		'cm/addon/hint/javascript-hint.js',
		'js/js.cookie.min.js',
		'js/beautify-html.min.js',
		'js/beautify-css.min.js',
		'js/beautify.min.js',
		'js/devtools.js',
		'js/main.js'
	]
	var ind = 0;
	(function next() {
		let sc = document.createElement('script')
		sc.src = 'Assets/' + scripts[ind]
		document.body.appendChild(sc);
		sc.addEventListener('load', function () {
			sc.remove();
			if (scripts[ind + 1]) {
				if (scripts[ind].substr(0, 5) === "js/be" || scripts[ind].substr(0, 5) === "js/ma") {
					$('.code_area .loader p').innerHTML = "Initializing...\nPlease Wait";
				} else {
					$('.code_area .loader p').innerHTML = "Loading Extensions...\nPlease Wait";
				}
				ind++; next();
			} else {
				finish()
			}
		})
	})()
	function finish() {
		$('.loader').remove();
		setTimeout(() => {
			mainEditor.focus();
		}, 100)
	}
})

// window.addEventListener('resize',menuOverlap)
function menuOverlap() {
	var m = $('.menubar .heading')
	var rect = m.getBoundingClientRect();
	// $$('.menu_item').forEach(m=>{m.style="display: flex;"})
	var last = $$('.menu_item[style="display: flex;"]')[$$('.menu_item[style="display: flex;"]').length - 1]
	if (last) {
		var last_rect = last.getBoundingClientRect();
		console.log(rect.left, last_rect.right)
		if (rect.left < last_rect.right) {
			last.style.display = "none"
			// $('#hidden_menu ul.ch').appendChild(last)
		}
	}
}

function openProject() {
	var inp = document.createElement('input')
	inp.type = "file"
	inp.click();
	inp.addEventListener('input', function () {
		var f = inp.files[0]
		// console.log(f.type)
		var html = "", css = [], js = []

		let reader = new FileReader();
		reader.readAsText(f)
		reader.onerror = function () {
			console.error(reader.error);
		};

		reader.onload = function () {
			$$('.copybox button').forEach(b=>b.style.display = "")
			if (f.type == "text/html" || f.type == "text/plain") {
				html = reader.result;
				if (html.includes('<script>')) {
					var scripts = html.split("<script>")
					scripts.forEach(s => {
						if (s.includes("</script>")) {
							var scr = s.substr(0, s.indexOf("</script>"))
							js.push(scr)
							html = html.replace("<\script>"+scr+"<\/script>","")
						}
					})
				}
				if (html.includes('<style>')) {
					var styles = html.split("<style>")
					styles.forEach(s => {
						if (s.includes("</style>")) {
							var sty = s.substr(0, s.indexOf("</style>"))
							css.push(sty)
							html = html.replace("<\style>"+sty+"<\/style>","")
						}
					})
				}
				// htmlCode += html;
				css = css.join("\n\n")
				js = js.join("\n\n")
				if(confirm("Current Code will be Replaced with file contents, Continue?")){
					htmlCode = html;
					cssCode = css;
					jsCode = js;
				}else{
					if(html.length > 0){
						$('.copybox').style.display = "block"
						if(css.trim().length == 0){
							$('#copy_css_btn').style.display = "none"
						}
						if(js.trim().length == 0){
							$('#copy_js_btn').style.display = "none"
						}
						copyCode = {
							"html": html,
							"js": css,
							"js": js
						}
					}
				}
			} else if (f.type == "text/css") {
				css = reader.result;
				if(confirm("Current CSS will be Replaced with file contents, Continue?")){
					cssCode = css;
				}else{
					$('.copybox').style.display = "block"
					$('#copy_html_btn').style.display = "none"
					$('#copy_js_btn').style.display = "none"
					copyCode = {
						"html": html,
						"css": css,
						"js": js
					}
				}
			} else if (f.type == "text/javascript") {
				js = reader.result;
				if(confirm("Current JS will be Replaced with file contents, Continue?")){
					jsCode = js;
				}else{
					$('.copybox').style.display = "block"
					$('#copy_html_btn').style.display = "none"
					$('#copy_css_btn').style.display = "none"
					copyCode = {
						"html": html,
						"css": css,
						"js": js
					}
				}
			} else {
				alert('Please Select HTML/CSS/JS/PlainText File And try Again!')
				return
			}
			if(mainEditor.options.mode.name == "htmlmixed"){
				if(html.trim().length > 0){
					mainEditor.setValue(html)
				}
			}
			else if(mainEditor.options.mode == "text/css"){
				if(html.trim().length > 0){
					mainEditor.setValue(css)
				}
			}
			else if(mainEditor.options.mode == "text/javascript"){
				if(html.trim().length > 0){
					mainEditor.setValue(js)
				}
			}
			
			// console.log(html,css,js)
		};
	})
}
function copy_code(type){
	console.log(type)
	if(typeof copyCode !== "undefined"){
		var code = ""; 
		if(type == "HTML"){
			code = copyCode.html;
		}else if(type == "CSS"){
			code = copyCode.css;
		}else if(type == "JS"){
			code = copyCode.js;
		}else{
			return ""
		}
		var tx = document.createElement('textarea')
		tx.value = code;
		tx.style = "position:fixed;opacity:0"
		document.body.appendChild(tx)
		tx.select();
		document.execCommand("Copy",false,null)
		tx.remove();
		message('Copied')
		
	}
}
function closeCopy(){
	copyCode = undefined;
	$('.copybox').style.display = ""
}
*/