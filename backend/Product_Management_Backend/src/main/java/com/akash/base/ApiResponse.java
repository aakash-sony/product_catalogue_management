package com.akash.base;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ApiResponse<T> {
	 private String status;
	    private T data;
	    private Object error;
}
