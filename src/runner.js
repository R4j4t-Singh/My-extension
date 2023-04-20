const addScriptTagInPage = () => {
              
    // NOTE: This adds the script.js file from src/script.js to the external page. After building the project, this file will have
    // the path script/main.js (PATH_TO_SCRIPT_FILE). Therefore, this function specifies the path after the project is built
    const script = window.document.createElement('script');
    let url = chrome.runtime?.getURL('inject.js');
    script.src = url;
    (window.document.head || window.document.documentElement).appendChild(script);
};
addScriptTagInPage();