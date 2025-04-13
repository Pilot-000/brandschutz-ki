
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

function analyzeFiles() {
    const fileInput = document.getElementById("upload");
    const files = fileInput.files;
    const analysis = document.getElementById("analysis");
    const message = document.getElementById("message");
    const spinner = document.getElementById("spinner");
    const progressText = document.getElementById("progressText");

    message.textContent = "";
    analysis.style.display = "none";
    progressText.textContent = "";

    if (files.length === 0) {
        message.textContent = "Bitte laden Sie mindestens eine PDF- oder Bilddatei hoch.";
        message.style.color = "red";
        return;
    }

    if (files.length > 10) {
        message.textContent = "Maximal 10 Dateien erlaubt.";
        message.style.color = "red";
        return;
    }

    for (const file of files) {
        if (!file.type.match(/(pdf|image)/)) {
            message.textContent = "Nur PDF- oder Bilddateien sind erlaubt.";
            message.style.color = "red";
            return;
        }
    }

    spinner.style.display = "inline-block";
    let step = 0;
    const steps = ["Grundrisse analysieren...", "Schnitte prüfen...", "Maßnahmen berechnen..."];

    const interval = setInterval(() => {
        if (step < steps.length) {
            progressText.textContent = steps[step];
            step++;
        } else {
            clearInterval(interval);
            spinner.style.display = "none";
            progressText.textContent = "";
            analysis.style.display = "block";
            saveProject();
        }
    }, 1000);
}

function saveProject() {
    const data = {
        title: "Projekt " + new Date().toLocaleString(),
        bundesland: document.getElementById("bundesland").value,
        date: new Date().toISOString()
    };
    const existing = JSON.parse(localStorage.getItem("projekte") || "[]");
    existing.push(data);
    localStorage.setItem("projekte", JSON.stringify(existing));
}

document.getElementById("upload").addEventListener("change", function() {
    const fileList = document.getElementById("file-list");
    const message = document.getElementById("message");
    fileList.innerHTML = "";
    message.textContent = "";

    for (const file of this.files) {
        const li = document.createElement("li");
        let label = "[Unbekannt]";
        if (file.name.toLowerCase().includes("grundriss")) label = "[Grundriss]";
        if (file.name.toLowerCase().includes("schnitt")) label = "[Schnitt]";
        li.textContent = `${label} ${file.name}`;
        fileList.appendChild(li);
    }
});
