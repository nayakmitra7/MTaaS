import './bug.css';
import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { Badge } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText, Row, Col, Container } from 'reactstrap';
import TopNav from '../navigation/topnavTester';
import SideNav from '../navigation/sidenavTester.js';
import axios from 'axios';
import { ROOT_URL } from '../config/config.js'
import { toast } from 'react-toastify';
import { FaEdit } from 'react-icons/fa';

class BugCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      projectid: '',
      managerID: '',
      severity: '',
      operatingSystem: '',
      operatingSystemVersion: '',
      bugDescription: '',
      date: ''
    };
  }
  componentDidMount() {
    axios.get(ROOT_URL + '/projectsForTester/' + localStorage.getItem("TesterID")).then((response) => {
      if (response.status == 200) {
        console.log(response.data)
        this.setState({ projects: response.data.projects });
      } else {
        toast.error(response.data.message, {
          position: toast.POSITION.TOP_CENTER
        });
      }
    }).catch(error => {
      toast.error('You are not part of any projects', {
        position: toast.POSITION.TOP_CENTER
      });
    })
  }

  projectNameChangeHandler = e => {
    this.setState({ projectid: e.target.value });
  };

  managerNameChangeHandler = e => {
    this.setState({ managerID: e.target.value });
  };

  severityChangeHandler = e => {
    this.setState({ severity: e.target.value });
  };
  operatingSystemChangeHandler = e => {
    this.setState({ operatingSystem: e.target.value })
  };
  operatingSystemVersionChangeHandler = e => {
    this.setState({ operatingSystemVersion: e.target.value })
  };
  bugDescriptionChangeHandler = e => {
    this.setState({ bugDescription: e.target.value })
  };
  dateChangeHandler = e => {
    this.setState({ date: e.target.value })
  };

  // editButtonHandler = () => {
  //   document.getElementById("name").readOnly = false;
  //   document.getElementById("about").readOnly = false;
  //   document.getElementById("technologies").readOnly = false;
  //   document.getElementById("email").readOnly = false;
  //   document.getElementById("dob").readOnly = false;
  //   document.getElementById("updateButton").disabled = false;
  // }
  //
  createBug = (e) =>{
    e.preventDefault();
    var testData = { severity: this.state.severity, operatingSystem: this.state.operatingSystem, operatingSystemVersion: this.state.operatingSystemVersion, bugDescription: this.state.bugDescription, date: this.state.date, projectID: this.state.projectid, testerID: localStorage.getItem('TesterID'), managerID: this.state.managerID }
    // projectName: this.state.projects.name,
    //var testData = {name: this.state.name, about: this.state.about, DOB: this.state.DOB, technologies: this.state.technologies, email: this.state.email, id : localStorage.getItem('TesterID')}
    axios.post(ROOT_URL + '/tester/createBug', testData ).then((response) => {
      if (response.status == 200) {
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER
        });
        setTimeout(() => {
          window.location.reload()
        }, 2000);
      } else {
        toast.error(response.data.message, {
          position: toast.POSITION.TOP_CENTER
        });
      }
    }).catch(error => {
      toast.error('Something went wrong!', {
        position: toast.POSITION.TOP_CENTER
      });
    })
  }
  render() {

    var projectsDropDown = this.state.projects.map((project) => {
      return (
        <option value={project._id}>{project.name}</option>
      )
    })

    var managerDropDown = this.state.projects.map((project) => {
      return (
        <option value={project.managerID._id}>{project.managerID.name}</option>
      )
    })

    return (
      <div className="profile">
        <TopNav />
        <SideNav />
        <div className="profile-right">
            <div>
              <Container className="profile-margin-top">
                <Row>
                  <Col md={3} className="profile-white"></Col>
                  <Col md={6} className="div-border">
                    <Row>
                      <Col md={11} className="text-center"><h4>Create Bug</h4></Col>
                    </Row>
                    <Form className="profile-margin-increase-top" onSubmit = {this.createBug}>
                      <FormGroup >
                        <h5> Project Name </h5>
                        <Input type="select" name='projectID' onChange={this.projectNameChangeHandler} >
                          <option value={0}>Select Project</option>
                          {projectsDropDown}
                        </Input>

                        {/*
                        <Input placeholder="project name"
                          id="name"
                          value={this.state.projectName}
                          onChange={this.projectNameChangeHandler}
                          required/>*/}
                      </FormGroup>
                      <FormGroup >
                        <h5> Manager Name </h5>
                        <Input type="select" name='managerID' onChange={this.managerNameChangeHandler} >
                          <option value={0}>Verify Manager</option>
                          {managerDropDown}
                        </Input>

                        {/*
                        <Input placeholder="project name"
                          id="name"
                          value={this.state.projectName}
                          onChange={this.projectNameChangeHandler}
                          required/>*/}
                      </FormGroup>
                      <FormGroup>
                        <h5>Severity</h5>
                        <Input type="text" placeholder="severity"
                          value={this.state.severity}
                          onChange={this.severityChangeHandler}
                          required/>
                      </FormGroup>
                      <FormGroup>
                        <h5> Operating System</h5>
                        <Input
                          type="text"
                          placeholder="operating system"
                          value={this.state.operatingSystem}
                          onChange={this.operatingSystemChangeHandler}
                          required/>
                      </FormGroup>
                      <FormGroup>
                        <h5> Operating System Version</h5>
                        <Input type="text"
                          placeholder="operating system version"
                          value={this.state.operatingSystemVersion}
                          onChange={this.operatingSystemVersionChangeHandler}
                          required />
                      </FormGroup>
                      <FormGroup>
                        <h5> Bug Description </h5>
                        <Input type="text"
                          placeholder="bug description"
                          value={this.state.bugDescription}
                          onChange={this.bugDescriptionChangeHandler}
                          required />
                      </FormGroup>
                      <FormGroup>
                        <h5> Date </h5>
                        <Input type="text"
                          placeholder="date"
                          value={this.state.date}
                          onChange={this.dateChangeHandler}
                          required />
                      </FormGroup>
                      <Row>
                        <Col></Col>
                        <Col><Button id="updateButton" color="success" className="updateButton" type="submit">Create Bug</Button></Col>
                        <Col></Col>
                      </Row>
                    </Form>
                  </Col>
                  <Col md={3} className="profile-white" ></Col>
                </Row>
              </Container>
            </div>
          </div>
        </div>
    )
  }
}

export default BugCreator;
