import {getUsers, deleteUser, postUser} from './api/userApi';
// import jsf from 'json-schema-faker';
// import {schema} from '../buildScripts/mockDataSchema';

// const jsf = require('json-schema-faker');
// const jsfSchema = schema;
//var schema = require('../buildScripts/mockDataSchema');

let bindEvents = () => {
  let btnAdd = document.getElementById('addUser');
  btnAdd.onclick = function(event){
    createUser(event);
  };
};

let createUser = (event) => {
  event.preventDefault();
  //let user = jsf(jsfSchema).users[0];
  let user = { firstName: 'Igor', lastName: 'Gomes', email: 'xpto' };
  postUser(user).then((result) => {
    addTableRow(result);
  })
};

let addTableRow = (user) => {
  let usersBody = global.document.getElementById('users').innerHTML;

  usersBody += `<tr>
  <td><a href="#" data-id="${user.id}" class="deleteUser">Delete</a></td>
  <td>${user.id}</td>
  <td>${user.firstName}</td>
  <td>${user.lastName}</td>
  <td>${user.email}</td>`;

  global.document.getElementById('users').innerHTML = usersBody;

  bindDeleteEvents();
};

let bindDeleteEvents = () => {
  const deleteLinks = global.document.getElementsByClassName('deleteUser');

  // Must use array.from to create a real array from a DOM collection
  // getElementsByClassname only returns an "array like" object
  Array.from(deleteLinks, link => {
    link.onclick = function(event){
      const element = event.target;
      event.preventDefault();
      deleteUser(element.attributes["data-id"].value);
      const row = element.parentNode.parentNode;
      row.parentNode.removeChild(row);
    };
  });
};

getUsers().then(result => {
    result.forEach(user => {
    addTableRow(user);
  });
});

bindEvents();
