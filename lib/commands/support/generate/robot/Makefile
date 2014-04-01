BIN := ./node_modules/.bin
TEST_FILES := $(shell find test -type f -name "*.spec.js")

# Our 'phony' make targets (don't involve any file changes)
.PHONY: run test bdd lint

# Runs the robot defined in robot.js
run:
	@node ./robot.js

# Run Mocha, with standard reporter.
test:
	@$(BIN)/mocha --colors $(TEST_FILES)

# Run Mocha, with more verbose BDD reporter.
bdd:
	@$(BIN)/mocha --colors -R spec $(TEST_FILES)

# Run JSHint
lint:
	@$(BIN)/jshint .
