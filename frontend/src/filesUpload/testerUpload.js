
import { Jumbotron, Container, Button } from 'reactstrap';
import './signup.css';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import '../../node_modules/react-keyed-file-browser/dist/react-keyed-file-browser.css'
import FileBrowser from 'react-keyed-file-browser'
import React from 'react';

import axios from 'axios'
import Moment from 'moment'

import './signup.css';
import { ROOT_URL } from '../config/config.js'


class TesterFilesView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fileSelected: null,
            filesfromS3: [],
            options: [],
            projectName: null,
            projectsOptions:[]
            

        }

    }

    projectChangeHandler = (e) => {
        if(e.target.value!='dummy')
        {
        this.setState({
            projectName: e.target.value
        },()=>{
            this.loadProjects()
        });
        console.log('Project Name Set',e.target.value)
       
    }
    }

    loadProjects = () => {
        console.log('Project Name',this.state.projectName)
        let data = { projectName: this.state.projectName, testerName: 'Pranav' }
        axios.post(ROOT_URL + '/tester/loadFiles/', data).then(res => {
            console.log(res.data)
            this.setState({
                filesfromS3: res.data.map((el) => {
                    return {
                        key: el.key,
                        url: 'https://mtaasbucket.s3.us-east-2.amazonaws.com/' + el.key,
                        modified: Moment(el.modified),
                        size: el.size
                    }
                })
            })

        }).catch(err => console.log(err))
    }

    uploadFile = (e) => {

        e.preventDefault()
        let fd = new FormData()
        fd.append('testerName', 'Pranav');
        fd.append('testerID', '5e8d437fd70e327a6e797d15');
        fd.append('projectName', this.state.projectName);
        fd.append('file', this.state.fileSelected);
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        axios.post(ROOT_URL + '/tester/upload', fd, config).then((res) => {
            console.log(res.data);
            alert('File Uploaded Successfully')
            this.loadProjects()

        }).catch(error => { console.log("Error while uploading file " + error) })

    }

    fileChangeHandle = (e) => {
        this.setState({
            fileSelected: e.target.files[0]
        });
    }

    componentDidMount() {


        axios.get(ROOT_URL + '/projectsForTester/5e8d437fd70e327a6e797d15').then(res => {
            console.log('result from the load projects', res)
            let projectsOpts = []
            projectsOpts = res.data.projects.map(el => {
                return (<option key={el.name} value={el.name}>{el.name}</option>)
            })
            projectsOpts.unshift(<option key='dummy' value='dummy'>Select Project</option>)
            this.setState({ projectsOptions: projectsOpts })

        }).catch(err => console.log(err))
       

       
    }



    onDeleteFileHandler(e) {
  
    }

  


    render() {
        return (

            <div>
                <div className="signup">
                    <Jumbotron fluid>
                        <Container fluid>
                            <h1 center className="display-3">Mobile Testing as a Service</h1>
                        </Container>
                        <header className="signup-header">
                            <Form onSubmit={this.uploadFile}>
                                <FormGroup>
                                    <FormGroup>
                                        <Label for="exampleSelect">Select Project</Label>
                                        <Input type="select" name="select" id="select" onChange={this.projectChangeHandler}>>
                                            {this.state.projectsOptions}
                                        </Input>
                                    </FormGroup>
                                </FormGroup>
                                <FormGroup>
                                    <h5 >Upload your files</h5>
                                    <Input type="file" name="file" id="file" placeholder="Select file to upload"
                                        onChange={this.fileChangeHandle}
                                        required
                                    />
                                </FormGroup>
                                <Row>
                                    <Col></Col>
                                    <Col><Button className="textCenterSignup" type="submit">Submit</Button></Col>
                                    <Col></Col>
                                </Row>
                            </Form>
                        </header>
                    </Jumbotron>
                </div>
                <br />
                <div className="fileBrowserDiv">
                    <FileBrowser
                        files={this.state.filesfromS3}
                        icons={{
                            Text: <i className="fa fa-file-text" aria-hidden="true" />,
                            File: <i className="fa fa-file" aria-hidden="true" />,
                            Image: <i className="fa fa-file-image" aria-hidden="true" />,
                            Video: <i className="fa fa-file-video" aria-hidden="true" />,
                            Audio: <i className="fa fa-file-audio" aria-hidden="true" />,
                            Archive: <i className="fa fa-file-archive" aria-hidden="true" />,
                            Word: <i className="fa fa-file-word" aria-hidden="true" />,
                            Excel: <i className="fa fa-file-excel" aria-hidden="true" />,
                            PowerPoint: <i className="fa fa-file-powerpoint" aria-hidden="true" />,
                            Text: <i className="fa fa-file-text" aria-hidden="true" />,
                            PDF: <i className="fa fa-file-pdf" aria-hidden="true" />,
                            Rename: <i className="fa fa-i-cursor" aria-hidden="true" />,
                            Folder: <i className="fa fa-folder" aria-hidden="true" />,
                            FolderOpen: <i className="fa fa-folder-open" aria-hidden="true" />,
                            Delete: <i className="fa fa-trash" aria-hidden="true" />,
                            Loading: <i className="fa fa-circle-o-notch fa-spin" aria-hidden="true" />,
                            Download: <i className="fa fa-download" aria-hidden="true" />
                        }}
                        onDeleteFile={this.onDeleteFileHandler}
                        onDownloadFile={(fileKey) => { window.location = this.state.base_url + fileKey }}
                    />
                    
                </div>
            </div>
        )
    }
}

export default TesterFilesView