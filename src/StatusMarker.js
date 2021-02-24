import React, { useEffect, useRef } from 'react';
import './style.css';

/* Common functions */
const getTotalProgressValue = (progressList) => {
    let progress = 0;
    if(progressList){
        progressList.forEach(element => {
            progress+=element.status;
        })
    }
    return progress;
}

const convertPercentToDegrees = (percent) => {
    return (percent * 360) / 100;
}
const convertDegreeToRadian = (degree) => {
    return Math.PI / 180 * degree;
}

const StatusMarker = ({progressList}) => {
    const refContainer = useRef(null);

    useEffect(() => {
        updateCanvas(progressList);
    },[progressList])

    const updateCanvas = (progressList) => {
        let totalProgressValue = getTotalProgressValue(progressList);
        let endDegree = convertPercentToDegrees(totalProgressValue);
        let endRadians = convertDegreeToRadian(endDegree);

        let ctx = refContainer.current.getContext('2d');
        let xPosition = 24;

        ctx.clearRect(0, 0, 80, 160);
        if(totalProgressValue === 100){
            ctx.beginPath();
            ctx.arc(40, 35, 25, 0, 2 * Math.PI);
            ctx.fill();
            ctx.fillStyle = "white";
        }
        else if(endRadians){
            ctx.beginPath();
            ctx.lineWidth = 7;
            ctx.arc(40, 35, 25, 1.5 * Math.PI, 1.5 * Math.PI + endRadians);
            ctx.stroke();
        }

        ctx.font = "14px Arial";
        ctx.fillText(`${totalProgressValue}%`, xPosition, 40); 
    }

    return (
        <div className="status-marker" onLoad={() => "onload"}>
            <canvas ref={refContainer} width={80} height={70}/>
        </div>
    )
}


export default StatusMarker;