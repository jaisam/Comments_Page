export interface Comment {
    userName: String,
    userImage: String,
    description: String,
    upvote : Number,
    downvote : Number,
    replies: [String],
    creationDate: Date
};