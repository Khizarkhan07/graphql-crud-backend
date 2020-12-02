const userModels = require('../../model/users');

module.exports = {
    RootQuery: {
        articles: async(parent, args, ctx, info) => {
            try {
                const articlesFetched = await userModels.find()
                return articlesFetched.map(article => {
                    return {
                        ...article._doc,
                        _id: article.id,
                        createdAt: new Date(article._doc.createdAt).toISOString(),
                    }
                })
            } catch (error) {
                throw error
            }
        },

        singleArticle: async(parent, args, ctx, info) => {
            try {
                const {id} = args

                const newArticle = await userModels.findById(id)
                return { ...newArticle._doc, _id: newArticle.id }
            } catch (error) {
                throw error
            }
        },
    }
}