const axios = require("axios");
const API_URL = process.env.API_URL;

exports.getPosts = async (req, res) => {
    try {
        const type = req.query.type;
        
        const postsResponse = await axios.get(`${API_URL}/users/1/posts`);
        let posts = postsResponse.data.posts;

        if (type === "popular") {
            const commentsResponse = await axios.get(`${API_URL}/posts/150/comments`);
            const comments = commentsResponse.data.comments;

            const commentCount = {};
            comments.forEach(comment => {
                commentCount[comment.postid] = (commentCount[comment.postid] || 0) + 1;
            });

            posts = posts.sort((a, b) => (commentCount[b.id] || 0) - (commentCount[a.id] || 0));
        } else {
            posts = posts.slice(-5); 
        }

        res.json({ posts });
    } catch (error) {
        res.status(500).json({ error: "Error fetching posts" });
    }
};
