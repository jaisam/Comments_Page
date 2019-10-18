export interface Comment {
    userName: String,
    userImage: String,
    description: [
        {
            desc : String,
            editDate : Date
        }
    ],
    upvote : Number,
    downvote : Number,
    replies: [
        {
            userName: String,
            userImage: String,
            description: [
                {
                    desc : String,
                    editDate : Date
                }
            ],
            upvote : Number,
            downvote : Number,
            creationDate: Date
        }
    ],
    creationDate: Date
};