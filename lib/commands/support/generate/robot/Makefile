BIN := ./node_modules/.bin
TEST_FILES := test/support/env.js $(shell find test/specs -type f -name "*.js")

# Our 'phony' make targets (don't involve any file changes)
.PHONY: run test bdd

# Runs the robot defined in robot.js
run:
	@node ./robot.js

# Run Mocha, with standard reporter.
test:
	@$(BIN)/mocha --colors $(TEST_FILES)

# Run Mocha, with more verbose BDD reporter.
bdd:
	@$(BIN)/mocha --colors -R spec $(TEST_FILES)
