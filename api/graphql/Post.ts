import { objectType, extendType, stringArg, intArg } from "@nexus/schema"

export const PostMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createDraft', {
      nullable: false,
      type: 'Post',
      args: {
        title: stringArg({ required: true }),
        body: stringArg({ required: true })
      },
      resolve(_, args, ctx) {
        const draft = {
          title: args.title,
          body: args.body,
          published: false
        }

        return ctx.db.post.create({ data: draft });
      }
    }),
      t.field('publish', {
        type: 'Post',
        args: {
          draftId: intArg({ required: true })
        },
        resolve(_, args, ctx) {
          return ctx.db.post.update({
            where: { id: args.draftId },
            data: {
              published: true
            }
          })
        },
      })
  },
})

export const PostQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('drafts', {
      nullable: false,
      type: 'Post',
      list: true,
      resolve: (_, _args, ctx) => {
        return ctx.db.post.findMany({ where: { published: false } })
      },
    }),
      t.field('posts', {
        nullable: false,
        type: 'Post',
        list: true,
        resolve: (_, args, ctx) => {
          return ctx.db.post.findMany({ where: { published: true } })
        }
      })
  }
})

export const Post = objectType({
  name: 'Post',
  definition(t) {
    t.int('id')
    t.string('title')
    t.string('body')
    t.boolean('published')
  }
})
