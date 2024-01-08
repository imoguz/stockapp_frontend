import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import useStock from "../../hooks/useStock";
import {
  GridRowModes,
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridToolbar,
} from "@mui/x-data-grid";

const idFormatter = (purchases) => {
  const data = purchases?.map((item) => ({ ...item, id: item._id }));
  return data;
};

export default function PurchaseDataGrid() {
  const { createStock, updateStock, deleteStock } = useStock();
  const { purchases, products, firms, brands } = useSelector(
    (store) => store.stock
  );
  const [rows, setRows] = useState(idFormatter(purchases));
  const [rowModesModel, setRowModesModel] = useState({});

  useEffect(() => {
    setRows(idFormatter(purchases));
  }, [purchases]);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
    deleteStock(id, "purchases");
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = async (newRow) => {
    // Modified nested fields
    const firmId = firms?.find((item) => item.name === newRow.firm)?._id;
    const brandId = brands?.find((item) => item.name === newRow.brand)?._id;
    const productId = products?.find(
      (item) => item.name === newRow.product
    )?._id;

    const newData = {
      firmId,
      brandId,
      productId,
      quantity: newRow.quantity,
      price: newRow.price,
    };

    if (newRow.isNew) {
      // create
      const createdRow = await createStock(newData, "purchases");
      const updatedRow = {
        ...newRow,
        id: createdRow._id,
        isNew: false,
        createdAt: createdRow.updatedAt,
        firmId: { ...newRow.firmId, name: newRow.firm },
        brandId: { ...newRow.brandId, name: newRow.brand },
        productId: { ...newRow.productId, name: newRow.product },
      };
      setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
      return updatedRow;
    } else {
      // Update
      const updatedData = await updateStock(newData, "purchases", newRow.id);
      const updatedRow = {
        ...newRow,
        id: updatedData._id,
        isNew: false,
        firmId: { ...newRow.firmId, name: newRow.firm },
        brandId: { ...newRow.brandId, name: newRow.brand },
        productId: { ...newRow.productId, name: newRow.product },
      };
      setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
      return updatedRow;
    }
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleClick = () => {
    const tempId = Date.now().toString();

    setRows((oldRows) => [
      ...oldRows,
      {
        id: tempId,
        firmId: { name: "" },
        brandId: { name: "" },
        productId: { name: "" },
        quantity: "",
        price: "",
        createdAt: new Date().toISOString(),
        isNew: true,
      },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [tempId]: { mode: GridRowModes.Edit, fieldToFocus: "firm" },
    }));
  };

  const columns = [
    {
      field: "id",
      headerName: "Id",
      width: 70,
      editable: false,
      valueGetter: (params) => params.row._id,
    },
    {
      field: "createdAt",
      headerName: "Date",
      type: "date",
      flex: 1,
      minWidth: 100,
      editable: false,
      valueGetter: (params) => new Date(params.row.createdAt),
    },
    {
      field: "firm",
      headerName: "Firm",
      flex: 1,
      minWidth: 100,
      editable: true,
      type: "singleSelect",
      valueOptions: firms?.map((item) => item?.name),
      valueGetter: (params) => params.row.firmId?.name,
    },
    {
      field: "brand",
      headerName: "Brand",
      flex: 1,
      minWidth: 100,
      editable: true,
      type: "singleSelect",
      valueOptions: brands?.map((item) => item?.name),
      valueGetter: (params) => params.row.brandId?.name,
    },
    {
      field: "product",
      headerName: "Product",
      flex: 1,
      minWidth: 100,
      editable: true,
      type: "singleSelect",
      valueOptions: products?.map((item) => item.name),
      valueGetter: (params) => params.row.productId?.name,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      type: "number",
      flex: 1,
      minWidth: 100,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      flex: 1,
      minWidth: 100,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "totalPrice",
      headerName: "Total Price",
      type: "number",
      flex: 1,
      minWidth: 100,
      align: "left",
      headerAlign: "left",
      editable: false,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        mt: 1,
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <Button
        variant="contained"
        size="small"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleClick}
        sx={{
          mt: 1,
          backgroundColor: "#2192FF",
          "&:hover": { backgroundColor: "#31C6D4" },
        }}
      >
        Add Purchases
      </Button>
      <DataGrid
        className="boxShadow"
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{ toolbar: GridToolbar }}
      />
    </Box>
  );
}
