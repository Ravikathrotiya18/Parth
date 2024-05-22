const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

// Load accounts data
const accountsData = JSON.parse(fs.readFileSync('./data/accounts.json'));

// Load transactions data
let transactionsData = JSON.parse(fs.readFileSync('./data/transactions.json'));

// Endpoint for user authentication
app.post('/api/login', (req, res) => {
  const { username, pin } = req.body;
  const user = accountsData.find(acc => acc.username === username && acc.pin === pin);
  if (user) {
    res.json({ user:user });
  } else {
    res.status(401).json({ message: 'Invalid username or PIN' });
  }
});

// Endpoint to get balance for a user
app.post('/api/balance', (req, res) => {
  const { username } = req.body;
  const account = accountsData.find(acc => acc.username === username);
  if (account) {
    res.json({ balance: account.balance });
  } else {
    res.status(404).json({ message: 'Account not found' });
  }
});
// Endpoint to handle transactions
app.post('/api/transaction', (req, res) => {
  const { sender, receiver, amount } = req.body;

  // Find sender and receiver accounts
  const senderAccount = accountsData.find(acc => acc.username === sender);
  const receiverAccount = accountsData.find(acc => acc.username === receiver);

  if (!senderAccount || !receiverAccount) {
    return res.status(404).json({ success: false, message: 'Sender or receiver account not found' });
  }

  // Check if sender has sufficient balance
  if (senderAccount.balance < amount) {
    return res.status(400).json({ success: false, message: 'Insufficient balance' });
  }

  // Update balances
  senderAccount.balance -= amount;
  receiverAccount.balance = (receiverAccount.balance + parseInt(amount)); // Format to 2 decimal places

  // Add transaction to transaction history
  const transaction = {
    sender,
    receiver,
    amount,
    date: new Date().toLocaleString()
  };
  senderAccount.transactions.push(transaction);
  receiverAccount.transactions.push(transaction);

  // Save updated data to files
  fs.writeFileSync('./data/accounts.json', JSON.stringify(accountsData, null, 2));
  fs.writeFileSync('./data/transactions.json', JSON.stringify(transactionsData, null, 2));

  res.json({ success: true, message: `Transferred $${amount} from ${sender} to ${receiver}` });
});
// Endpoint to get transaction history for a user
app.get('/api/transaction-history/:username', (req, res) => {
  const { username } = req.params;
  const user = accountsData.find(acc => acc.username === username );
  res.json(user.transactions);
});



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
