module.exports = async function assertRevert (promise) {
  try {
    await promise;
  } catch (error) {
    assert(
      error,
      "Expected revert, got '" + error + "' instead",
    );
    return;

    return;
  }
  assert.fail('Expected revert not received');
}
