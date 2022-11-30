import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useQuery } from "@tanstack/react-query";
import SpinnerComponent from "../components/Spinner";

const UserComponent = () => {
  let { isLoading, error, data } = useQuery(
    ["subscribedUsers"],
    async () =>
      await (await fetch(`${import.meta.env.VITE_API_BASE_URL}/user`)).json()
  );

  if (isLoading) {
    return <SpinnerComponent />;
  }
  if (error) {
    return <h2>Please try again!</h2>;
  }
  if (data) {
    return (
      <div>
        <h1 className="text-center p-4">List of all Subscribed Users</h1>
        <div className="card">
          <DataTable value={data} responsiveLayout="scroll">
            <Column field="name" header="Name"></Column>
            <Column field="email" header="Email"></Column>
          </DataTable>
        </div>
      </div>
    );
  }
};

export default UserComponent;
