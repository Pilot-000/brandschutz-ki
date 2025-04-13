
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

function analyzeFiles() {
    const analysis = document.getElementById("analysis");
    analysis.style.display = "block";
}

document.getElementById("upload").addEventListener("change", function() {
    const fileList = document.getElementById("file-list");
    fileList.innerHTML = "";
    for (const file of this.files) {
        const li = document.createElement("li");
        li.textContent = file.name;
        fileList.appendChild(li);
    }
});
