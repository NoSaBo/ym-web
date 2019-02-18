import React, { Component } from "react";
// @material-ui/core & style components
import withStyles from "@material-ui/core/styles/withStyles";
import EmpxSrvPageStyle from "assets/jss/material-kit-react/views/EmpxSrvPage.jsx";
// nodejs library that concatenates classes
// import classNames from "classnames";
// components
import EmpxSrvTable from "./EmpxSrvTable";
import Selector from "../../../../components/Selector/Selector";

class EmpxSrvContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allEmpxSrv: [],
      branches: null,
      serviceShifts: null
    };
    this.onFilterChanged = this.onFilterChanged.bind(this);
  }

  componentWillMount() {
    const { empxsrvs, branches, serviceShifts } = this.props;
    this.setState({ allEmpxSrv: empxsrvs, branches, serviceShifts });
  }

  onFilterChanged = (branchId, serviceshiftId) => {
    let allEmpxSrv = this.props.empxsrvs;
    this.buildNewAllEmpxSrv(allEmpxSrv);
    let newAllEmpxsrvs = "";
    if (serviceshiftId === "x" && branchId === "x") {
      newAllEmpxsrvs = allEmpxSrv;
    } else if (branchId === "x" && serviceshiftId !== "x") {
      newAllEmpxsrvs = allEmpxSrv.filter(
        empxsrvs => empxsrvs.serviceshiftId === serviceshiftId
      );
    } else if (serviceshiftId === "x" && branchId !== "x") {
      newAllEmpxsrvs = allEmpxSrv.filter(
        empxsrvs => empxsrvs.branchId === branchId
      );
    } else if (serviceshiftId !== "x" && branchId !== "x") {
      newAllEmpxsrvs = allEmpxSrv
        .filter(empxsrvs => empxsrvs.serviceshiftId === serviceshiftId)
        .filter(empxsrvs => empxsrvs.branchId === branchId);
    }
    this.setState({ allEmpxSrv: newAllEmpxsrvs });
  };

  getBranchName(serviceshiftId) {
    let serviceshift = "";
    serviceshift = this.state.serviceShifts.filter(
      serviceshift => serviceshift.id === serviceshiftId
    );
    let branchName = serviceshift[0].branch.branch;
    let branchId = serviceshift[0].branch.id;
    serviceshift = {};
    serviceshift["branchName"] = branchName;
    serviceshift["branchId"] = branchId;
    return serviceshift;
  }

  getBegindate(serviceshiftId) {
    let serviceshift = "";
    serviceshift = this.state.serviceShifts.filter(
      serviceshift => serviceshift.id === serviceshiftId
    );
    let begindate = serviceshift[0].begindate;
    return begindate;
  }

  getEmployeeName(employeeId) {
    let arrEmployees = [];
    let employeeName = [];
    this.state.serviceShifts.map(serviceshift => {
      serviceshift.employees.map(employee =>
        arrEmployees.push({ ...employee })
      );
      return null;
    });
    arrEmployees = this.removeDuplicates(arrEmployees, "id");
    employeeName = arrEmployees.filter(employee => employee.id === employeeId);
    employeeName = `${employeeName[0].firstname} ${employeeName[0].lastname}`
    return employeeName;
  }

  removeDuplicates(originalArray, prop) {
    var newArray = [];
    var lookupObject = {};
    for (var i in originalArray) {
      lookupObject[originalArray[i][prop]] = originalArray[i];
    }
    for (i in lookupObject) {
      newArray.push(lookupObject[i]);
    }
    return newArray;
  }

  buildNewAllEmpxSrv(allEmpxSrv) {
    allEmpxSrv.map(empxsrv => {
      let branch = this.getBranchName(empxsrv.serviceshiftId);
      let begindate = this.getBegindate(empxsrv.serviceshiftId);
      let employeeName = this.getEmployeeName(empxsrv.employeeId);
      empxsrv["branchName"] = branch.branchName;
      empxsrv["branchId"] = branch.branchId;
      empxsrv["begindate"] = begindate;
      empxsrv["employeeName"] = employeeName;
      return null;
    });
  }
  
  render() {
    const { allEmpxSrv } = this.state;
    const { classes } = this.props;
    this.buildNewAllEmpxSrv(allEmpxSrv);
    console.log("allEmpxSrv", allEmpxSrv);
    return (
      <div className={classes.EmpxSrvContainer}>
        <Selector
          branches={this.state.branches}
          serviceShifts={this.state.serviceShifts}
          onFilterChanged={this.onFilterChanged}
        />
        <br />
        <EmpxSrvTable currentEmpxSrvs={allEmpxSrv} />
      </div>
    );
  }
}

export default withStyles(EmpxSrvPageStyle)(EmpxSrvContainer);
