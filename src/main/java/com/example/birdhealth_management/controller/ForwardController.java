package com.example.birdhealth_management.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ForwardController {

	@RequestMapping(value = {
			"/", "/signup", "/reset",
			"/home", "/mypage", "/chart", "/contact",
			"/admin/**",
			"/{x:[\\w\\-]+}", "/{x:^(?!api|dist|static|.*\\..*$).*$}/**"
	})
	public String forward() {
		return "forward:/dist/index.html";
	}
}
