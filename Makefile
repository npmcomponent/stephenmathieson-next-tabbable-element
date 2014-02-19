
BINS = node_modules/.bin
TEST_PORT ?= 3000
BUILD_FLAGS ?= --dev
INSTALL_FLAGS ?= --dev

build: node_modules
build: components
build: index.js
	@$(BINS)/component-build $(BUILD_FLAGS)

node_modules: package.json
	@npm install

components: component.json
	@$(BINS)/component-install $(INSTALL_FLAGS)

clean:
	rm -fr build components

test: build server.pid
	$(BINS)/mocha-phantomjs \
		http://localhost:$(TEST_PORT)/test/index.html
	$(MAKE) kill-server

server.pid: node_modules
	$(BINS)/st \
		--port $(TEST_PORT) \
		& echo $$! > ./$@

kill-server:
	@test -e server.pid \
		&& kill -9 `cat server.pid` \
		&& rm server.pid \
		&& echo 'killed server'

.PHONY: clean
