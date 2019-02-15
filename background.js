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
    let scrollArray=[];
    let longestTime = 0;
    let rightPosition=0;//get the most probable position in array.
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
        //sendResponse("stored");
    }
    if (request.eventtpye === "onload") {
        chrome.storage.local.get(
            ['scrollinfo'],
            function (result) {
                scrollArray = result.scrollinfo;
                if (!Array.isArray(scrollArray)) {
                    console.log("heyyy", "heyy");
                    update([]);
                } else {
                    console.log(scrollArray);

                    for (let i = 0; i <= scrollArray.length - 1; i++) {
                        if (scrollArray[i].url === request.url) {
                            if (scrollArray[i].duration > longestTime) {
                                longestTime = scrollArray[i].duration;
                                rightPosition=scrollArray[i].position;
                            }
                        }
                    }
                    console.log(rightPosition);//
                    console.log(longestTime);
                }
            });
    }
    sendResponse(rightPosition);
}


function update(array) {
    chrome.storage.local.set({
        scrollinfo: array
    }, function () {
        console.log("local storage updated");
        console.log("number of items: " + array.length);
    });
}
