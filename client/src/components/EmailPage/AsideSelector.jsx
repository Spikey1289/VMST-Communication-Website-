import { useQuery} from '@apollo/client';
import { useState } from 'react';
import { QUERY_LEADERS, QUERY_WOG } from '../../utils/queries';
import getGroups from '../../utils/getGroups';
import {Button, Offcanvas} from 'react-bootstrap';

export default function AsideSelector({ register, errors }) {
    const { loading: leadersLoading, data: leadersData } = useQuery(QUERY_LEADERS);
    const { loading: membersLoading, data: membersData } = useQuery(QUERY_WOG);
    let members = membersData?.members || [];
    let leaders = leadersData?.getLeaders || [];

    (membersLoading) ? (console.log('yeet')) : (console.log(members));

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <>
            <Button type='button' onClick={handleShow}>Select Recipients</Button>

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Recipients</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <b>Leaders</b>
                    <ul style={{ listStyle: 'none', paddingLeft: 15}}>
                        {leadersLoading ? (
                            <li>...Loading Recipients</li>
                        ) : (leaders.map((leader) => {
                            return (
                                <li key={Math.random()} style={{ paddingRight: 5 }}>
                                    <input
                                        type="checkbox"
                                        value={leader._id}
                                        {...register("recipient")}
                                        style={{marginRight: 3}}
                                    />
                                    {leader.firstName} {leader.lastName}
                                </li>
                            )
                        }))}
                    </ul>
                    
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}