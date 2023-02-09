import { Menu } from "../Menu/Menu";
import "./home.css"
import { useAppSelector } from "../../redux/app/store";


export const Home = () => {
    const sessionUser = useAppSelector((state) => state?.auth?.user);

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
            <div>

            </div>
        </div>
    )
}