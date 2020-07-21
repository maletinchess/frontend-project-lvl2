install:
	npm install

publish:
	npm publish --dry-run

test:
	npx -n --experimental-vm-modules jest
	
lint:
	npx eslint .

.PHONY: test
