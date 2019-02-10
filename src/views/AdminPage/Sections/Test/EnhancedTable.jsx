import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import { lighten } from "@material-ui/core/styles/colorManipulator";
//GraphQL
import { Mutation } from "react-apollo";
import { DELETE_EMPLOYEE } from "../../../../mutations/employee";
import { GET_EMPLOYEES } from "../../../../queries/employee";
//Customized components
import Add from "../../../../components/Modal/employee/Add";

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  { id: "firstname", numeric: false, disablePadding: true, label: "NOMBRE" },
  { id: "lastname", numeric: false, disablePadding: true, label: "APELLIDO" },
  { id: "user", numeric: false, disablePadding: true, label: "USUARIO" },
  { id: "active", numeric: false, disablePadding: true, label: "ESTADO" },
  { id: "actions", numeric: false, disablePadding: true, label: "ACCIONES" }
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const {
      // onSelectAllClick,
      order,
      orderBy
      // numSelected,
      // rowCount
    } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              disabled
              // indeterminate={numSelected > 0 && numSelected < rowCount}
              // checked={numSelected === rowCount}
              // onChange={onSelectAllClick}
            />
          </TableCell>
          {rows.map(
            row => (
              <TableCell
                key={row.id}
                align={row.numeric ? "right" : "left"}
                padding={row.disablePadding ? "none" : "default"}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? "bottom-end" : "bottom-start"}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this
          )}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  spacer: {
    flex: "1 1 100%"
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: "0 0 auto"
  },
  i: {
    marginLeft: "-12px"
  }
});

const updateCacheDelete = (cache, { data: { deleteEmployee } }) => {
  const { employees } = cache.readQuery({ query: GET_EMPLOYEES });
  cache.writeQuery({
    query: GET_EMPLOYEES,
    data: {
      employees: employees.filter(n => n.user !== deleteEmployee.user)
    }
  });
};

class EnhancedTableToolbar extends React.Component {
  deleteOnClick(deleteEmployee, selected, history) {
    selected.map(user =>
      deleteEmployee({
        variables: { user }
      })
    );
    this.props.resetValues();
  }
  render() {
    const { numSelected, classes, selected, history } = this.props;

    return (
      <Toolbar
        className={classNames(classes.root, {
          [classes.highlight]: numSelected > 0
        })}
      >
        <div className={classes.title}>
          {numSelected > 0 ? (
            <Typography color="inherit" variant="subheading">
              {numSelected} selected
            </Typography>
          ) : (
            <Typography
              variant="subheading"
              id="tableTitle"
              className={classes.i}
            >
            <Add/>
              {/* <Tooltip title="Agregar empleado">
                <IconButton aria-label="Agregar empleado">
                  <i
                    className={"material-icons"}
                    onClick={(event, rowData) => {
                      alert("You clicked add ");
                    }}
                  >
                    add
                  </i>
                </IconButton>
              </Tooltip> */}
            </Typography>
          )}
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          {numSelected > 0 ? (
            <Tooltip title="Delete">
              <IconButton aria-label="Delete">
                <Mutation mutation={DELETE_EMPLOYEE} update={updateCacheDelete}>
                  {deleteEmployee => (
                    <DeleteIcon
                      onClick={() => {
                        this.deleteOnClick(deleteEmployee, selected, history);
                        alert(`Empleado(s) eliminado(s)`);
                        return null;
                      }}
                    />
                  )}
                </Mutation>
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Filtrar lista">
              <IconButton aria-label="Filtrar lista">
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          )}
        </div>
      </Toolbar>
    );
  }
}

// let EnhancedTableToolbar = props => {
//   const { numSelected, classes, selected, history } = props;

//   function deleteOnClick(deleteEmployee) {
//     selected.map(user =>
//       deleteEmployee({
//         variables: { user }
//       })
//     );
//     alert(`Empleado(s) eliminado(s)`);
//     history.push("/parkeo/admin-page/test");
//   }

//   return (
//     <Toolbar
//       className={classNames(classes.root, {
//         [classes.highlight]: numSelected > 0
//       })}
//     >
//       <div className={classes.title}>
//         {numSelected > 0 ? (
//           <Typography color="inherit" variant="subheading">
//             {numSelected} selected
//           </Typography>
//         ) : (
//           <Typography
//             variant="subheading"
//             id="tableTitle"
//             className={classes.i}
//           >
//             <Tooltip title="Agregar empleado">
//               <IconButton aria-label="Agregar empleado">
//                 <i
//                   className={"material-icons"}
//                   onClick={(event, rowData) => {
//                     alert("You clicked add ");
//                   }}
//                 >
//                   add
//                 </i>
//               </IconButton>
//             </Tooltip>
//           </Typography>
//         )}
//       </div>
//       <div className={classes.spacer} />
//       <div className={classes.actions}>
//         {numSelected > 0 ? (
//           <Tooltip title="Delete">
//             <IconButton aria-label="Delete">
//               <Mutation mutation={DELETE_EMPLOYEE} update={updateCacheDelete}>
//                 {deleteEmployee => (
//                   <DeleteIcon
//                     onClick={(e) => deleteOnClick(deleteEmployee)}
//                     // onClick={event => {
//                     //   event.preventDefault();
//                     //   selected.map(user =>
//                     //     (deleteEmployee({
//                     //       variables: { user }
//                     //     }))
//                     //   );
//                     //   alert(`Empleado(s) eliminado(s)`);
//                     //   history.push("/parkeo/admin-page/test");
//                     // }}
//                   />
//                 )}
//               </Mutation>
//             </IconButton>
//           </Tooltip>
//         ) : (
//           <Tooltip title="Filtrar lista">
//             <IconButton aria-label="Filtrar lista">
//               <FilterListIcon />
//             </IconButton>
//           </Tooltip>
//         )}
//       </div>
//     </Toolbar>
//   );
// };

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 1020,
    align: "centre"
  },
  tableWrapper: {
    overflowX: "auto"
  }
});

class EnhancedTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: "asc",
      orderBy: "user",
      selected: [],
      data: [],
      page: 0,
      rowsPerPage: 5
    };
    this.resetValues = this.resetValues.bind(this);
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  componentWillMount() {
    let { data } = this.props;
    this.setState({ data });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.state.data) {
      this.setState({ data: nextProps.data });
    }
  }

  resetValues() {
    this.setState({ selected: [] });
  }

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          selected={selected}
          history={this.props.history}
          resetValues={this.resetValues}
        />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.user);
                  return (
                    <TableRow
                      // hover
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >
                      <TableCell
                        padding="checkbox"
                        onClick={event => this.handleClick(event, n.user)}
                      >
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        {n.firstname}
                      </TableCell>
                      <TableCell align="right">{n.lastname}</TableCell>
                      <TableCell align="right">{n.user}</TableCell>
                      <TableCell align="right">
                        {n.active ? "ACTIVO" : "INACTIVO"}
                      </TableCell>
                      <TableCell>
                        <Tooltip title="Detalles">
                          <IconButton aria-label="Detalles">
                            <i
                              className={"material-icons"}
                              onClick={(event, selected) => {
                                alert("You clicked display ");
                              }}
                            >
                              account_circle
                            </i>
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Editar">
                          <IconButton aria-label="Editar">
                            <i
                              className={"material-icons"}
                              onClick={(event, rowData) => {
                                alert("You clicked edit ");
                              }}
                            >
                              edit
                            </i>
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={5} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "Previous Page"
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page"
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EnhancedTable);
