import React, {Component} from "react";
import { BrowserRouter, Route, Link} from "react-router-dom";
import axios from "axios";
import ReactTable from "react-table";
import 'react-table/react-table.css';
import { Button} from 'reactstrap';
class UserDatabase extends Component {
  constructor(props){
    super(props);
    this.state = {
      userList: [],
      organization: ''
    };

    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    axios.post("/api/users/userList", {clientToken: sessionStorage.getItem("clientToken")})
    .then(res=> {
      this.setState({"email": res.data.client.email, projectList: res.data.projects, organization: res.data.organization})
      console.log(res.data.projects[0].uniqueId);
    });
  }

  render(){
    const { userList, organization} = this.state;
    const columns = [{
      Header: 'User ID',
      accessor: 'uniqueId'
    }, {
      Header: 'First Name',
      accessor: 'firstName',
    }, {
      Header: 'Last Name',
      accessor: 'lastName'
    }, {
      Header: 'Email',
      accessor: 'email'
    }, {
      Header: 'Action',
      Cell: ({ row }) => (<Button block onClick={(e) => this.goToProject(row.uniqueId)} color="primary">View</Button>)
    }];
    console.log(projectList);
    return(
        <ReactTable
          data={usertList}
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

export default UserDatabase;
