import React,{Component} from'react';
import {Link} from 'react-router-dom';

class Introduce extends Component{
    render(){
        return(
            <div>
                <h2>아카데미 소개 글입니다!</h2>

                <Link to="/">
                    <button>메인으로</button>
                </Link>
            </div>
        )
    }
}
export default Introduce;