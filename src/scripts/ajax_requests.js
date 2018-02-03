const BASE_URL = location.href;

// only for development
//const BASE_URL = `http://${location.hostname}:3000`;

function getRequest(url, callback) {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function onReadyStageChange() {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            if(callback)
                callback(JSON.parse(xmlHttp.responseText));
        } else if (xmlHttp.status === 500) {
            if(callback)
                callback(null, '500: Internal server error');
        } else if (xmlHttp.status === 404) {
            if(callback)
                callback(null, '404: Server not found');
        }

        //console.log(`ReadyState: ${xmlHttp.readyState}, Status: ${xmlHttp.status}`);
    };

    xmlHttp.open('GET', url, true); // true for asynchronous
    xmlHttp.send();
}

function postMessage(url, postParameters, callback) {
    console.log(`Post message, url: ${url}, param: ${postParameters}`);

    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open('POST', url, true); // true for asynchronous
    xmlHttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xmlHttp.onreadystatechange = function onReadyStageChange() {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            console.log(`Response post message: ${xmlHttp.responseText}`);
            if(callback)
                callback();
        } else if (xmlHttp.status === 403) {
            console.log(`Permission denied post message: ${xmlHttp.responseText}`);
        }
    };
    xmlHttp.send(postParameters);
}

function putMessage(url, putParameters, callback) {
    console.log(`put message, url: ${url}, param: ${putParameters}`);

    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open('PUT', url, true); // true for asynchronous
    xmlHttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xmlHttp.onreadystatechange = function onReadyStageChange() {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            console.log(`Response put message: ${xmlHttp.responseText}`);
            if(callback)
                callback();
        } else if (xmlHttp.status === 403) {
            console.log(`Permission denied put message: ${xmlHttp.responseText}`);
        }
    };
    xmlHttp.send(putParameters);
}

export default {
    BASE_URL,
    getRequest,
    postMessage,
    putMessage,
};