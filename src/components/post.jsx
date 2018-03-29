import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route,Link} from 'react-router-dom'
import {connect} from 'react-redux'
import './post.sass'
import EditPost from 'components/edit-post.jsx'
import {enterCreateMode} from 'state/actions/edit-mode.js'
import {deleteNote} from 'state/actions/notes-overview.js'

class Post extends React.Component{
	constructor(props) {
		super(props)
	}
	componentWillMount() {
		//this.props.dispatch(getNotes())
		//document.getElementById("editor").innerHTML = this.props.content
	}
	componetDidUpdate() {
	}
	render() {
		
		let scriptDom = (this.props.textContent && this.props.textContent.map( (s,index) => {
			return index < 6 && <p key={'p'+index}>{s}</p>
		})) || []
		if (scriptDom.length > 6) scriptDom = [...scriptDom, (<span className="more-text">more...</span>)]

		const domContent = this.props.domContent
		const textContent = this.props.textContent
		const idKey = this.props.idKey
		return (
			<div className="post">

					<header className="post-header">
						<div className="tag-name" style={{backgroundColor: this.props.tagColor}}>
							{this.props.tag}
						</div>
						<span className="time">
							{this.props.time}
						</span>
						<img src="icons/delete.png" 
								className="delete-icon" 
								onClick={()=>this.props.dispatch(deleteNote(idKey,this.props.notes,this.props.index))}/>
					</header>
					<Link to="/edit">
						<div className="content" onClick={()=>this.props.dispatch(enterCreateMode(domContent,textContent,idKey,this.props.tag))}>
							<h3>{this.props.title}</h3>
							{scriptDom}
						</div>
					</Link>
			</div>
		)
	}
}

export default connect( state => (
		{
			notes: state.notesOverview.notes
		}
	))(Post)
/*
const EditPost = (props) => {
	let scriptDom = props.content.map( (s,index) => <div>{s}</div>) || []
	return (
		<div className="post" id="edit-mode">
			<header className="post-header">
				<h3 className="tag-name">
					{props.tag}
				</h3>
				<span className="time">
					上次修改時間 3/24 19:01
				</span>
			</header>
			<div id="editor" className="content" contentEditable="true">
				<h3>{props.title}</h3>
				{scriptDom}
			</div>

		</div>
	)
}

*/