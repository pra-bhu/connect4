import clsx from "clsx"
import { CoinsTypes } from "../types/Coins"

interface InitProps{
    key: string
    id: string
    class: string
    handleClick: Function
    isInWinList:boolean
    isTargetCoin: boolean
    reset: boolean
}

export const coinStyle: {[key in CoinsTypes]:string} = {
    Empty: 'bg-[#cecece]',
    Blue: 'bg-blue-500 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-400 to-blue-600',
    Red: 'bg-red-500 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-400 to-red-600',
}

// border-radius: 50px;
// background: #e4e2e2;
// box-shadow: inset 20px 20px 60px #c2c0c0,
//             inset -20px -20px 60px #ffffff;

const styleClass= (props: InitProps) => clsx(
    `group-hover:scale-110 
    group-hover:drop-shadow-2xl 
    rounded-full  
    h-6 w-6 md:h-16 md:w-16 drop-shadow-xl
    border-t-2 border-r-2`,
    `shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]`,
    props.isTargetCoin && 'animate-heartBeat',
    props.isInWinList && 'animate-heartBeatInfinite',
    coinStyle[props.class as CoinsTypes])

export default function CoinPlaceholder(props: InitProps){
    
    return (<div 
                className = {styleClass(props)} 
                id = {props.id} 
                onClick = {() => props.handleClick(props.id)} />
            )
}