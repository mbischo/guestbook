class UrlMappings {

	static mappings = {
		"/$controller/$action?/$id?"{
			constraints {
				// apply constraints here
			}
		}

		"/"(redirect:"/index.html")
		"500"(view:'/error')
	}
}
