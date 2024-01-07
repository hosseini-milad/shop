const { default: env } = require("../../env");

function MainDesc(){
    return(
        <div className="shopDesc">
            <div className="shopText">
                <h1 className="shopTitle">
                    ریبون
                </h1>
                <p>
                    توضیحات مختصر از ریبون توضیحات مختصر از ریبون 
                    توضیحات مختصر از ریبون توضیحات مختصر از ریبون 
                    توضیحات مختصر از ریبون 
                </p>
            </div>
            <div className="shopImg">
                <img src={env.siteUrl+"/images/static/category.png"} />
            </div>
        </div>
    )
}
export default MainDesc