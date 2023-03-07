import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-regular-svg-icons';

export default function Verify() {
    const [verified, setVerified] = React.useState(false);
    const routeParams = useParams();

    /*useEffect(() => {
        async function fetchData() {
            await fetch("http://localhost:5000/users/verify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(routeParams)
            })
            .catch(error => {
                window.alert(error);
                return;
            })
        }
    })*/

    return (
        <div className={"verify-window " + (verified ? '' : 'loading')}>
            {
                verified ? <FontAwesomeIcon className='' icon={faCircle} /> : <div>Verified!</div>
            }
        </div>
    )
}