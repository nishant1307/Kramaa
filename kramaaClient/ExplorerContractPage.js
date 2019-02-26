import React, {Component} from "react";
import { BrowserRouter, Route, Link} from "react-router-dom";
import axios from "axios";
import ReactTable from "react-table";
import 'react-table/react-table.css';
import { Button} from 'reactstrap';
import { connect } from 'react-redux';

class ExplorerContractPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      name: '',
      projectList: [],
      organization: ''
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.goToDevice = this.goToDevice.bind(this);
  }


  componentDidMount() {
    axios.post("/api/explorer/getEventsFromContractAddress", {contractAddress: this.props.match.params.contractAddress})
    .then(res=> {
      this.setState({
        projectList: res.data.projectList
      })
    });
  }


  goToDevice(uniqueId) {
    console.log(uniqueId);
    this.props.history.push('/device/'+uniqueId);
  }

  render(){
    const { email, projectList, organization} = this.state;
    const columns = [{
      Header: 'Contract Address',
      accessor: 'contractAddress'
    }, {
      Header: 'Name',
      accessor: 'name',
    }, {
      Header: 'Description',
      accessor: 'description'
    },  {
      Header: 'Action',
      Cell: ({ row }) => (<Button block onClick={(e) => this.goToDevice(row.uniqueId)} color="primary">View</Button>)
    }];
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

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
    user: state.user
})

export default connect(mapStateToProps)(ExplorerContractPage)
