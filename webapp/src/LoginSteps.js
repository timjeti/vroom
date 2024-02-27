import {React, useState} from 'react';
import { CheckCircleOutlined, LoginOutlined, ProfileOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Divider, Steps } from 'antd';
import UserLogin from './UserLogin';
import UserDetailsFill from './UserDetailsFill';
import FinishStep from './FinishStep';
import { useSelector } from 'react-redux';





const LoginSteps = () => {

    const [current, setCurrent] =  useState(0)
    const loginVal = useSelector((state) => state.userLoginState.data)
    const useDetailsVal = useSelector((state) => state.userDetailsState.data)
    const forms = [
        <UserLogin setCurrent = {setCurrent} initialVal = {loginVal}/>,
        <UserDetailsFill setCurrent = {setCurrent} initialVal = {useDetailsVal} userPayload = {loginVal}/>,
        <FinishStep/>
    ]
    const isStepDisabled = (stepNum) => {
        if(stepNum === 0){
            return false
        }else if (stepNum === 1){
            return loginVal === null
        }else if (stepNum === 2){
            return loginVal === null || useDetailsVal == null
        }

    }
    return (

        <div className="test">
            <Steps style={{padding: "32px 16px"}} onChange={setCurrent} current={current}>
                <Steps.Step disabled={isStepDisabled(0)} title='Login' icon={<LoginOutlined/>}></Steps.Step>
                <Steps.Step disabled={isStepDisabled(1)} title='Profile' icon={<ProfileOutlined/>}></Steps.Step>
                <Steps.Step disabled={isStepDisabled(2)} title='Finish' icon={<CheckCircleOutlined/>}></Steps.Step>
            </Steps>
            {forms[current]}
        </div>
    )
  
    };
export default LoginSteps;
