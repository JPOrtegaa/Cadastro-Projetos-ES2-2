package projeto1ES2;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"Controllers"})
public class Projeto1Es2Application {

	public static void main(String[] args) {
		SpringApplication.run(Projeto1Es2Application.class, args);
	}

}
