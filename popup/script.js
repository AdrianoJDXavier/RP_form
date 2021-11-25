document.addEventListener("click", function(e) {
    if (!e.target.classList.contains("preenche")) {
        return;
    }

    var chosenForm = e.target.textContent;

    chrome.tabs.executeScript(null, {
        file: "/content_scripts/rp_form_script.js"
    });


    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            beast: chosenForm
        });
    });

});

document.addEventListener("click", function(e) {
    if (!e.target.classList.contains("preencheadslashes")) {
        return;
    }

    var chosenForm = e.target.textContent;

    chrome.tabs.executeScript(null, {
        file: "/content_scripts/rp_form_script1.js"
    });

    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            beast: chosenForm
        });
    });

});
