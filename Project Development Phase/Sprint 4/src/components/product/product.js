import React, { useState, useEffect } from "react";
import NavBar from "../navbar/Navbar";
import { Slide } from "react-reveal";
import { Form } from "react-bootstrap";
import { Modal, ModalHeader, ModalBody, Card, CardImg, Label, CardBody } from 'reactstrap';
import { Button, CircularProgress } from '@material-ui/core';
import { Button as Btn } from 'react-bootstrap';
import axios from "axios";
import Loading from "../../shared/Loading";
const title =
    <div className="row mt-1 p-0">
        <Slide left>
            <div>
                <Card className="p-1 border-none">
                    <CardBody className="d-flex row">
                        <div className="col-2">
                            <b>Product name</b>
                        </div>
                        <div className="col-2">
                            <b> Current Quantity</b>
                        </div>
                        <div className="col-2">
                            <b>Minimum Quantity</b>
                        </div>
                        <div className="col-2">
                            <b>Category</b>
                        </div>
                        <div className="col-2">
                            <b>Price</b>
                        </div>
                    </CardBody>

                </Card>
            </div>
        </Slide>
    </div>
export default function Products() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [price, setPrice] = useState();
    const [minQ, setMinQ] = useState('');
    const [currQ, setCurrQ] = useState('');
    const [category, setCategory] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const currentUser = localStorage.getItem("email");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false)
    const [stockid, setStockid] = useState('');

    console.log(currentUser, 'current user')
    const toggleModal = async () => {
        setIsModalOpen(!isModalOpen);
        setIsEdit(false);
        if (!isModalOpen) {
            setName('')
            setCurrQ('');
            setMinQ('')
            setCategory('')
            setPrice('');
        }
    }

    useEffect(() => {
        getStocks();
    }, []);
    const renderProducts = products?.map((product) => {
        const handleEdit = () => {
            toggleModal();
            setIsEdit(true);
            if (currentUser) {
                setStockid(product.stockid)
                setName(product.name)
                setCurrQ(product.quantity)
                setCategory(product.category)
                setMinQ(product.minvalue)
                setPrice(product.price);
            } else {
                alert('you are not logged in!')
            }
        }

        const handleDelete = async () => {
            if (currentUser) {
                setProducts(products?.filter((prod) => prod.stockid !== product.stockid));
                let bodyFormData = new FormData();
                bodyFormData.append("stockid", product.stockid);
                await axios({
                    method: "post",
                    url: "http://127.0.0.1:5000/deletestock",
                    data: bodyFormData,
                    headers: { "Content-Type": "multipart/form-data", 'Access-Control-Allow-Origin': '*' },
                }).then((res) => {
                    console.log(res);
                    if (res?.data?.message) {
                        getStocks();
                    }
                });
            }
        }
        return (
            <div key={product.stockid} className="col-12 mt-3 p-0">
                <Slide left>
                    <div>
                        <Card className="p-3 border-none">
                            <CardBody className="d-flex row">
                                <div className="col-2">
                                    {product.name}
                                </div>
                                <div className="col-2">
                                    {product.quantity}
                                </div>
                                <div className="col-2">
                                    {product.minvalue}
                                </div>
                                <div className="col-2">
                                    {product.category}
                                </div>
                                <div className="col-2">
                                    {product.price}
                                </div>
                                <div className="col-2 d-flex">
                                    <div className="col-6">
                                        <Btn
                                            variant="primary"
                                            onClick={handleEdit}
                                        >
                                            Edit
                                        </Btn>
                                    </div>
                                    <div className="col-6">
                                        <Btn
                                            variant="danger"
                                            onClick={handleDelete}
                                        >
                                            Delete
                                        </Btn>
                                    </div>
                                </div>

                            </CardBody>

                        </Card>
                    </div>
                </Slide>
            </div>
        );
    });

    const getStocks = async () => {
        if (currentUser) {
            let bodyFormData = new FormData();
            bodyFormData.append("useremail", currentUser);
            await axios({
                method: "post",
                url: "http://127.0.0.1:5000/getstocks",
                data: bodyFormData,
                headers: { "Content-Type": "multipart/form-data", 'Access-Control-Allow-Origin': '*' },
            }).then((res) => {
                console.log(res);
                if (res?.data) {
                    setProducts(res.data);
                }
            });
        }
    }

    const handleAddProduct = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (isEdit && name !== '' && currQ && minQ && category !== '' && price) {
            let bodyFormData = new FormData();
            bodyFormData.append("useremail", currentUser);
            bodyFormData.append("category", category);
            bodyFormData.append("price", price);
            bodyFormData.append("minvalue", minQ);
            bodyFormData.append("quantity", currQ);
            bodyFormData.append("name", name);
            bodyFormData.append("stockid", stockid);
            await axios({
                method: "post",
                url: "http://127.0.0.1:5000/updatestock",
                data: bodyFormData,
                headers: { "Content-Type": "multipart/form-data", 'Access-Control-Allow-Origin': '*' },
            }).then((res) => {
                console.log(res);
                if (res?.data?.message) {
                    console.log(res.data.message);
                    getStocks();
                }
            }).catch((e) => console.log(e));
        } else if (name !== '' && currQ && minQ && category !== '' && price) {
            let bodyFormData = new FormData();
            bodyFormData.append("useremail", currentUser);
            bodyFormData.append("category", category);
            bodyFormData.append("price", price);
            bodyFormData.append("minvalue", minQ);
            bodyFormData.append("quantity", currQ);
            bodyFormData.append("name", name);
            await axios({
                method: "post",
                url: "http://127.0.0.1:5000/addstock",
                data: bodyFormData,
                headers: { "Content-Type": "multipart/form-data", 'Access-Control-Allow-Origin': '*' },
            }).then((res) => {
                console.log(res);
                if (res?.data?.message) {
                    getStocks();
                    alert('product added successfully');
                }
            });
        } else {
            alert('please fill all the details!');
        }
        setStockid('');
        setName('')
        setCurrQ('');
        setMinQ('')
        setCategory('')
        setPrice('');

        toggleModal();
        setLoading(false);
    }
    const resetValues = () => {
        setName('')
        setCurrQ('');
        setMinQ('')
        setCategory('')
        setPrice('');
    }


    return (
        <div>
            <NavBar />
            <div style={{ marginTop: "100px" }} className="text-center">
                <h1 style={{ fontSize: "50px" }}>List of Products</h1>
            </div>
            <div style={{ width: "70%" }} className="container d-flex justify-content-end">
                {currentUser && <Btn
                    style={{ float: 'right' }}
                    variant="outline-success"
                    onClick={toggleModal}
                >
                    <span className="fa fa-cart-plus fa-lg" style={{ marginRight: '9px' }}></span><span className="d-none d-sm-inline-block">ADD</span>
                </Btn>}
            </div>
            <div
                style={{ marginTop: "20px" }}
                className="container d-flex align-items-center justify-content-center"
            >
                <div style={{ width: "90%" }}>
                    {title}
                    {renderProducts}
                </div>
            </div>
            <Modal
                isOpen={isModalOpen}
                toggle={toggleModal}
                backdrop="static"
            >
                <ModalHeader toggle={toggleModal}>
                    <h4 style={{ fontWeight: "bold" }}>{isEdit ? 'EDIT' : 'ADD'} PRODUCT</h4>
                </ModalHeader>
                <ModalBody>
                    <Form
                        onSubmit={handleAddProduct}
                        className="row"
                        method="POST"
                        enctype="multipart/form-data"
                    >
                        <div className="col-12">
                            <Form.Group id="name">
                                <Form.Label for="name" className="mt-3">
                                    Product Name<span className="text-danger"> *</span>
                                </Form.Label>
                                <Form.Control
                                    className="pr-4"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Name"
                                    required
                                />
                            </Form.Group>
                            <Form.Group id="current quantity">
                                <Form.Label for="current quantity" className="mt-3">
                                    Current Quantity <span className="text-danger"> *</span>
                                </Form.Label>
                                <Form.Control
                                    className="pr-4"
                                    type="number"
                                    value={currQ}
                                    onChange={(e) => setCurrQ(e.target.value)}
                                    placeholder="Current Quantity"
                                    required
                                />
                            </Form.Group>
                            <Form.Group id="minimum quantity">
                                <Form.Label for="minimum quantity" className="mt-3">
                                    Minimum Quantity <span className="text-danger"> *</span>
                                </Form.Label>
                                <Form.Control
                                    className="pr-4"
                                    type="number"
                                    value={minQ}
                                    onChange={(e) => setMinQ(e.target.value)}
                                    placeholder="Minimum Quantity"
                                    required
                                />
                            </Form.Group>
                            <Form.Group id="price">
                                <Form.Label for="price" className="mt-3">
                                    Price<span className="text-danger"> *</span>
                                </Form.Label>
                                <Form.Control
                                    className="pr-4"
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    placeholder="Price"
                                    required
                                />
                            </Form.Group>
                            <Form.Group id="category">
                                <Form.Label for="category" className="mt-3">
                                    Category<span className="text-danger"> *</span>
                                </Form.Label>
                                <Form.Control
                                    className="pr-4"
                                    type="text"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    placeholder="Category"
                                    required
                                />
                            </Form.Group>
                            <Button
                                color="primary"
                                variant="contained"
                                type="submit"
                                fullWidth
                                className="mt-3"
                                disabled={loading}
                            >
                                {loading ? <CircularProgress
                                    size="30px"
                                    thickness="4.5"
                                /> : "Submit"}
                            </Button>
                        </div>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    );
}
