"use client"

import { useEffect } from 'react';
import './AnimateText.scss';




const splitTextToSpans = (targetElement) => {
    if (targetElement) {
        const text = targetElement.textContent;
        targetElement.innerHTML = '';
        for (let character of text) {
            const span = document.createElement('span');
            if (character === ' ') {
                span.innerHTML = '&nbsp;';
            } else {
                span.textContent = character;
            }
            targetElement.appendChild(span);
        }
    }
}




const AnimateText = ({text}) => {

    useEffect(() => {
        const target = document.getElementById('shimmerWave');
        splitTextToSpans(target);
    }, [])

    return ( 
        <div id="shimmerWave">{text}</div>
     );
}
 
export default AnimateText;