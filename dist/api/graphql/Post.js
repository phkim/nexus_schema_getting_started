"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = exports.PostQuery = exports.PostMutation = void 0;
const schema_1 = require("@nexus/schema");
exports.PostMutation = schema_1.extendType({
    type: 'Mutation',
    definition(t) {
        t.field('createDraft', {
            nullable: false,
            type: 'Post',
            args: {
                title: schema_1.stringArg({ required: true }),
                body: schema_1.stringArg({ required: true })
            },
            resolve(_, args, ctx) {
                const draft = {
                    id: ctx.db.posts.length + 1,
                    title: args.title,
                    body: args.body,
                    published: false
                };
                ctx.db.posts.push(draft);
                return draft;
            }
        }),
            t.field('publish', {
                type: 'Post',
                args: {
                    draftId: schema_1.intArg({ required: true })
                },
                resolve(_, args, ctx) {
                    let draftToPublish = ctx.db.posts.find(p => p.id === args.draftId);
                    if (!draftToPublish) {
                        throw new Error('Could not find draft with id ' + args.draftId);
                    }
                    draftToPublish.published = true;
                    return draftToPublish;
                },
            });
    },
});
exports.PostQuery = schema_1.extendType({
    type: 'Query',
    definition(t) {
        t.field('drafts', {
            nullable: false,
            type: 'Post',
            list: true,
            resolve: (_, _args, ctx) => {
                return ctx.db.posts.filter(p => p.published === false);
            },
        }),
            t.field('posts', {
                nullable: false,
                type: 'Post',
                list: true,
                resolve: (_, args, ctx) => {
                    return ctx.db.posts.filter(p => p.published === true);
                }
            });
    }
});
exports.Post = schema_1.objectType({
    name: 'Post',
    definition(t) {
        t.int('id');
        t.string('title');
        t.string('body');
        t.boolean('published');
    }
});
