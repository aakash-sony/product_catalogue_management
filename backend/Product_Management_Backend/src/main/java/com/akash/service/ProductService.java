package com.akash.service;

import java.util.List;

import com.akash.model.Product;

public interface ProductService {
	
	public Product insertProduct(Product product);

	public List<Product> getAllProducts();
	
	public Product getProductById(Integer id);
	
	public boolean deleteProduct(Integer id);
	
	public Product updateProduct(Product product, Integer id);
}
