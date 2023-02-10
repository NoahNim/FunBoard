import { Menu } from "../Menu/Menu";
import { Messages } from "../Messages/Messages";
import "./home.css"


export const Home = () => {
    return (
        <div>
            <div className="top-bar" >
                <div>

                </div>
                <div>
                    Funboard
                </div>
                <Menu />
            </div>
            <div className="main">
                <Messages />
            </div>
        </div>
    )
}