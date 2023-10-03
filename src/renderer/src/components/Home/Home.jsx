import React, { useEffect, useState } from 'react';
import MUIDataTable from "mui-datatables";
import AddButton from './AddButton';

async function inventory() {
  try {
    const result = await window.ipcRender.invoke('inventory');
    return result;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}


function Home() {
  const [inventoryData, setInventoryData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
    const handleRowDelete = (rowsDeleted, newTableData) => {
    const deletedProductData = rowsDeleted.data.map((deletedRow) => {
    const dataIndex = deletedRow.dataIndex;
    return inventoryData[dataIndex].ProductID;
  });
    console.log("Rows Deleted:", deletedProductData);
    setInventoryData(newTableData);
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await inventory();
        setInventoryData(result);
        console.log(result)
      } catch (error) {
        console.error('Error in Home:', error);
      } finally {
        // Set loading state to false when data fetching is complete
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

const columns = ["ProductName", "PurchaseDate", "PurchasePrice", "QuantityPurchased", "SupplierName"];

const options = {
  filterType: 'dropdown',
  onRowsDelete: handleRowDelete,
};
  return (
      <div className="content">
        <header className="flex flex-row m-5">
          <h1 className="text-xl font-extrabold ">Inventory</h1>
          <div className="ml-auto">
            <AddButton />
          </div>
        </header>
        {isLoading && <div>Loading...</div>}
        {inventoryData && (
            <MUIDataTable
              title={"Products List"}
              data={inventoryData}
              columns={columns}
              options={options}
            />
        )}
      </div>
  );
}

export default Home;
