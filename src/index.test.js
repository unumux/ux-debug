/*eslint-env node, mocha */

import * as sinon from "sinon";
import chai from "chai";
import sinonChai from "sinon-chai";

const {expect} = chai.use(sinonChai);


import chalk from "chalk"

import * as debug from "./index";

function getConsoleLog() {
    return console.log.getCall(0).args[0];
}

describe("debug", function() {

    beforeEach(function() {
        // create a sandbox
        this.sandbox = sinon.sandbox.create();

        // spy on console.log calls
        this.spy = this.sandbox.spy(console, "log");
    });

    afterEach(function() {
        // restore the environment as it was before
        this.sandbox.restore();
    });

    describe("enabled", function() {
        it("should return false", function() {
            debug.disable();
            expect(debug.enabled()).to.be.false;
        });

        it("should return true", function() {
            debug.enable();
            expect(debug.enabled()).to.be.true;
        });
    });


    describe("disable", function() {
        beforeEach(function() {
            debug.disable();
        });

        it("should not print anything when `log` is called", function() {
            debug.log("Test1");
            expect(this.spy.called).to.be.false;
        });

        it("should not print anything when `warn` is called", function() {
            debug.warn("Test2");
            expect(this.spy.called).to.be.false;
        });

        it("should not print anything when `error` is called", function() {
            debug.error("Test3");
            expect(this.spy.called).to.be.false;
        });

        it("should not print anything when `json` is called", function() {
            debug.json("Test4");
            expect(this.spy.called).to.be.false;
        });
    });

    describe("enable({ printLine: false })", function() {
        beforeEach(function() {
            debug.enable({ printLine: false });
        });

        it("should print when `log` is called", function() {
            debug.log("Test1");
            expect(getConsoleLog()).to.equal(chalk.cyan("Test1"));
        });

        it("should print when `warn` is called", function() {
            debug.warn("Test2");
            expect(getConsoleLog()).to.equal(chalk.yellow("Test2"));
        });

        it("should print when `error` is called", function() {
            debug.error("Test3");
            expect(getConsoleLog()).to.equal(chalk.red("Test3"));
        });

        it("should print when `json` is called", function() {
            debug.json({ "Test": "Test4" });
            expect(getConsoleLog()).to.eql({ "Test": "Test4" });
        });
    });
});
