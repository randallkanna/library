import React, { Component } from "react";
import LibraryContract from "./contracts/Library.json";
import getWeb3 from "./utils/getWeb3";
import truffleContract from "truffle-contract";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      storageValue: 0,
      web3: null,
      accounts: null,
      contractOwner: null,
      contract: null,
      librarianName: '',
      librarianAddress: 0x0,
      bookId: 0,
      bookTitle: '',
      bookCategory: '',
      bookStatus: '',
      loanedTo: 0x0,
      bookOwner: 0x0,
      bookCount: null,
    }

    this.setStateValues = this.setStateValues.bind(this);
    this.onSubmitLibrarian = this.onSubmitLibrarian.bind(this);
    this.createBook = this.createBook.bind(this);
    this.getBookCount = this.getBookCount.bind(this);
    this.getBooks = this.getBooks.bind(this);
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const Contract = truffleContract(LibraryContract);
      Contract.setProvider(web3.currentProvider);
      const instance = await Contract.deployed();

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
      this.setState({contractOwner: accounts[0]});

      this.getBookCount();
      this.getBooks();

      // ignoring events for now with metamask not currently supporting well
      this.state.contract.allEvents((error, result) => {
        if (error) {
          console.log(error);
        }
        console.log(result);
      });

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.log(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;
  };

  setStateValues(event) {
   this.setState({[event.target.name]: event.target.value})
  }

  onSubmitLibrarian(event) {
    event.preventDefault();
    this.state.contract.createLibrarian(this.state.librarianAddress, this.state.librarianName, {from: this.state.contractOwner}).then(() => {
      alert('Librarian Added');
    });

    this.state.contract.allEvents((error, result) => {
      if (error) {
        console.log(error);
      }
      console.log(result);
    });
  }

  getBookCount() {
    this.state.contract.getBookCount().then((result) => {
      this.setState({bookCount: result})
    })
  }

  getBooksAvailable() {
    debugger;
  }

  createBook(event) {
    event.preventDefault();

    this.state.contract.addBook(this.state.bookId, this.state.bookTitle, this.state.bookCategory, this.state.bookStatus, this.state.loanedTo, this.state.bookOwner, {from: this.state.contractOwner, gas: 30000});

    this.getBookCount();
  }

  getBooks() {
    // this.state.contract.getBooksAvailable().then((books) => {
    //   // debugger;
    // })
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Library</h1>



        <h3>Add Librarian</h3>
        <form onSubmit={this.onSubmitLibrarian}>
          Name: <input type="text" name="librarianName" value={this.state.librarianName} onChange={(e) => this.setStateValues(e)} />
          Address: <input type="text" name="librarianAddress" value={this.state.librarianAddress} onChange={(e) => this.setStateValues(e)} />
        <input type="submit" />
        </form>

        <h3>Add Book</h3>
        <form onSubmit={this.createBook}>
          Book SKU: <input type="text" name="bookId" value={this.state.bookId} onChange={(e) => this.setStateValues(e)} />
          Title: <input type="text" name="bookTitle" value={this.state.bookTitle} onChange={(e) => this.setStateValues(e)} />
          Category: <input type="text" name="bookCategory" value={this.state.bookCategory} onChange={(e) => this.setStateValues(e)} />
          Status: <input type="text" name="bookStatus" value={this.state.bookStatus} onChange={(e) => this.setStateValues(e)} />
          Loaned To: <input type="text" name="loanedTo" value={this.state.loanedTo} onChange={(e) => this.setStateValues(e)} />
          Owner: <input type="text" name="bookOwner" value={this.state.bookOwner} onChange={(e) => this.setStateValues(e)} />
        <input type="submit" />
        </form>
      </div>
    );
  }
}

export default App;
