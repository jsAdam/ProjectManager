import React, { useState, useRef, useEffect } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowMaximize, faUserCircle, faFileText, faComments, faEnvelope, faIdCard, faXmarkCircle } from '@fortawesome/free-regular-svg-icons';
import TextareaAutosize from 'react-textarea-autosize';

import CardComment from "./cardComment";

function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
            ref.current.classList.remove("focused");
        } else {
            ref.current.classList.add("focused");
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

export default function OpenCard() {
    const [commentFocused, setCommentFocused] = React.useState(false);
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    let cardData = {
        title: "Title of card",
        description: "Here is the description of the card",
        attachments: [],
        members: [],
        labels: [],
        comments: [
            {
                user: "userID",
                content: "",
                timestamp: "1672547911196"
            }
        ],
        activity: [
            {
                user: "userID",
                message: "added this card to To Do",
                timestamp: "1672547511196"
            }
        ]
    };

    let comments = cardData.comments.map((comment, idx) => {
        return (<CardComment timestamp={comment.timestamp} user={comment.user} key={idx}></CardComment>);
    });

    function commentBoxClick(e) {
        setCommentFocused(true);
    }

    return (
        <div className="open_card">
            <div className="open_card__close">
                <FontAwesomeIcon icon={faXmarkCircle}></FontAwesomeIcon>
            </div>
            <div className="open_card__header">
                <FontAwesomeIcon className="open_card__icon" icon={faWindowMaximize} />
                <h5>{cardData.title}</h5>
            </div>
            <div className="open_card__main">
                <div className="open_card__details mb-3">
                    <div className="open_card__detail">
                        <p>Members</p>
                        <div className="member-list">
                            <div className="member-list__member">
                                <FontAwesomeIcon icon={faUserCircle} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="open_card__description card_module mb-3">
                    <div className="card_module__header">
                        <FontAwesomeIcon className="open_card__icon" icon={faFileText} />
                        <h6>Description</h6>
                    </div>
                    {cardData.description}
                </div>
                <div className="open_card__attachments card_module mb-3">
                    <div className="card_module__header">
                        <FontAwesomeIcon className="open_card__icon" icon={faEnvelope} />
                        <h6>Attachments</h6>
                    </div>
                </div>
                <div className="open_card__activity card_module">
                    <div className="card_module__header">
                        <FontAwesomeIcon className="open_card__icon" icon={faComments} />
                        <h6>Activity</h6>
                    </div>
                    <div className="new_comment" onClick={commentBoxClick} ref={wrapperRef}>
                        <FontAwesomeIcon className="open_card__icon" icon={faUserCircle} />
                        <div className="comment_box">
                            <form>
                                <TextareaAutosize className="comment_box__input" />
                                <div className="row align-items-center">
                                    <div className="comment_box__controls col-6">
                                        <button type="submit" className="btn btn-primary" disabled>Add</button>
                                    </div>
                                    <div className="comment_box__actions col-6 justify-content-end">
                                        <a className="comment_box__action p-2" href="#">
                                            <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
                                        </a>
                                        <a className="comment_box__action p-2" href="#">
                                            @
                                        </a>
                                        <a className="comment_box__action p-2" href="#">
                                            <FontAwesomeIcon icon={faIdCard}></FontAwesomeIcon>
                                        </a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    {comments}
                </div>
            </div>
            <div className="open_card__sidebar">

            </div>
        </div>
    )
}