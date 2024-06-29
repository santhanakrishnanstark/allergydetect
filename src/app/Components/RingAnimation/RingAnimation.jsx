import './RingAnimation.scss';

// import styles from './RingAnimation.module.scss';

const RingAnimation = () => {

    const style = {
        '--clr': '#00ff0a'
      };

    return (
        <div className={"ring"}>
            <i style={style} ></i>
            <i style={style}></i>
            <i style={style}></i>
        </div>
     );
}
 
export default RingAnimation;