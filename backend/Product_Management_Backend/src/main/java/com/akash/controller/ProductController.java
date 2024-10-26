package com.akash.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.akash.base.ApiResponse;
import com.akash.model.Product;
import com.akash.service.ProductService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/products")
public class ProductController {

	@Autowired
	private ProductService service;

	@PostMapping
	public ResponseEntity<ApiResponse<Product>> addProduct(@RequestBody Product product) {
		try {
			Product saveProduct = service.insertProduct(product);
			ApiResponse<Product> response = new ApiResponse<>("success", saveProduct, null);
			return ResponseEntity.status(HttpStatus.CREATED).body(response);
		} catch (Exception e) {
			e.printStackTrace();
			ApiResponse<Product> response = new ApiResponse<>("error", null, new Object());
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
		}
	}
    
	@GetMapping
	public ResponseEntity<ApiResponse<List<Product>>> fetchAllProducts() {
	    List<Product> allProducts = service.getAllProducts();
	    if (!allProducts.isEmpty()) {
	        ApiResponse<List<Product>> response = new ApiResponse<>("success", allProducts, null);
	        return ResponseEntity.ok(response);
	    } else {
	        ApiResponse<List<Product>> response = new ApiResponse<>("error", null, new Object());
	        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(response);
	    }
	}


	@GetMapping("/{id}")
	public ResponseEntity<ApiResponse<Product>> fetchProductById(@PathVariable Integer id) {
		try {
			Product product = service.getProductById(id);
			if (product != null) {
				ApiResponse<Product> response = new ApiResponse<>("success", product, null);
				return ResponseEntity.ok(response);
			} else {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
			}
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().build();
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<ApiResponse<String>> deleteProduct(@PathVariable Integer id) {
		boolean deleteProduct = service.deleteProduct(id);
		if (deleteProduct) {
			ApiResponse<String> response = new ApiResponse<>("success", "Product deleted successfully..", null);
			return ResponseEntity.ok(response);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}

	@PutMapping("/{id}")
	public ResponseEntity<ApiResponse<String>> updateProduct(@RequestBody Product product, @PathVariable Integer id) {
	    Product updatedProduct = service.updateProduct(product, id);
	    
	    if (updatedProduct != null) {
	    	ApiResponse<String> response = new ApiResponse<>("success", "Product updated successfully..", null);
	        return ResponseEntity.ok(response);
	    } else {
	    	return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	    }
	}
}
