import React from "react";
import Badge from "../../../../components/Badge/Badge";
import DisplayModal from "../../../../components/Modal/employee/Display";
import UpdateModal from "../../../../components/Modal/employee/Update";
import { Mutation } from 'react-apollo';
import { DELETE_EMPLOYEE } from '../../../../mutations/employee';
import { GET_EMPLOYEES } from '../../../../queries/employee';
// @material-ui/core & style components
import withStyles from "@material-ui/core/styles/withStyles";
import employeePageStyle from "assets/jss/material-kit-react/views/employeePage.jsx";

const updateCacheDelete = (cache, { data: { deleteEmployee } }) => {
  const { employees } = cache.readQuery({ query: GET_EMPLOYEES });
  cache.writeQuery({
    query: GET_EMPLOYEES,
    data: {
      employees: employees.filter(n => n.user !== deleteEmployee.user)
    }
  });
};

const deleteOnClick = (deleteEmployee, employee) => {
  let user = employee.user;
  deleteEmployee({ variables: { user: employee.user } });
  alert(`Empleado ${user} has sido eliminado`);
}

const Row = ({ index, employee, classes }) => {
  return (
    <tr>
      <td> {index + 1} </td>
      <td> {employee.firstname} </td>
      <td> {employee.lastname} </td>
      <td> {employee.user} </td>
      <td> {employee.active ? "Activo" : "Inactivo"} </td>
      <td className={classes.flexContainerActions}>
        <div>
          <DisplayModal employee={employee} />
        </div>
        <div>
          <UpdateModal employee={employee} />
        </div>
        <div>
          <Mutation mutation={DELETE_EMPLOYEE} update={updateCacheDelete}>
            {deleteEmployee => (
              <Badge
                color="danger"
                onClick={() => deleteOnClick(deleteEmployee, employee)}
              >
                <i className="material-icons">close</i>
              </Badge>
            )}
          </Mutation>
        </div>
      </td>
    </tr>
  );
};

export default withStyles(employeePageStyle)(Row);
