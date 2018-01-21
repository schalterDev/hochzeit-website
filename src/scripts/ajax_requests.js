function getRequest(url, callback) {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function onReadyStageChange() {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            callback(JSON.parse(xmlHttp.responseText));
        } else if (xmlHttp.status === 500) {
            callback(null, '500: Internal server error');
        } else if (xmlHttp.status === 404) {
            callback(null, '404: Server not found');
        }
    };

    xmlHttp.open('GET', url, true); // true for asynchronous
    xmlHttp.send();
}

function postMessage(url, postParameters) {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xmlHttp.onreadystatechange = function onReadyStageChange() {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            console.log(`Response post message: ${xmlHttp.responseText}`);
            return true;
        } else if (xmlHttp.status === 403) {
            console.log(`Permission denied post message: ${xmlHttp.responseText}`);
            return false;
        }

        return false;
    };
    xmlHttp.open('POST', url, true); // true for asynchronous
    xmlHttp.send(postParameters);
}

module.exports = {
    getRequest,
    postMessage,
};