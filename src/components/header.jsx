import React from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import {BrowserRouter as Router, Route,Link} from 'react-router-dom'
import './header.sass'
import {uploadNote} from 'state/actions/edit-mode.js'
import CreatePostHeader from 'components/create-post-header.jsx'
//import {lovePost} from 'state/posts.js'

class Header extends React.Component {
	constructor(props) {
		super(props)
	}
	componentWillMount() {
		
	}
	render() {
		//let scriptDom = props.content.map( (s,index) => <div>{s}</div>) || []
		return (
			<header>
				<div className="info-container">
					{this.props.editMode && <CreatePostHeader/>}
				</div>
			</header>
		)
	}
}

export default connect( state => (
		{
			content: state.editMode.content,
			textContent: state.editMode.textContent,
			loading: state.editMode.loading,
			editMode: state.editMode.editMode
		}
	))(Header)