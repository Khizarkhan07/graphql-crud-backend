const userModels = require('../../model/users');
const { pubsub } = require('../helper');

module.exports = {
    RootMutation: {
        createArticle: async(parent, args, ctx, info) => {
            try {
                console.log(args)
                const { title, body } = args.article
                const article = new userModels({
                    title,
                    body,
                })
                const newArticle = await article.save()
                await pubsub.publish('newArticle', {articleAdded: {...newArticle._doc, _id: newArticle.id}});
                return { ...newArticle._doc, _id: newArticle.id }
            } catch (error) {
                throw error
            }
        },
        deleteArticle: async(parent, args, ctx, info) => {
            try {
                const { id } = args
                console.log(id);
                await userModels.deleteOne({ _id: id });
                const articlesFetched = await userModels.find()

                return articlesFetched.map(article => {
                    return {
                        ...article._doc,
                        _id: article.id,
                        createdAt: new Date(article._doc.createdAt).toISOString(),
                    }
                })
            }
            catch (error) {
                throw error
            }
        },

        updateArticle: async(parent, args, ctx, info) => {
            try {
                const  {id, article} = args;
                const  {title, body} = article;
                const newArticle = await userModels.findByIdAndUpdate(id, {title: title, body: body} )
                return { ...newArticle._doc, _id: newArticle.id }
            }
            catch (error) {
                throw error
            }
        },
    }
}