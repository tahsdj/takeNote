
const myNoteInit = {
	notes: [
	],
	animation: false
}

export default function notesOverview(state=myNoteInit, action) {
	switch(action.type) {
		case '@NOTES/LOADED':
			return {
				notes: action.notes,
				animation: false
			}
		case '@NOTES/ANIMATION_START':
			return {
				notes: action.notes,
				animation: action.animation
			}
		case '@NOTES/ANIMATION_END':
			return {
				notes: action.notes,
				animation: action.animation
			}
		default:
			return state
	}
}

