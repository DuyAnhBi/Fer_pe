import axios from "axios";

const apiUrl = "http://localhost:9999/product";
export const getAllProduct = async () => {
  try {
    const response = await axios.get(apiUrl);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

/* <div className="product flex-grow-1 p-4">
          <Row md={4}>
            {product.map((products) => (
              <Col className="mb-4" key={products.id}>
                <div className="border rounded">
                  <p>{products.id}</p>
                  <p>{products.title}</p>
                  <p>{products.brand}</p>
                  <p>{products.category}</p>
                  <p className="text-decoration-line-through text-primary fw-bold">
                    Price: ${products.price}
                  </p>
                  <p className="text-danger">
                    Discount: {products.discountPercentage}%
                  </p>
                  <p className="text-primary fw-bold">New price</p>
                  <Button variant="success">View Detail</Button>
                </div>
              </Col>
            ))}
          </Row>
        </div> */
