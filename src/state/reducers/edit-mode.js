


const editInit = {
	updateTime: '',
	content: '<h3>標題</h3><div>內容...</div>',
	textContent: [],
	key: '',
	loading: false,
	editMode: false,
	tagName: ''
}

export default function editMode(state=editInit, action) {
	switch( action.type ) {
		case '@EDIT/SAVE_SUCCESS':
			return {
				updateTime: action.updateTime,
				content: action.content,
				textContent: action.textContent,
				key: action.key,
				loading: false,
				editMode: true,
				tagName: action.tagName
			}
		case '@EDIT/SAVE_LOADING':
			return {
				updateTime: action.updateTime,
				content: action.content,
				textContent: action.textContent,
				key: '',
				loading: true,
				editMode: true,
				tagName: action.tagName
			}
		case '@EDIT/ENTER_CREATE_MODE':
			return {
				updateTime: action.updateTime,
				content: action.content,
				textContent: action.textContent,
				key: action.key,
				loading: false,
				editMode: true,
				tagName: action.tagName
			}
		case '@EDIT/LEAVE_EDIT':
			return {
				updateTime: '',
				content: '',
				textContent: [],
				key: '',
				loading: false,
				editMode: false,
				tagName: ''
			}
		default:
			return state
	}
}