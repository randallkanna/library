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
    string description;
    string state;
    address owner;
  }

  struct Librarian {
    address librarian;
    string name;
  }

  mapping(address => Librarian) public librarians;
  /* mapping (address => address) librarians; */ // fix
  mapping(uint => Book) public books;

  /* event  */
  event addBookEvent(
    /* address librarian _sender, */
    /* string _name, */
  );

  /* modifier onlyLibrarian {
    return true
  } */

  function createLibrarian(address addr, string name) onlyOwner {
    librarians[addr] = Librarian({librarian: addr, name: name});
  }

  function getLibrarianNameByAddr(address addr) public view returns (string) {
    return librarians[addr].name;
  }

  function removeLibrarian(address addr) onlyOwner {
    delete librarians[addr];
  }

  // Certain functions would then need to fail if msg.sender is not contained in the library map.

  function addBook() { // onlyLibrarian


    /* addBookEvent(msg.sender, _name, _price); */
  }

  function loanBook() {

  }
 }
