import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Badge, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';

const propTypes = {
  notif: PropTypes.bool,
  accnt: PropTypes.bool,
  tasks: PropTypes.bool,
  mssgs: PropTypes.bool,
};
const defaultProps = {
  notif: false,
  accnt: false,
  tasks: false,
  mssgs: false,
};
import { connect } from 'react-redux';

class HeaderDropdown extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
    };
    this.goToUserDatabase = this.goToUserDatabase.bind(this);
  }

  goToUserDatabase() {
    this.props.history.push('/userDatabase');
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  dropNotif() {
    const itemsCount = 0;
    let notificationBell;
    if(itemsCount>0){
      notificationBell = <DropdownToggle nav>
        <i className= "fa fa-bell-o"></i><Badge pill color="danger">{itemsCount}</Badge>
      </DropdownToggle>;
    }
    else{
      notificationBell = <DropdownToggle nav>
        <i className= "fa fa-bell-o"></i><Badge pill color="danger"></Badge>
      </DropdownToggle>
    }
    let notificationList = [];
    for(let i=0; i< itemsCount; i++){
      notificationList.push(<DropdownItem><i className="icon-user-follow text-success"></i> this.props.user.notificationList[i].message</DropdownItem>);
    }
    return (
      <Dropdown nav className="d-md-down-none" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        {notificationBell}
        <DropdownMenu right>
          <DropdownItem header tag="div" className="text-center"><strong>You have {itemsCount} notifications</strong></DropdownItem>
          {notificationList}
        </DropdownMenu>
      </Dropdown>
    );
  }

  dropAccnt() {
    return (
      <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle nav>
          <i className="fa fa-user"  alt="admin@bootstrapmaster.com" />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
          <DropdownItem><i className="fa fa-user"></i>User Profile</DropdownItem>
          <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>
          <DropdownItem><i className="fa fa-user"></i> Manage Account</DropdownItem>
          <DropdownItem><i className="fa fa-wrench"></i> Organization Profile</DropdownItem>
          <DropdownItem><i className="fa fa-usd"></i> Organization Manager</DropdownItem>
          <DropdownItem><i className="fa fa-file"></i> Organization Details</DropdownItem>
          <DropdownItem onClick={this.goToUserDatabase}><i className="fa fa-file"></i> User Database</DropdownItem>
          <DropdownItem onClick={this.props.onLogout}><i className="fa fa-lock"></i> Logout</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }


  render() {
    const { notif, accnt, tasks, mssgs } = this.props;
    return (
        notif ? this.dropNotif() :
          accnt ? this.dropAccnt() : null
    );
  }
}
const mapStateToProps = (state) => ({
    auth: state.auth,
    user: state.user
})

HeaderDropdown.propTypes = propTypes;
HeaderDropdown.defaultProps = defaultProps;

export default connect(mapStateToProps)(HeaderDropdown);
