import { useQuery } from "@tanstack/react-query";
import React, { useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import SpinnerComponent from "../components/Spinner";

const DataTableEditDemo = () => {
  const toast = useRef(null);

  let { isLoading, error, data, refetch } = useQuery(
    ["adminProductData"],
    async () =>
      await (await fetch(`${import.meta.env.VITE_API_BASE_URL}/product`)).json()
  );

  // When the values are saved
  const onRowEditComplete = async (e) => {
    let { newData } = e;
    // console.log(newData);

    try {
      let result = await (
        await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/product?_id=${newData._id}`,
          {
            method: "PUT",
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ price: Number(newData.price) }),
          }
        )
      ).text();

      refetch(); // Update state

      toast.current.show({
        severity: "success",
        summary: "Data Updated",
      });

      console.log("Responce", result);
    } catch (err) {
      console.log(err);
      toast.current.show({
        severity: "error",
        summary: err.message,
      });
    }
  };

  const textEditor = (options) => {
    return (
      <InputText
        type="text"
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    );
  };

  if (isLoading) {
    return <SpinnerComponent />;
  }
  if (error) {
    return <h2>Please try again!</h2>;
  }
  if (data) {
    return (
      <div className="datatable-editing-demo">
        <Toast ref={toast} />

        <h1 className="text-center p-4">Product Price List</h1>
        <h5 className="pb-4">
          This is where you can update the price of the products. Click on the
          pencil button and decrease the price of any product. All those users
          who have subscribed to that specific product will receive the email if
          price drops $1 or more.
        </h5>
        <div className="card p-fluid">
          <DataTable
            value={data}
            editMode="row"
            dataKey="_id"
            onRowEditComplete={onRowEditComplete}
            responsiveLayout="scroll"
          >
            <Column
              field="name"
              header="Name"
              editor={(options) => textEditor(options)}
              style={{ width: "20%" }}
            ></Column>
            <Column
              field="price"
              header="Price ($)"
              editor={(options) => textEditor(options)}
              style={{ width: "20%" }}
            ></Column>
            <Column
              rowEditor
              headerStyle={{ width: "10%", minWidth: "8rem" }}
              bodyStyle={{ textAlign: "center" }}
            ></Column>
          </DataTable>
        </div>
      </div>
    );
  }
};

export default DataTableEditDemo;
