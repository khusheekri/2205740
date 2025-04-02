const axios = require("axios");
const API_URL = process.env.API_URL;

exports.getTopUsers = async (req, res) => {
    try {
        const response = await axios.get(`${API_URL}/users`);
        const users = response.data.users;

      
        const postsResponse = await axios.get(`${API_URL}/users/1/posts`);
        const posts = postsResponse.data.posts;

        const userPostCount = {};
        posts.forEach(post => {
            userPostCount[post.userid] = (userPostCount[post.userid] || 0) + 1;
        });

        const topUsers = Object.keys(userPostCount)
            .sort((a, b) => userPostCount[b] - userPostCount[a])
            .slice(0, 5)
            .map(id => ({ id, name: users[id], postCount: userPostCount[id] }));

        res.json({ topUsers });
    } catch (error) {
        res.status(500).json({ error: "Error fetching data" });
    }
};
