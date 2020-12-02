/* building GraphQL Schema */
module.exports = `

  type Article {
    _id: ID!
    title: String!
    body: String!
    createdAt: String!
  }
  type RootSubscription {
    articleAdded: Article    
  }
   
  input ArticleInput {
    title: String!
    body: String!
  }

  type RootQuery {
    articles:[Article!]
    singleArticle(id: ID!): Article
  }

  type RootMutation {
    createArticle(article:ArticleInput): Article  
    deleteArticle(id: ID!): [Article]
    updateArticle(id: ID! , article: ArticleInput): Article
  }
 
  schema {
    query: RootQuery
    mutation: RootMutation
    subscription: RootSubscription
  }
`;