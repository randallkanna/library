pragma solidity ^0.4.24;

import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';

contract Library is Ownable {
  constructor() {
    owner = msg.sender;
  }

  struct Book {
    uint id;
    string title;
    string category;
    string status;
    address bookLoanedTo;
    address owner;
  }

  struct Librarian {
    address librarian;
    string name;
  }

  mapping(address => Librarian) public librarians;
  mapping(uint => Book) public books;
  mapping(address => bool) public isTrustedLibrarian;

  event loanBookEvent(
    uint id,
    address loanedTo
  );

  event addBookEvent(
    uint id,
    string title,
    string category,
    string status
  );

  event librarianAddedEvent(
    string name,
    address librarian
  );

  modifier onlyLibrarian {
    require(isTrustedLibrarian[msg.sender]);
    _;
  }

  function createLibrarian(address addr, string name) public onlyOwner {
    librarians[addr] = Librarian({librarian: addr, name: name});
    isTrustedLibrarian[addr] = true;
    emit librarianAddedEvent(name, addr);
  }

  function getLibrarianNameByAddr(address addr) public view returns (string) {
    return librarians[addr].name;
  }

  function removeLibrarian(address addr) public onlyOwner {
    isTrustedLibrarian[addr] = false;
    delete librarians[addr];
  }

  function addBook(uint sku, string _title, string _category, string _status, address borrower, address bookOwner) public onlyLibrarian {
    books[sku] = Book({id: sku, title: _title, category: _category, status: _status, bookLoanedTo: borrower, owner: bookOwner});
    emit addBookEvent(sku, _title, _category, _status);
  }

  function removeBook(uint id) public {
    delete books[id];
  }

  function updateBookDamage(uint id, string _status) public onlyLibrarian {
    books[id].status = _status;
  }

  function checkBookStatus(uint id) public view returns (string) {
    return books[id].status;
  }

  function checkBookTitle(uint id) public view returns (string) {
    return books[id].title;
  }

  function loanBook(uint id, address _borrower) public onlyLibrarian {
    books[id].bookLoanedTo = _borrower;
    emit loanBookEvent(id, _borrower);
  }

  function returnBook(uint id, address _librarian) public {
    address bookLoanedTo = books[id].bookLoanedTo;
    require(bookLoanedTo == msg.sender);
    books[id].bookLoanedTo = _librarian;
  }

  function checkBorrower(uint id) public view returns (address) {
    return books[id].bookLoanedTo;
  }

  function transferBookOwnership(uint id, address newOwner) public onlyOwner {
    books[id].owner = newOwner;
  }

  function checkCurrentOwner(uint id) public view returns (address) {
    return books[id].owner;
  }
 }
