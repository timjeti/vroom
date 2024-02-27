import { useNavigate } from 'react-router-dom';
import { Button} from 'antd';

const FinishStep =() => {

    const navigate = useNavigate()
    const onFinish = () =>{
        navigate('/usermanager')
    }

    return (
        <div className='content'>
            <h1>You have been successfully boarded</h1>
            <Button type="primary" onClick={onFinish}>Finish</Button>
        </div>
        
        
        
    )
}

export default FinishStep;