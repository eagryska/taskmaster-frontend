/* eslint-disable max-len, arrow-body-style, no-underscore-dangle, react/self-closing-comp, react/no-string-refs */

import React from 'react';
import axios from 'axios';

export default class TaskManager extends React.Component {
  constructor(props) {
    super(props);
    this.toggleComplete = this.toggleComplete.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.create = this.create.bind(this);
    this.state = { tasks: [] };
  }

  componentWillMount() {
    axios.get('http://localhost:9001/api/tasks', { headers: [{ 'Access-Control-Allow-Origin': '*' }, { 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept' }] })
    .then((rsp) => {
      this.setState({ tasks: rsp.data.content });
    });
  }

  toggleComplete(e) {
    axios.patch(`http://localhost:9001/api/tasks/${e.target.attributes['data-taskId'].value}/complete`, { headers: [{ 'Access-Control-Allow-Origin': '*' }, { 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept' }] })
    .then((rsp) => {
      const newTasks = this.state.tasks.map(t => {
        if (t.id === rsp.data.id) {
          return rsp.data;
        }
        return t;
      });
      this.setState({ tasks: newTasks });
    });
  }

  deleteTask(e) {
    axios.delete(`http://localhost:9001/api/tasks/${e.target.attributes['data-taskId'].value}`, { headers: [{ 'Access-Control-Allow-Origin': '*' }, { 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept' }] })
    .then((rsp) => {
      const newTasks = this.state.tasks.filter(t => t.id !== rsp.data);
      this.setState({ tasks: newTasks });
    });
  }

  create(e) {
    e.preventDefault();
    const name = this.refs.name.value;
    const category = this.refs.category.value;
    const due = this.refs.due.value;
    axios.post('http://localhost:9001/api/tasks/', { name, category, due }, { headers: [{ 'Access-Control-Allow-Origin': '*' }, { 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept' }] })
    .then((rsp) => {
      console.log(rsp.data);
      this.setState({ tasks: [...this.state.tasks, rsp.data] });
    });
  }

  render() {
    return (
      <div>
        <h1> Task Master </h1>
        <div className="row">
          <div className="col-xs-8">
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input ref="name" type="text" className="form-control" id="name" />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category</label>
                <input ref="category" type="text" className="form-control" id="category" />
              </div>

              <div className="form-group">
                <label htmlFor="due">Due</label>
                <input ref="due" type="text" className="form-control" id="due" />
              </div>

              <button onClick={this.create} type="submit" className="btn btn-default">Create</button>
            </form>
          </div>
          <div className="col-xs-9">
          </div>
        </div>
        <div className="row">
          <div className="col-xs-8">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>id</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Due</th>
                  <th>Completed</th>
                </tr>
              </thead>
              <tbody>

                 {this.state.tasks.map(t => (
                   <tr key={t.id}>
                     <td><button data-taskId={t.id} onClick={this.deleteTask} className="btn btn-danger">{t.id}</button></td>
                     <td>{t.name}</td>
                     <td>{t.category}</td>
                     <td>{t.due}</td>
                     <td><button data-taskId={t.id} onClick={this.toggleComplete} className="btn btn-primary">{t.isComplete.toString()}</button></td>
                   </tr>
                 ))}

              </tbody>
            </table>
          </div>
          <div className="col-xs-9"></div>
        </div>
      </div>
    );
  }
}
