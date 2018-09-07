const Library = artifacts.require("./Library.sol");
let assertRevert = require("./assertRevert.js");

contract("Library", accounts => {
  const owner = accounts[0];
  const librarian = accounts[1];
  const borrower = accounts[2];

  beforeEach(async() => {
    library = await Library.new({from: owner});
  });

  it("should only allow a librarian to add a book", async() => {

  });

  it("should not allow a non librarian to add a book", async() => {

  });

  it("should allow a librarian to remove a book", async() => {

  });

  it("should not allow a user who is not a librarian to remove a book", async() => {

  });

  it("should allow creation of a librarian by an owner", async() => {
    await library.createLibrarian(librarian, 'Captain Janeway', {from: owner});

    let newLibrarian = await library.getLibrarianNameByAddr(accounts[1]);

    assert.equal(newLibrarian, 'Captain Janeway', 'librarian is created properly');
  });

  it("should not allow non owners to create librarians", async() => {
    await assertRevert(library.createLibrarian(librarian, 'Captain Janeway', {from: borrower}))
  });

  it("should allow an owner to remove a librarian", async() => {
    await library.createLibrarian(librarian, 'Captain Janeway', {from: owner});

    await library.removeLibrarian(librarian, {from: owner});

    let checkLibrarian = await library.getLibrarianNameByAddr(accounts[1]);

    assert.equal(checkLibrarian, '', 'librarian  does not exist');
  });

  it("should not allow a non owner to remove a librarian", async() => {
    await library.createLibrarian(librarian, 'Captain Janeway', {from: owner});

    await assertRevert(library.removeLibrarian(librarian, {from: borrower}))
  });

  it("should show past owners of a book", async() => {

  });

  it("should show book current status", async() => {

  });

  it("should allow an owner to trade a book to someone else", async() => {

  });

  it("should allow a librarian to check out a book to a user", async() => {

  });

  it("should not allow a non-librarian to check out a book to a user", async() => {

  });

  it("should show the current status of a book", async() => {

  });

  it("should allow new damage to be added to a book", async() => {

  });

  it("should allow any user to return a book", async() => {

  });
});
