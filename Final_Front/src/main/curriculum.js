import React,{Component} from'react';
import {Link} from 'react-router-dom';


class curriculum extends Component{
    render(){
        return(
            <div>
                <h2>교육과정 소개 페이지입니다!</h2>

                <Link to="/">
                    <button>메인으로</button>
                </Link>
            </div>
        )
    }
}
export default curriculum;