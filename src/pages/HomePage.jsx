import React, { useEffect, useState } from "react";
import { getAllCategories } from "../services/CategoriesService";
import { getAllBrand } from "../services/BrandService";
import { getAllProduct } from "../services/ProductService";
import {
  Row,
  Col,
  Button,
  Table,
  Card,
  Form,
  Container,
  InputGroup,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [brand, setBrand] = useState([]);
  const [product, setProduct] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchProduct = async () => {
    try {
      const resultProduct = await getAllProduct();
      setProduct(resultProduct);
    } catch (error) {
      console.log(error);
    }
  };

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

  useEffect(() => {
    fetchProduct();
    console.log(product);
  }, []);

  useEffect(() => {
    fetchBrand();
    console.log(brand);
  }, []);

  useEffect(() => {
    fetchCategories();
    console.log(categories);
  }, []);

  const filteredProducts = product.filter((p) => {
    return (
      //search:
      p.title.toLowerCase().includes(searchItem.toLowerCase()) &&
      (selectedBrand ? String(p.brand) === selectedBrand : true) &&
      (selectedCategory
        ? String(p.category) === String(selectedCategory)
        : true)
    );
  });
  console.log(filteredProducts);
  return (
    <Container className="mt-3">
      <h1 className="text-center">List of Products</h1>

      <Form.Control
        type="text"
        value={searchItem}
        onChange={(e) => setSearchItem(e.target.value)}
      ></Form.Control>

      <Form className="mb-3"></Form>

      <div style={{ display: "flex" }}>
        <div className="sidebar">
          <div className="categories">
            <h1>Categories</h1>
            {categories.map((category) => (
              <div className="text-start" key={category.id}>
                <input
                  type="radio"
                  onChange={() => setSelectedCategory(category.id)}
                  name="categoryFilter"
                ></input>
                <label>{category.name}</label>
              </div>
            ))}
          </div>
          <div className="brand">
            <h1>Brands</h1>
            {brand.map((brands) => (
              <div className="text-start" key={brands.id}>
                <input
                  onChange={() => setSelectedBrand(brands.id)}
                  type="radio"
                  name="brandFilter"
                ></input>
                <label>{brands.name}</label>
              </div>
            ))}
          </div>
        </div>
        <div
          className="content"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: "1rem",
          }}
        >
          {filteredProducts.map((products) => (
            <div key={products.id}>
              <Card style={{ width: "18rem" }}>
                <Card.Img
                  style={{ height: "300px" }}
                  variant="top"
                  src={`/images/${products.image}`}
                />
                <Card.Body>
                  <Card.Text>{products.id}</Card.Text>
                  <Card.Text>{products.title}</Card.Text>
                  <Card.Text>
                    Brand:
                    {brand.find((brand) => brand.id === String(products.brand))
                      ?.name || "unknow"}
                  </Card.Text>
                  <Card.Text>
                    Category:
                    {categories.find(
                      (categories) =>
                        categories.id === String(products.category)
                    )?.name || "unknow"}
                  </Card.Text>
                  <Card.Text className="text-decoration-line-through text-primary fw-bold">
                    Price: ${products.price}
                  </Card.Text>

                  <Card.Text className="text-danger">
                    Discount: {products.discountPercentage}%
                  </Card.Text>

                  <Card.Text className="text-primary fw-bold">
                    New price:$
                    {(
                      products.price -
                      (products.price * products.discountPercentage) / 100
                    ).toFixed(0)}
                  </Card.Text>

                  <Link to={`/product/${products.id}`}>
                    <Button variant="success">View Detail</Button>
                  </Link>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default HomePage;

// import React, { useEffect, useState } from "react";
// // Import các service để fetch dữ liệu
// import { getAllCategories } from "../services/CategoriesService";
// import { getAllBrand } from "../services/BrandService";
// import { getAllProduct } from "../services/ProductService";
// import { Button, Card, Form, Container, InputGroup } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";

// const HomePage = () => {
//   // State để lưu dữ liệu từ API
//   const [categories, setCategories] = useState([]); // Danh sách category
//   const [brand, setBrand] = useState([]); // Danh sách brand
//   const [product, setProduct] = useState([]); // Danh sách sản phẩm

//   // State lưu brand và category được chọn để lọc
//   const [selectedCategory, setSelectedCategory] = useState(""); // ID của category được chọn
//   const [selectedBrand, setSelectedBrand] = useState(""); // ID của brand được chọn

//   // Fetch dữ liệu khi component được mount
//   useEffect(() => {
//     // Lấy danh sách sản phẩm
//     const fetchProduct = async () => {
//       try {
//         const resultProduct = await getAllProduct();
//         setProduct(resultProduct);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     // Lấy danh sách category
//     const fetchCategories = async () => {
//       try {
//         const resultCategories = await getAllCategories();
//         setCategories(resultCategories);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     // Lấy danh sách brand
//     const fetchBrand = async () => {
//       try {
//         const resultBrand = await getAllBrand();
//         setBrand(resultBrand);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     // Gọi tất cả hàm fetch
//     fetchProduct();
//     fetchCategories();
//     fetchBrand();
//   }, []);

//   // Lọc sản phẩm theo brand và category được chọn
//   const filteredProducts = product.filter((p) => {
//     const matchCategory = selectedCategory
//       ? String(p.category) === selectedCategory
//       : true; // Nếu không chọn thì cho qua
//     const matchBrand = selectedBrand ? String(p.brand) === selectedBrand : true; // Nếu không chọn thì cho qua
//     return matchCategory && matchBrand; // Chỉ hiện sản phẩm khớp cả 2
//   });

//   return (
//     <Container className="mt-3">
//       <h1 className="text-center">List of Products</h1>

//       <div style={{ display: "flex" }}>
//         {/* Sidebar bên trái để lọc theo category và brand */}
//         <div
//           className="sidebar"
//           style={{ marginRight: "1rem", width: "200px" }}
//         >
//           {/* Filter Category */}
//           <div className="categories mb-4">
//             <h4>Categories</h4>
//             {categories.map((category) => (
//               <div className="text-start" key={category.id}>
//                 <Form.Check
//                   type="radio"
//                   name="category" // Cùng tên để chỉ chọn 1 radio
//                   id={`category-${category.id}`}
//                   label={category.name}
//                   value={category.id}
//                   onChange={(e) => setSelectedCategory(e.target.value)} // Cập nhật state khi chọn
//                   checked={selectedCategory === String(category.id)} // Giữ radio đã chọn
//                 />
//               </div>
//             ))}
//             {/* Nút xóa lọc category */}
//             <Button
//               variant="secondary"
//               size="sm"
//               className="mt-2"
//               onClick={() => setSelectedCategory("")}
//             >
//               Clear Category
//             </Button>
//           </div>

//           {/* Filter Brand */}
//           <div className="brand mb-4">
//             <h4>Brands</h4>
//             {brand.map((brands) => (
//               <div className="text-start" key={brands.id}>
//                 <Form.Check
//                   type="radio"
//                   name="brand" // Cùng tên để chỉ chọn 1 radio
//                   id={`brand-${brands.id}`}
//                   label={brands.name}
//                   value={brands.id}
//                   onChange={(e) => setSelectedBrand(e.target.value)} // Cập nhật state
//                   checked={selectedBrand === String(brands.id)} // Giữ radio đã chọn
//                 />
//               </div>
//             ))}
//             {/* Nút xóa lọc brand */}
//             <Button
//               variant="secondary"
//               size="sm"
//               className="mt-2"
//               onClick={() => setSelectedBrand("")}
//             >
//               Clear Brand
//             </Button>
//           </div>
//         </div>

//         {/* Khu vực hiển thị sản phẩm */}
//         <div
//           className="content flex-grow-1"
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(4,1fr)", // Hiển thị 4 cột
//             gap: "1rem",
//           }}
//         >
//           {filteredProducts.length > 0 ? (
//             filteredProducts.map((products) => (
//               <div key={products.id}>
//                 <Card style={{ width: "18rem" }}>
//                   {/* Ảnh đại diện sản phẩm */}
//                   <Card.Img variant="top" src="holder.js/100px180" />
//                   <Card.Body>
//                     <Card.Text>{products.id}</Card.Text>
//                     <Card.Text>{products.title}</Card.Text>

//                     {/* Hiển thị tên brand dựa vào id */}
//                     <Card.Text>
//                       Brand:{" "}
//                       {brand.find(
//                         (brandItem) => brandItem.id === String(products.brand)
//                       )?.name || "unknown"}
//                     </Card.Text>

//                     {/* Hiển thị tên category dựa vào id */}
//                     <Card.Text>
//                       Category:{" "}
//                       {categories.find(
//                         (cat) => cat.id === String(products.category)
//                       )?.name || "unknown"}
//                     </Card.Text>

//                     {/* Giá cũ */}
//                     <Card.Text className="text-decoration-line-through text-primary fw-bold">
//                       Price: ${products.price}
//                     </Card.Text>

//                     {/* Discount */}
//                     <Card.Text className="text-danger">
//                       Discount: {products.discountPercentage}%
//                     </Card.Text>

//                     {/* Giá sau khi giảm */}
//                     <Card.Text className="text-primary fw-bold">
//                       New price: $
//                       {(
//                         products.price -
//                         (products.price * products.discountPercentage) / 100
//                       ).toFixed(0)}
//                     </Card.Text>

//                     {/* Nút chi tiết */}
//                     <Button variant="success">View Detail</Button>
//                   </Card.Body>
//                 </Card>
//               </div>
//             ))
//           ) : (
//             // Khi không có sản phẩm nào khớp filter
//             <h5>No products found</h5>
//           )}
//         </div>
//       </div>
//     </Container>
//   );
// };

// export default HomePage;
