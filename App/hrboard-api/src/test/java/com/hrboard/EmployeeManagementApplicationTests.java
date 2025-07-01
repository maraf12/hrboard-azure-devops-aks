package com.hrboard;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;

@SpringBootTest
@Sql(value = "classpath:/data.sql")
class EmployeeManagementApplicationTests {

	@Test
	void contextLoads() {
	}

}
