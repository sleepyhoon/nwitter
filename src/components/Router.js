import { HashRouter as Router, Route, Switch} from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import App from "./App";
import Navigation from "./Navigation";
import Profile from "../routes/Profile";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
const AppRouter = ({isLoggedIn}) => {
    return (
        <Router>
            {isLoggedIn && <Navigation />}
            <Switch>
                {isLoggedIn ? (
                <>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/profile">
                    <Profile />
                </Route>
                </>
            ) : (
                <>
                <Route exact path="/">
                    <Auth/>
                </Route>
                </>
            )}
            </Switch>
        </Router>
    );
};
export default AppRouter;