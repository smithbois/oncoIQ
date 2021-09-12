import React, {useEffect, useState} from 'react';

import user from "../utils/user";
import domain from "../utils/site-domain";
import ImageDetailModal from "./ImageDetail";
import {Button, FormControl, FormLabel, Row} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFilter, faSearch, faSort} from '@fortawesome/free-solid-svg-icons'
import {makeAuthenticatedRequest} from "../utils/middleware";

export default function Archive() {
    const [imgList, setImgList] = useState(null);

    useEffect(() => {
        makeAuthenticatedRequest('GET', '/images')
            .then(data => {
                setImgList(data);
            });
    }, []);

    if (!imgList) return <p>Loading...</p>
    // TODO: Separate the search box and button from the filter and sort buttons
    // TODO: Add search, filter, sort, functionality
    // TODO: Implement lazy loading (Load more button should display after each set of 12)
    return (
        <div className="container text-center mt-5">
            <h3>My Image Archive</h3>
            <p>Click or tap on a histology to view its details</p>
            <br />
            <Row className='search-row'>
                <div className='form-outline'>
                    <FormControl type="search" id="searchForm" placeholder="Search"/>
                </div>
                <Button variant='light'><FontAwesomeIcon icon={faSearch} /></Button>
                <div className='justify-content-end'>
                    <Button variant='light'><FontAwesomeIcon icon={faFilter} /></Button>
                    <Button variant='light'><FontAwesomeIcon icon={faSort} /></Button>
                </div>
            </Row>
            <div className="archive-gallery container d-flex flex-wrap mt-4">
                {console.log(imgList)}
                {imgList.map((datum) => {
                    console.log("datum:", datum)
                    return (
                        <ImageDetailModal
                            file_id={datum.file_id}
                            image_id={datum.image_id}
                            name={datum.name}
                            date={datum.date}
                            risk_level={datum.risk_level}
                            model={datum.model}
                        />
                    );
                })}
            </div>
            <div className='flex-grow-1 justify-content-center mt-4'>
                <Button variant='outline-primary'>View More</Button>
            </div>
        </div>
    );
}
