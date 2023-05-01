
var letters = ["'a'","'b'","'c'","'d'","'e'","'f'","'g'","'h'","'i'","'j'","'k'","'l'","'m'","'n'","'o'","'p'","'q'","'r'","'s'","'t'","'u'","'v'","'w'","'x'","'y'","'z'"]
for(let i = 0; i < 26; i++){ letters.push(letters[i].toUpperCase()) }

var mixedMode = {
	name: "htmlmixed",
	scriptTypes: [{
		matches: /\/x-handlebars-template|\/x-mustache/i,
		mode: null
	},
	{
		matches: /(text|application)\/(x-)?js(a|script)/i,
		mode: "javascript"
	}]
};


const defaultOptions = {
	lineNumbers: true,
	lineWrapping: true,
	theme: "monokai",
	styleActiveLine: true,
	autoCloseTags: true,
	autoCloseBrackets: true,
	matchBrackets: true,
	highlightSelectionMatches: { showToken: /\w/, annotateScrollbar: true },
	matchTags: { bothTags: true },
	indentUnit: 4,
	indentWithTabs: true,
	showCursorWhenSelecting: true,
	foldGutter: true,
	gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
	colorpicker: true,
	scrollbarStyle: "simple",
	emmet: {
		markTagPairs: true,
	},
	keyMap: "sublime",
}

let htmlOrig = '<!DOCTYPE html>\n<html>\n<head>\n\t<title>Document</title>\n\t<meta name="viewport" content="width=device-width,initial-scale=1">\n</head>\n<body>\n\t\n</body>\n</html>'
let cssOrig = "*{\n\tmargin: 0;\n\tpadding: 0;\n\tfont-family: 'Segoe UI', sans-serif;\n\tbox-sizing: border-box;\n}\nbody{\n\t\n}"
let jsOrig = ""
$('#editor').innerHTML = Project.html;
mainEditor = CodeMirror.fromTextArea(editor, defaultOptions);

let htmlhistory = {done: [], undone: []};
let csshistory = {done: [], undone: []};
let jshistory = {done: [], undone: []};



function showhtml() {
	if(mainEditor.options.mode == 'text/css'){
		csshistory = mainEditor.getHistory()
		Project.cssCursor = mainEditor.getCursor()
	}else if(mainEditor.options.mode == 'text/javascript'){
		jshistory = mainEditor.getHistory()
		Project.jsCursor = mainEditor.getCursor()
	}
	$$('.tab').forEach(btn => {
		btn.classList.remove('active')
	})
	$('.h_btn').classList.add('active')
	$('.code').classList = 'code html'
	mainEditor.setOption('mode', mixedMode)
	mainEditor.setOption('autoCloseTags', true)
	mainEditor.setOption('matchTags', { bothTags: true })
	var ext = {
		"Ctrl-J": "toMatchingTag",
		"'<'": completeAfter,
		"F11": function (cm) {
			full()
		},
		"Esc": function (cm) {
			exitFull()
		},
		'Tab': 'emmetExpandAbbreviation',
		'Esc': 'emmetResetAbbreviation',
		// 'Enter': ()=>{
		// 	$('.emmet-abbreviation-preview')?.offsetHeight>5 ?	cmd('emmetExpandAbbreviationAll') : cmd('newlineAndIndent')
		// },
		'Ctrl-Space': 'emmetCaptureAbbreviation',
		'Ctrl-.': 'emmetEnterAbbreviationMode',
		'Ctrl-W': 'emmetWrapWithAbbreviation',
		'Cmd-D': 'emmetBalance',
		'Ctrl-D': 'emmetBalanceInward',
		'Cmd-/': 'emmetToggleComment',
		'Cmd-Y': 'emmetEvaluateMath',
		// 'Ctrl-Left': 'emmetGoToPreviousEditPoint',
		// 'Ctrl-Right': 'emmetGoToNextEditPoint',
		'Ctrl-P': 'emmetGoToTagPair',
		'Ctrl-Up': 'emmetIncrementNumber1',
		'Alt-Up': 'emmetIncrementNumber01',
		'Ctrl-Alt-Up': 'emmetIncrementNumber10',
		'Ctrl-Down': 'emmetDecrementNumber1',
		'Alt-Down': 'emmetDecrementNumber01',
		'Ctrl-Alt-Down': 'emmetDecrementNumber10',
		'Ctrl-\'': 'emmetRemoveTag',
		'Shift-Ctrl-\'': 'emmetSplitJoinTag',
		'Shift-Ctrl-Right': 'emmetSelectNextItem',
		'Shift-Ctrl-Left': 'emmetSelectPreviousItem',
		'Shift-Ctrl-A': 'emmetWrapWithAbbreviation',
	}
	for(let i = 0; i < letters.length; i++){
		ext[letters[i]] = completeIfInTag
	}
	mainEditor.setOption('extraKeys', ext)
	mainEditor.setValue(Project.html)
	mainEditor.setHistory(htmlhistory)
	mainEditor.setCursor(Project.htmlCursor)
	mainEditor.focus()
	$$('.select').forEach(s => { s.classList = 'select' })
	$('#html_mode_select').classList = 'select active'
	setTimeout(() => {
		lineNumber()
	}, 0)
}

function showcss() {
	if(mainEditor.options.mode.name == 'htmlmixed'){
		htmlhistory = mainEditor.getHistory()
		Project.htmlCursor = mainEditor.getCursor()
	}else if(mainEditor.options.mode == 'text/javascript'){
		jshistory = mainEditor.getHistory()
		Project.jsCursor = mainEditor.getCursor()
	}
	$$('.tab').forEach(btn => {
		btn.classList.remove('active')
	})
	$('.c_btn').classList.add('active')
	$('.code').classList = 'code css'
	mainEditor.setOption('mode', 'text/css')
	var ext = {
		"F11": enterFull(),
		"Esc": exitFull(),
		'Tab': 'emmetExpandAbbreviation',
		'Esc': 'emmetResetAbbreviation',
		'Enter': ()=>{
			$('.emmet-abbreviation-preview')?.offsetHeight>5 ?	cmd('emmetExpandAbbreviationAll') : cmd('newlineAndIndent')
		},
		'Ctrl-Space': 'emmetCaptureAbbreviation',
		'Ctrl-.': 'emmetEnterAbbreviationMode',
		'Ctrl-W': 'emmetWrapWithAbbreviation',
		'Cmd-D': 'emmetBalance',
		'Ctrl-D': 'emmetBalanceInward',
		'Cmd-/': 'emmetToggleComment',
		'Cmd-Y': 'emmetEvaluateMath',
		// 'Ctrl-Left': 'emmetGoToPreviousEditPoint',
		// 'Ctrl-Right': 'emmetGoToNextEditPoint',
		'Ctrl-P': 'emmetGoToTagPair',
		'Ctrl-Up': 'emmetIncrementNumber1',
		'Alt-Up': 'emmetIncrementNumber01',
		'Ctrl-Alt-Up': 'emmetIncrementNumber10',
		'Ctrl-Down': 'emmetDecrementNumber1',
		'Alt-Down': 'emmetDecrementNumber01',
		'Ctrl-Alt-Down': 'emmetDecrementNumber10',
		'Ctrl-\'': 'emmetRemoveTag',
		'Shift-Ctrl-\'': 'emmetSplitJoinTag',
		'Shift-Ctrl-Right': 'emmetSelectNextItem',
		'Shift-Ctrl-Left': 'emmetSelectPreviousItem',
	}
	for(let i = 0; i < letters.length; i++){
		ext[letters[i]] = completeCSS
	}
	mainEditor.setOption('extraKeys', ext)
	mainEditor.setValue(Project.css)
	mainEditor.setHistory(csshistory)
	mainEditor.setCursor(Project.cssCursor)
	mainEditor.focus()
	$$('.select').forEach(s => { s.classList = 'select' })
	$('#css_mode_select').classList = 'select active'
	setTimeout(() => {
		lineNumber()
	}, 0)
}

function showjs() {
	if(mainEditor.options.mode.name == 'htmlmixed'){
		htmlhistory = mainEditor.getHistory()
		Project.htmlCursor = mainEditor.getCursor()
	}else if(mainEditor.options.mode == 'text/css'){
		csshistory = mainEditor.getHistory()
		Project.cssCursor = mainEditor.getCursor()
	}
	$$('.tab').forEach(btn => {
		btn.classList.remove('active')
	})
	$('.j_btn').classList.add('active')
	$('.code').classList = 'code js'
	mainEditor.setOption('mode', 'text/javascript')
	var ext = {
		"'a'": completeAfter,
		"F11": function (cm) {
			enterFull()
		},
		"Esc": function (cm) {
			exitFull()
		},
		'Cmd-/': 'emmetToggleComment',
		'Cmd-Y': 'emmetEvaluateMath',
		'Ctrl-Up': 'emmetIncrementNumber1',
		'Alt-Up': 'emmetIncrementNumber01',
		'Ctrl-Alt-Up': 'emmetIncrementNumber10',
		'Ctrl-Down': 'emmetDecrementNumber1',
		'Alt-Down': 'emmetDecrementNumber01',
		'Ctrl-Alt-Down': 'emmetDecrementNumber10',
	}
	for(let i = 0; i < letters.length; i++){
		ext[letters[i]] = completeAfter
	}
	mainEditor.setOption('extraKeys', ext)
	mainEditor.setValue(Project.js)
	mainEditor.setHistory(jshistory)
	mainEditor.setCursor(Project.jsCursor)
	mainEditor.focus()
	$$('.select').forEach(s => { s.classList = 'select' })
	$('#js_mode_select').classList = 'select active'
	setTimeout(() => {
		lineNumber()
	}, 0)
}


function completeAfter(cm, pred) {
	if (!pred || pred()) setTimeout(function () {
		if (!cm.state.completionActive)
			cm.showHint({ completeSingle: false });
	}, 100);
	showequal = true
	return CodeMirror.Pass;
}
function completeIfInTag(cm) {
	return completeAfter(cm, function () {
		var tok = cm.getTokenAt(cm.getCursor());
		if (tok.type == "string" && (!/['"]/.test(tok.string.charAt(tok.string.length - 1))
			|| tok.string.length == 1)) return false;
		var inner = CodeMirror.innerMode(cm.getMode(), tok.state).state;
		return inner.tagName
	});
}
function completeCSS(cm, pred) {
	if (!pred || pred()) setTimeout(function () {
		if (!cm.state.completionActive)
			cm.showHint({ completeSingle: true });
	}, 100);
	return CodeMirror.Pass;
}
function insertTextAtCursor(text) {
	var doc = mainEditor.getDoc();
	doc.replaceRange(text, doc.getCursor());
}
function moveCursor(editor,count) {
	if(!count || count == undefined){count = -1}
	var doc = editor.getDoc();
	var cursor = doc.getCursor();
	mainEditor.setCursor({ line: cursor.line, ch: cursor.ch + count})
}

function goToCursor(line,cur){
	var doc = mainEditor.getDoc();
	var cursor = doc.getCursor();
	if(!line){line = cursor.line}
	if(!cur){cur = cursor.ch}
	mainEditor.setCursor({ line: line, ch: cur})
	mainEditor.focus();
}

function paste() {
	navigator.clipboard.readText().then(data =>{
		insertTextAtCursor(data)
	})
}


function full() {
	if (mainEditor.getOption("fullScreen")) {
		exitFull();
	} else {
		enterFull();
	}
	mainEditor.focus()
}

function enterFull() {
	mainEditor.setOption("fullScreen", true);
	$('.code').classList.add('fullScreen')
	$('.code_area').classList.add('fullScreen')
	$('.footer').classList.add('full')
	resizeEditors()
}

function exitFull() {
	mainEditor.setOption("fullScreen", false);
	$('.code').classList.remove('fullScreen')
	$('.code_area').classList.remove('fullScreen')
	$('.footer').classList.remove('full')
	resizeEditors()
}
function fullResult() {
	exitFull();
	$('.result_area').classList.toggle('fullScreen')
}

function check_saved() {
	if (is_saved) {
		$('#ample').classList = ''
	} else {
		$('#ample').classList = 'not_saved'
	}
}



var delay;
function input() {
	// console.clear()
	// console.log(html === htmlCode)
	// if(html === htmlCode){return}
	if (mainEditor.getValue().trim().length > 1) {
		$$('.CodeMirror-lines').forEach((el) => {
			el.style.paddingBottom = $('.code').offsetHeight - 23 + 'px'
		})
	}
	if ($('.emmet-abbreviation-preview .CodeMirror-lines') !== null) {
		$('.emmet-abbreviation-preview .CodeMirror-lines').style.paddingBottom = ''
	}
	if ($('.emmet-abbreviation-preview .CodeMirror-lines') !== null) {
		$('.emmet-abbreviation-preview .CodeMirror-lines').style.paddingBottom = ''
	}
	is_saved = false
	check_saved()
	clearTimeout(delay);
	if($('#auto_run_btn').checked){
		delay = setTimeout(result, 2000);
	}else{
		delay = setTimeout(()=>{}, 2000);
	}
	updateCode();
};



function updateCode() {
	if (mainEditor.getOption('mode').name == 'htmlmixed') {
		Project.html = mainEditor.getValue();
	} else if (mainEditor.getOption('mode') == 'text/css') {
		Project.css = mainEditor.getValue();
	} else if (mainEditor.getOption('mode') == 'text/javascript') {
		Project.js = mainEditor.getValue();
	}
	if($('#auto_save_btn').checked){
		save("no_message");
	}
	find();
}
var css_libs = [];
var js_libs = [];
function result(e) {
	clearTimeout(delay);
	resizeEditors()
	if ($('.result_area iframe') !== null) {
		if(mainEditor.options.mode == 'text/css' && !event){
			$('.result_area iframe').contentWindow.document.querySelector('head style').textContent = mainEditor.getValue();
			message('CSS Update Successful!')
			return
		}
		$('.result_area iframe').remove();
	}
	var iframe = $('.result_frame').appendChild(d.createElement('iframe'))
	var frameW = iframe.contentWindow;
	
	var frame = frameW.document;
	var html = Project.html;
	var css = Project.css
	var js = Project.js
	var style = frame.createElement('style')
	var script = frame.createElement('script')
	style.textContent = `${css}`;
	script.textContent = `${js}`
	
	frame.open()
	frame.write(html)
	if (html.trim().length < 1 || frame.head == null || frame.body == null) {
		frame.write("<head></head><body></body>")
	}
	frameW.onerror = function(msg,file,ln,col){
		addLn([msg,'\nAt Line:',ln,'At Col:',col],'err')
	};
	// initConsole();
	// printElements()
	frame.head.appendChild(style)
	// frameW.addEventListener('DOMContentLoaded',()=>{
		frame.body.appendChild(script)
	// })
	frame.close()
	
	frame.addEventListener('mousedown', () => {
		hidemenu();
		$('#menu').classList.remove('active')
	});
	frame.addEventListener('keydown', (e) => {
		if (e.ctrlKey && e.key == 'h') { //Ctrl+H
			event.preventDefault()
			fullResult()
		}
	});
	frame.addEventListener('click', () => {
		$$('.result_menu').forEach(m => m.style.display = 'flex')
		$$('.editor_menu').forEach(m => m.style.display = 'none')
	});
	frame.addEventListener('focus', () => {
		$$('.result_menu').forEach(m => m.style.display = 'flex')
		$$('.editor_menu').forEach(m => m.style.display = 'none')
	});
	let title = $('#title')
	title.innerHTML = frame.title
	title.title = title.textContent
	d.title = `${frame.title} - AMPLE`
	if (title.textContent.length > 30) {
		title.classList = 'long'
	} else {
		title.classList = ''
	}
	if (title.textContent.length < 1) {
		title.innerHTML = 'Untitled'
		d.title = 'Untitled - AMPLE'
	};
	frameW.addEventListener('beforeunload',result)
	setTimeout(() => {
		message('Result Successful!')
	}, 0);
}
function run() { result() }
function reload() { result() }


function enter() {
	$('.emmet-abbreviation-preview') ? cmd('emmetExpandAbbreviationAll') :  cmd('emmetInsertLineBreak')
}


function revert() {
	if (mainEditor.getOption('mode').name == 'htmlmixed') {
		mainEditor.setValue(htmlOrig);
		Project.html = htmlOrig
	}
	else if (mainEditor.getOption('mode') == 'text/css') {
		mainEditor.setValue(cssOrig);
		Project.css = cssOrig
	}
	else if (mainEditor.getOption('mode') == 'text/javascript') {
		mainEditor.setValue('');
		Project.js = jsOrig;
	}
	mainEditor.focus()
}


function format() {
	prevC = mainEditor.getCursor()
	if (mainEditor.options.mode.name == 'htmlmixed') {
		mainEditor.setValue(html_beautify(mainEditor.getValue()))
	}
	else if (mainEditor.options.mode == 'text/css') {
		mainEditor.setValue(css_beautify(mainEditor.getValue()))
	}
	else if (mainEditor.options.mode == 'text/javascript') {
		mainEditor.setValue(js_beautify(mainEditor.getValue()))
	}
	mainEditor.setCursor(prevC)
}



function save(opt = "") {
	var content = JSON.stringify(Project);
	storage.setItem('Project', content)
	if(opt !== "no_message"){
		message('Code Saved In Session Storage');
	}
	is_saved = true;
	check_saved();
	mainEditor.focus()
}


function restore() {
	Project = JSON.parse(storage.getItem('Project'))
	if(mainEditor.options.mode.name == 'htmlmixed'){
		mainEditor.setValue(Project.html)
		mainEditor.setCursor(Project.htmlCursor)
	}else if(mainEditor.options.mode == 'text/css'){
		mainEditor.setValue(Project.css)
		mainEditor.setCursor(Project.cssCursor)
	}else if(mainEditor.options.mode == 'text/javascript'){
		mainEditor.setValue(Project.js)
		mainEditor.setCursor(Project.jsCursor)
	}
	mainEditor.focus()
	message('Restored')
}

// cur = $('.CodeMirror-simplescroll-vertical').appendChild(d.createElement('span'))
function lineNumber() {
	// cur.id = 'current_pos_indicator'
	// setTimeout(()=>{
	// 	dsddf = parseInt(getComputedStyle($('.CodeMirror-lines')).height.split('px')[0]);
	// 	cc = parseInt($('.CodeMirror-cursor')?.style.top.split('px')[0]) / dsddf * 100
	// 	cur.style.top = cc+'%'
	// },100)
	curPos = `Line ${(mainEditor.getCursor().line + 1)}, Column${(mainEditor.getCursor().ch + 1)}`
	if (mainEditor.getSelection().length > 0) {
		curPos = `${mainEditor.getSelection().length} selected`
	}
	if (mainEditor.getSelection().length > 0 && mainEditor.getSelection().split('\n').length > 1) {
		curPos = `${mainEditor.getSelection().split('\n').length} lines, ${mainEditor.getSelection().length} characters selected`
	}
	if (mainEditor.getSelections().length > 1) {
		curPos = `${mainEditor.getSelections().length} selections (${mainEditor.getSelection().length - mainEditor.getSelections().length + 1} characters selected)`
	}
	if (mainEditor.getSelections().length > 1 && mainEditor.getSelection().length - mainEditor.getSelections().length < 0) {
		curPos = `${mainEditor.getSelections().length} selections`
	}
	$('#curPos').innerHTML = curPos
}


function copyLineUp() {
	cmd('duplicateLine')
	mainEditor.setCursor(mainEditor.getCursor().line - 1, mainEditor.getCursor().ch)
}
function copyLineDown() {
	cmd('duplicateLine')
}

function resizeEditors() {
	mainEditor.setSize($('.code').offsetWidth, $('.code').offsetHeight - 4)
	if (mainEditor.getValue().trim().length > 1) {
		$$('.CodeMirror-lines').forEach((el) => {
			el.style.paddingBottom = $('.code').offsetHeight - 23 + 'px'
		})
	}
	if ($('.emmet-abbreviation-preview .CodeMirror-lines') !== null) {
		$('.emmet-abbreviation-preview .CodeMirror-lines').style.paddingBottom = ''
	}
	mainEditor.scrollIntoView()
}
// setTimeout(()=>{
	mainEditor.on("change", input)
	mainEditor.on("cursorActivity", lineNumber);
	showhtml()
	mainEditor.setCursor({ line: 7, ch: 1 })
	resizeEditors()
	run()
	mainEditor.on("keydown", e => {
		if (event.keyCode == 187) {
			setTimeout(() => {
				// insertTextAtCursor('""')
				// moveCursor(mainEditor)
			}, 0)
		}
		if (event.keyCode == 186 && event.shiftKey) {
			setTimeout(() => {
				// insertTextAtCursor(' ;')
				// moveCursor(mainEditor)
			}, 0)
		}
	})
// },1000)



window.addEventListener('focus', () => {
	mainEditor.focus();
	hidemenu()
	$('.code').style = ''
	clearInterval(pi)
})



// Zoom Function
$('.cm-s-monokai').style.transform = 'scale(1)'
$('.code').addEventListener('mousewheel', event => {
	diff = 1
	if (event.ctrlKey) {
		event.preventDefault()
		const ed = $('.cm-s-monokai');
		fz = Math.abs(ed.style.transform.split('scale(')[1].split(')')[0])  // monokai to wrap only editor not emmet
		if (event.deltaY < 0) {
			ed.style.transform = `scale(${fz+.1})`
		} else {
			ed.style.transform = `scale(${fz-.1})`
		}
		setTimeout(() => {
			insertTextAtCursor('')
		}, 0)
	}
});


window.addEventListener('keydown', (e) => {
	var key = event.keyCode || event.which,
	ctrl = event.ctrlKey,
	shift = event.shiftKey,
	alt = e.altKey;
	if(!ctrl && !shift && !alt){
		resizeEditors()
	}
	if (ctrl && key == 32) { //Ctrl+Space
		cmd('autocomplete')
	}
	
	// if (ctrl && shift && key == 191) { //Ctrl+Shift+/
	// 	mainEditor.blockComment(mainEditor.getCursor(), mainEditor.getCursor())
	// }
	// if (ctrl && !shift && key == 191) { //Ctrl+/
	// 	cmd('toggleComment')
	// }
	if (ctrl && !shift && key == 83) { //Ctrl+S
		event.preventDefault()
		save()
	}
	if (ctrl && e.key == 'h') { //Ctrl+H
		e.preventDefault()
		full()
	}
	if (ctrl && !shift && e.key == 'r') { //Ctrl+Enter
		event.preventDefault()
		event.stopPropagation()
		run()
	}
	if (ctrl && shift && key == 70) { //Shift+Ctrl+F
		event.preventDefault()
		CodeMirror.e_preventDefault(mainEditor)
		format()
	}
	if (alt && e.key == 'z') { //Alt+z
		if(!ctrl && !shift){
			mainEditor.getOption('lineWrapping') == true? mainEditor.setOption('lineWrapping',false)
			: mainEditor.setOption('lineWrapping',true)
		}
	}
	// if (ctrl && !shift && key == 70) { //Ctrl+F
	// 	event.preventDefault()
	// 	el.classList = 'expandable active find'
	// }
	if (ctrl && e.key == 'e') { //Ctrl+E
		event.preventDefault()
		exportAs()
	}
	if (ctrl && shift && e.key == 'V') { //Ctrl+Shift+V
		cmd('selectAll')
		cmd('indentAuto')
	}
	if (alt && shift && key == 38) { //Alt+Shift+Up
		copyLineUp()
	}
	if (alt && shift && key == 40) { //Alt+Shift+Down
		copyLineDown()
	}
	if (ctrl && shift && e.key == 'D') { //Ctrl+Shift+D
		cmd('duplicateLine')
	}
	if (alt && !shift && key == 38) { //Alt+Up
		cmd('swapLineUp')
		cmd('emmetDecrementNumber01')
		cmd('indentAuto')
	}
	if (alt && !shift && key == 40) { //Alt+Down
		cmd('swapLineDown')
		cmd('emmetIncrementNumber01')
		cmd('indentAuto')
	}
	if (ctrl && alt && e.key == 'z') { //Ctrl+Alt+Z
		cmd('undoSelection')
	}
});


window.addEventListener('resize', () => {
	resizeEditors()
	hidemenu()
	ind.innerHTML = frameBox.offsetWidth + 'px &times ' + frameBox.offsetHeight + 'px'
	ind.style.display = 'block'
	clearTimeout(indDelay);
	indDelay = setTimeout(hideInd, 1000);
});

if(location.search === "?mode=tutorial"){
	$('#ample').innerHTML = "THE<b>WEB</b> SCRIPTER"
	$('.devtools').style.display ="none"
	$('.CodeMirror-lines').style.fontSize = "20px"
	resizeEditors()
	var s = document.createElement('span')
	s.style = "position:absolute;right:10px;color:#fff;"
	s.innerHTML = "<b>SUBSCRIBE</b> ForMor"
	$('.menubar').appendChild(s)
	$('#auto_run_btn').checked = false
	$('#auto_save_btn').checked = true
	document.body.classList.add('shorts')
}
else if(location.search === "?mode=shorts"){
	[$('.sidebar'), $('.devtools'), $('#c_pallete'), $('.menubar')]
	.forEach(r=> r.style.display ="none"	)
	$$('.tab').forEach(t=>{t.style.width = '77px'})
	$('.tab.j_btn').innerHTML = "JavaScript"
	$('.CodeMirror-lines').style.fontSize = "15px"
	resizeEditors()
	s1.destroy();
	$('.main').style = `height: 100vh; width: ${(window.innerHeight/16) * 9}px`
	$('.workarea').style = "flex-direction:column;"
	$('.result_area').style = "height: 250px;"
	$('.result_frame').style = `transform:scale(2);transform-origin:0 0;width:${$('.result_frame').offsetWidth/2}px;height:${$('.result_frame').offsetHeight/2}px`
	function c(el){return document.createElement(el)}
	var s = c('span')
	s.style = "position: absolute;right: 10px;color: rgb(255, 255, 255);font-size: 20px;"
	s.innerHTML = "<b>SUBSCRIBE</b> fCode"
	$('.tabs').appendChild(s)
	var t =c('textarea')
	t.style = `position:fixed;top:0;margin-left:${(window.innerHeight/16) * 9 + 10}px;height:100vh;width:50%;padding:10px;background:#111;color:#fff;font-size: 20px;`
	document.body.appendChild(t)
	document.body.classList.add('shorts')
	$('#auto_run_btn').checked = false
}
[...$$('button'),...$$('li.menu_item'),...$$('input')].forEach(a=>{
	if(a.dataset.disabled !== "true"){
		a.removeAttribute('disabled')
		a.disabled = false;
	}
	a.removeAttribute('data-disabled')
})