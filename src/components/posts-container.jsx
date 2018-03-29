import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route,Link} from 'react-router-dom'
import {connect} from 'react-redux'
import './posts-container.sass'
import EditPost from 'components/edit-post.jsx'
import {enterCreateMode, uploadNote} from 'state/actions/edit-mode.js'
import {getNotes} from 'state/actions/notes-overview.js'
import Post from 'components/post.jsx'

class PostsContainer extends React.Component{
	constructor(props) {
		super(props)
	}
	componentWillMount() {
		this.props.dispatch(getNotes())
		//document.getElementById("editor").innerHTML = this.props.content
	}
	componetDidUpdate() {
		//console.log(document.getElementById("editor").innerHTML)
	}
	render() {
		const colorList = ['#F9C248', '#7ecce7', '#96ce42','#f98a48', '#ab7ada']
		let notePosts = this.props.notes.map( (note,index) => <Post 
														tag={note.tag}
														tagColor={colorList[index%colorList.length]}
														textContent={note.textContent}
														domContent={note.domContent}
														time={note.updateTime}
														key={'post'+ index}
														index={index}
														idKey={note.key}
														/>)
		return (
			<div id="posts-container">
				{notePosts}
					<div className="create-post" onClick={()=>this.props.dispatch(uploadNote())}>
						<Link to="/create">
							<img src="icons/create.png"/>
						</Link>
					</div>
				{this.props.animation && (<span id="delete-info-msg">
						note removed
					</span>)
				}
			</div>
		)
	}
}

export default connect( state => (
		{
			notes: state.notesOverview.notes,
			notesLength: state.notesOverview.notes.length,
			animation: state.notesOverview.animation
		}
	))(PostsContainer)

/*
const Post = (props) => {
	let scriptDom = props.textContent.map( (s,index) => {
			return index < 6 && <p key={'p'+index}>{s}</p>
		}) || []
	return (
		<div className="post">
			<header className="post-header">
				<div className="tag-name">
					{props.tag}
				</div>
				<span className="time">
					{props.time}
				</span>
			</header>
			<div className="content">
				<h3>{props.title}</h3>
				{scriptDom}
			</div>
		</div>
	)
}
*/
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