import './Category.css'
import { Link } from 'react-router-dom';

function Category(props) {
    return (
        <div className='wrapper cover'>
            <Link to={`/category/${props.id}`} >
                <p className='category-text'>{props.name}</p>
                <img  src= {props.image}/>
            </Link>
            
        </div>
        
    )
}

export default Category;