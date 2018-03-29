
import firebase from 'firebase'
//
const config = {
	apiKey: "AIza***********t33TzM",
	authDomain: "*****.firebaseapp.com",
	databaseURL: "https://********.firebaseio.com",
	projectId: "****",
	storageBucket: "***",
	messagingSenderId: "******"
}


firebase.initializeApp(config)

const notesRef = firebase.database().ref('/notes')


export function _createNote(content) {
	return new Promise( (resolve, reject) => {
		notesRef.push(content).then( (data)=> {
				//console.log('data key: ' + data.key)
				//content.key = data.key
				resolve(data.key)
			}
		)
	})
}

export function _updateNote(key,data) {
	return new Promise( (resolve, reject) => {
		notesRef.child(key).update({
			tag: data.tag,
			updateTime: data.updateTime,
			domContent: data.domContent,
			textContent: data.textContent === [] ? 0 : data.textContent
		})
		resolve(data)
	})
}

export function _getNotes() {
	return new Promise( (resolve, reject) => {
 		//console.log('list posts')
 		notesRef.once('value').then( data => {
 			let notes = []
 			data.forEach( d => {
 				let obj = d.val()
 				obj.key = d.key
 				obj.textContent = obj.textContent === 0 ? [] : obj.textContent
 				notes = [obj,...notes]
 			})
 			resolve(notes)
 		})
 	})
}

export function _deleteNote(key) {
	return new Promise( (resolve, reject) => {
		notesRef.child(key).remove( ()=>{
			resolve('delete success~')
		})
	})
}