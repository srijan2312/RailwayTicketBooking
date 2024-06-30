let web3;
let contract;
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with your contract address
const contractABI = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_ticketPrice",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_totalTickets",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "ticketId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "passenger",
        "type": "address"
      }
    ],
    "name": "TicketBooked",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "ticketId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "passenger",
        "type": "address"
      }
    ],
    "name": "TicketCancelled",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "ticketId",
        "type": "uint256"
      }
    ],
    "name": "bookTicket",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "bookedTickets",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "ticketId",
        "type": "uint256"
      }
    ],
    "name": "cancelTicket",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "checkAvailability",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "ticketPrice",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "tickets",
    "outputs": [
      {
        "internalType": "address",
        "name": "passenger",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "isBooked",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalTickets",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]; // Replace with your contract ABI

window.addEventListener('load', async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.enable();
            contract = new web3.eth.Contract(contractABI, contractAddress);
        } catch (error) {
            console.error("User denied account access");
        }
    } else {
        console.error("Non-Ethereum browser detected. You should consider trying MetaMask!");
    }
});

document.getElementById('connectWallet').addEventListener('click', async () => {
    if (window.ethereum) {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
        } catch (error) {
            console.error("User denied account access");
        }
    }
});

document.getElementById('bookTicket').addEventListener('click', async () => {
    const ticketId = document.getElementById('ticketId').value;
    const accounts = await web3.eth.getAccounts();
    const ticketPrice = await contract.methods.ticketPrice().call();
    
    try {
        await contract.methods.bookTicket(ticketId).send({ from: accounts[0], value: ticketPrice });
        alert('Ticket booked successfully!');
    } catch (error) {
        console.error("Error booking ticket", error);
    }
});

document.getElementById('cancelTicket').addEventListener('click', async () => {
    const ticketId = document.getElementById('cancelTicketId').value;
    const accounts = await web3.eth.getAccounts();
    
    try {
        await contract.methods.cancelTicket(ticketId).send({ from: accounts[0] });
        alert('Ticket cancelled successfully!');
    } catch (error) {
        console.error("Error cancelling ticket", error);
    }
});

document.getElementById('checkAvailability').addEventListener('click', async () => {
    try {
        const availability = await contract.methods.checkAvailability().call();
        document.getElementById('availability').innerText = `Available tickets: ${availability}`;
    } catch (error) {
        console.error("Error checking availability", error);
    }
});
