import {Html,useProgress} from '@react-three/drei'
import {useEffect,useState} from 'react'

const CanvasLoader = () => {
    const {progress} = useProgress()
    const [isVisible, setIsVisible] = useState(true);
// ...
  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => setIsVisible(false), 500); // Delay removal by 500ms
      return () => clearTimeout(timer); // Clear timeout if component unmounts early
    }
  }, [progress]);

  if (!isVisible) return null;
//   ...
    return(
        <Html 
           as="div"
           center
           style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
           }}
        >
            <span className='canvas-loader' />
            <p style={{fontSize:14,color:'#F1F1F1',fontWeight:800,marginTop:40}}>
                {progress !== 0 ? `${progress.toFixed(2)}%` : 'Loading...'}
            </p>
        </Html>   
    );
    };
    export default CanvasLoader;