import User from "../models/User.js";

/* READ */
export const getUser = async (req, res) => {
    try{
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    }catch(err){
        res.status(404).json({message: err.message})
    }
}

export const getFollowing = async (req, res) => {
    try{
        const { id } = req.params;
        const user = await User.findById(id);

        const followed = await Promise.all(
            user.following.map((id) => User.findById(id))
        );

        const formatedFollowed = await followed.map(({ _id, firstName, email }) => {
            return {_id, firstName, email}
        })
        res.status(200).json(formatedFollowed);
    }catch(err){
        res.status(404).json({ error: err.message })
    }
}

export const getFollowers = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        const followers = await Promise.all(
            user.followers.map((id) => User.findById(id))
        );

        const formatedFollowers = await followers.map(({_id, firstName, email }) => {
            return {_id, firstName, email };
        }) 
        res.status(200).json(formatedFollowers);
    }catch (err){
        res.status(404).json({ error: err.message })
    }
}

/* UPDATE */
export const followOrUnfollow = async (req, res) => {
    try{
        const {id, followedId} = req.params;

        const user = await User.findById(id);
        const followed = await User.findById(followedId);

        if(user.following.includes(followedId)){
            user.following.pull(followed.id)
            followed.followers.pull(user.id);
        }else{
            user.following.push(followed.id);
            followed.followers.push(user.id);
        }
        await user.save()
        await followed.save()


        const userFollowing = await Promise.all(
            user.following.map((id) => User.findById(id))
        );

        const followedFollowers = await Promise.all(
            followed.followers.map((id) => User.findById(id))
        )

        res.status(200).json({ userFollowing, followedFollowers })
    }catch(err){
        res.status(404).json({ error: err.message })
    }
}
