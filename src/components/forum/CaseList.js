import React, {useEffect, useState} from "react";
import {makeAuthenticatedRequest} from "../../utils/middleware";
import CaseCard from "./CaseCard";
import ImageDetailModal from "../archive/dialog/ImageDetail";
import user from "../../auth/user";

export default function CaseList() {
    const [postList, setPostList] = useState([]);
    const [nextPageToGet, setNextPageToGet] = useState(0);
    const [allShown, setAllShown] = useState(false)

    const getPosts = () => {
        makeAuthenticatedRequest('GET', `/users/${user.username}/images?page=${nextPageToGet}`)
            .then(data => {
                setPostList(postList.concat(data))
                if (!data || data.length < 12) {
                    setAllShown(true)
                } else {
                    setNextPageToGet(nextPageToGet + 1)
                }
            });
    }

    useEffect(() => {
        getPosts()
    }, [])

    if (!postList) return <p>Loading...</p>

    return(
        <>
            {postList.map((datum) => {
                console.log("datum:", datum)
                return (
                    <CaseCard
                        file_id={datum.file_id}
                        name={datum.name}
                        date={datum.date}
                        description={datum.description}
                        model={datum.model}
                        poster={datum.uploader}
                        profilePic={datum.uploader_profile_pic}
                        job={datum.uploader_job}
                        risk_level={datum.risk_level}
                    />
                );
            })}
        </>
    )


}