// 'use strict';

import { combineReducers, createStore, applyMiddleware } from 'redux';

//actions

const CREATE_POST = 'CREATE_POST';
const DELETE_POST = 'DELETE_POST';
const USER_POST = 'USER_POST';

function createPost(data){
	return {
		type: CREATE_POST,
		data :data
	}
}

function deletePost(id){
	return {
		type: DELETE_POST,
		id: id
	}
}

function userLogin(data){
	return {
		type: USER_POST,
		data: data
	}
}

//reducers

const initalPostsState = [];

const initalUserState = {
	isLogin: false,
	userData: {

	}
}

function posts(state = initalPostsState, action){
	switch(action.type){
		case CREATE_POST:
      return [...state, action.data];
    case DELETE_POST:
      return state.filter(post => post.id !== action.id);
    default:
      return state;
	}
}

function user(state = initalUserState, action){
	switch(action.type){
		case USER_POST:
			return Object.assign({}, state, {
				isLogin: true,
				userData: action.data
			});
		default:
			return state;
	}
}

const rootReducer = combineReducers({
	posts,
	user
});

//创建一个中间件
const logger = store => next => action => {
	console.log("打印日志信息:",store.getState());
	return next(action);
};

//创建第二个中间件 
const crash = store => next => action => {
	console.log("有创建的一个:",store.getState());
	return next(action);
}
const store = createStore(rootReducer, applyMiddleware(logger,crash));

console.log("初始化state:",store.getState());

//监听state的变化
store.subscribe(() =>  {
	console.log("监听:",store.getState())
});

//添加一篇文章
store.dispatch(createPost({id: 1, title: 'new title'}));

//再添加一篇文章
store.dispatch(createPost({id: 2, title: 'the second title'}))

//删除一篇文章
store.dispatch(deletePost(1));

//用户登录
store.dispatch(userLogin({name: 'viking', email: 'viking@v.me'}));




