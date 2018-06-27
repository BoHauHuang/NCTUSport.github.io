import axios from 'axios';

const ROOT_URL = 'http://www.hy0936.com.tw:9990/api';
const EVENT_URL = 'http://www.hy0936.com.tw:9990/api/event/';
const TEAM_URL = 'http://www.hy0936.com.tw:9990/api/team/';
const TEAMMEM_URL = 'http://www.hy0936.com.tw:9990/api/teammember/';

import {
	FETCH_EVENTS,
	FETCH_EVENT,
	FETCH_TEAMS,
 	ADD_EVENT,
	DELETE_EVENT,
	UPDATE_EVENT,
	REGISTER_TEAM
} from './types';

const token = localStorage.getItem('token');

export function fetchEvents(){
	return function(dispatch){
		axios.get(EVENT_URL)
			.then((response) => {
				console.log(response.data);
				dispatch({type: FETCH_EVENTS, payload: response.data});
				console.log("Fetch all events successfully");
			})
			.catch((response) => {
				console.log("Cannot get all events");
				console.log(response);
			});
	}
}

export function fetchEvent(event_id){
	return function(dispatch) {
		axios.get(`${EVENT_URL}` + event_id+'/')
			.then((response) => {
				//console.log(response.data);
				dispatch({type: FETCH_EVENT, payload: response.data});
				console.log("Fetch a event successfully");
			})
			.catch((response) => {
				console.log("Cannot get a event");
				console.log(response);
			});
	}
}

export function fetchTeams(){
	return function(dispatch) {
		axios.get(TEAM_URL)
			.then((response) => {
				//console.log(response.data);
				dispatch({type: FETCH_TEAMS, payload: response.data});
				console.log("Fetch teams successfully");
			})
	}
}


export function addEvent({name, description, rule, teamMax, memMin, reg_start, reg_end}){
	return function(dispatch){
		var data = {
			name: name,
			description: description,
			rule: rule,
			team_max: teamMax,
			member_min: memMin,
			regist_start: reg_start,
			regist_end: reg_end
		};
		axios.post(EVENT_URL, data).then((response) => {
						//console.log(response);
						console.log("Event added.");
						location.reload();
						dispatch({type: ADD_EVENT, payload: response.data});
		})
		.catch((response) => {
						console.log("Cannot add event.");
						console.log(response);
		});
	}
}


export function deleteEvent(event_id) {
	return (dispatch) => {

		axios.delete(`${EVENT_URL}` + event_id +'/')
			.then((response) => {
				location.reload();
				dispatch({type: DELETE_EVENT});
			})
			.catch((response) => {
				console.log(response);
			});
	}
}

export function updateEvent({name, description, rule, teamMax, memMin, reg_start, reg_end}){
	return(dispatch) => {
			var data = {
				name: name,
				description: description,
				rule: rule,
				team_max: teamMax,
				member_min: memMin,
				regist_start: reg_start,
				regist_end: reg_end
			};
			axios.put(`${EVENT_URL}` + event_id +'/', data)
			.then((response) =>{
				console.log(response);
				location.reload();
				dispatch({type: UPDATE_EVENT});
			})
			.catch((response) => {
				console.log("Edit the event failed.");
				console.log(response);
			});
	}
}

export function RegisterTeam({name, event_id}){
	return(dispatch) => {
		var data = {
			name: name,
			event_id: event_id
		};
		axios.post(TEAM_URL,data)
		.then((response) =>{
			console.log("Joined the event successfully");
			dispatch({type: REGISTER_TEAM});
		})
		.catch((response) =>{
			console.log(data);
			console.log("Joined failed");
		})
	}
}
