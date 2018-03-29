import {_createNote, _updateNote} from 'api/data.js'


export function uploadNote() {
	const domContentInit = '<h3>標題</h3><div>內容</div>'
	let noteTemplate = {
		name: 'paul',
		tag: '',
		updateTime: getTime(),
		domContent: '<h3>標題</h3><div>內容</div>',
		textContent: 0 
	}
	return (dispatch, state) => {
		dispatch(saveLoading(domContentInit,[]))
		_createNote(noteTemplate).then(key=>{
			console.log("upload success~~~~~")
			dispatch(saveSuccess(domContentInit, [], key))
		})
	}
}

export function saveNote(content, textContent, key, tagName) {
	return (dispatch, state) => {
		//dispatch(saveSuccess(content, textContent, key))
		const data = {
			tag: tagName,
			updateTime: getTime(),
			domContent: content,
			textContent: textContent
		}
		_updateNote(key, data).then( d =>{
			dispatch(saveSuccess(content, textContent, key, tagName))
		})
	}
}

function saveLoading(content, textContent, tagName) {
	console.log("loading..............................")
	return {
		type: '@EDIT/SAVE_LOADING',
		updateTime: getTime(),
		content: content,
		textContent: textContent,
		tagName: tagName
	}
}

function saveSuccess(content, textContent, key, tagName) {
	return {
		type: '@EDIT/SAVE_SUCCESS',
		updateTime: getTime(),
		content: content,
		key: key,
		textContent: textContent,
		tagName: tagName
	}
}


function getTime() {
	let d = new Date()
	let nowTime = d.getTime()
	let month = d.getMonth()
	let date = d.getDate()
	let hour = d.getHours()
	let minutes = d.getMinutes()
	return `${month+1}月${date}日 ${hour>=10?hour:'0'+hour}:${minutes>=10?minutes:'0'+minutes}`
}

export function enterCreateMode(content, textContent, key, tagName) {
	console.log("enter create mode")
	return {
		type: '@EDIT/ENTER_CREATE_MODE',
		updateTime: getTime(),
		content: content,
		key: key,
		textContent: textContent,
		tagName: tagName
	}
}

export function leaveEditMode() {
	console.log('leave~~')
	return {
		type: '@EDIT/LEAVE_EDIT'
	}
}