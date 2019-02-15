console.log("background running");
chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.local.clear(function () {
        var error = chrome.runtime.lastError;
        if (error) {
            console.error(error);
        }
    });
});

chrome.runtime.onMessage.addListener(handleScrollevent);

function handleScrollevent(request, sender, sendResponse) {
    if (request.eventtpye === "scroll") {
        chrome.storage.local.get(
            ['scrollinfo'],
            function (result) {
                if (!Array.isArray(result.scrollinfo)) {
                    update([]);
                } else {
                    console.log(request);
                    result.scrollinfo.push(request);
                    update(result.scrollinfo);
                    console.log(result.scrollinfo);
                }
            });
        sendResponse("stored");
    } else {
        chrome.storage.local.get(
            ['scrollinfo'],
            function (result) {
                let longestTime = 0;
                let number = 0;//get the most probable position in array.
                for (let i = 0; i <= result.scrollinfo.length - 1; i++) {
                    if (result.scrollinfo[i].url === request.url) {
                        if (result.scrollinfo[i].duration > longestTime) {
                            longestTime = result.scrollinfo[i].duration;
                            number = i;
                        }
                    }
                }
                sendResponse(result.scrollinfo[number].position);
            });
        //first load do stuff
    }
}

function update(array) {
    chrome.storage.local.set({
        scrollinfo: array
    }, function () {
        console.log("local storage updated");
        console.log("number of items: " + array.length);
    });
}
