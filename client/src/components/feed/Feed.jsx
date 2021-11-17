import {useState, useEffect, useContext} from 'react'
import Share from '../share/Share'
import Post from '../post/Post'
import axios from "axios"
import "./feed.css"
import { AuthContext } from '../../context/AuthContext'


export default function Feed({username}) {

    const [posts,setPosts] = useState([])
    const {user, isPosted} = useContext(AuthContext)

    useEffect(()=>{
        const fetchPost = async()=>{
            const res = username 
            ? await axios.get("/posts/profile/" + username)             
            : await axios.get("/posts/timeline/" + user._id)
            setPosts(res.data.sort((a, b)=>
                new Date(b.createdAt) - new Date(a.createdAt)
            ))
            
        }

        fetchPost()

    },[username, user._id, isPosted])

    // useEffect(() => {
    //    console.log("posted")
    // }, [isPosted])

    
    

    return (
        <div className="feed">
            { (user.username === username || !username) &&  <Share/>}

            {posts.map(p=>
                
                <Post key={p._id} post={p}/>
            )}
        </div>
    )
}
