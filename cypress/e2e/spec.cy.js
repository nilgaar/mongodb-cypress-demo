var assert = require("assert");

describe("empty spec", () => {
  it("passes", () => {
    const coll = "testcollection";
    cy.visit("https://example.cypress.io")
      .mongoInsertOne(coll, {
        testkey: "testvalue",
      })
      .then((res) => {
        assert.ok(res.acknowledged);
      })
      .mongoFindOne(coll, { testkey: "testvalue" })
      .then((res) => {
        assert.ok(res._id);
      })
      .mongoUpdateOne(
        coll,
        { testkey: "testvalue" },
        { $set: { testkey: "newtestvalue" } }
      )
      .then((res) => {
        assert.equal(res.modifiedCount, 1);
      })
      .mongoDeleteOne(coll, { testkey: "newtestvalue" })
      .then((res) => {
        assert.equal(res.deletedCount, 1);
      })
      .mongoInsertMany(coll, [
        {
          testkey: "testvalue2",
        },
        {
          testkey: "testvalue3",
        },
      ])
      .then((res) => {
        assert.ok(res.acknowledged);
        assert.equal(res.insertedCount, 2);
      })
      .mongoFindMany(coll, { testkey: { $regex: "testvalue?" } })
      .then((res) => {})
      .mongoUpdateMany(
        coll,
        { testkey: { $regex: "testvalue?" } },
        { $set: { testkey: "newtestvalue" } }
      )
      .mongoDeleteMany(coll, { testkey: { $regex: "newtestvalue" } })
      .then((res) => {
        assert.equal(res.deletedCount, 2);
      });
  });
});
