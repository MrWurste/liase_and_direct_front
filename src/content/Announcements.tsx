import React, { useState, useEffect } from "react";
import axios from "../api/axios";

const Announcement = () => {
    const token = localStorage.getItem("token");

    const [announcements, setAnnouncements] = useState<Announcement[]>([]);

    type Announcement = {
        title: string,
        body: string
    }

    const GetAnnouncemets = async () => {
        try {
            const response = await axios.get(
                "/announcements",
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    withCredentials: true
                }
            );
            if (announcements) {
                const newAnn = [...announcements];
                var count = Object.keys(response.data).length;
                for (let i = 0; i < count; i++) {
                    newAnn.push(response.data[i]);
                }
                //newMessages.push(response.data);
                setAnnouncements(newAnn);
                console.log(newAnn);
            }
        }
        catch { }
    }

    useEffect(() => {
        let i = false;
        if (!i) GetAnnouncemets()
        return () => { i = true }
    }, []);

    return (
        <section className="AnnouncementContainer">
            <span className="ListA">
                <h1>Ogłoszenia: </h1>
                <ul>
                    {announcements.map(({ title, body }: any) => {
                        return <li key={title}>
                            <h3>{title}</h3>
                            <span>{body}</span>
                        </li>
                    })}
                </ul>
            </span>
        </section>
    )
}

export default Announcement;