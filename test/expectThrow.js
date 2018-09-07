module.exports = async function expectThrow (promise, message) {
  try {
    await promise;
  } catch (error) {
    if (message) {
      throw new Error(message)
      return;
    } else {
      const invalidJump = error.message.search('invalid JUMP') >= 0;
      const outOfGas = error.message.search('out of gas') >= 0;
      assert(
        invalidJump || outOfGas,
        "Expected throw, got '" + error + "' instead",
      );
      return;
    }
  }
  assert.fail('Expected throw not received');
}
