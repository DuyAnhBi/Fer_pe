import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { getAllCategories } from "../services/CategoriesService";
import { getAllBrand } from "../services/BrandService";
const DetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [brand, setBrand] = useState([]);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const resultCategories = await getAllCategories();
      setCategories(resultCategories);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBrand = async () => {
    try {
      const resultBrand = await getAllBrand();
      setBrand(resultBrand);
    } catch (error) {
      console.log(error);
    }
  };

  // const handleDelete = async () => {
  //   const confirmDelete = window.confirm("Bạn có chắc muốn xóa sản phẩm này?");
  //   if (!confirmDelete) return;

  //   try {
  //     await axios.delete(`http://localhost:9999/product/${id}`);
  //     alert("da xoa!");
  //     navigate("/");
  //   } catch (error) {
  //     console.log(error);
  //     alert(error);
  //   }
  // };
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Bạn có chắc muốn xóa sản phẩm này?");
    if (!confirmDelete) return;
    try {
      await axios.delete(`http://localhost:9999/product/${product.id}`);
      alert("da xoa!");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
    window.location.reload();
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:9999/product/${id}`);
        setProduct(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
    fetchCategories();
    fetchBrand();
  }, [id]);
  // useEffect(() => {
  //   fetchBrand();
  //   console.log(brand);
  // }, []);

  // useEffect(() => {
  //   fetchCategories();
  //   console.log(categories);
  // }, []);
  if (!product) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <Card>
        <Row>
          <Col md={4}>
            <Card.Img variant="top" src={`/images/${product.image}`} />
          </Col>
          <Col md={8}>
            <Card.Body>
              <Card.Text>Product detail: {product.title}</Card.Text>
              <Card.Text>ID: {product.id}</Card.Text>
              <Card.Text>
                Brand:
                {brand.find((brand) => brand.id === String(product.brand))
                  ?.name || "unknow"}
              </Card.Text>
              <Card.Text>Descrption: {product.description}</Card.Text>
              <Card.Text>
                Category:
                {categories.find(
                  (categories) => categories.id === String(product.category)
                )?.name || "unknow"}
              </Card.Text>
              <Card.Text className="text-decoration-line-through text-primary fw-bold">
                Price: ${product.price}
              </Card.Text>
              <Card.Text className="text-danger">
                Discount: {product.discountPercentage}%
              </Card.Text>
              <Card.Text className="text-primary fw-bold">
                New price: $
                {(
                  product.price -
                  (product.price * product.discountPercentage) / 100
                ).toFixed(0)}
              </Card.Text>
              <Link to="/">
                <Button variant="secondary">Back to Home</Button>
                <Button variant="danger" onClick={handleDelete}>
                  Delete
                </Button>
              </Link>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default DetailPage;
