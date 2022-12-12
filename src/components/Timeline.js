import React from 'react';
import Skeleton from "react-loading-skeleton";
import usePhotos from './../hooks/usePhotos';
import Post from './post/index';

const Timeline = () => {
    const { photos } = usePhotos();
    return (
        <div className="container col-span-2 flex">
            <div>
            {!photos ? (
                <>
                    <Skeleton count={1} width={640} height={400}
                        className="mb-5" 
                    />
                </>
            ) : photos?.length > 0 ? (
                photos.map((content) => (
                    <Post key={content.docId} content={content}/>
                ))
            ) : (
                <p className="text-2xl" style={{padding: "235px", textAlign: "center"}}>
                    No Follows!   
                </p>
            )}
            </div>
            <div style={{height: 'calc(100% - 4rem)', width: '1px', background: 'gray', marginLeft: '17px'}}></div> 
        </div>
    );
};

export default Timeline;
