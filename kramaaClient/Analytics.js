import React, {Component} from "react";
import { BrowserRouter, Route, Link} from "react-router-dom";
import axios from "axios";
import ReactTable from "react-table";
import 'react-table/react-table.css';
import { Button} from 'reactstrap';
import { connect } from 'react-redux';

class Analytics extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      name: '',
      eventList: [],
      organization: ''
    };
  }

  componentDidMount() {
    axios.post("/api/events/getEvents", {})
    .then(res=> {
      this.setState({
        eventList: res.data.eventList
      })
    });
  }

  render(){
    const { email, eventList, organization} = this.state;
    const columns = [{
      Header: 'Event Type',
      accessor: 'eventType'
    }, {
      Header: 'Message',
      accessor: 'message',
    }, {
      Header: 'Created At',
      accessor: 'createdAt'
    }];
    return(
        <ReactTable
          data={eventList}
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

export default connect(mapStateToProps)(Analytics)
