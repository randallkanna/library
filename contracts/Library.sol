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
    address owner;
  }

  struct Librarian {
    address librarian;
    string name;
  }

  mapping(address => Librarian) public librarians;
  mapping(uint => Book) public books;
  mapping(address => bool) public isTrustedLibrarian;

  event addBookEvent(
    /* address librarian _sender, */
    /* string _name, */
  );

  modifier onlyLibrarian {
    require(isTrustedLibrarian[msg.sender]);
    _;
  }

  function createLibrarian(address addr, string name) onlyOwner {
    librarians[addr] = Librarian({librarian: addr, name: name});
    isTrustedLibrarian[addr] = true;
  }

  function getLibrarianNameByAddr(address addr) public view returns (string) {
    return librarians[addr].name;
  }

  function removeLibrarian(address addr) onlyOwner {
    isTrustedLibrarian[addr] = false;
    delete librarians[addr];
  }

  function addBook(uint sku, string _title, string _category, string _status, address bookOwner) onlyLibrarian {
    books[sku] = Book({id: sku, title: _title, category: _category, status: _status, owner: bookOwner});
    /* addBookEvent(msg.sender, _name, _price); */
  }

  function removeBook(uint id) {
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

  function loanBook(address _borrower) {
    books[id].borrower = _borrower;
  }

  function transferBookOwnership(uint id, address newOwner) onlyOwner {
    books[id].owner = newOwner;
  }

  function checkCurrentOwner(uint id) public view returns (address) {
    return books[id].owner;
  }
 }
