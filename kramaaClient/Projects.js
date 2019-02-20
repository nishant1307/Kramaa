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
      projectList: []
    };

    this.goToProject = this.goToProject.bind(this);
  }

  componentDidMount() {
    axios.post("/api/dashboard/projectList", {clientToken: sessionStorage.getItem("clientToken")})
    .then(res=> {
      this.setState({projectList: res.data.projects})
    });
  }

  goToProject(uniqueId) {
    console.log(uniqueId);
    this.props.history.push('/project/'+uniqueId);
  }

  render(){
    const { projectList} = this.state;
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
      Header: 'Contract Address',
      accessor: 'tokenContractAddress'
    }, {
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
