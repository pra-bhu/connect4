import { APP_NAME } from "../constants"

export default function Header() {
        return (
            <div className ="flex justify-around md:text-6xl text-3xl">
                <h1 className="pt-3 m-0 self-center font-mono">{APP_NAME}</h1>
                
                <a className="self-end" href = "https://en.wikipedia.org/wiki/Connect_Four#Gameplay" target = "_blank" rel="noopener noreferrer">
                <img className = "w-10 h-10 md:w-16 md:h-16" src={"https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-help-outline-512.png"} alt="Know the rules"/>
                </a>
            </div>

        );
}