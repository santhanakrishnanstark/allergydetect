"use client"
// DraggableDrawer.jsx

import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import './DragableDrawer.scss';

const DraggableDrawer = ({children, at, onClose}) => {


    const windowHeight = window.innerHeight;

    const [initialY] = useState(windowHeight); // Starting position
    const [currentPostion, setCurrentPosition] = useState();

  const [{ y }, set] = useSpring(() => ({ y: initialY})); // Initial drawer position

  useEffect(() => {
    // Animate to open state on mount
    set({ y: 150 });
  }, [set]);

  const bind = useDrag(({ down, movement: [, my], memo = y.get() }) => {
    if (!down) {
      // Snap to top or bottom on release
      console.log('********** TOP/Bottom Scroll : ', my+memo, (windowHeight - 50));
      if (my + memo < 200) {
        set({ y: 0 }); // Fully visible
        setCurrentPosition('fully-visible');
      } else {
        setCurrentPosition('visible');
        // if bottom swipe is close to window height before 50px then close the drawer
        if(my+memo > (windowHeight - 50)) {
            set({ y: windowHeight }); // Hidden
            setCurrentPosition('');
            onClose();
        }
      }
    } else {
      setCurrentPosition('on-drag');
      set({ y: my + memo });
    }   
    return memo;
  });

  return (
    <animated.div
      className={`drawer ${at} ${currentPostion}`}
      {...bind()}
      style={{ y }}
    >
      <div className="drawer-handle"></div>
      <div className="drawer-content">
        {children}
      </div>
    </animated.div>
  );
};

export default DraggableDrawer;
