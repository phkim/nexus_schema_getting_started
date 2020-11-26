"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __helpers_1 = require("./__helpers");
const ctx = __helpers_1.createTestContext();
it("ensure that a draft can be created and published", async () => {
    // Create a new draft
    const draftResult = await ctx.client.request(`
    mutation {
      createDraft(title: "Nexus", body: "..."){
        id
        title
        body
        published
      }
    }
  `);
    // Snapshot that draft and expect `published` to be false
    expect(draftResult).toMatchInlineSnapshot(`
    Object {
      "createDraft": Object {
        "body": "...",
        "id": 1,
        "published": false,
        "title": "Nexus",
      },
    }
  `);
    // Publish the previously created draft
    const publishResult = await ctx.client.request(`
    mutation publishDraft($draftId: Int!) {
      publish(draftId: $draftId) {
        id
        title
        body
        published
      }
    }
  `, { draftId: draftResult.createDraft.id });
    // Snapshot the published draft and expect `published` to be true
    expect(publishResult).toMatchInlineSnapshot(`
    Object {
      "publish": Object {
        "body": "...",
        "id": 1,
        "published": true,
        "title": "Nexus",
      },
    }
  `);
});
