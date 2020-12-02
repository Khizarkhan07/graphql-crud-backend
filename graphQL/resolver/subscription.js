const { pubsub } = require('../helper');
module.exports = {
    RootSubscription: {
        articleAdded: {
            subscribe(parent, args, ctx, info) {
                return pubsub.asyncIterator('newArticle') //Topic
            }
        }
    }
}