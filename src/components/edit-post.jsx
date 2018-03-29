import React from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import './edit-post.sass'
import {saveNote, uploadNote} from 'state/actions/edit-mode.js'
//import {lovePost} from 'state/posts.js'

class EditPost extends React.Component {
	constructor(props) {
		super(props)
		this.contentHandler = this.contentHandler.bind(this)
		this.tagNameHandler = this.tagNameHandler.bind(this)
		this.timer = null
		this.textContent = []
		this.tagName = this.props.tagName
	}
	componentWillMount() {
		
	}
	componentDidMount() {
		const contentDom = document.getElementById("editor")
		contentDom.innerHTML = this.props.content
		this.timer = setInterval(()=>
				{
					console.log('tag name: '+ this.tagName)
					this.textContent = []
					for ( let i = 0 ; i < contentDom.childNodes.length ; i++ ) this.textContent = [...this.textContent, contentDom.childNodes[i].innerText||""]
					this.props.dispatch(saveNote(contentDom.innerHTML,this.textContent, this.props.noteKey, this.tagName))
				}
			,5000)
			
	}
	componentWillUnmount() {
		console.log('clearInterval')
		clearInterval(this.timer)
	}
	render() {
		//let scriptDom = props.content.map( (s,index) => <div>{s}</div>) || []
		return (
			<div className="post" id="edit-mode">
				<header className="post-header">
					<h3 className="tag-name">
						<input placeholder={this.props.tagName === ''? "分類標題": this.props.tagName} 
								onChange={this.tagNameHandler}/>
					</h3>
					<span className="time">
						上次存檔時間 {this.props.time}
					</span>
				</header>
				<div id="editor" className="content" 
								contentEditable="true" 
								onBlur={()=>{
										const contentDom = document.getElementById("editor")
										this.props.dispatch(saveNote(contentDom.innerHTML,this.textContent,this.props.noteKey, this.tagName))
									}
								}>
					
				</div>

			</div>
		)
	}
	tagNameHandler(e) {
		this.tagName = e.target.value
	}
	contentHandler(e) {
		//console.log('content: ' + e.key)
	}
}

export default connect( state => (
		{
			content: state.editMode.content,
			time: state.editMode.updateTime,
			noteKey: state.editMode.key,
			tagName: state.editMode.tagName
		}
	))(EditPost)