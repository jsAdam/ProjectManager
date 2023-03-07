import "../../App.css";
import React, { useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUserCircle} from '@fortawesome/free-regular-svg-icons';

import OpenCard from "./openCard";

export default function Board() {
    const [currentCard, setCurrentCard] = React.useState({
        ID: -1,
        selected: false
    });
    //const { boardId } = route.params;
    let testListData = [
        {
            id: 0,
            name: "To do",
            cards: [
                {
                    title: "Need to do thing 1",
                    description: "More information describing card",
                    id: 0
                },
                {
                    title: "Need to do thing 1",
                    description: "More information describing card",
                    id: 1
                },
                {
                    title: "Need to do thing 1",
                    description: "More information describing card",
                    id: 2
                }
            ]
        },
        {
            id: 1,
            name: "Doing",
            cards: [
                {
                    title: "Need to do thing 1",
                    description: "More information describing card",
                    id: 0
                }
            ]
        },
        {
            id: 2,
            name: "Done",
            cards: [
                {
                    title: "Need to do thing 1",
                    description: "More information describing card",
                    id: 0
                },
                {
                    title: "Need to do thing 1",
                    description: "More information describing card",
                    id: 1
                }
            ]
        }
    ];
    
    let lists = testListData.map((obj, index) => {
        let cards = obj.cards.map((card, cardIndex) => {
            return (
                <div key={cardIndex} className="card bg-dark text-white p-2 mb-2" onClick={() => setCurrentCard(card.id, true)}>
                    <h6>{card.title}</h6>
                    <p>{card.description.length <= 20 ? card.description : card.description.slice(17)}</p>
                </div>
            )
        });

        return (
            <div key={index} className="list bg-light rounded m-1 p-2">
                <div className="list-header">
                    {obj.name}
                </div>
                <div className="list-cards py-3">
                    {cards}
                </div>
                <div className="add-card">
                    <button className="btn btn-primary">Add Card</button>
                </div>
            </div>
        )
    });

    return (
        <div className="board h-100">
            <div>
                <div className="board__header bg-light p-1">
                    <h5>New Board</h5>
                </div>
                <div className="board__content d-flex p-2">
                    {lists}
                </div>
            </div>
            {
                currentCard.selected ? <OpenCard cardID={currentCard.ID}></OpenCard> : ""
            }
        </div>
    );
}

// export default function TestBoard() {
//     let testListData = [
//         {
//             id: 0,
//             name: "To do",
//             cards: [
//                 {
//                     title: "Need to do thing 1",
//                     description: "More information describing card"
//                 }
//             ]
//         }
//     ];
// }