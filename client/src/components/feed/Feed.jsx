import {useState, useEffect} from 'react'
import Share from '../share/Share'
import Post from '../post/Post'
import axios from "axios"
import "./feed.css"

export default function Feed({username}) {

    const [posts,setPosts] = useState([])

    useEffect(()=>{
        const fetchPost = async()=>{
            const res = username 
            ? await axios.get("/posts/profile/" + username)             
            : await axios.get("/posts/timeline/618ee2496208b31e10ae0796")
            setPosts(res.data)
        }

        fetchPost()

    },[username])


    return (
        <div className="feed">
            <Share/>

            {posts.map(p=>
                
                <Post key={p._id} post={p}/>
            )}
        </div>
    )
}
