import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';

export default function CardComment(props) {
    let date = new Date(parseInt(props.timestamp));
    let currentDate = new Date();

    let dateDisplayText = "";

    let dayInMilliseconds = 86400000;
    
    if(props.timestamp < currentDate.getTime() - dayInMilliseconds) {
        dateDisplayText = `${date.getMonth()+1}/${date.getDay()+1}/${date.getFullYear()}`;
    } else {
        if(date.getDay() !== currentDate.getDay()) {
            dateDisplayText = "Yesterday";
        } else if(date.getHours() !== currentDate.getHours()) {
            dateDisplayText = (currentDate.getHours() - date.getHours()) + " hours ago";
        } else {
            dateDisplayText = (currentDate.getMinutes() - date.getMinutes()) + " minutes ago";
        }
    }

    return (
        <div className="comment position-relative">
            <FontAwesomeIcon className="open_card__icon" icon={faUserCircle} />
            <div className="comment__creator">
                <h5 className="comment__user">{props.user}</h5>
                <p className="comment__date">{dateDisplayText}</p>
            </div>
            <div className="comment__description">
                Here is a comment <a href="#here">Another card link</a>
            </div>
            <div className="comment__actions">
                <a href="#here">Edit</a>
                • 
                <a href="#here">Delete</a>
            </div>
        </div>
    )
}