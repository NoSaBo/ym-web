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
// import FilterListIcon from "@material-ui/icons/FilterList";
import { lighten } from "@material-ui/core/styles/colorManipulator";
//GraphQL
import { Mutation } from "react-apollo";
import { DELETE_BRANCH, DISABLE_BRANCH } from "../../../../mutations/branch";
import { GET_BRANCHES } from "../../../../queries/branch";
//Customized components
import Add from "../../../../components/Modal/branch/Add";
import Update from "../../../../components/Modal/branch/Update";
import Display from "../../../../components/Modal/branch/Display";
// Helper functions
import {
  notDeletable,
  notDisable
} from "assets/helperFunctions/validationBranch.js";

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
  { id: "branch", numeric: false, disablePadding: true, label: "SEDE" },
  { id: "address", numeric: false, disablePadding: true, label: "DIRECCION" },
  { id: "contact", numeric: false, disablePadding: true, label: "CONTACTO" },
  { id: "phone", numeric: false, disablePadding: true, label: "TELEFONO" },
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
  },
  disableDeleteRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  }
});

const updateCacheDelete = (cache, { data: { deleteBranch } }) => {
  const { branches } = cache.readQuery({ query: GET_BRANCHES });
  cache.writeQuery({
    query: GET_BRANCHES,
    data: {
      branches: branches.filter(n => n.id !== deleteBranch.id)
    }
  });
};

const updateCacheDisable = (cache, { data: { disableBranch } }) => {
  const { branches } = cache.readQuery({ query: GET_BRANCHES });
  const { id, active } = disableBranch;
  branches.find(branch => {
    if (branch.id === id) {
      branch["active"] = active;
    }
    return null;
  });
  cache.writeQuery({
    query: GET_BRANCHES,
    data: { branches }
  });
};

class EnhancedTableToolbar extends React.Component {
  disableOnClick(disableBranch, selected) {
    const validationDisable = notDisable(this.props.serviceshifts, selected);
    if (!validationDisable.error) {
      selected.map(id => disableBranch({ variables: { id } }));
      this.props.resetValues();
    }
    alert(validationDisable.alert);
  }
  deleteOnClick(deleteBranch, selected, history) {
    const validationDelete = notDeletable(this.props.serviceshifts, selected);
    if (!validationDelete.error) {
      selected.map(id => deleteBranch({ variables: { id } }));
      this.props.resetValues();
    }
    alert(validationDelete.alert);
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
              <Add branches={this.props.branches}/>
            </Typography>
          )}
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          {numSelected > 0 ? (
            <div className={classes.disableDeleteRow}>
              <Tooltip title="Activar / Desactivar">
                <IconButton aria-label="Activar / Desactivar">
                  <Mutation
                    mutation={DISABLE_BRANCH}
                    update={updateCacheDisable}
                  >
                    {disableBranch => (
                      <i
                        className="material-icons"
                        onClick={() =>
                          this.disableOnClick(disableBranch, selected)
                        }
                      >
                        exposure
                      </i>
                    )}
                  </Mutation>
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton aria-label="Delete">
                  <Mutation mutation={DELETE_BRANCH} update={updateCacheDelete}>
                    {deleteBranch => (
                      <DeleteIcon
                        onClick={() => {
                          this.deleteOnClick(deleteBranch, selected, history);
                          return null;
                        }}
                      />
                    )}
                  </Mutation>
                </IconButton>
              </Tooltip>
            </div>
          ) : null
          /* (
            <Tooltip title="Filtrar lista">
              <IconButton aria-label="Filtrar lista">
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          ) */
          }
        </div>
      </Toolbar>
    );
  }
}

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
  },
  td: {
    padding: "1%"
  },
  flexContainerActions: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  cuttedView: {
    margin: "0 -30px 0 0",
    width: "180px",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap"
  }
});

class EnhancedTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: "desc",
      orderBy: "active",
      selected: [],
      data: [],
      page: 0,
      rowsPerPage: 10
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
          serviceshifts={this.props.serviceshifts}
          branches={this.props.data}
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
                  const isSelected = this.isSelected(n.id);
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
                        onClick={event => this.handleClick(event, n.id)}
                      >
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        <p title={n.branch} className={classes.cuttedView}>
                          {n.branch}
                        </p>
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        padding="none"
                        margin="none"
                      >
                        <p title={n.address} className={classes.cuttedView}>
                          {n.address}
                        </p>
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        {n.contact}
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        {n.phone}
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        {n.active ? "ACTIVO" : "INACTIVO"}
                      </TableCell>
                      <TableCell
                        className={classNames(
                          classes.flexContainerActions,
                          classes.td
                        )}
                      >
                        <Display branch={n} />
                        <Update branch={n} branches={this.props.data}/>
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
