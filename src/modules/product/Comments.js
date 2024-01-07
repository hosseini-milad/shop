import { useState } from "react"
import SimpleAuth from "../../components/simpleAuth"
import env, { siteApi } from "../../env"
import ReactStars from "react-rating-stars-component";
import LoginMenu from "../allPages/header/loginMenu";

function Comments(props){
    //console.log(props.productId)
    const token = JSON.parse(localStorage.getItem('token-oil'));
    const CommentList = SimpleAuth(siteApi+env.productCommentApi+props.productId)
    //console.log(CommentList)
    const[newComment,setNewComment] = useState({
        title:"",
        score:"normal",content:""})
    const[adv,setAdv] = useState([]);
    const[dis,setDis] = useState([]);
    const[error,setError] = useState();
    const addCommentFunction=(e)=>{
    console.log(token)
        const postBody={"title":newComment.title,
            "score":newComment.score,
            "content":newComment.content,
            "advantage":adv,
            "disadvantage":dis
            }
            const postOptions={
                method:'post',
                headers: { 'Content-Type': 'application/json',
                "Authorization": "Bearer "+token.token
             },
                  body:  JSON.stringify(postBody)
              }
           fetch(siteApi+env.productCommentAdd+props.productId,postOptions)
          .then(res => res.json())
          .then(
            (result) => {
              console.log(result)
              setError(result.data)
            },
            (error) => {
              console.log(error);
              setError("مشکلی در ثبت نظر بوجود آمد.")
            })
            console.log(postOptions)
    }
    //console.log(newComment.adv)
    
    const addComment=(field,value)=>{
        var state = newComment;
        //console.log(field,value)
        if(field ==="title")state.title = value;
        if(field === "content")state.content = value;
        if(field === "score")state.score = value;
        if(field === "adv")state.adv.push(value);
        setNewComment(state);
        //console.log(newComment.adv)
    }
    const starRating = {
        size: 15,
        count: 6,
        isHalf: false,
        value: 4,
        color: "#222",
        char: <i className="fa-star fa"></i>,
        activeColor: "#ffcc1c",
        onChange: newValue => {
            var newStar = '';
            switch(newValue){
                case 1: newStar = "verybad";break;
                case 2: newStar = "bad";break;
                case 3: newStar = "normal";break;
                case 4: newStar = "medium";break;
                case 5: newStar = "good";break;
                case 6: newStar = "verygood";break;
            }
          console.log(`new value is ${newStar}`);
          addComment("score",newStar)
        }
      };
    return(<>
        <h3>نظرات کاربران</h3>
        <div className="commentHolder">
        <div className="commentList">
            {CommentList.data&&CommentList.data.map(comment=>(
                <div className="comment" key={comment.payload.id}>
                    <h4>{comment.payload.title}</h4>
                    <i>{comment.payload.score}</i>
                    <div className="advantages">
                    نکات مثبت: 
                    <span>{comment.payload.advantage[0]}</span>
                    </div>
                    <div className="disadvantages">
                    نکات منفی: 
                    <span>{comment.payload.disadvantage[0]}</span>
                    </div>
                    <p>{comment.payload.content}</p>
                </div>
            ))}
            
        </div>
        <div className="newComment">
            <h4>نظر جدید</h4>
            {token&&<><div className="commentTitle">
                <input type="text" placeholder="عنوان" 
                    onChange={(e)=>{addComment("title",e.target.value)}}/>
                
                <div className="star">
                    <ReactStars {...starRating} />
                </div>
            </div>
            <div className="AdvDis">
                <div className="commentAdvanced">
                    <input type="text" placeholder="مزایای محصول"/>
                    <small onClick={(e)=>{
                        if(e.target.previousElementSibling.value!==''){
                        adv.push(e.target.previousElementSibling.value);
                        e.target.previousElementSibling.value= '';
                        setAdv([...adv])
                        }}}>+</small>
                    <ul>
                        {adv.map((comAdv,index)=>(
                            <li key={index}>{comAdv}</li>
                        ))}
                    </ul>
                </div>
                <div className="commentAdvanced">
                    <input type="text" placeholder="معایب محصول"/>
                    <small style={{backgroundColor:"orangered"}}
                    onClick={(e)=>{
                        if(e.target.previousElementSibling.value!==''){
                        dis.push(e.target.previousElementSibling.value);
                        e.target.previousElementSibling.value= '';
                        setDis([...dis])
                        }}}>+</small>
                        <ul>
                        {dis.map((comAdv,index)=>(
                            <li key={index}>{comAdv}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="commentContent">
                <textarea name="Text1" placeholder="متن نظر"
                onChange={(e)=>{addComment("content",e.target.value)}}
                rows="5"></textarea>
            </div>
            <button className="modal-sub-btn commentBtn" 
                    onClick={()=>addCommentFunction()}>ثبت نظر</button>
                    <label className="commentError">
                    {error}
                </label>
            </>}
            
            {!token&&<LoginMenu />}
        </div>
    </div>
        </>
    )
}
export default Comments