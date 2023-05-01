(function () {
    // Defining Elements
    const mainSection = $("#main");
    const fileTree = $("#tree")


    function fileTreeEvents() {

        const File = (name = "") => ({
            type: "file",
            name: name
        })
        const Folder = (name = "", children = { folders: [], files: [] }) => ({
            type: "folder",
            name: name,
            children: children
        })

        const projectName = "Project "+Math.floor(Math.random()*100)+Math.floor(Math.random()*100)
        const file_list = [
            { "name": `\\${projectName}\\index.html`, data: "I am index.html" },
            { "name": `\\${projectName}\\style.css`, data: "I am style.css" },
            { "name": `\\${projectName}\\app.js`, data: "I am app.js" },
            // { "name": "\\newproject\\images\\img.jpg", data: "I am Image" },
        ];


        const fileMap = { folders: [], files: [] };

        file_list.sort((a, b) => a.name.localeCompare(b.name));
        for (const file of file_list) {
            const path = file.name.split("\\").filter(Boolean);

            let current = fileMap;
            for (let i = 0; i < path.length; i++) {
                const folderName = path[i];
                let folder = current.folders.find(f => f.name === folderName);

                if (!folder) {
                    if (i === path.length - 1 && !file.name.endsWith("\\")) {
                        folder = current.files.find(f => f.name === folderName);

                        if (!folder) {
                            folder = File(folderName);
                            current.files.push(folder);
                        }
                    }
                    else {
                        folder = Folder(folderName);
                        current.folders.push(folder);
                    }
                }

                current = folder.children;
            }
        }


        let isParent = true;
        const fileMapToHTML = (fileMap, path) => {
            let html = '';
            let dnone = isParent
            isParent = false
            for (const folder of fileMap.folders) {
                html += `<div class="item folder"><span>${folder.name}</span>`;
                html += `<div class="children ${dnone ? "" : ""}">`;
                if (folder.children.folders.length || folder.children.files.length) {
                    html += fileMapToHTML(folder.children, path + "\\" + folder.name);
                }
                html += '</div>';
                html += '</div>';
            }
            for (const file of fileMap.files) {
                html += `<div class="item file" data-path="${path + "\\" + file.name}"><span>${file.name}</span></div>`;
            }
            return html;
        }
        document.getElementById("tree").innerHTML = fileMapToHTML(fileMap, "");


        function addTab(filename="",click_event=()=>{},close_event=()=>{}){
            if($(".tabs .tab .close_btn")) $(".tabs .tab .filename").textContent = filename
            else{
                $(".tabs .tab")?.remove()
                var tabEl = document.createElement("button")
                tabEl.classList = "tab"
                tabEl.innerHTML = `<span class="filename">${filename}</span><span class="close_btn">&times;</span>`
                tabEl.querySelector(".close_btn").addEventListener("click",e=>{
                    e.target.parentElement.remove()
                    close_event()
                })
                $(".tabs").appendChild(tabEl)
            }
        }

        let HTML_CODE = `<h1>Cool 😎 Website</h1>`
        let CSS_CODE = `body{\n\tmargin: 0;\n}`
        let JS_CODE = `function hello(){\n\tconsole.log("Hello, World")\n}`
        fileTree.addEventListener("click", function (e) {
            // If it's a folder with children
            if (e.target.nodeName == "SPAN" && e.target.nextElementSibling?.classList.contains("children")) {
                e.target.nextElementSibling.classList.toggle("d-none")
            }
            // If its a file
            else if (e.target.nodeName == "SPAN" && e.target.parentElement?.classList.contains("file")) {
                // Currently ignoring path, for later use
                // const path = e.target.parentElement.dataset.path

                const fileName = e.target.innerText
                addTab( fileName,()=>{}, ()=>{
                    mainEditor.remove()
                })
                if(!mainEditor.parentElement) $(".code_area .code").appendChild(mainEditor)
                mainEditor.value = fileName == "index.html" ? HTML_CODE : fileName == "style.css" ? CSS_CODE : fileName == "app.js" ? JS_CODE : ""
                mainEditor.focus()

            }

        })
    }



    let mainEditor;

    // This function will change textarea to CodeMirror instance
    // Currently only plain textarea
    function initializeMainEditor() {
        const textarea = $("textarea#code")
        mainEditor = textarea
    }


    fileTreeEvents()
    initializeMainEditor()
})()