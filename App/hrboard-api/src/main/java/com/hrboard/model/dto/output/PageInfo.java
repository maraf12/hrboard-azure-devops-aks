package com.hrboard.model.dto.output;

import java.util.List;

import org.springframework.data.domain.Page;

public record PageInfo<T>(
		List<T> items,
		int totalPages,
		long totalItems,
		int currentPage,
		int pageSize
		) {
	
	public static <T> PageInfo<T> from(Page<T> page) {
		Builder<T> builder = new Builder<T>();
		return builder.items(page.getContent())
				.totalPages(page.getTotalPages())
				.totalItems(page.getTotalElements())
				.currentPage(page.getNumber())
				.pageSize(page.getSize())
				.build();
	}
	
	public static class Builder<T> {
		private Builder() {}
		
		private List<T> items;
		private int totalPages;
		private long totalItems;
		private int currentPage;
		private int pageSize;
		
		public PageInfo<T> build() {
			return new PageInfo<T>(items, totalPages, totalItems, currentPage, pageSize);
		}
		
		public Builder<T> items(List<T> items) {
			this.items = items;
			return this;
		}

		public Builder<T> totalPages(int totalPages) {
			this.totalPages = totalPages;
			return this;
		}

		public Builder<T> totalItems(long totalItems) {
			this.totalItems = totalItems;
			return this;
		}

		public Builder<T> currentPage(int currentPage) {
			this.currentPage = currentPage;
			return this;
		}

		public Builder<T> pageSize(int pageSize) {
			this.pageSize = pageSize;
			return this;
		}
		
		
	}

}
