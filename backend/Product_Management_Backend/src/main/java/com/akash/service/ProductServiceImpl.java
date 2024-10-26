package com.akash.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.akash.model.Product;
import com.akash.repository.ProductRepository;

@Service
public class ProductServiceImpl implements ProductService {

	@Autowired
	private ProductRepository productRepo;

	@Override
	public Product insertProduct(Product product) {
		return productRepo.save(product);
	}

	@Override
	public List<Product> getAllProducts() {
		return productRepo.findAll();
	}

	@Override
	public Product getProductById(Integer id) {
		return productRepo.findById(id).orElse(null);
	}

	@Override
	public boolean deleteProduct(Integer id) {
		if (productRepo.existsById(id)) {
			productRepo.deleteById(id);
			return true;
		}
		return false;
	}

	@Override
	public Product updateProduct(Product product, Integer id) {
		Optional<Product> oldProductOpt = productRepo.findById(id);

		if (oldProductOpt.isPresent()) {
			Product existingProduct = oldProductOpt.get();

			if (product.getName() != null) {
				existingProduct.setName(product.getName());
			}
			if (product.getDescription() != null) {
				existingProduct.setDescription(product.getDescription());
			}
			if (product.getPrice() != null) {
				existingProduct.setPrice(product.getPrice());
			}
			if (product.getQuantity() != null) {
				existingProduct.setQuantity(product.getQuantity());
			}
			if (product.getStatus() != null) {
				existingProduct.setStatus(product.getStatus());
			}

			return productRepo.save(existingProduct);
		} else {
			return null;
		}
	}
}
