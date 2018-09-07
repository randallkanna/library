const Library = artifacts.require("./Library.sol");
let assertRevert = require("./assertRevert.js");

contract("Library", accounts => {
  const owner = accounts[0];
  const librarian = accounts[1];
  const borrower = accounts[2];

  beforeEach(async() => {
    library = await Library.new({from: owner});
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

  it("should allow a librarian to add a book", async() => {
    await library.createLibrarian(librarian, 'Captain Janeway', {from: owner});

    await library.addBook(115, 'Star Trek: Voyager Part 1', 'Fiction', 'New', owner, {from: librarian});

    let book = await library.checkBookTitle(115);

    assert.equal(book, 'Star Trek: Voyager Part 1', 'book title is returned successfully');
  });

  it("should not allow a non librarian to add a book", async() => {
    await library.createLibrarian(librarian, 'Captain Janeway', {from: owner});

    await assertRevert(library.addBook(115, 'Star Trek: Voyager Part 1', 'Fiction', 'New', owner, {from: borrower}))
  });

  it("should not allow a user who is not a librarian to remove a book", async() => {
    await library.createLibrarian(librarian, 'Captain Janeway', {from: owner});

    await library.addBook(115, 'Star Trek: Voyager Part 1', 'Fiction', 'New', owner, {from: librarian});

    await library.removeBook(1155, {from: borrower});

    let book = await library.checkBookTitle(115);

    assert.equal(book, 'Star Trek: Voyager Part 1', 'book is still stored successfully');
  });

  // it("should allow a librarian to remove a book", async() => {
  //   await library.createLibrarian(librarian, 'Captain Janeway', {from: owner});
  //   await library.addBook(115, 'Star Trek: Voyager Part 1', 'Fiction', 'New', owner, {from: librarian});
  //   await library.removeBook(1155, {from: librarian});
  //
  //   let book = await library.checkBookTitle(115);
  //
  //   console.log(book)
  //
  //   assert.equal(book, '', 'book is removed successfully');
  // });

  it("should show book current status", async() => {
    await library.createLibrarian(librarian, 'Captain Janeway', {from: owner});

    await library.addBook(115, 'Star Trek: Voyager Part 1', 'Fiction', 'new', owner, {from: librarian});

    let bookStatus = await library.checkBookStatus(115);

    assert.equal(bookStatus, 'new', 'book status returned successfully');
  });

  it("should allow new damage to be added to a book", async() => {
    await library.createLibrarian(librarian, 'Captain Janeway', {from: owner});

    await library.addBook(115, 'Star Trek: Voyager Part 1', 'Fiction', 'new', owner, {from: librarian});

    await library.updateBookDamage(115, 'Damaged', {from: librarian});

    let bookStatus = await library.checkBookStatus(115);

    assert.equal(bookStatus, 'Damaged', 'book status updated successfully');
  });

  it("should not allow a non-librarian to add damage to a book", async() => {
    await library.createLibrarian(librarian, 'Captain Janeway', {from: owner});

    await library.addBook(115, 'Star Trek: Voyager Part 1', 'Fiction', 'new', owner, {from: librarian});

    await assertRevert(library.updateBookDamage(115, 'Damaged', {from: borrower}));
  });

  it("should allow an owner to trade a book to someone else", async() => {
    await library.createLibrarian(librarian, 'Captain Janeway', {from: owner});

    await library.addBook(115, 'Star Trek: Voyager Part 1', 'Fiction', 'New', owner, {from: librarian});

    await library.transferBookOwnership(115, borrower, {from: owner});

    let newOwner = await library.checkCurrentOwner(115);

    assert.equal(newOwner, borrower, 'owner is changed correctly');
  });

  // it("should not allow a non owner to trade a book to someone else", async() => {
  //   await library.createLibrarian(librarian, 'Captain Janeway', {from: owner});
  //
  //   await library.addBook(115, 'Star Trek: Voyager Part 1', 'Fiction', 'New', owner, {from: librarian});
  //
  //   await assertRevert(await library.transferBookOwnership(115, borrower, {from: borrower}));
  //   // ;
  //   //
  //   // let currentOwner = await library.checkCurrentOwner(115);
  //   //
  //   // assert.equal(owner, currentOwner, 'owner has not changed');
  // });

  it("should allow a librarian to check out a book to a user", async() => {
    await library.createLibrarian(librarian, 'Captain Janeway', {from: owner});

    await library.addBook(115, 'Star Trek: Voyager Part 1', 'Fiction', 'New', owner, {from: librarian});

    await library.loanBook(115, borrower, {from: librarian});

    let currentBorrower = await library.checkBorrower(115);

    assert.equal(currentBorrower, borrower, 'borrower is set correctly');
  });

  it("should not allow a non-librarian to check out a book to a user", async() => {

  });

  it("should allow any user to return a book if they borrowed book", async() => {

  });
});
