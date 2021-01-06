import {Route, Switch} from "react-router-dom";
import Users from "./components/users/Users";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";
import './App.css';


const ROUTES = [{path: '/', isExact: true, component: Users}, {path: '/posts/:id', isExact: false, component: Posts}, {path: '/post/:id', isExact: false, component: Post}]

export default function App (){
  return (
      <div className='main-wrapper'>
        <Switch>
          {ROUTES.map((route, index) =>  <Route path={route.path} exact={route.isExact} component={route.component} key={index}/> )}
        </Switch>
      </div>
  );
}
