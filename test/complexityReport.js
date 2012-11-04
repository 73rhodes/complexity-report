/*global require, suite, setup, teardown, test */

(function () {
    'use strict';

    var assert = require('chai').assert,

    modulePath = '../src/complexityReport';

    suite('complexityReport:', function () {
        test('require does not throw', function () {
            assert.doesNotThrow(function () {
                require(modulePath);
            });
        });

        test('require returns object', function () {
            assert.isObject(require(modulePath));
        });

        suite('require:', function () {
            var cr;

            setup(function () {
                cr = require(modulePath);
            });

            teardown(function () {
                cr = undefined;
            });

            test('run function is exported', function () {
                assert.isFunction(cr.run);
            });

            test('run throws when source is object', function () {
                assert.throws(function () {
                    cr.run({});
                });
            });

            test('run throws when source is empty string', function () {
                assert.throws(function () {
                    cr.run('');
                });
            });

            test('run throws when source is not javascript', function () {
                assert.throws(function () {
                    cr.run('foo bar');
                });
            });

            test('run does not throw when source is javascript', function () {
                assert.doesNotThrow(function () {
                    cr.run('console.log("foo");');
                });
            });

            test('run returns object', function () {
                assert.isObject(cr.run('"foo"'));
            });

            test('run returns aggregate complexity property', function () {
                assert.isObject(cr.run('"foo"').aggregate.complexity);
            });

            test('run returns functions property', function () {
                assert.isArray(cr.run('"foo"').functions);
            });

            suite('function call:', function () {
                var report;

                setup(function () {
                    report = cr.run('parseInt("10", 10);');
                });

                teardown(function () {
                    report = undefined;
                });

                test('aggregate has correct cyclomatic complexity', function () {
                    assert.strictEqual(report.aggregate.complexity.cyclomatic, 1);
                });

                test('functions is empty', function () {
                    assert.lengthOf(report.functions, 0);
                });

                test('aggregate has correct Halstead total operators', function () {
                    assert.strictEqual(report.aggregate.complexity.halstead.operators.total, 1);
                });

                test('aggregate has correct Halstead distinct operators', function () {
                    assert.strictEqual(report.aggregate.complexity.halstead.operators.distinct, 1);
                });

                test('aggregate has correct Halstead total operands', function () {
                    assert.strictEqual(report.aggregate.complexity.halstead.operands.total, 3);
                });

                test('aggregate has correct Halstead distinct operands', function () {
                    assert.strictEqual(report.aggregate.complexity.halstead.operands.distinct, 3);
                });
            });

            suite('condition:', function () {
                var report;

                setup(function () {
                    report = cr.run('if (true) { "foo"; }');
                });

                teardown(function () {
                    report = undefined;
                });

                test('aggregate has correct cyclomatic complexity', function () {
                    assert.strictEqual(report.aggregate.complexity.cyclomatic, 2);
                });

                test('functions is empty', function () {
                    assert.lengthOf(report.functions, 0);
                });

                test('aggregate has correct Halstead total operators', function () {
                    assert.strictEqual(report.aggregate.complexity.halstead.operators.total, 1);
                });

                test('aggregate has correct Halstead distinct operators', function () {
                    assert.strictEqual(report.aggregate.complexity.halstead.operators.distinct, 1);
                });

                test('aggregate has correct Halstead total operands', function () {
                    assert.strictEqual(report.aggregate.complexity.halstead.operands.total, 2);
                });

                test('aggregate has correct Halstead distinct operands', function () {
                    assert.strictEqual(report.aggregate.complexity.halstead.operands.distinct, 2);
                });
            });

            suite('condition with alternate:', function () {
                var report;

                setup(function () {
                    report = cr.run('if (true) { "foo"; } else { "bar"; }');
                });

                teardown(function () {
                    report = undefined;
                });

                test('aggregate has correct cyclomatic complexity', function () {
                    assert.strictEqual(report.aggregate.complexity.cyclomatic, 2);
                });

                test('functions is empty', function () {
                    assert.lengthOf(report.functions, 0);
                });

                test('aggregate has correct Halstead total operators', function () {
                    assert.strictEqual(report.aggregate.complexity.halstead.operators.total, 2);
                });

                test('aggregate has correct Halstead distinct operators', function () {
                    assert.strictEqual(report.aggregate.complexity.halstead.operators.distinct, 2);
                });

                test('aggregate has correct Halstead total operands', function () {
                    assert.strictEqual(report.aggregate.complexity.halstead.operands.total, 3);
                });

                test('aggregate has correct Halstead distinct operands', function () {
                    assert.strictEqual(report.aggregate.complexity.halstead.operands.distinct, 3);
                });
            });

            suite('dual condition:', function () {
                var report;

                setup(function () {
                    report = cr.run('if (true) { "foo"; } if (false) { "bar"; }');
                });

                teardown(function () {
                    report = undefined;
                });

                test('aggregate has correct cyclomatic complexity', function () {
                    assert.strictEqual(report.aggregate.complexity.cyclomatic, 3);
                });

                test('aggregate has correct Halstead total operators', function () {
                    assert.strictEqual(report.aggregate.complexity.halstead.operators.total, 2);
                });

                test('aggregate has correct Halstead distinct operators', function () {
                    assert.strictEqual(report.aggregate.complexity.halstead.operators.distinct, 1);
                });

                test('aggregate has correct Halstead total operands', function () {
                    assert.strictEqual(report.aggregate.complexity.halstead.operands.total, 4);
                });

                test('aggregate has correct Halstead distinct operands', function () {
                    assert.strictEqual(report.aggregate.complexity.halstead.operands.distinct, 4);
                });
            });

            suite('alternate dual condition:', function () {
                var report;

                setup(function () {
                    report = cr.run('if (true) { "foo"; } else if (false) { "bar"; }');
                });

                teardown(function () {
                    report = undefined;
                });

                test('aggregate has correct cyclomatic complexity', function () {
                    assert.strictEqual(report.aggregate.complexity.cyclomatic, 3);
                });

                test('aggregate has correct Halstead total operators', function () {
                    assert.strictEqual(report.aggregate.complexity.halstead.operators.total, 3);
                });

                test('aggregate has correct Halstead distinct operators', function () {
                    assert.strictEqual(report.aggregate.complexity.halstead.operators.distinct, 2);
                });

                test('aggregate has correct Halstead total operands', function () {
                    assert.strictEqual(report.aggregate.complexity.halstead.operands.total, 4);
                });

                test('aggregate has correct Halstead distinct operands', function () {
                    assert.strictEqual(report.aggregate.complexity.halstead.operands.distinct, 4);
                });
            });

            suite('nested condition:', function () {
                var report;

                setup(function () {
                    report = cr.run('if (true) { "foo"; if (false) { "bar"; } }');
                });

                teardown(function () {
                    report = undefined;
                });

                test('aggregate has correct cyclomatic complexity', function () {
                    assert.strictEqual(report.aggregate.complexity.cyclomatic, 3);
                });
            });

            suite('switch statement:', function () {
                var report;

                setup(function () {
                    report = cr.run('switch (Date.now()) { case 1: "foo"; break; case 2: "bar"; break; default: "baz"; }');
                });

                teardown(function () {
                    report = undefined;
                });

                test('aggregate has correct cyclomatic complexity', function () {
                    assert.strictEqual(report.aggregate.complexity.cyclomatic, 3);
                });

                test('functions is empty', function () {
                    assert.lengthOf(report.functions, 0);
                });

                test('aggregate has correct Halstead total operators', function () {
                    assert.strictEqual(report.aggregate.complexity.halstead.operators.total, 8);
                });

                test('aggregate has correct Halstead distinct operators', function () {
                    assert.strictEqual(report.aggregate.complexity.halstead.operators.distinct, 6);
                });

                test('aggregate has correct Halstead total operands', function () {
                    assert.strictEqual(report.aggregate.complexity.halstead.operands.total, 7);
                });

                test('aggregate has correct Halstead distinct operands', function () {
                    assert.strictEqual(report.aggregate.complexity.halstead.operands.distinct, 7);
                });
            });

            suite('switch statement with fall-through case:', function () {
                var report;

                setup(function () {
                    report = cr.run('switch (Date.now()) { case 1: case 2: "foo"; break; default: "bar"; }');
                });

                teardown(function () {
                    report = undefined;
                });

                test('aggregate has correct cyclomatic complexity', function () {
                    assert.strictEqual(report.aggregate.complexity.cyclomatic, 3);
                });

                test('functions is empty', function () {
                    assert.lengthOf(report.functions, 0);
                });

                test('aggregate has correct Halstead total operators', function () {
                    assert.strictEqual(report.aggregate.complexity.halstead.operators.total, 7);
                });

                test('aggregate has correct Halstead distinct operators', function () {
                    assert.strictEqual(report.aggregate.complexity.halstead.operators.distinct, 6);
                });

                test('aggregate has correct Halstead total operands', function () {
                    assert.strictEqual(report.aggregate.complexity.halstead.operands.total, 6);
                });

                test('aggregate has correct Halstead distinct operands', function () {
                    assert.strictEqual(report.aggregate.complexity.halstead.operands.distinct, 6);
                });
            });

            suite('switch statement containing condition:', function () {
                var report;

                setup(function () {
                    report = cr.run('switch (Date.now()) { case 1: "foo"; break; case 2: "bar"; break; default: if (true) { "baz"; } }');
                });

                teardown(function () {
                    report = undefined;
                });

                test('aggregate has correct cyclomatic complexity', function () {
                    assert.strictEqual(report.aggregate.complexity.cyclomatic, 4);
                });

                test('functions is empty', function () {
                    assert.lengthOf(report.functions, 0);
                });

                test('aggregate has correct Halstead total operators', function () {
                    assert.strictEqual(report.aggregate.complexity.halstead.operators.total, 9);
                });

                test('aggregate has correct Halstead distinct operators', function () {
                    assert.strictEqual(report.aggregate.complexity.halstead.operators.distinct, 7);
                });

                test('aggregate has correct Halstead total operands', function () {
                    assert.strictEqual(report.aggregate.complexity.halstead.operands.total, 8);
                });

                test('aggregate has correct Halstead distinct operands', function () {
                    assert.strictEqual(report.aggregate.complexity.halstead.operands.distinct, 8);
                });
            });

            suite('for loop:', function () {
                var report;

                setup(function () {
                    report = cr.run('var i; for (i = 0; i < 10; i += 1) { "foo"; }');
                });

                teardown(function () {
                    report = undefined;
                });

                test('aggregate has correct cyclomatic complexity', function () {
                    assert.strictEqual(report.aggregate.complexity.cyclomatic, 2);
                });

                test('functions is empty', function () {
                    assert.lengthOf(report.functions, 0);
                });

                test('aggregate has correct Halstead total operators', function () {
                    assert.strictEqual(report.aggregate.complexity.halstead.operators.total, 5);
                });

                test('aggregate has correct Halstead distinct operators', function () {
                    assert.strictEqual(report.aggregate.complexity.halstead.operators.distinct, 5);
                });

                test('aggregate has correct Halstead total operands', function () {
                    assert.strictEqual(report.aggregate.complexity.halstead.operands.total, 8);
                });

                test('aggregate has correct Halstead distinct operands', function () {
                    assert.strictEqual(report.aggregate.complexity.halstead.operands.distinct, 5);
                });
            });

            suite('for loop containing condition:', function () {
                var report;

                setup(function () {
                    report = cr.run('var i; for (i = 0; i < 10; i += 1) { if (true) { "foo"; } }');
                });

                teardown(function () {
                    report = undefined;
                });

                test('aggregate has correct cyclomatic complexity', function () {
                    assert.strictEqual(report.aggregate.complexity.cyclomatic, 3);
                });

                test('aggregate has correct Halstead total operators', function () {
                    assert.strictEqual(report.aggregate.complexity.halstead.operators.total, 6);
                });

                test('aggregate has correct Halstead distinct operators', function () {
                    assert.strictEqual(report.aggregate.complexity.halstead.operators.distinct, 6);
                });

                test('aggregate has correct Halstead total operands', function () {
                    assert.strictEqual(report.aggregate.complexity.halstead.operands.total, 9);
                });

                test('aggregate has correct Halstead distinct operands', function () {
                    assert.strictEqual(report.aggregate.complexity.halstead.operands.distinct, 6);
                });
            });

            suite('for...in loop:', function () {
                var report;

                setup(function () {
                    report = cr.run('var property; for (property in { foo: "bar", baz: "qux" }) { "wibble"; }');
                });

                teardown(function () {
                    report = undefined;
                });

                test('aggregate has correct cyclomatic complexity', function () {
                    assert.strictEqual(report.aggregate.complexity.cyclomatic, 1);
                });

                test('functions is empty', function () {
                    assert.lengthOf(report.functions, 0);
                });

                test('aggregate has correct Halstead total operators', function () {
                    assert.strictEqual(report.aggregate.complexity.halstead.operators.total, 4);
                });

                test('aggregate has correct Halstead distinct operators', function () {
                    assert.strictEqual(report.aggregate.complexity.halstead.operators.distinct, 3);
                });

                test('aggregate has correct Halstead total operands', function () {
                    assert.strictEqual(report.aggregate.complexity.halstead.operands.total, 8);
                });

                test('aggregate has correct Halstead distinct operands', function () {
                    assert.strictEqual(report.aggregate.complexity.halstead.operands.distinct, 7);
                });
            });

            suite('for...in loop containing condition:', function () {
                var report;

                setup(function () {
                    report = cr.run('var property, object = { foo: "bar", baz: "qux" }; for (property in object) { if (object.hasOwnProperty(property)) { "wibble"; } }');
                });

                teardown(function () {
                    report = undefined;
                });

                test('aggregate has correct cyclomatic complexity', function () {
                    assert.strictEqual(report.aggregate.complexity.cyclomatic, 2);
                });
            });

            suite('while loop:', function () {
                var report;

                setup(function () {
                    report = cr.run('while (true) { "foo"; }');
                });

                teardown(function () {
                    report = undefined;
                });

                test('aggregate has correct cyclomatic complexity', function () {
                    assert.strictEqual(report.aggregate.complexity.cyclomatic, 2);
                });

                test('functions is empty', function () {
                    assert.lengthOf(report.functions, 0);
                });
            });

            suite('while loop containing condition:', function () {
                var report;

                setup(function () {
                    report = cr.run('while (true) { if (true) { "foo"; } }');
                });

                teardown(function () {
                    report = undefined;
                });

                test('aggregate has correct cyclomatic complexity', function () {
                    assert.strictEqual(report.aggregate.complexity.cyclomatic, 3);
                });
            });

            suite('do...while loop:', function () {
                var report;

                setup(function () {
                    report = cr.run('do { "foo"; } while (true)');
                });

                teardown(function () {
                    report = undefined;
                });

                test('aggregate has correct cyclomatic complexity', function () {
                    assert.strictEqual(report.aggregate.complexity.cyclomatic, 2);
                });

                test('functions is empty', function () {
                    assert.lengthOf(report.functions, 0);
                });
            });

            suite('do...while loop containing condition:', function () {
                var report;

                setup(function () {
                    report = cr.run('do { if (true) { "foo"; } } while (true)');
                });

                teardown(function () {
                    report = undefined;
                });

                test('aggregate has correct cyclomatic complexity', function () {
                    assert.strictEqual(report.aggregate.complexity.cyclomatic, 3);
                });
            });

            suite('try...catch', function () {
                var report;

                setup(function () {
                    report = cr.run('try { "foo"; } catch (e) { e.message; }');
                });

                teardown(function () {
                    report = undefined;
                });

                test('aggregate has correct cyclomatic complexity', function () {
                    assert.strictEqual(report.aggregate.complexity.cyclomatic, 1);
                });

                test('functions is empty', function () {
                    assert.lengthOf(report.functions, 0);
                });
            });

            suite('try containing condition', function () {
                var report;

                setup(function () {
                    report = cr.run('try { if (true) { "foo"; } } catch (e) { "bar"; }');
                });

                teardown(function () {
                    report = undefined;
                });

                test('aggregate has correct cyclomatic complexity', function () {
                    assert.strictEqual(report.aggregate.complexity.cyclomatic, 2);
                });
            });

            suite('catch containing condition', function () {
                var report;

                setup(function () {
                    report = cr.run('try { "foo"; } catch (e) { if (true) { "bar"; } }');
                });

                teardown(function () {
                    report = undefined;
                });

                test('aggregate has correct cyclomatic complexity', function () {
                    assert.strictEqual(report.aggregate.complexity.cyclomatic, 2);
                });
            });

            suite('function declaration:', function () {
                var report;

                setup(function () {
                    report = cr.run('function foo () { "bar"; }');
                });

                teardown(function () {
                    report = undefined;
                });

                test('aggregate has correct cyclomatic complexity', function () {
                    assert.strictEqual(report.aggregate.complexity.cyclomatic, 1);
                });

                test('functions has correct length', function () {
                    assert.lengthOf(report.functions, 1);
                });

                test('function has correct name', function () {
                    assert.strictEqual(report.functions[0].name, 'foo');
                });

                test('function has complexity property', function () {
                    assert.isObject(report.functions[0].complexity);
                });

                test('function has correct cyclomatic complexity', function () {
                    assert.strictEqual(report.functions[0].complexity.cyclomatic, 1);
                });
            });

            suite('nested function declaration:', function () {
                var report;

                setup(function () {
                    report = cr.run('function foo () { bar(); function bar () { "baz"; } }');
                });

                teardown(function () {
                    report = undefined;
                });

                test('functions has correct length', function () {
                    assert.lengthOf(report.functions, 2);
                });

                test('first function has correct name', function () {
                    assert.strictEqual(report.functions[0].name, 'foo');
                });

                test('second function has correct name', function () {
                    assert.strictEqual(report.functions[1].name, 'bar');
                });
            });

            suite('function declaration containing condition:', function () {
                var report;

                setup(function () {
                    report = cr.run('function foo () { if (true) { "bar"; } }');
                });

                teardown(function () {
                    report = undefined;
                });

                test('aggregate has correct cyclomatic complexity', function () {
                    assert.strictEqual(report.aggregate.complexity.cyclomatic, 2);
                });

                test('function has correct cyclomatic complexity', function () {
                    assert.strictEqual(report.functions[0].complexity.cyclomatic, 2);
                });
            });

            suite('assignment expression', function () {
                var report;

                setup(function () {
                    report = cr.run('var foo = "bar";');
                });

                teardown(function () {
                    report = undefined;
                });

                test('aggregate has correct cyclomatic complexity', function () {
                    assert.strictEqual(report.aggregate.complexity.cyclomatic, 1);
                });

                test('functions is empty', function () {
                    assert.lengthOf(report.functions, 0);
                });
            });

            suite('ternary condtional expression assigned to variable:', function () {
                var report;

                setup(function () {
                    report = cr.run('var foo = true ? "bar" : "baz";');
                });

                teardown(function () {
                    report = undefined;
                });

                test('aggregate has correct cyclomatic complexity', function () {
                    assert.strictEqual(report.aggregate.complexity.cyclomatic, 2);
                });
            });

            suite('logical or expression assigned to variable:', function () {
                var report;

                setup(function () {
                    report = cr.run('var foo = true || false;');
                });

                teardown(function () {
                    report = undefined;
                });

                test('aggregate has correct cyclomatic complexity', function () {
                    assert.strictEqual(report.aggregate.complexity.cyclomatic, 2);
                });
            });

            suite('anonymous function assigned to variable:', function () {
                var report;

                setup(function () {
                    report = cr.run('var foo = function () { "bar"; }');
                });

                teardown(function () {
                    report = undefined;
                });

                test('functions has correct length', function () {
                    assert.lengthOf(report.functions, 1);
                });

                test('function has correct name', function () {
                    assert.strictEqual(report.functions[0].name, 'foo');
                });
            });

            suite('named function assigned to variable:', function () {
                var report;

                setup(function () {
                    report = cr.run('var foo = function bar () { "baz"; }');
                });

                teardown(function () {
                    report = undefined;
                });

                test('function has correct name', function () {
                    assert.strictEqual(report.functions[0].name, 'bar');
                });
            });

            suite('ternary condtional expression returned from function:', function () {
                var report;

                setup(function () {
                    report = cr.run('function foo () { return true ? "bar" : "baz"; }');
                });

                teardown(function () {
                    report = undefined;
                });

                test('aggregate has correct cyclomatic complexity', function () {
                    assert.strictEqual(report.aggregate.complexity.cyclomatic, 2);
                });

                test('function has correct cyclomatic complexity', function () {
                    assert.strictEqual(report.functions[0].complexity.cyclomatic, 2);
                });
            });

            suite('logical or expression returned from function:', function () {
                var report;

                setup(function () {
                    report = cr.run('function foo () { return true || false; }');
                });

                teardown(function () {
                    report = undefined;
                });

                test('aggregate has correct cyclomatic complexity', function () {
                    assert.strictEqual(report.aggregate.complexity.cyclomatic, 2);
                });

                test('function has correct cyclomatic complexity', function () {
                    assert.strictEqual(report.functions[0].complexity.cyclomatic, 2);
                });
            });

            suite('anonymous function returned from function:', function () {
                var report;

                setup(function () {
                    report = cr.run('function foo () { return function () { "bar"; }; }');
                });

                teardown(function () {
                    report = undefined;
                });

                test('functions has correct length', function () {
                    assert.lengthOf(report.functions, 2);
                });

                test('first function has correct name', function () {
                    assert.strictEqual(report.functions[0].name, 'foo');
                });

                test('second function is anonymous', function () {
                    assert.strictEqual(report.functions[1].name, '<anonymous>');
                });
            });

            suite('named function returned from function:', function () {
                var report;

                setup(function () {
                    report = cr.run('function foo () { return function bar () { "baz"; }; }');
                });

                teardown(function () {
                    report = undefined;
                });

                test('second function has correct name', function () {
                    assert.strictEqual(report.functions[1].name, 'bar');
                });
            });

            suite('ternary condtional expression passed as argument:', function () {
                var report;

                setup(function () {
                    report = cr.run('parseInt("10", true ? 10 : 8);');
                });

                teardown(function () {
                    report = undefined;
                });

                test('aggregate has correct cyclomatic complexity', function () {
                    assert.strictEqual(report.aggregate.complexity.cyclomatic, 2);
                });
            });

            suite('logical or expression passed as argument:', function () {
                var report;

                setup(function () {
                    report = cr.run('parseInt("10", 10 || 8);');
                });

                teardown(function () {
                    report = undefined;
                });

                test('aggregate has correct cyclomatic complexity', function () {
                    assert.strictEqual(report.aggregate.complexity.cyclomatic, 2);
                });
            });

            suite('anonymous function passed as argument:', function () {
                var report;

                setup(function () {
                    report = cr.run('setTimeout(function () { "foo"; }, 1000);');
                });

                teardown(function () {
                    report = undefined;
                });

                test('functions has correct length', function () {
                    assert.lengthOf(report.functions, 1);
                });

                test('function is anonymous', function () {
                    assert.strictEqual(report.functions[0].name, '<anonymous>');
                });
            });

            suite('named function passed as argument:', function () {
                var report;

                setup(function () {
                    report = cr.run('setTimeout(function foo () { "bar"; }, 1000);');
                });

                teardown(function () {
                    report = undefined;
                });

                test('function has correct name', function () {
                    assert.strictEqual(report.functions[0].name, 'foo');
                });
            });

            suite('logical or expression with logicalor false:', function () {
                var report;

                setup(function () {
                    report = cr.run('var foo = true || false;', {
                        logicalor: false
                    });
                });

                teardown(function () {
                    report = undefined;
                });

                test('aggregate has correct cyclomatic complexity', function () {
                    assert.strictEqual(report.aggregate.complexity.cyclomatic, 1);
                });
            });

            suite('switch statement with switchcase false:', function () {
                var report;

                setup(function () {
                    report = cr.run('switch (Date.now()) { case 1: "foo"; break; case 2: "bar"; break; default: "baz"; }', {
                        switchcase: false
                    });
                });

                teardown(function () {
                    report = undefined;
                });

                test('aggregate has correct cyclomatic complexity', function () {
                    assert.strictEqual(report.aggregate.complexity.cyclomatic, 1);
                });
            });

            suite('for...in loop with forin true:', function () {
                var report;

                setup(function () {
                    report = cr.run('var property; for (property in { foo: "bar", baz: "qux" }) { "wibble"; }', {
                        forin: true
                    });
                });

                teardown(function () {
                    report = undefined;
                });

                test('aggregate has correct cyclomatic complexity', function () {
                    assert.strictEqual(report.aggregate.complexity.cyclomatic, 2);
                });
            });

            suite('try...catch with trycatch true:', function () {
                var report;

                setup(function () {
                    report = cr.run('try { "foo"; } catch (e) { e.message; }', {
                        trycatch: true
                    });
                });

                teardown(function () {
                    report = undefined;
                });

                test('aggregate has correct cyclomatic complexity', function () {
                    assert.strictEqual(report.aggregate.complexity.cyclomatic, 2);
                });
            });

            suite('IIFE:', function () {
                var report;

                setup(function () {
                    report = cr.run('(function (foo) { if (foo === "foo") { console.log(foo); return; } "bar"; }("foo"));');
                });

                teardown(function () {
                    report = undefined;
                });

                test('functions has correct length', function () {
                    assert.lengthOf(report.functions, 1);
                });

                test('function has correct cyclomatic complexity', function () {
                    assert.strictEqual(report.functions[0].complexity.cyclomatic, 2);
                });

                test('aggregate has correct cyclomatic complexity', function () {
                    assert.strictEqual(report.aggregate.complexity.cyclomatic, 2);
                });
            });

            suite('logical and condition:', function () {
                var report;

                setup(function () {
                    report = cr.run('if ("foo" && "bar") { "baz"; }');
                });

                teardown(function () {
                    report = undefined;
                });

                test('aggregate has correct cyclomatic complexity', function () {
                    assert.strictEqual(report.aggregate.complexity.cyclomatic, 2);
                });
            });

            suite('call on function object', function () {
                var report;

                setup(function () {
                    report = cr.run('(function () { "foo"; }).call(this);');
                });

                teardown(function () {
                    report = undefined;
                });

                test('functions has correct length', function () {
                    assert.lengthOf(report.functions, 1);
                });
            });

            suite('anonymous function assigned to property:', function () {
                var report;

                setup(function () {
                    report = cr.run('var foo = {}; foo.bar = function () { "foobar"; };');
                });

                teardown(function () {
                    report = undefined;
                });

                test('functions has correct length', function () {
                    assert.lengthOf(report.functions, 1);
                });

                test('function has correct name', function () {
                    assert.strictEqual(report.functions[0].name, 'foo.bar');
                });
            });

            suite('anonymous function assigned to property of literal:', function () {
                var report;

                setup(function () {
                    report = cr.run('"".bar = function () { "bar"; };');
                });

                teardown(function () {
                    report = undefined;
                });

                test('functions has correct length', function () {
                    assert.lengthOf(report.functions, 1);
                });

                test('function has correct name', function () {
                    assert.strictEqual(report.functions[0].name, '<anonymous>.bar');
                });
            });

            suite('empty object literal:', function () {
                var report;

                setup(function () {
                    report = cr.run('var foo = {};');
                });

                teardown(function () {
                    report = undefined;
                });

                test('aggregate has correct cyclomatic complexity', function () {
                    assert.strictEqual(report.aggregate.complexity.cyclomatic, 1);
                });

                test('functions has correct length', function () {
                    assert.lengthOf(report.functions, 0);
                });
            });

            suite('function property of literal object:', function () {
                var report;

                setup(function () {
                    report = cr.run('var foo = { bar: "bar", baz: function () { "baz"; } };');
                });

                teardown(function () {
                    report = undefined;
                });

                test('functions has correct length', function () {
                    assert.lengthOf(report.functions, 1);
                });

                test('function has correct name', function () {
                    assert.strictEqual(report.functions[0].name, 'baz');
                });
            });

            suite('duplicate function properties of literal object:', function () {
                var report;

                setup(function () {
                    report = cr.run('var foo = { bar: function () { if (true) { "bar"; } }, bar: function () { "bar"; } };');
                });

                teardown(function () {
                    report = undefined;
                });

                test('functions has correct length', function () {
                    assert.lengthOf(report.functions, 2);
                });

                test('first function has correct name', function () {
                    assert.strictEqual(report.functions[0].name, 'bar');
                });

                test('second function has correct name', function () {
                    assert.strictEqual(report.functions[1].name, 'bar');
                });

                test('first function has correct cyclomatic complexity', function () {
                    assert.strictEqual(report.functions[0].complexity.cyclomatic, 2);
                });

                test('second function has correct cyclomatic complexity', function () {
                    assert.strictEqual(report.functions[1].complexity.cyclomatic, 1);
                });

                test('aggregate has correct cyclomatic complexity', function () {
                    assert.strictEqual(report.aggregate.complexity.cyclomatic, 2);
                });
            });
        });
    });
}());

