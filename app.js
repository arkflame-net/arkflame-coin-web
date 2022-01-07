const web3 = new Web3(window.ethereum);
let account = null;

async function login() {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  account = accounts[0];
  document.getElementById("step-1").style.display = "none";
  document.getElementById("step-2").style.display = "block";
  alert("Logged as " + account);
}

async function addChain() {
  await window.ethereum.request({
    method: "wallet_addEthereumChain",
    params: [
      {
        chainId: "0x89",
        chainName: "Matic",
        nativeCurrency: {
          name: "Matic",
          symbol: "Matic",
          decimals: 4, //In number form
        },
        rpcUrls: ["https://polygon-rpc.com"],
        blockExplorerUrls: ["https://polygonscan.com/"],
      },
    ],
  });
  document.getElementById("step-2").style.display = "none";
  document.getElementById("step-3").style.display = "block";
}

async function addToken() {
  const wasAdded = await window.ethereum.request({
    method: "wallet_watchAsset",
    params: {
      type: "ERC20",
      options: {
        address: "0x25e54db7c4400d20b6ed2959db5020967486a980",
        symbol: "ARK",
        decimals: 4,
        image: "https://i.imgur.com/DUxZiAV.jpg",
      },
    },
  });

  if (wasAdded) {
    alert("¡Terminado!");
  }
}
