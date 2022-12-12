import React, { useEffect } from 'react';
import Timeline from '../../components/Timeline';
import Sidebar from './../../components/Sidebar/index';
import "./style.css"

const HomePage = () => {

    useEffect(() => {
        document.title = "Instagram";
    }, [])

    return (
        <div style={{marginTop: "10px"}}>
            <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg container1">
                <Timeline/>
                <div className="vl" style={{height: "100%"}}>
                    <Sidebar/>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
