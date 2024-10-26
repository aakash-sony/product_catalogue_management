package com.akash.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.akash.model.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {

}
