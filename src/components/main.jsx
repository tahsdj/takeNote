import React from 'react'
import ReactDOM from 'react-dom'
import {compose, applyMiddleware, createStore, combineReducers} from 'redux'
import {BrowserRouter as Router, Route,Link} from 'react-router-dom'
import {Provider} from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import './main.sass'
import PostsContainer from 'components/posts-container.jsx'
import editMode from 'state/reducers/edit-mode.js'
import notesOverview from 'state/reducers/notes-overview.js'
import EditPost from 'components/edit-post.jsx'
import CreatePostHeader from 'components/create-post-header.jsx'
import Header from 'components/header.jsx'

export default class Main extends React.Component{
	constructor(props) {
		super(props)
	}
	componentWillMount() {
		this.store = createStore(combineReducers({
			editMode, notesOverview
		}),compose(applyMiddleware(thunkMiddleware)))
		let _this = this
		this.store.subscribe(() => {
			console.log(_this.store.getState());
		})
		//getPostsData()
	}
	render() {
		return (
			<Provider store = {this.store} >
				<Router>
					<div id='main-screen-container'>
						<div id="background">
						</div>
						<Header/>
						<Route exact path = "/" render={()=><PostsContainer/>}/>
						<Route exact path = "/create" render={()=><EditPost/>}/>
						<Route exact path = "/edit" render={()=><EditPost/>}/>
					</div>
				</Router>
			</Provider>
		)
	}
}

/*
const CreatePostHeader = (props) => {
	return (
		<div id="create-header-container">
			<h3>新筆記</h3>
			<div className="send-icon">
				<img src="icons/send.png"/>
			</div>
		</div>
	)
}
*/