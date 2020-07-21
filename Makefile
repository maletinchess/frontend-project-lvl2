install:
	npm install

publish:
	npm publish --dry-run
	
test-coverage:
	npm test -- --coverage --coverageProvider=v8

test:
	npx -n --experimental-vm-modules jest
	
lint:
	npx eslint .

.PHONY: test
