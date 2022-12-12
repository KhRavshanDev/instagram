import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { getSuggestedProfiles } from './../../services/firebase';
import SuggestedProfile from './SuggestedProfile';

const Suggestions = ({ userId, following, loggedInUserDocId }) => {
    const [ profiles, setProfiles ] = useState(null);

    useEffect(() => {
        async function suggestedProfiles() {
            const response = await getSuggestedProfiles(userId, following);
            setProfiles(response);
        }

        if(userId) {
            suggestedProfiles();
        }
    }, [userId])
    return !profiles ? (
        <Skeleton count={1} height={150}/>
    ) : profiles.length ? (
        <div className="rounded flex flex-col">
            <div className="text-sm flex items-center align-items justify-between mt-2 mb-1">
                <p className="font-bold" style={{color:"gray"}}>
                    Recommendations for you
                </p>
            </div>
            <div className="mt-4 grid gap-5">
                {profiles.map((profile) =>
                    <SuggestedProfile
                        key={profile.docId}
                        profileImage={profile.avatarSrc}
                        profileDocId={profile.docId}
                        username={profile.username}
                        profileId={profile.userId}
                        userId={userId}
                        loggedInUserDocId={loggedInUserDocId}
                    />
                )}
            </div>
        </div>
    ) : null
};

export default Suggestions;
