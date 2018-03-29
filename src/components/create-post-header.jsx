import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route,Link} from 'react-router-dom'
import {connect} from 'react-redux'
import './create-post-header.sass'
import {uploadNote, leaveEditMode} from 'state/actions/edit-mode.js'
//import {lovePost} from 'state/posts.js'

class CreatePostHeader extends React.Component {
	constructor(props) {
		super(props)
	}
	componentWillMount() {
		
	}
	componentDidUpdate() {
		console.log('will update')
		//if ( this.props.editMode ) window.location = '/'
	}
	render() {
		//let scriptDom = props.content.map( (s,index) => <div>{s}</div>) || []
		const content = this.props.content
		const textContent = this.props.textContent
		return (
			<div id="create-header-container">
				<div className="back-icon icon" onClick={()=>this.props.dispatch(leaveEditMode())}>
					<Link to='/'>
						<img src="icons/back.png"/>
					</Link>
				</div>
				<div className={this.props.loading?"send-icon disabled icon": "send-icon icon"}>
					<img src="icons/send.png"/>
				</div>
			</div>
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
	))(CreatePostHeader)