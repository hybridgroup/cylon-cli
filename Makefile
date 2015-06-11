BIN := ./node_modules/.bin
VERSION := $(shell node -e "console.log(require('./package.json').version)")

lint:
	@$(BIN)/eslint ./bin/cylon

release:
	@git push origin master
	@git checkout release ; git merge master ; git push ; git checkout master
	@git tag -m "$(VERSION)" v$(VERSION)
	@git push --tags
	@npm publish ./

.PHONY: lint release
