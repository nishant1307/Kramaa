import React, {Component} from "react";
import { BrowserRouter, Route, Link} from "react-router-dom";
import axios from "axios";
import ReactTable from "react-table";
import 'react-table/react-table.css';
import { Button} from 'reactstrap';
import { connect } from 'react-redux';

class Explorer extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      name: '',
      projectList: [],
      organization: ''
    };
  }

  componentDidMount() {
    axios.post("/api/explorer/getProjectsFromOrganizationName", {organizationName: this.props.user.organization.organizationName})
    .then(res=> {
      this.setState({
        projectList: res.data.projectList
      })
    });
  }

  render(){
    const { email, projectList, organization} = this.state;
    const columns = [{
      Header: 'Contract Address',
      accessor: 'contractAddress',
      Cell: (props) => {
        let url = "/contractPage/"+props.original.contractAddress;
        return <Link to = {url}>{props.original.contractAddress}</Link>;
      }
    }, {
      Header: 'Name',
      accessor: 'name',
    }, {
      Header: 'Description',
      accessor: 'description'
    }];
    return(
        <ReactTable
          data={projectList}
          columns={columns}
          onFetchData={this.fetchData}
          noDataText="Not available"
          getTdProps ={(state, rowInfo, column) => {
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

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
    user: state.user
})

export default connect(mapStateToProps)(Explorer)
