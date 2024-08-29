import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import axios from 'axios';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const ProductsDemo = () => {
    const emptyCustomer = {
        id: null,
        companyname: '',
        cust_name: '',
        cust_email: '',
        cust_mobile: ''
    };

    const [customers, setCustomers] = useState(null);
    const [customerDialog, setCustomerDialog] = useState(false);
    const [deleteCustomerDialog, setDeleteCustomerDialog] = useState(false);
    const [deleteCustomersDialog, setDeleteCustomersDialog] = useState(false);
    const [customer, setCustomer] = useState(emptyCustomer);
    const [selectedCustomers, setSelectedCustomers] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/customer');
            setCustomers(response.data);
        } catch (error) {
            console.error('Error fetching customers:', error);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to fetch customers', life: 3000 });
        }
    };

    const openNew = () => {
        setCustomer(emptyCustomer);
        setSubmitted(false);
        setCustomerDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setCustomerDialog(false);
    };

    const hideDeleteCustomerDialog = () => {
        setDeleteCustomerDialog(false);
    };

    const hideDeleteCustomersDialog = () => {
        setDeleteCustomersDialog(false);
    };

    const saveCustomer = async () => {
        setSubmitted(true);

        if (customer.companyname.trim()) {
            let _customers = [...customers];
            let _customer = { ...customer };

            try {
                if (customer.id) {
                    await axios.put(`http://localhost:5000/customer/${customer.id}`, _customer);
                    const index = findIndexById(customer.id);
                    _customers[index] = _customer;
                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Customer Updated', life: 3000 });
                } else {
                    const response = await axios.post('http://localhost:5000/customer', _customer);
                    _customer.id = response.data.id;
                    _customers.push(_customer);
                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Customer Created', life: 3000 });
                }

                setCustomers(_customers);
                setCustomerDialog(false);
                setCustomer(emptyCustomer);
            } catch (error) {
                console.error('Error saving customer:', error);
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to save customer', life: 3000 });
            }
        }
    };

    const editCustomer = (customer) => {
        setCustomer({ ...customer });
        setCustomerDialog(true);
    };

    const confirmDeleteCustomer = (customer) => {
        setCustomer(customer);
        setDeleteCustomerDialog(true);
    };

    const deleteCustomer = async () => {
        try {
            await axios.delete(`http://localhost:5000/customer/${customer.id}`);
            let _customers = customers.filter((val) => val.id !== customer.id);
            setCustomers(_customers);
            setDeleteCustomerDialog(false);
            setCustomer(emptyCustomer);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Customer Deleted', life: 3000 });
        } catch (error) {
            console.error('Error deleting customer:', error);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to delete customer', life: 3000 });
        }
    };

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < customers.length; i++) {
            if (customers[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    };

    const confirmDeleteSelected = () => {
        setDeleteCustomersDialog(true);
    };

    const deleteSelectedCustomers = async () => {
        try {
            const deleteRequests = selectedCustomers.map(customer => axios.delete(`http://localhost:5000/customer/${customer.id}`));
            await Promise.all(deleteRequests);
            let _customers = customers.filter((val) => !selectedCustomers.includes(val));
            setCustomers(_customers);
            setDeleteCustomersDialog(false);
            setSelectedCustomers(null);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Customers Deleted', life: 3000 });
        } catch (error) {
            console.error('Error deleting selected customers:', error);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to delete selected customers', life: 3000 });
        }
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _customer = { ...customer };
        _customer[`${name}`] = val;
        setCustomer(_customer);
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} className='bg-green-700 text-white py-2 px-4' />
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedCustomers || !selectedCustomers.length} className='bg-red-700 text-white py-2 px-4' />
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return <Button label="Export" icon="pi pi-upload" className="bg-purple-600 text-white py-2 px-4" onClick={exportCSV} />;
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editCustomer(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteCustomer(rowData)} />
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage Customers</h4>
            <span className="p-input-icon-left">
               
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." className='border-2 p-2' />
            </span>
        </div>
    );

    const customerDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} className='bg-red-600 text-white px-4 py-2' />
            <Button label="Save" icon="pi pi-check" onClick={saveCustomer} className='bg-blue-600 text-white px-4 py-2 ml-2' />
        </React.Fragment>
    );

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const deleteCustomerDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteCustomerDialog} className='bg-red-600 text-white px-4 py-2' />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteCustomer} className='bg-green-600 text-white px-4 py-2 ml-2' />
        </React.Fragment>
    );

    const deleteCustomersDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteCustomersDialog} className='bg-red-600 text-white px-4 py-2' />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedCustomers} className='bg-green-600 text-white px-4 py-2 ml-2' />
        </React.Fragment>
    );

    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate} />
                <DataTable ref={dt} value={customers} selection={selectedCustomers} onSelectionChange={(e) => setSelectedCustomers(e.value)}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} globalFilter={globalFilter} header={header} responsiveLayout="scroll">
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                    <Column field="companyname" header="Company Name" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="cust_name" header="Customer Name" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="cust_email" header="Email" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="cust_mobile" header="Mobile" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column body={actionBodyTemplate} header="Actions" exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={customerDialog} style={{ width: '32rem' }} header="Customer Details" modal className="p-fluid" footer={customerDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="companyname">Company Name</label>
                    <InputText id="companyname" value={customer.companyname} onChange={(e) => onInputChange(e, 'companyname')} required autoFocus className={classNames({ 'p-invalid': submitted && !customer.companyname },"border-2 p-2")} />
                    {submitted && !customer.companyname && <small className="p-error">Company Name is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="cust_name">Customer Name</label>
                    <InputText id="cust_name" value={customer.cust_name} onChange={(e) => onInputChange(e, 'cust_name')} required className={classNames({ 'p-invalid': submitted && !customer.cust_name },"border-2 p-2")} />
                    {submitted && !customer.cust_name && <small className="p-error">Customer Name is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="cust_email">Email</label>
                    <InputText id="cust_email" value={customer.cust_email} onChange={(e) => onInputChange(e, 'cust_email')} required className={classNames({ 'p-invalid': submitted && !customer.cust_email },"border-2 p-2")} />
                    {submitted && !customer.cust_email && <small className="p-error">Email is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="cust_mobile">Mobile</label>
                    <InputText id="cust_mobile" value={customer.cust_mobile} onChange={(e) => onInputChange(e, 'cust_mobile')} required className={classNames({ 'p-invalid': submitted && !customer.cust_mobile },"border-2 p-2")} />
                    {submitted && !customer.cust_mobile && <small className="p-error">Mobile is required.</small>}
                </div>
            </Dialog>

            <Dialog visible={deleteCustomerDialog} style={{ width: '32rem' }} header="Confirm" modal footer={deleteCustomerDialogFooter} onHide={hideDeleteCustomerDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-2" style={{ fontSize: '2rem' }} />
                    {customer && (
                        <span>
                            Are you sure you want to delete <b>{customer.companyname}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteCustomersDialog} style={{ width: '32rem' }} header="Confirm" modal footer={deleteCustomersDialogFooter} onHide={hideDeleteCustomersDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-2" style={{ fontSize: '2rem' }} />
                    {customer && <span>Are you sure you want to delete the selected customers?</span>}
                </div>
            </Dialog>
        </div>
    );
};

export default ProductsDemo;
