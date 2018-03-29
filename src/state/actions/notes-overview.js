import {_getNotes, _deleteNote} from 'api/data.js'


export function getNotes() {
	return (dispatch, state) => {
		_getNotes().then( notes => {
			dispatch(loadNotesEnd(notes))
		})
	}
}

function loadNotesEnd(notes) {
	return {
		type: '@NOTES/LOADED',
		notes: notes
	}
}

export function deleteNote(key,notes,index) {
	if (notes.length >= 1 ) notes.splice(index,1)
	return (dispatch, state) => {
		_deleteNote(key).then( msg => {
			dispatch(loadNotesEnd(notes))
			dispatch({
				type: '@NOTES/ANIMATION_START',
					notes: notes,
					animation: true
			})
			setTimeout(()=>{
				dispatch({
					type: '@NOTES/ANIMATION_END',
					notes: notes,
					animation: false
				})
			},1500)
		})
	}
}