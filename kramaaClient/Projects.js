import React, {Component} from "react";
import { BrowserRouter, Route, Link} from "react-router-dom";
import axios from "axios";
import ReactTable from "react-table";
import 'react-table/react-table.css';
import { Button} from 'reactstrap';
class Projects extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      name: '',
      projectList: [],
      projectForm: '',
      organization: ''
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.goToLogin = this.goToLogin.bind(this);
    this.goToProject = this.goToProject.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    axios.post("/api/dashboard/projectList", {clientToken: sessionStorage.getItem("clientToken")})
    .then(res=> {
      this.setState({"email": res.data.client.email, projectList: res.data.projects, organization: res.data.organization})
      console.log(res.data.projects[0].uniqueId);
    });
  }

  goToProject(uniqueId) {
    console.log(uniqueId);
    this.props.history.push('/project/'+uniqueId);
  }

  goToLogin() {
    this.props.history.push('/login');
  }

  logout() {
    sessionStorage.clear();
    this.props.history.push('/');
  }

  render(){
    const { email, projectList, projectForm, organization} = this.state;
    const columns = [{
      Header: 'Project ID',
      accessor: 'uniqueId'
    }, {
      Header: 'Project Name',
      accessor: 'name',
    }, {
      Header: 'Industry',
      accessor: 'industry'
    }, {
      Header: 'Sub Industry',
      accessor: 'subIndustry'
    }, {
      Header: 'Token Symbol',
      accessor: 'tokenSymbol'
    },  {
      Header: 'Token Name',
      accessor: 'tokenName'
    },  {
      Header: 'Action',
      Cell: ({ row }) => (<Button block onClick={(e) => this.goToProject(row.uniqueId)} color="primary">View</Button>)
    }];
    console.log(projectList);
    return(
        <ReactTable
          data={projectList}
          columns={columns}
          onFetchData={this.fetchData}
          noDataText="Not available"
          getTrProps ={(state, rowInfo) => {
            if (rowInfo && rowInfo.row) {
              return {
                onClick: (e) => {
                  this.setState({
                    selected: rowInfo.index,
                  })
                }
              }
            } else {
              return {}
            }
          }}
          />
    )
  }
}

export default Projects
