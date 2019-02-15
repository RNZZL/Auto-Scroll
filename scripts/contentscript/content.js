//loaded
var startTime = new Date().getTime();
var endTime = new Date().getTime();
var lastPosition = 0;

window.onload = function () {
   // window.scrollTo(0, 1253);
  chrome.runtime.sendMessage({
    "eventtpye": "onload",
    "url": document.location.href,
  }, (response) => {
    console.log(response);
    //window.scrollTo(0, reponse);//auto scroll function
  });
};


window.addEventListener("scroll", handleScroll);

function handleScroll() {
    endTime = new Date().getTime();
    if (endTime - startTime > 10000) {
        chrome.runtime.sendMessage({
            "eventtpye": "scroll",
            "position": lastPosition,
            "duration": endTime - startTime,
            "url": document.location.href,
        }, (response) => {
            console.log(lastPosition);
            console.log(response);
        });
    }
    lastPosition = document.documentElement.scrollTop;
    startTime = endTime;
}

window.onbeforeunload = function () {
  endTime = new Date().getTime();
  chrome.runtime.sendMessage({
    "eventtpye": "scroll",
    "position": lastPosition,
    "duration": endTime - startTime,
    "url": document.location.href,
  });
}
